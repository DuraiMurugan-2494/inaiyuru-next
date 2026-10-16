# Inaiyuru — new design direction

A fresh, editorial and kinetic design direction for Inaiyuru. This is intentionally different from the previous dark-green / cinematic theme: warm paper, cobalt blue, acid yellow, and punch-pink, with oversized typography, art-directed template previews, asymmetrical layouts, and lively micro-interactions.

## Tech stack

- React 19.3
- TypeScript
- Vite 8
- Tailwind CSS 4 (Vite plugin)
- Motion for React
- Lucide React icons

Versions are declared in `package.json`. Check current package compatibility before production deployment.

## Run locally

Requires a current Node.js release supported by Vite 8.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Inquiry email

The inquiry form submits to FormSubmit's AJAX endpoint for `duraiucevit@gmail.com`. FormSubmit may require a one-time email confirmation before first delivery. If the AJAX request fails, the page opens a prefilled `mailto:` draft as a fallback. Test delivery before launch.

## Before production

- Confirm FormSubmit email activation and test real delivery.
- Add privacy policy and terms suitable for the business.
- Replace sample template concepts with actual selectable/production templates as those are built.
- Add analytics only with an appropriate privacy notice and consent strategy.
- Deploy only after the design is approved.

No GitHub repository was changed by generating this project.
