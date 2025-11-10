// ============================================
// GOOGLE APPS SCRIPT - TECHNOLOGIES API ONLY
// Deploy as Web App for full CRUD operations
// ============================================

// Configuration
const SHEET_NAMET = 'Technologies';
const HEADERST = ['name', 'category', 'icon', 'color', 'id', 'createdAt', 'updatedAt'];

// Dummy Technologies Data
const DUMMY_TECHNOLOGIES = [
  { name: 'Java', category: 'Backend', icon: 'FaJava', color: '#007396' },
  { name: 'Spring Boot', category: 'Backend', icon: 'FaLeaf', color: '#6DB33F' },
  { name: 'React', category: 'Frontend', icon: 'FaReact', color: '#61DAFB' },
  { name: 'Node.js', category: 'Backend', icon: 'FaNodeJs', color: '#339933' },
  { name: 'TypeScript', category: 'Frontend', icon: 'SiTypescript', color: '#3178C6' },
  { name: 'MySQL', category: 'Database', icon: 'FaDatabase', color: '#4479A1' },
  { name: 'PostgreSQL', category: 'Database', icon: 'FaDatabase', color: '#336791' },
  { name: 'MongoDB', category: 'Database', icon: 'SiMongodb', color: '#47A248' },
  { name: 'Docker', category: 'DevOps', icon: 'FaDocker', color: '#2496ED' },
  { name: 'Kubernetes', category: 'DevOps', icon: 'SiKubernetes', color: '#326CE5' },
  { name: 'AWS', category: 'Cloud', icon: 'FaAws', color: '#FF9900' },
  { name: 'Git', category: 'Tools', icon: 'FaGitAlt', color: '#F05032' }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function generateId() {
  return 'tech_' + Utilities.getUuid().substring(0, 8);
}

function getTimestamp() {
  return new Date().toISOString();
}

// ============================================
// SHEET INITIALIZATION
// ============================================

function initializeSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMET);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMET);
    
    // Add HEADERST with formatting
    const headerRange = sheet.getRange(1, 1, 1, HEADERST.length);
    headerRange.setValues([HEADERST]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('#FFFFFF');
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Auto-resize columns
    for (let i = 1; i <= HEADERST.length; i++) {
      sheet.autoResizeColumn(i);
    }
    
    Logger.log('Technologies sheet created successfully');
    addDummyTechnologies();
  }
  
  return sheet;
}

function addDummyTechnologies() {
  DUMMY_TECHNOLOGIES.forEach(tech => {
    createTechnology(tech);
  });
  Logger.log('Dummy technologies added successfully');
}

// ============================================
// CRUD OPERATIONS
// ============================================

function createTechnology(techData) {
  const sheet = initializeSheet();
  const id = generateId();
  const timestamp = getTimestamp();
  
  const row = [
    techData.name || '',
    techData.category || 'Other',
    techData.icon || 'FaCode',
    techData.color || '#4285F4',
    id,
    timestamp,
    timestamp
  ];
  
  sheet.appendRow(row);
  return { success: true, id: id, message: 'Technology created successfully' };
}

function getAllTechnologies() {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return [];
  }
  
  const technologies = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue;
    
    const tech = {
      name: row[0] || '',
      category: row[1] || '',
      icon: row[2] || 'FaCode',
      color: row[3] || '#4285F4',
      id: row[4] || '',
      createdAt: row[5] || '',
      updatedAt: row[6] || ''
    };
    
    technologies.push(tech);
  }
  
  return technologies;
}

function getTechnologyById(id) {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][4] === id) {
      return {
        name: data[i][0],
        category: data[i][1],
        icon: data[i][2],
        color: data[i][3],
        id: data[i][4],
        createdAt: data[i][5],
        updatedAt: data[i][6]
      };
    }
  }
  
  return null;
}

function updateTechnology(id, techData) {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][4] === id) {
      const row = i + 1;
      
      if (techData.name !== undefined) sheet.getRange(row, 1).setValue(techData.name);
      if (techData.category !== undefined) sheet.getRange(row, 2).setValue(techData.category);
      if (techData.icon !== undefined) sheet.getRange(row, 3).setValue(techData.icon);
      if (techData.color !== undefined) sheet.getRange(row, 4).setValue(techData.color);
      
      sheet.getRange(row, 7).setValue(getTimestamp());
      
      return { success: true, message: 'Technology updated successfully' };
    }
  }
  
  return { success: false, message: 'Technology not found' };
}

function deleteTechnology(id) {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][4] === id) {
      sheet.deleteRow(i + 1);
      return { success: true, message: 'Technology deleted successfully' };
    }
  }
  
  return { success: false, message: 'Technology not found' };
}

// ============================================
// API ENDPOINTS (doGet & doPost)
// ============================================

function doGet(e) {
  try {
    const action = e.parameter.action || 'list';
    const id = e.parameter.id;
    
    let response;
    
    switch (action) {
      case 'list':
        response = {
          success: true,
          technologies: getAllTechnologies()
        };
        break;
        
      case 'get':
        if (!id) {
          response = { success: false, message: 'ID parameter required' };
        } else {
          const tech = getTechnologyById(id);
          response = tech 
            ? { success: true, technology: tech }
            : { success: false, message: 'Technology not found' };
        }
        break;
        
      case 'init':
        initializeSheet();
        response = { success: true, message: 'Sheet initialized successfully' };
        break;
        
      default:
        response = { success: false, message: 'Invalid action' };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const action = e.parameter.action;
    
    if (!action) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Action parameter is required'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = JSON.parse(e.postData.contents);
    
    let response;
    
    switch (action) {
      case 'create':
        response = createTechnology(data);
        break;
        
      case 'update':
        if (!data.id) {
          response = { success: false, message: 'ID required for update' };
        } else {
          response = updateTechnology(data.id, data);
        }
        break;
        
      case 'delete':
        if (!data.id) {
          response = { success: false, message: 'ID required for delete' };
        } else {
          response = deleteTechnology(data.id);
        }
        break;
        
      case 'addDummy':
        addDummyTechnologies();
        response = { success: true, message: 'Dummy data added' };
        break;
        
      default:
        response = { success: false, message: 'Invalid action' };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// QUICK SETUP FUNCTION - RUN THIS FIRST!
// ============================================

function quickSetup() {
  Logger.log('=================================');
  Logger.log('   STARTING TECHNOLOGIES SETUP');
  Logger.log('=================================\n');
  
  Logger.log('Step 1: Initializing sheet...');
  const sheet = initializeSheet();
  Logger.log('✓ Sheet initialized successfully\n');
  
  Logger.log('Step 2: Checking existing data...');
  let technologies = getAllTechnologies();
  Logger.log('✓ Found ' + technologies.length + ' existing technologies\n');
  
  if (technologies.length === 0) {
    Logger.log('Step 3: Adding dummy technologies...');
    addDummyTechnologies();
    technologies = getAllTechnologies();
    Logger.log('✓ Added ' + technologies.length + ' dummy technologies\n');
  } else {
    Logger.log('Step 3: Dummy data already exists, skipping...\n');
  }
  
  Logger.log('=================================');
  Logger.log('   SETUP COMPLETE!');
  Logger.log('=================================');
  Logger.log('✓ Sheet Name: ' + SHEET_NAMET);
  Logger.log('✓ Total Technologies: ' + getAllTechnologies().length);
  Logger.log('\nNext Step: Deploy as Web App!');
  Logger.log('Go to: Deploy > New deployment');
  Logger.log('=================================\n');
}
