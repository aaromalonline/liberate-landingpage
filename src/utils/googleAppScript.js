
// This file is not imported into your React app
// Copy this code to a new Google Apps Script project linked to your Google Sheet

function doPost(e) {
  try {
    // Get the sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Early Access Registrations");
    if (!sheet) {
      // Create the sheet if it doesn't exist
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const newSheet = ss.insertSheet("Early Access Registrations");
      
      // Set up headers
      newSheet.appendRow(["Timestamp", "Name", "Email", "Interest"]);
      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        message: "Sheet created and data added"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Append the data to the sheet
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.interest
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// This function allows GET requests for testing
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: "Google Apps Script is running"
  })).setMimeType(ContentService.MimeType.JSON);
}
