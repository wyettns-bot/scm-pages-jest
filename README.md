# SCM Pages Demo

A static site (HTML/CSS/JS) that is automatically **linted, packaged and published to GitHub Pages** by a GitHub Actions workflow on every push to `main`.

Live site: `https://<your-username>.github.io/scm-pages-demo/`

## Project layout

```
.
├── .github/workflows/deploy.yml   # CI/CD pipeline: lint → package → deploy
├── public/                        # the site that gets published
│   ├── index.html
│   ├── style.css
│   └── script.js
├── eslint.config.js               # lint rules (semicolons required)
├── package.json / package-lock.json
└── PROMPTS.md                     # LLM prompts used to build this
```

## Pipeline

| Job | What it does | Runs when |
|-----|--------------|-----------|
| `lint` | `npm ci` then `npm run lint` (ESLint over `public/`) | every push to `main` |
| `test` | `npm ci` then `npm test` (Jest over `tests/`) | only if `lint` passes |
| `build` | Uploads `public/` as a Pages artifact | only if `lint` **and** `test` pass |
| `deploy` | Publishes the artifact to GitHub Pages | only if `build` passes |

Because `build` declares `needs: [lint, test]`, **a lint error or a failing test stops the pipeline and nothing is deployed.**

## Page-load function

`getVisitorGreeting(date)` in `public/script.js` runs on `DOMContentLoaded` and shows a greeting based on the time of day plus how many days are left until the weekend, e.g. *"Good morning! Happy Thursday. 2 days until the weekend."*

It is exported for Jest with a `module.exports` guard that the browser ignores. Tests live in `tests/greeting.test.js` (6 cases: morning/afternoon/evening, weekday countdown, singular "day" on Friday, weekend message).

```bash
npm test
```

## Testing the Jest gate

1. **Failing test:** in `public/script.js` change `const daysLeft = 6 - day;` to `const daysLeft = 5 - day;` and push. `lint` passes, `test` fails (2 failed, 4 passed), and `build`/`deploy` are skipped:
   ```
   Expected: "Good morning! Happy Monday. 5 days until the weekend."
   Received: "Good morning! Happy Monday. 4 days until the weekend."
   ```
2. **Passing test:** change it back to `6 - day` and push. All jobs go green and the site redeploys.

## Setup (one time)

1. Create a **public** repository on GitHub named `scm-pages-demo`.
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: static site + Pages workflow"
   git branch -M main
   git remote add origin https://github.com/<your-username>/scm-pages-demo.git
   git push -u origin main
   ```
3. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Open the **Actions** tab. If the first run failed because Pages wasn't enabled yet, click **Re-run all jobs**.
5. When the run turns green, the site URL appears on the `deploy` job.

## Run the linter locally

```bash
npm install
npm run lint
```

## Testing the quality gate (breaking a JS rule)

1. In `public/script.js` remove the semicolon from line 3:
   ```js
   let clicks = 0     // was: let clicks = 0;
   ```
2. Commit and push:
   ```bash
   git commit -am "Test: remove required semicolon"
   git push
   ```
3. In **Actions**, the `lint` job fails with:
   ```
   public/script.js
     3:15  error  Missing semicolon  semi
   ✖ 1 problem (1 error, 0 warnings)
   ```
   `build` and `deploy` are **skipped**, so the live site is unchanged.
4. Restore the semicolon, commit and push again (`git commit -am "Fix: restore semicolon"`). All three jobs go green and the site redeploys.

Screenshots of the failed and fixed runs are a good addition to the submission.
