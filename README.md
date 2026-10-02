# A birthday world for Swarnali

A phone-first React + TypeScript gift from Gublu, built with Vite. No backend.

## Run

```sh
npm install
npm run dev
```

## Make it yours

- Drop 10 to 20 photos in `public/photos/`, named `01.jpg`, `02.jpg`, etc.
- Edit `src/content.ts` for names, the letter, love notes, and photo captions.
- Birthday is October 23, 2026, midnight in India, with an automatic countdown.
- A soft synthesized instrumental birthday song is included and loops in the
  background. Tapping "Open my surprise" starts music and the countdown;
  the header music button pauses/resumes it. No external audio is required.
- Optionally add a song to `public/music/` to replace the built-in melody.
- Without photos, six sample Unsplash photos preview the scrapbook and viewer.
  They are automatically replaced as soon as you add your own photos.
- A surprise opening counts down 3, 2, 1 after her opening tap, with a skip button.
- Tap the love-note heart for a new reason, animated hearts, and vibration on
  supported devices. After blowing out the candle, tap again to cut the cake.
- The app includes a photo viewer, letter reveal, cycling love notes, and an
  interactive candle with confetti. Reduced-motion preferences are respected.

The default letter is a starting point: replace it with your own specific
memories, inside jokes, and a promise for the coming year before gifting.

## Deploy on Vercel

1. Push this project to a GitHub repository (exclude node_modules and dist).
2. Import that repository in Vercel and select the Vite framework preset.
3. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Future GitHub pushes rebuild the website and include new pictures.

No environment variables or backend configuration are needed. This is a public
website; a private GitHub repo does not make deployed photos private.

## Verification

```sh
npm run build
```

## Design research

Vercel supports static Vite projects directly:
https://vercel.com/docs/frameworks/frontend/vite

Motion follows reduced-motion preferences, as recommended by W3C:
https://www.w3.org/WAI/WCAG22/Techniques/css/C39

Personal touches to add: captions with actual dates and places, a favourite
song, a handwritten letter photo, and an invitation to your birthday date
inside the final letter paragraph. Keep these in the editable content file.
