# Horváth Mária: stained glass artist site

Portfolio and contact site for Horváth Mária, a Hungarian stained-glass and Tiffany glass artist who makes custom windows for churches, homes and public buildings. Site content is in Hungarian.

Plain HTML, CSS and JavaScript with no build step, served as static assets on Cloudflare Workers.

## Run locally

Any static file server works:

```bash
npx serve .
```

## Deploy

```bash
npx wrangler deploy
```

Settings live in `wrangler.jsonc`. Unknown routes fall back to `404.html`.

## Structure

```
index.html     main page
style.css      styles
script.js      interactions
images/        artwork photos
fonts/         self-hosted fonts
404.html       not-found page
robots.txt
sitemap.xml
```
