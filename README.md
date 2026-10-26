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
