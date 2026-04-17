# Daily Yard Report React Project

This is the full project you can unzip to your desktop.

## What this does
- Runs your custom Daily Yard Report form
- Sends submissions into Monday board `18401951089`
- Uses a secure Netlify backend function so your token stays private

## Before you start
1. Regenerate your Monday API token if any old one was shared
2. Install Node.js on your computer if you do not already have it

## Desktop setup
1. Unzip this folder to your desktop
2. Open the folder in VS Code
3. Open a terminal in the project folder
4. Run:
   npm install
5. To test locally, run:
   npm run dev

## Netlify deploy
1. Push this project to GitHub, or deploy the project folder with Netlify
2. In Netlify, add an environment variable:
   MONDAY_API_TOKEN=your_token_here
3. Deploy the site

## Important
- The frontend sends to `/api/submit-report`
- Netlify runs `netlify/functions/submit-report.js`
- Monday items are created in board `18401951089`
- Current group id is `new_group29179`

## Current Monday field mapping
- shift = Foreman
- text = Summary line
- projectManagementNotes = Activities + notes
- startDate = selected date
