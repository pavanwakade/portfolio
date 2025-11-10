// Configuration constants
var CONTACT_SHEET_NAME = 'ContactSubmissions';
var LOCK_TIMEOUT = 10000; // 10 seconds
var scriptProperties = PropertiesService.getScriptProperties();

/**
 * One-time setup:
 * Creates sheet, adds contact_headers + dummy row,
 * applies colorful formatting, freezes header,
 * and stores spreadsheet ID.
 */
function initialSetup() {
  try {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    scriptProperties.setProperty('key', activeSpreadsheet.getId());
    console.info('Spreadsheet ID stored successfully.');

    // Create or reset the "ContactSubmissions" sheet
    var sheet = activeSpreadsheet.getSheetByName(CONTACT_SHEET_NAME);
    if (sheet) {
      activeSpreadsheet.deleteSheet(sheet);
      console.info('Old sheet deleted for a clean setup.');
    }

    sheet = activeSpreadsheet.insertSheet(CONTACT_SHEET_NAME);
    console.info('Created fresh sheet: ' + CONTACT_SHEET_NAME);

    // Add contact_headers (ID added as first column)
    var contact_headers = ['ID', 'Timestamp', 'Name', 'Email', 'Subject', 'Message'];
    sheet.appendRow(contact_headers);

    // Style header row
    var headerRange = sheet.getRange(1, 1, 1, contact_headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setFontColor('#ffffff');
    headerRange.setBackground('#0077b6');
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    headerRange.setBorder(true, true, true, true, true, true, '#ffffff', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

    // Add color banding (alternating row colors)
    sheet.getRange(2, 1, sheet.getMaxRows() - 1, contact_headers.length)
      .applyRowBanding(SpreadsheetApp.BandingTheme.TEAL);

    // Auto-resize columns based on content
    for (var i = 1; i <= contact_headers.length; i++) {
      sheet.autoResizeColumn(i);
    }

    // Freeze the header row
    sheet.setFrozenRows(1);

    // Insert dummy data
    var dummyData = [1, new Date(), 'John Doe', 'john@example.com', 'Test Subject', 'This is a dummy message.'];
    sheet.appendRow(dummyData);

    // Auto-resize again to fit dummy content
    for (var i = 1; i <= contact_headers.length; i++) {
      sheet.autoResizeColumn(i);
    }

    console.info('✅ Setup completed successfully with colorful formatting and frozen header.');

  } catch (error) {
    console.error('❌ Error during setup:', error.toString());
    throw error;
  }
}

/**
 * Generate unique ID for new entries
 */
function generateId(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return 1;
  
  var lastId = sheet.getRange(lastRow, 1).getValue();
  return (typeof lastId === 'number' ? lastId : 0) + 1;
}

/**
 * Find row number by ID
 */
function findRowById(sheet, id) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      return i + 1; // +1 because array is 0-indexed
    }
  }
  return -1;
}

/**
 * Apply formatting to a row
 */
function formatRow(sheet, rowNum) {
  var numColumns = sheet.getLastColumn();
  sheet.getRange(rowNum, 1, 1, numColumns)
    .setBackground(rowNum % 2 === 0 ? '#F4F6F6' : '#FFFFFF')
    .setBorder(true, true, true, true, false, false, '#D6DBDF', SpreadsheetApp.BorderStyle.SOLID);
  
  sheet.autoResizeColumns(1, numColumns);
}

/**
 * Handles POST requests - Routes CRUD operations
 */
function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    if (!lock.tryLock(LOCK_TIMEOUT)) {
      throw new Error('Could not acquire lock within timeout period');
    }

    var spreadsheetKey = scriptProperties.getProperty('key');
    if (!spreadsheetKey) throw new Error('Spreadsheet key not found. Run initialSetup() first.');

    var doc = SpreadsheetApp.openById(spreadsheetKey);
    var sheet = doc.getSheetByName(CONTACT_SHEET_NAME);
    if (!sheet) throw new Error('Sheet not found. Run initialSetup() first.');

    // Support both 'operation' and 'action' parameters for consistency
    var operation = e.parameter['operation'] || e.parameter['action'] || 'create';
    
    // Parse JSON body if present (for update/delete operations from admin dashboard)
    var jsonData = {};
    if (e.postData && e.postData.contents) {
      try {
        jsonData = JSON.parse(e.postData.contents);
      } catch (parseError) {
        Logger.log('JSON parse warning: ' + parseError);
      }
    }
    
    var result;

    switch (operation.toLowerCase()) {
      case 'create':
        result = createRecord(sheet, e);
        result.success = result.result === 'success';
        break;
      case 'read':
        result = readRecord(sheet, e, jsonData);
        result.success = result.result === 'success';
        break;
      case 'update':
        result = updateRecord(sheet, e, jsonData);
        result.success = result.result === 'success';
        break;
      case 'delete':
        result = deleteRecord(sheet, e, jsonData);
        result.success = result.result === 'success';
        break;
      case 'list':
        result = listRecords(sheet, e);
        result.success = result.result === 'success';
        break;
      default:
        throw new Error('Invalid operation: ' + operation);
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('❌ Error: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        result: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (lock) lock.releaseLock();
  }
}

/**
 * CREATE - Add new record
 */
function createRecord(sheet, e) {
  var contact_headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var nextRow = sheet.getLastRow() + 1;
  var newId = generateId(sheet);

  var newRow = contact_headers.map(function (header) {
    var key = header.replace(/[^a-zA-Z]/g, '').toLowerCase();
    switch (key) {
      case 'id': return newId;
      case 'timestamp': return new Date();
      case 'name': return e.parameter['name'] || '';
      case 'email': return e.parameter['email'] || '';
      case 'subject': return e.parameter['subject'] || '';
      case 'message': return e.parameter['message'] || '';
      default: return '';
    }
  });

  sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
  formatRow(sheet, nextRow);

  Logger.log('✅ Created record with ID: ' + newId);
  return {
    result: 'success',
    operation: 'create',
    id: newId,
    row: nextRow,
    message: 'Record created successfully'
  };
}

/**
 * READ - Get single record by ID
 */
function readRecord(sheet, e, jsonData) {
  var id = e.parameter['id'] || (jsonData && jsonData.id);
  if (!id) throw new Error('ID parameter required for read operation');

  var rowNum = findRowById(sheet, id);
  if (rowNum === -1) {
    return {
      result: 'error',
      operation: 'read',
      message: 'Record not found with ID: ' + id
    };
  }

  var contact_headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var rowData = sheet.getRange(rowNum, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  var record = {};
  for (var i = 0; i < contact_headers.length; i++) {
    record[contact_headers[i]] = rowData[i];
  }

  Logger.log('✅ Read record ID: ' + id);
  return {
    result: 'success',
    operation: 'read',
    data: record
  };
}

/**
 * UPDATE - Modify existing record by ID
 */
function updateRecord(sheet, e, jsonData) {
  var id = e.parameter['id'] || (jsonData && jsonData.id);
  if (!id) throw new Error('ID parameter required for update operation');

  var rowNum = findRowById(sheet, id);
  if (rowNum === -1) {
    return {
      result: 'error',
      operation: 'update',
      message: 'Record not found with ID: ' + id
    };
  }

  var contact_headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var currentData = sheet.getRange(rowNum, 1, 1, sheet.getLastColumn()).getValues()[0];

  var updatedRow = contact_headers.map(function (header, index) {
    var key = header.replace(/[^a-zA-Z]/g, '').toLowerCase();
    
    // Don't allow updating ID or Timestamp
    if (key === 'id' || key === 'timestamp') {
      return currentData[index];
    }
    
    // Check both URL parameters and JSON data
    var newValue = e.parameter[key] !== undefined ? e.parameter[key] : 
                   (jsonData && jsonData[key] !== undefined ? jsonData[key] : currentData[index]);
    return newValue;
  });

  sheet.getRange(rowNum, 1, 1, updatedRow.length).setValues([updatedRow]);
  formatRow(sheet, rowNum);

  Logger.log('✅ Updated record ID: ' + id);
  return {
    result: 'success',
    operation: 'update',
    id: id,
    row: rowNum,
    message: 'Record updated successfully'
  };
}

/**
 * DELETE - Remove record by ID
 */
function deleteRecord(sheet, e, jsonData) {
  var id = e.parameter['id'] || (jsonData && jsonData.id);
  if (!id) throw new Error('ID parameter required for delete operation');

  var rowNum = findRowById(sheet, id);
  if (rowNum === -1) {
    return {
      result: 'error',
      operation: 'delete',
      message: 'Record not found with ID: ' + id
    };
  }

  sheet.deleteRow(rowNum);
  
  // Reformat remaining rows
  var lastRow = sheet.getLastRow();
  for (var i = 2; i <= lastRow; i++) {
    formatRow(sheet, i);
  }

  Logger.log('✅ Deleted record ID: ' + id);
  return {
    result: 'success',
    operation: 'delete',
    id: id,
    message: 'Record deleted successfully'
  };
}

/**
 * LIST - Get all records (with optional filtering)
 */
function listRecords(sheet, e) {
  var contact_headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return {
      result: 'success',
      operation: 'list',
      data: [],
      count: 0
    };
  }

  var data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  
  var records = data.map(function(row) {
    var record = {};
    for (var i = 0; i < contact_headers.length; i++) {
      record[contact_headers[i]] = row[i];
    }
    return record;
  });

  // Optional filtering by email or name
  var filterEmail = e.parameter['email'];
  var filterName = e.parameter['name'];
  
  if (filterEmail) {
    records = records.filter(function(r) {
      return r.Email && r.Email.toLowerCase().indexOf(filterEmail.toLowerCase()) > -1;
    });
  }
  
  if (filterName) {
    records = records.filter(function(r) {
      return r.Name && r.Name.toLowerCase().indexOf(filterName.toLowerCase()) > -1;
    });
  }

  Logger.log('✅ Listed ' + records.length + ' records');
  return {
    result: 'success',
    operation: 'list',
    data: records,
    count: records.length
  };
}

/**
 * Handles GET requests - Returns list of all records
 */
function doGet(e) {
  var lock = LockService.getScriptLock();

  try {
    if (!lock.tryLock(LOCK_TIMEOUT)) {
      throw new Error('Could not acquire lock within timeout period');
    }

    var action = e.parameter.action || 'list';
    var response;

    var spreadsheetKey = scriptProperties.getProperty('key');
    if (!spreadsheetKey) throw new Error('Spreadsheet key not found. Run initialSetup() first.');

    var doc = SpreadsheetApp.openById(spreadsheetKey);
    var sheet = doc.getSheetByName(CONTACT_SHEET_NAME);
    if (!sheet) throw new Error('Sheet not found. Run initialSetup() first.');

    switch (action) {
      case 'list':
        var listResult = listRecords(sheet, e);
        response = {
          success: true,
          contacts: listResult.data,
          count: listResult.count
        };
        break;
        
      case 'init':
        initialSetup();
        response = { success: true, message: 'Contact sheet initialized successfully' };
        break;
        
      default:
        response = { success: false, message: 'Invalid action' };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('❌ Error: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (lock) lock.releaseLock();
  }
}