SV Progress Tracker

Track your Stardew Valley progress locally in your browser by dropping in your save file. No data leaves your device.

What it does

- Parses your Stardew Valley save file (XML) fully in the browser
- Shows clean, visual progress for:
	- Skills and XP toward the next level
	- Cooking recipes known and cooked counts
	- Crafting recipes made
	- Crops shipped (Monoculture/Polyculture helpers)
	- Fish caught
	- Friendship levels and heart progress for dateable NPCs
	- Monsters killed by category (Adventurer's Guild)
	- Items shipped and total money earned
	- Museum collection (artifacts and minerals) with found vs. donated
- Supports single player and farmhands; view each player via tabs

How it works (privacy-first)

- Runs entirely client-side (React + Vite); your save file is parsed with fast-xml-parser in your browser
- No uploads, no servers, no storage by default

How to use

1) Open the app: https://thecoderaccoons.github.io/svprogresstracker
2) Drag-and-drop your save file into the drop area, or click to choose the file
3) Switch between tabs to view Skills, Achievements, and more for each player/farmhand

Where to find your save file

- Windows: C:\Users\YourUser\AppData\Roaming\StardewValley\Saves\<FarmName>_########
- macOS: ~/Library/Application Support/StardewValley/Saves/<FarmName>_########
- Linux: ~/.config/StardewValley/Saves/<FarmName>_########

Note: Drop the file named the same as your farm (without the folder extension) e.g., FarmName_123456789.

Current status and roadmap

- Implemented: Skills, Cooking, Crafting, Crops, Fishing, Friendship, Monsters, Shipping, Money, Museum
- In progress / planned: Quests, Special Orders summaries, Grandpa's Evaluation view

Follow the development
- You can find news regarding the project here: <a href="https://www.thecoderaccoons.com/blog">follow development and news here</a>
- Or check the project's story here <a href="https://www.thecoderaccoons.com/projects/stardew-valley-progress-tracker-legacy">follow development and news here</a>

Tech stack

- React 19 + TypeScript, Vite 6
- fast-xml-parser for XML → JSON
- React Tabs for UI navigation

Local development

- Install dependencies: npm ci
- Run dev server: npm run dev
- Build for production: npm run build (outputs to build/)

Deployment (via GitHub Releases → GitHub Pages)

This repo deploys to GitHub Pages when a Release is published.

- Workflow file: .github/workflows/release-pages.yml
- Trigger: release published
- Build: Vite builds to build/
- Deploy: Official Pages actions publish the artifact

First-time GitHub setup

1) Push the workflow to the default branch
2) Create a Release (e.g., v1.0.0). The workflow builds and deploys
3) In Settings → Pages, set Build and deployment to GitHub Actions

Live URL

https://thecoderaccoons.github.io/svprogresstracker

Notes

- Vite base is set to /svprogresstracker/ in vite.config.js so assets resolve at the repo subpath
- A legacy npm run deploy (gh-pages) script exists, but CI via Releases is recommended

Credits

- Code: TheCodeRaccoons
- Design and non-Stardew assets: Ookamijime
- Stardew Valley assets © ConcernedApe

