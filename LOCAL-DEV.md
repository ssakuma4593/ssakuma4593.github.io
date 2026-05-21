# Local preview

`jekyll` is not installed globally on your Mac by default. Use **Bundler** with **Homebrew Ruby**.

## One-time setup

### 1. Install Ruby (if needed)

```bash
brew install ruby
```

First install can take 15–30 minutes (Homebrew builds dependencies).

### 2. Use Homebrew Ruby in your shell

Intel Mac:

```bash
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Apple Silicon:

```bash
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Verify:

```bash
ruby --version   # should show 3.x or 4.x, not 2.6.10
```

### 3. Install gems for this repo

```bash
cd /Users/ssakuma/ssakuma4593.github.io
gem install bundler
bundle install
```

## Run the site

```bash
bundle exec jekyll serve
```

Or:

```bash
chmod +x bin/serve
./bin/serve
```

Open http://localhost:4000

## Common mistakes

| Command | Problem |
|---------|---------|
| `jekyll serve` | Jekyll not on PATH — use `bundle exec jekyll serve` |
| System Ruby 2.6 | Native gems fail to compile — use Homebrew Ruby |

## Preview without Jekyll

Push to GitHub and wait for Pages to deploy, or open the design reference:

`~/Downloads/design_handoff_personal_site/Personal Site.html`
