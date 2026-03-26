# Media Assets Plan

This repo is set up so project detail pages can render three media layers without changing page code:

- `banner`: the main hero image already used on the project page
- `gallery`: in-repo screenshots rendered as a grid below the banner
- `videoDemo`: an externally hosted demo video rendered below the banner

## Source of truth

Project media lives in [`src/data/projects.json`](/Users/ahmed/Astro-portfolio/src/data/projects.json) and is validated by [`src/data/projects.ts`](/Users/ahmed/Astro-portfolio/src/data/projects.ts).

Supported fields:

```json
{
  "gallery": [
    {
      "src": "/media/projects/hia-mobile-app/gallery/home-screen.webp",
      "alt": "HIA Mobile App home screen showing airport navigation shortcuts",
      "caption": "Primary dashboard and travel shortcuts"
    }
  ],
  "videoDemo": {
    "url": "https://cdn.example.com/projects/hia-mobile-app/video/demo.mp4",
    "poster": "/media/projects/hia-mobile-app/video/poster.webp",
    "title": "HIA Mobile App walkthrough"
  }
}
```

## Where files should live

Screenshots and posters stay in the repo under `public/`:

- screenshots: `public/media/projects/<slug>/gallery/<file>`
- optional video poster: `public/media/projects/<slug>/video/poster.<ext>`

Examples:

- `public/media/projects/hia-mobile-app/gallery/home-screen.webp`
- `public/media/projects/hia-mobile-app/gallery/invitation-flow.webp`
- `public/media/projects/hia-mobile-app/video/poster.webp`

Demo videos do not live in the repo and should not be copied into `public/`.

## Video hosting

Use one external object-storage bucket for all project demo videos. Cloudflare R2 or any S3-compatible bucket is the recommended setup.

Recommended object key pattern:

```text
projects/<slug>/video/<filename>.mp4
```

Examples:

- `projects/hia-mobile-app/video/walkthrough.mp4`
- `projects/mazad-al-jomrok/video/bilingual-auction-flow.mp4`

Store the final public or CDN URL directly in `videoDemo.url`.

## Retrieval rules

- `banner` is still read from the existing `banner` field.
- `gallery` images are loaded as normal public asset paths from `projects.json`.
- `videoDemo.url` is loaded directly as the video source.
- `videoDemo.poster` is used as the `<video>` poster when present.
- If `videoDemo.poster` is omitted, the detail page falls back to the main `banner`.

## Detail-page behavior

The project detail page is already wired to this structure:

- if `videoDemo` exists, a `Video Demo` section appears below the banner
- if `gallery` exists, a `Gallery` section appears below the video section
- if neither exists, the current detail page stays unchanged

## Authoring workflow

1. Add screenshots to `public/media/projects/<slug>/gallery/`.
2. Add an optional poster image to `public/media/projects/<slug>/video/`.
3. Upload the real demo video to your external object storage.
4. Copy the public video URL into the matching `videoDemo.url` field.
5. Add `gallery` and optional `videoDemo` entries to the project object in [`src/data/projects.json`](/Users/ahmed/Astro-portfolio/src/data/projects.json).
6. Run `npm run build` to validate the JSON and page generation.

## Practical guidance

- Prefer `webp` for screenshots and posters.
- Keep gallery images compressed enough to stay fast on mobile.
- Use specific alt text that describes what the screen is showing, not just the project name.
- Keep long videos out of git; only posters and screenshots belong in this repo.
- One strong walkthrough video plus 3-6 curated screenshots is usually enough for a project page.
