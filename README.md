# REP RAMPAGE

A dark-fantasy fitness RPG designed as an installable Progressive Web App (PWA). Open it in Safari and add it to your iPhone Home Screen.

## Build status
- [x] Game direction and core design established
- [x] GitHub repository created
- [x] First mobile UI prototype
- [x] PWA app shell, manifest, icon, and offline shell caching
- [x] Basic navigation, local progress, training log, and quest interaction
- [x] GitHub Pages deployment workflow
- [ ] Enable GitHub Pages with GitHub Actions in repository settings
- [ ] Test the deployed app on iPhone Safari
- [ ] Improve app icon assets for iOS
- [ ] Add camera-based pose tracking and reliable rep detection
- [ ] Add account sync and privacy-conscious leaderboards

## Tech direction
- App: HTML, CSS, and JavaScript PWA
- Hosting: GitHub Pages
- Install: Safari → Share → Add to Home Screen
- Data: local browser storage for this prototype
- Source control: this GitHub repository

## Deploying
The workflow at `.github/workflows/deploy.yml` deploys the repository to GitHub Pages whenever changes are pushed to `main`.

In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. Then open the **Actions** tab and check the deployment workflow. Once it succeeds, the site will be available at:

https://feivelizsigma.github.io/rep-rampage/

## Current prototype
The current version includes:
- Home, Battle, Training, Hero, and Progress screens
- A manual training log (camera-based rep detection is not connected yet)
- Local XP, coins, levels, quest completion, and training history
- Responsive dark-fantasy styling
- Basic offline caching after the first successful visit

## Safety and privacy
Training is intended to be steady and age-appropriate, not a race to accumulate reps. Stop if you feel pain, dizziness, or unusual discomfort. Rest and recovery are part of progress. Boss progress can span multiple sessions.

Camera features are not active in this prototype. When introduced, camera access will require permission and workout video should not be uploaded by default.