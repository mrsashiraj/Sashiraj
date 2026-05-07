# Sashiraj Subedi — Portfolio

Personal portfolio site for Sashiraj Subedi — Data Scientist, AI/ML practitioner, and Venture Builder based in Kathmandu, Nepal.

## File Structure

```
├── index.html          # Main HTML (markup only)
├── css/
│   └── style.css       # All styles, design tokens, responsive rules
└── js/
    ├── data.js         # Static content: projects, ventures, papers, quotes, skills
    └── main.js         # App logic: carousel, modal, admin panel, theme, clock
```

## Features

- Dark / light theme toggle with localStorage persistence
- Responsive layout with mobile drawer navigation
- Swipeable carousels (Skills, Ventures, Quotes) with drag support
- Project & paper detail modals with tabbed content
- Hidden admin panel (Ctrl+Shift+A) — add/edit/delete content stored in localStorage
- AI-powered LinkedIn post categorisation via Anthropic API
- Live Kathmandu clock
- Scroll-reveal animations
- WhatsApp contact button

## Local Development

No build step required. Open `index.html` directly in a browser, or serve with any static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

## Deployment

Works on any static host: GitHub Pages, Vercel, Netlify, Cloudflare Pages.

For **GitHub Pages**, push to a repo and enable Pages from the `main` branch root.

## Admin Panel

Press **Ctrl+Shift+A** to open the CMS. Add or edit projects, ventures, research papers, and LinkedIn posts. All data persists in the browser's `localStorage`.

> Note: The AI post-categorisation feature calls the Anthropic API directly from the browser. For production use, proxy this through a backend to keep your API key secure.
