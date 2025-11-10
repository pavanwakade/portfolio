// ============================================
// GOOGLE APPS SCRIPT - SKILLS API ONLY
// Deploy as Web App for full CRUD operations
// ============================================

// Configuration
const SHEET_NAME = 'Skills';
const HEADERS = ['name', 'level', 'percentage', 'icon', 'color', 'id', 'createdAt', 'updatedAt'];

// Dummy Skills Data
const DUMMY_SKILLS = [
  { name: 'Java', level: 'Expert', percentage: 90, icon: 'FaJava', color: '#007396' },
  { name: 'Spring Boot', level: 'Expert', percentage: 88, icon: 'FaLeaf', color: '#6DB33F' },
  { name: 'React', level: 'Advanced', percentage: 85, icon: 'FaReact', color: '#61DAFB' },
  { name: 'Node.js', level: 'Advanced', percentage: 82, icon: 'FaNodeJs', color: '#339933' },
  { name: 'JavaScript', level: 'Expert', percentage: 90, icon: 'FaJs', color: '#F7DF1E' },
  { name: 'MySQL', level: 'Advanced', percentage: 85, icon: 'FaDatabase', color: '#4479A1' },
  { name: 'PostgreSQL', level: 'Advanced', percentage: 80, icon: 'FaDatabase', color: '#336791' },
  { name: 'MongoDB', level: 'Intermediate', percentage: 75, icon: 'FaDatabase', color: '#47A248' },
  { name: 'Docker', level: 'Advanced', percentage: 78, icon: 'FaDocker', color: '#2496ED' },
  { name: 'Git', level: 'Expert', percentage: 92, icon: 'FaGitAlt', color: '#F05032' },
  { name: 'REST APIs', level: 'Expert', percentage: 88, icon: 'FaServer', color: '#FF6C37' },
  { name: 'AWS', level: 'Intermediate', percentage: 70, icon: 'FaAws', color: '#FF9900' }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function generateId() {
  return 'skill_' + Utilities.getUuid().substring(0, 8);
}

function getTimestamp() {
  return new Date().toISOString();
}

// Get or create the spreadsheet
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

// ============================================
// SHEET INITIALIZATION
// ============================================

function initializeSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    
    // Add headers with formatting
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('#FFFFFF');
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Auto-resize columns
    for (let i = 1; i <= HEADERS.length; i++) {
      sheet.autoResizeColumn(i);
    }
    
    Logger.log('Skills sheet created successfully');
    addDummySkills();
  }
  
  return sheet;
}

function addDummySkills() {
  DUMMY_SKILLS.forEach(skill => {
    createSkill(skill);
  });
  Logger.log('Dummy skills added successfully');
}

// ============================================
// CRUD OPERATIONS
// ============================================

function createSkill(skillData) {
  const sheet = initializeSheet();
  const id = generateId();
  const timestamp = getTimestamp();
  
  const row = [
    skillData.name || '',
    skillData.level || 'Beginner',
    skillData.percentage || 0,
    skillData.icon || 'FaCode',
    skillData.color || '#4285F4',
    id,
    timestamp,
    timestamp
  ];
  
  sheet.appendRow(row);
  return { success: true, id: id, message: 'Skill created successfully' };
}

function getAllSkills() {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return [];
  }
  
  const skills = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue;
    
    const skill = {
      name: row[0] || '',
      level: row[1] || '',
      percentage: row[2] || 0,
      icon: row[3] || 'FaCode',
      color: row[4] || '#4285F4',
      id: row[5] || '',
      createdAt: row[6] || '',
      updatedAt: row[7] || ''
    };
    
    skills.push(skill);
  }
  
  return skills;
}

function getSkillById(id) {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][5] === id) {
      return {
        name: data[i][0],
        level: data[i][1],
        percentage: data[i][2],
        icon: data[i][3],
        color: data[i][4],
        id: data[i][5],
        createdAt: data[i][6],
        updatedAt: data[i][7]
      };
    }
  }
  
  return null;
}

function updateSkill(id, skillData) {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][5] === id) {
      const row = i + 1;
      
      if (skillData.name !== undefined) sheet.getRange(row, 1).setValue(skillData.name);
      if (skillData.level !== undefined) sheet.getRange(row, 2).setValue(skillData.level);
      if (skillData.percentage !== undefined) sheet.getRange(row, 3).setValue(skillData.percentage);
      if (skillData.icon !== undefined) sheet.getRange(row, 4).setValue(skillData.icon);
      if (skillData.color !== undefined) sheet.getRange(row, 5).setValue(skillData.color);
      
      sheet.getRange(row, 8).setValue(getTimestamp());
      
      return { success: true, message: 'Skill updated successfully' };
    }
  }
  
  return { success: false, message: 'Skill not found' };
}

function deleteSkill(id) {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][5] === id) {
      sheet.deleteRow(i + 1);
      return { success: true, message: 'Skill deleted successfully' };
    }
  }
  
  return { success: false, message: 'Skill not found' };
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
          skills: getAllSkills()
        };
        break;
        
      case 'get':
        if (!id) {
          response = { success: false, message: 'ID parameter required' };
        } else {
          const skill = getSkillById(id);
          response = skill 
            ? { success: true, skill: skill }
            : { success: false, message: 'Skill not found' };
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
        response = createSkill(data);
        break;
        
      case 'update':
        if (!data.id) {
          response = { success: false, message: 'ID required for update' };
        } else {
          response = updateSkill(data.id, data);
        }
        break;
        
      case 'delete':
        if (!data.id) {
          response = { success: false, message: 'ID required for delete' };
        } else {
          response = deleteSkill(data.id);
        }
        break;
        
      case 'addDummy':
        addDummySkills();
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
  Logger.log('   STARTING SKILLS SETUP');
  Logger.log('=================================\n');
  
  Logger.log('Step 1: Initializing sheet...');
  const sheet = initializeSheet();
  Logger.log('✓ Sheet initialized successfully\n');
  
  Logger.log('Step 2: Checking existing data...');
  let skills = getAllSkills();
  Logger.log('✓ Found ' + skills.length + ' existing skills\n');
  
  if (skills.length === 0) {
    Logger.log('Step 3: Adding dummy skills...');
    addDummySkills();
    skills = getAllSkills();
    Logger.log('✓ Added ' + skills.length + ' dummy skills\n');
  } else {
    Logger.log('Step 3: Dummy data already exists, skipping...\n');
  }
  
  Logger.log('=================================');
  Logger.log('   SETUP COMPLETE!');
  Logger.log('=================================');
  Logger.log('✓ Sheet Name: ' + SHEET_NAME);
  Logger.log('✓ Total Skills: ' + getAllSkills().length);
  Logger.log('\nNext Step: Deploy as Web App!');
  Logger.log('Go to: Deploy > New deployment');
  Logger.log('=================================\n');
}
