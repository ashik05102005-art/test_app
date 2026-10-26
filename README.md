# TestMaster

A responsive, beginner-friendly software testing learning app built with React. Lessons, quizzes, and exercises are bundled locally; learning progress and quiz results are saved in this browser's localStorage.

## Run locally

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build, run:

```bash
npm run build
npm run preview
```

## Deploy on Vercel

This is a static Vite single-page app. Vercel will detect Vite automatically; use these project settings if it asks:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

The root `vercel.json` rewrites app routes such as `/topic/m1-t1` and `/quiz/module-1` to the SPA entry point, so opening or refreshing a deep link works after deployment.

To deploy from the Vercel dashboard, push this project to a Git provider, then choose **Add New → Project**, import that repository, confirm the settings above, and select **Deploy**. For a CLI deployment, run `npx vercel` from this folder, follow the prompts to sign in and link the project, then run `npx vercel --prod` when you are ready to publish to production.

## Learning path

The app contains 15 modules and 129 lessons, with a quiz for each module and seven hands-on practice exercises. Progress can be reviewed from **My progress** and reset from that page.

## Routes

- `/` and `/dashboard` — dashboard
- `/roadmap` — all modules and searchable topics
- `/module/:moduleId` — module lessons and quiz
- `/topic/:topicId` — lesson content and completion
- `/quiz/:moduleId` — module quiz
- `/practice` — practice lab
- `/progress` — saved learning progress
