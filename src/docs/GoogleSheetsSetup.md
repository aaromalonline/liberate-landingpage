
# Google Sheets Integration Setup Guide

Follow these steps to connect your early access form with Google Sheets:

## 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Liberate Early Access"
3. Rename the first sheet to "Early Access Registrations"
4. Add headers in the first row: Timestamp, Name, Email, Interest

## 2. Set up Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. Delete any code in the editor and paste the contents of the `googleAppScript.js` file
3. Click the **Save** button and name the project "Liberate Form Handler"

## 3. Deploy as a Web App

1. Click on **Deploy** > **New deployment**
2. Select **Web app** as the type
3. Set the following options:
   - Execute as: **Me** (your account)
   - Who has access: **Anyone** (for public form submissions)
4. Click **Deploy**
5. Copy the Web app URL that appears

## 4. Update Your React App

1. Open the `src/utils/sheetsApi.ts` file in your React app
2. Replace `YOUR_GOOGLE_SCRIPT_WEB_APP_URL` with the URL you copied
3. Save the file and rebuild your app

## Testing Your Integration

1. Fill out and submit the form on your website
2. Check your Google Sheet to confirm that the data was received
3. The spreadsheet should automatically update with new submissions

## Troubleshooting

- If submissions aren't appearing in your sheet, check the browser console for errors
- Ensure you've published the Apps Script as a web app and that the URL is correct
- If you update the Apps Script code, you'll need to create a new deployment for changes to take effect
