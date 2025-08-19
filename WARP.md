# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Overview

This is a Jekyll-based personal portfolio website for Satoe Sakuma, hosted on GitHub Pages. The site showcases professional experience, portfolio projects, and includes a tech blog section.

## Development Commands

### Local Development
```bash
# Install Jekyll (if not already installed)
gem install bundler jekyll

# Serve the site locally (typically runs on http://localhost:4000)
jekyll serve
# or with live reload:
jekyll serve --livereload
```

### Node.js Dependencies
```bash
# Install Node dependencies (for Tailwind CSS build process)
npm install

# Build CSS with Tailwind (if making Tailwind changes)
npx tailwindcss build -i ./style.css -o ./dist/style.css
```

### Deployment
The site automatically deploys to GitHub Pages when changes are pushed to the main branch. No manual deployment commands needed.

## Site Architecture

### Jekyll Structure
- `_config.yml` - Main Jekyll configuration file with site settings
- `_layouts/default.html` - Primary layout template that includes all page sections
- `_includes/` - Reusable HTML components (header, about, portfolio, modals, etc.)
- `_data/template.yml` - Configuration for colors and fonts used throughout the site
- `_posts/` - Portfolio project entries in Markdown format
- `_plugins/hex_to_rgb.rb` - Custom Jekyll plugin for color conversion

### Content Management
- **Portfolio Projects**: Add new projects as Markdown files in `_posts/` with front matter including title, subtitle, modal-id, date, img, thumbnail, and description
- **About Section**: Career timeline is hardcoded in `_includes/about.html`
- **Tech Blog**: Separate section at `/tech-blog/` that also uses the same `_posts/` collection
- **Styling**: Color scheme and fonts configured in `_data/template.yml`

### Key Components
- **Timeline**: Professional experience displayed as an interactive timeline
- **Portfolio Grid**: Dynamic grid of projects populated from `_posts/` collection
- **Modals**: Project details shown in Bootstrap modals
- **Responsive Design**: Built with Bootstrap for mobile-first responsive layout

### Asset Structure
- `img/` - Static images including portfolio thumbnails and about section photos
- `js/` - JavaScript files including Bootstrap, jQuery, and custom agency theme scripts
- `css/` and `_includes/css/` - Stylesheets including Bootstrap and custom agency theme
- `style.css` - Main stylesheet file

### URL Structure
- Root (`/`) - Main portfolio page with all sections
- `/tech-blog/` - Blog listing page
- Individual posts follow permalink pattern: `/tech-blog/:year/:month/:day/:title`

## Working with Content

### Adding Portfolio Projects
1. Create new Markdown file in `_posts/` with date prefix (YYYY-MM-DD-project-name.markdown)
2. Include required front matter: title, subtitle, layout, modal-id, date, img, thumbnail, description
3. Add corresponding images to `img/portfolio/` directory
4. The project will automatically appear in both the main portfolio grid and tech blog

### Modifying Design
- Colors and fonts: Edit `_data/template.yml`
- Layout changes: Modify files in `_includes/` directory
- CSS customizations: Edit `style.css` or files in `_includes/css/`
- The site uses a customized Bootstrap Agency theme

### Image Management
- Portfolio thumbnails should be placed in `img/portfolio/`
- Full-size project images in `img/portfolio/`
- About section timeline images in `img/about/`
- Optimize images for web to ensure fast loading

## Development Notes

- The site uses Jekyll's built-in Sass processing
- Bootstrap and jQuery are included for responsive design and interactions
- Font Awesome icons are used throughout the site
- Custom JavaScript handles smooth scrolling and modal interactions
- Tailwind CSS is configured but appears to be a recent addition alongside the existing Bootstrap setup
