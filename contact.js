// Configuration constants
var SHEET_NAME = 'ContactSubmissions';
var LOCK_TIMEOUT = 10000; // 10 seconds

var scriptProperties = PropertiesService.getScriptProperties();

/**
 * Initial setup function to store the active spreadsheet ID
 * Run this once when setting up the script
 */
function initialSetup() {
  try {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    scriptProperties.setProperty('key', activeSpreadsheet.getId());
    console.log('Setup completed successfully. Spreadsheet ID stored.');
  } catch (error) {
    console.error('Error during initial setup:', error.toString());
    throw error;
  }
}

/**
 * Handles POST requests from contact form submissions
 * Automatically creates sheet if it doesn't exist
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  
  try {
    // Acquire lock to prevent concurrent executions
    if (!lock.tryLock(LOCK_TIMEOUT)) {
      throw new Error('Could not acquire lock within timeout period');
    }
    
    // Validate that we have the spreadsheet key
    var spreadsheetKey = scriptProperties.getProperty('key');
    if (!spreadsheetKey) {
      throw new Error('Spreadsheet key not found. Please run initialSetup() first.');
    }
    
    // Open the spreadsheet
    var doc = SpreadsheetApp.openById(spreadsheetKey);
    var sheet = doc.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist (automatic sheet creation)
    if (!sheet) {
      console.log('Sheet not found. Creating new sheet: ' + SHEET_NAME);
      sheet = doc.insertSheet(SHEET_NAME);
      
      // Add headers to the new sheet
      var headers = ['timestamp', 'name', 'email', 'subject', 'message'];
      sheet.appendRow(headers);
      
      // Optional: Format the header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f0f0f0');
      
      console.log('Sheet created successfully with headers');
    }
    
    // Get current headers and next available row
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    
    // Validate required parameters
    if (!e.parameter) {
      throw new Error('No parameters received');
    }
    
    // Map form data to spreadsheet columns
    var newRow = headers.map(function(header) {
      switch (header.toLowerCase()) {
        case 'timestamp':
          return new Date();
        case 'name':
          return e.parameter['name'] || '';
        case 'email':
          return e.parameter['email'] || '';
        case 'subject':
          return e.parameter['subject'] || '';
        case 'message':
          return e.parameter['message'] || '';
        default:
          return '';
      }
    });
    
    // Add the new row to the sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    console.log('Data successfully added to row ' + nextRow);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success', 
        row: nextRow,
        message: 'Contact form submission saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error', 
        error: error.toString(),
        message: 'Failed to save contact form submission'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } finally {
    // Always release the lock
    if (lock) {
      lock.releaseLock();
    }
  }
}