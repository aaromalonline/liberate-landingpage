
/**
 * Google Sheets API integration for the early access form
 * This uses the public Google Sheets API to write to a spreadsheet
 */

// This is the URL for the Google Sheets API web app deployment
// You'll need to replace this with your own Google Apps Script web app URL after deployment
const SHEETS_API_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL";

export interface FormSubmission {
  name: string;
  email: string;
  interest: string;
  timestamp: string;
}

export async function submitToGoogleSheets(data: FormSubmission): Promise<boolean> {
  try {
    const response = await fetch(SHEETS_API_URL, {
      method: "POST",
      mode: "no-cors", // This is required for Google Apps Script web apps
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    // Due to CORS restrictions with Google Apps Script, we won't get a proper response
    // So we'll assume success if no error was thrown
    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return false;
  }
}
