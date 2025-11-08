// Configuration constants
var SHEET_NAME = 'Projects';
var LOCK_TIMEOUT = 10000; // 10 seconds

var scriptProperties = PropertiesService.getScriptProperties();

/**
 * Initial setup function to store the active spreadsheet ID
 * Run this once when setting up the script
 * 
 * IMPORTANT: Select "initialSetup" from the function dropdown at the top
 * and click Run. DO NOT try to run "myFunction"
 */
function initialSetup() {
  try {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var spreadsheetId = activeSpreadsheet.getId();
    scriptProperties.setProperty('key', spreadsheetId);
    
    Logger.log('✅ Setup completed successfully!');
    Logger.log('Spreadsheet ID: ' + spreadsheetId);
    
    // Create the sheet with sample data
    createProjectsSheetWithSampleData();
    
    Logger.log('✅ All done! You can now deploy as Web App');
    
  } catch (error) {
    Logger.log('❌ Error during setup: ' + error.toString());
    throw error;
  }
}

/**
 * Alternative simple test function if initialSetup doesn't appear
 */
function setup() {
  initialSetup();
}

/**
 * Creates the Projects sheet with headers and sample data
 */
function createProjectsSheetWithSampleData() {
  try {
    var spreadsheetKey = scriptProperties.getProperty('key');
    if (!spreadsheetKey) {
      throw new Error('Spreadsheet key not found. Please run initialSetup() first.');
    }
    
    var doc = SpreadsheetApp.openById(spreadsheetKey);
    var sheet = doc.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      console.log('Creating new sheet: ' + SHEET_NAME);
      sheet = doc.insertSheet(SHEET_NAME);
      
      // Add headers (including new 'image' column)
      var headers = ['title', 'description', 'tech', 'category', 'iconName', 'github', 'demo', 'image', 'status'];
      sheet.appendRow(headers);
      
      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      
      // Add sample data (with image URLs)
      var sampleData = [
        [
          'E-Commerce Platform',
          'Full-featured online shopping platform with payment integration, inventory management, and admin dashboard.',
          'Java,Spring Boot,React,MySQL,Stripe',
          'Full Stack',
          'FaShoppingCart',
          'https://github.com/pavanwakade/ecommerce-platform',
          'https://demo.com',
          'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
          'active'
        ],
        [
          'Task Management System',
          'Collaborative project management tool with real-time updates, team collaboration, and progress tracking.',
          'Node.js,React,MongoDB,Socket.io',
          'Full Stack',
          'FaTasks',
          'https://github.com/pavanwakade/task-manager',
          'https://demo.com',
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
          'active'
        ],
        [
          'Social Media Dashboard',
          'Analytics dashboard for social media metrics with data visualization and automated reporting.',
          'React,TypeScript,Chart.js,REST API',
          'Frontend',
          'FaChartLine',
          'https://github.com/pavanwakade/social-dashboard',
          'https://demo.com',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
          'active'
        ],
        [
          'Banking API Service',
          'Secure RESTful API for banking operations with JWT authentication and transaction management.',
          'Java,Spring Boot,PostgreSQL,JWT',
          'Backend',
          'FaUniversity',
          'https://github.com/pavanwakade/banking-api',
          'https://demo.com',
          'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&q=80',
          'active'
        ],
        [
          'Real-Time Chat Application',
          'Instant messaging platform with group chats, file sharing, and end-to-end encryption.',
          'Node.js,Socket.io,React,MongoDB',
          'Full Stack',
          'FaComments',
          'https://github.com/pavanwakade/chat-app',
          'https://demo.com',
          'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80',
          'active'
        ],
        [
          'Weather Forecast App',
          'Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.',
          'React,Tailwind CSS,Weather API,Geolocation',
          'Frontend',
          'FaCloudSun',
          'https://github.com/pavanwakade/weather-app',
          'https://demo.com',
          'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
          'active'
        ]
      ];
      
      // Add sample data rows
      for (var i = 0; i < sampleData.length; i++) {
        sheet.appendRow(sampleData[i]);
      }
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
      
      console.log('Sheet created successfully with sample data');
    } else {
      console.log('Sheet already exists: ' + SHEET_NAME);
    }
  } catch (error) {
    console.error('Error creating projects sheet:', error.toString());
    throw error;
  }
}

/**
 * Handles GET requests to fetch all projects
 */
function doGet(e) {
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
    
    if (!sheet) {
      throw new Error('Projects sheet not found. Please run initialSetup() first.');
    }
    
    // Get all data from the sheet
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      // Only headers, no projects
      return ContentService
        .createTextOutput(JSON.stringify({ 
          result: 'success', 
          projects: [],
          message: 'No projects found'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Extract headers and data rows
    var headers = data[0];
    var projects = [];
    
    // Convert rows to objects (skip header row)
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var project = {};
      
      for (var j = 0; j < headers.length; j++) {
        var header = headers[j].toString().toLowerCase();
        project[header] = row[j] ? row[j].toString() : '';
      }
      
      // Only include active projects (if status column exists)
      if (!project.status || project.status.toLowerCase() === 'active') {
        projects.push(project);
      }
    }
    
    console.log('Successfully fetched ' + projects.length + ' projects');
    
    // Return success response with projects
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success', 
        projects: projects,
        count: projects.length,
        message: 'Projects fetched successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error fetching projects:', error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error', 
        error: error.toString(),
        message: 'Failed to fetch projects'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } finally {
    // Always release the lock
    if (lock) {
      lock.releaseLock();
    }
  }
}

/**
 * Handles POST requests to add new projects
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
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      console.log('Sheet not found. Creating new sheet: ' + SHEET_NAME);
      createProjectsSheetWithSampleData();
      sheet = doc.getSheetByName(SHEET_NAME);
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
      var headerLower = header.toString().toLowerCase();
      switch (headerLower) {
        case 'title':
          return e.parameter['title'] || '';
        case 'description':
          return e.parameter['description'] || '';
        case 'tech':
          return e.parameter['tech'] || '';
        case 'category':
          return e.parameter['category'] || 'Full Stack';
        case 'iconname':
          return e.parameter['iconName'] || 'FaCode';
        case 'github':
          return e.parameter['github'] || '';
        case 'demo':
          return e.parameter['demo'] || '';
        case 'image':
          return e.parameter['image'] || '';
        case 'status':
          return e.parameter['status'] || 'active';
        default:
          return '';
      }
    });
    
    // Add the new row to the sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    console.log('Project successfully added to row ' + nextRow);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success', 
        row: nextRow,
        message: 'Project added successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error adding project:', error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error', 
        error: error.toString(),
        message: 'Failed to add project'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } finally {
    // Always release the lock
    if (lock) {
      lock.releaseLock();
    }
  }
}

/**
 * Test function to verify the setup
 */
function testFetchProjects() {
  var result = doGet({});
  var output = result.getContent();
  console.log('Test Result:', output);
  return JSON.parse(output);
}