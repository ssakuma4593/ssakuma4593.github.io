#!/usr/bin/env node
// Encrypts ren-content/source.json (gitignored, plaintext) into ren/data.json
// (committed, ciphertext-only) so the /ren/ page can decrypt it client-side
// with Web Crypto given the right password.
//
// Usage:
//   node scripts/encrypt-ren.js
//
// The password is read from the REN_PASSWORD env var if set, otherwise you
// are prompted for it on stdin (typed in plain view — run in a private
// terminal). The same password must be used every time you re-run this, or
// people with the old password will be locked out.
//
// source.json format (create it on first run — this script will scaffold
// one for you if it's missing):
//   {
//     "updates": [
//       {
//         "date": "2026-09-01",
//         "title": "First update",
//         "body": "Text here.\n\nSecond paragraph.",
//         "leadImage": "photos/hero-photo.jpg",
//         "images": ["photos/some-photo.jpg"]
//       }
//     ]
//   }
//
// "leadImage" (optional, single) renders full-width above the text.
// "images" (optional, array) render below the text. Both are paths
// relative to ren-content/. Images are never written
// anywhere public — this script reads them, inlines them as base64 data
// URIs into the plaintext, and only the encrypted result goes to
// ren/data.json. A plain /img/ path would bypass the password entirely,
// so don't reference images any other way.

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CONTENT_DIR = path.join(__dirname, '..', 'ren-content');
const SOURCE_PATH = path.join(CONTENT_DIR, 'source.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'ren', 'data.json');
const ITERATIONS = 250000;

const MIME_TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.heic': 'image/heic' };

function imageToDataUri(relPath) {
  const abs = path.join(CONTENT_DIR, relPath);
  const ext = path.extname(abs).toLowerCase();
  const mime = MIME_TYPES[ext];
  if (!mime) throw new Error('Unrecognized image type: ' + relPath);
  const bytes = fs.readFileSync(abs);
  return 'data:' + mime + ';base64,' + bytes.toString('base64');
}

function resolveImages(updates) {
  return updates.map((u) => {
    const resolved = Object.assign({}, u);
    if (u.leadImage) resolved.leadImage = imageToDataUri(u.leadImage);
    if (u.images && u.images.length) resolved.images = u.images.map(imageToDataUri);
    return resolved;
  });
}

function promptPassword() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('Ren page password (visible as you type): ', (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function scaffoldSource() {
  const dir = path.dirname(SOURCE_PATH);
  fs.mkdirSync(dir, { recursive: true });
  const template = {
    updates: [
      {
        date: '2026-09-01',
        title: 'First update',
        body: 'Write about Ren here. Blank lines start a new paragraph.'
      }
    ]
  };
  fs.writeFileSync(SOURCE_PATH, JSON.stringify(template, null, 2) + '\n');
  console.log('Created ' + SOURCE_PATH + ' with a starter template.');
  console.log('Edit it with your real updates, then run this script again.');
}

async function main() {
  if (!fs.existsSync(SOURCE_PATH)) {
    scaffoldSource();
    return;
  }

  const source = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
  if (!Array.isArray(source.updates)) {
    throw new Error('source.json must have an "updates" array.');
  }

  const password = process.env.REN_PASSWORD || (await promptPassword());
  if (!password) {
    throw new Error('No password given.');
  }

  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const plaintext = Buffer.from(JSON.stringify({ updates: resolveImages(source.updates) }), 'utf8');
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);

  const payload = {
    kdf: 'PBKDF2-SHA256',
    iterations: ITERATIONS,
    cipher: 'AES-256-GCM',
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ciphertext: ciphertext.toString('base64')
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload) + '\n');
  console.log('Wrote ' + OUTPUT_PATH + ' (' + source.updates.length + ' update(s)). Commit and push this file.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
