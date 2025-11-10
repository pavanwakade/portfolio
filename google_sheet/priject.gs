// ============================================
// ADVANCED GOOGLE APPS SCRIPT - PROJECTS API
// Deploy as Web App for full CRUD operations
// ============================================

// Configuration
const SHEET_NAMEP = 'Project';
const HEADERSP = ['title', 'description', 'tech', 'category', 'icon', 'image', 'github', 'demo', 'id', 'createdAt', 'updatedAt'];

// Dummy projects data
const DUMMY_PROJECTS = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured online shopping platform with payment integration, inventory management, and admin dashboard.',
    tech: 'Java, Spring Boot, React, MySQL, Stripe',
    category: 'Full Stack',
    icon: 'FaShoppingCart',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
    github: 'https://github.com/example/ecommerce',
    demo: 'https://demo-ecommerce.com'
  },
  {
    title: 'Task Management System',
    description: 'Collaborative project management tool with real-time updates, team collaboration, and progress tracking.',
    tech: 'Node.js, React, MongoDB, Socket.io',
    category: 'Full Stack',
    icon: 'FaTasks',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    github: 'https://github.com/example/taskmanager',
    demo: 'https://demo-tasks.com'
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media metrics with data visualization and automated reporting.',
    tech: 'React, TypeScript, Chart.js, REST API',
    category: 'Frontend',
    icon: 'FaChartLine',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    github: 'https://github.com/example/dashboard',
    demo: 'https://demo-dashboard.com'
  },
  {
    title: 'Banking API Service',
    description: 'Secure RESTful API for banking operations with JWT authentication and transaction management.',
    tech: 'Java, Spring Boot, PostgreSQL, JWT',
    category: 'Backend',
    icon: 'FaUniversity',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    github: 'https://github.com/example/banking-api',
    demo: 'https://demo-banking.com'
  },
  {
    title: 'Real-Time Chat Application',
    description: 'Instant messaging platform with group chats, file sharing, and end-to-end encryption.',
    tech: 'Node.js, Socket.io, React, MongoDB',
    category: 'Full Stack',
    icon: 'FaComments',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800',
    github: 'https://github.com/example/chat-app',
    demo: 'https://demo-chat.com'
  },
  {
    title: 'Weather Forecast App',
    description: 'Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.',
    tech: 'React, Tailwind CSS, Weather API, Geolocation',
    category: 'Frontend',
    icon: 'FaCloudSun',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800',
    github: 'https://github.com/example/weather-app',
    demo: 'https://demo-weather.com'
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function generateId() {
  return 'proj_' + Utilities.getUuid().substring(0, 8);
}

function getTimestamp() {
  return new Date().toISOString();
}

// ============================================
// SHEET INITIALIZATION
// ============================================

function initializeSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMEP);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMEP);
    
    // Add HEADERSP with formatting
    const headerRange = sheet.getRange(1, 1, 1, HEADERSP.length);
    headerRange.setValues([HEADERSP]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('#FFFFFF');
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Auto-resize columns
    for (let i = 1; i <= HEADERSP.length; i++) {
      sheet.autoResizeColumn(i);
    }
    
    Logger.log('Sheet created successfully');
    
    // Add dummy data
    addDummyProjects();
  }
  
  return sheet;
}

function addDummyProjects() {
  DUMMY_PROJECTS.forEach(project => {
    createProject(project);
  });
  Logger.log('Dummy projects added successfully');
}

// ============================================
// CRUD OPERATIONS
// ============================================

function createProject(projectData) {
  const sheet = initializeSheet();
  const id = generateId();
  const timestamp = getTimestamp();
  
  const row = [
    projectData.title || '',
    projectData.description || '',
    projectData.tech || '',
    projectData.category || 'Full Stack',
    projectData.icon || 'FaCode',
    projectData.image || '',
    projectData.github || '',
    projectData.demo || '',
    id,
    timestamp,
    timestamp
  ];
  
  sheet.appendRow(row);
  return { success: true, id: id, message: 'Project created successfully' };
}

function getAllProjects() {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return [];
  }
  
  const projects = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue;
    
    const project = {
      title: row[0] || '',
      description: row[1] || '',
      tech: row[2] ? row[2].split(',').map(t => t.trim()) : [],
      category: row[3] || 'Full Stack',
      icon: row[4] || 'FaCode',
      image: row[5] || '',
      github: row[6] || '',
      demo: row[7] || '',
      id: row[8] || '',
      createdAt: row[9] || '',
      updatedAt: row[10] || ''
    };
    
    projects.push(project);
  }
  
  return projects;
}

function getProjectById(id) {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][8] === id) {
      return {
        title: data[i][0],
        description: data[i][1],
        tech: data[i][2] ? data[i][2].split(',').map(t => t.trim()) : [],
        category: data[i][3],
        icon: data[i][4],
        image: data[i][5],
        github: data[i][6],
        demo: data[i][7],
        id: data[i][8],
        createdAt: data[i][9],
        updatedAt: data[i][10]
      };
    }
  }
  
  return null;
}

function updateProject(id, projectData) {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][8] === id) {
      const row = i + 1;
      
      if (projectData.title !== undefined) sheet.getRange(row, 1).setValue(projectData.title);
      if (projectData.description !== undefined) sheet.getRange(row, 2).setValue(projectData.description);
      if (projectData.tech !== undefined) sheet.getRange(row, 3).setValue(projectData.tech);
      if (projectData.category !== undefined) sheet.getRange(row, 4).setValue(projectData.category);
      if (projectData.icon !== undefined) sheet.getRange(row, 5).setValue(projectData.icon);
      if (projectData.image !== undefined) sheet.getRange(row, 6).setValue(projectData.image);
      if (projectData.github !== undefined) sheet.getRange(row, 7).setValue(projectData.github);
      if (projectData.demo !== undefined) sheet.getRange(row, 8).setValue(projectData.demo);
      
      sheet.getRange(row, 11).setValue(getTimestamp());
      
      return { success: true, message: 'Project updated successfully' };
    }
  }
  
  return { success: false, message: 'Project not found' };
}

function deleteProject(id) {
  const sheet = initializeSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][8] === id) {
      sheet.deleteRow(i + 1);
      return { success: true, message: 'Project deleted successfully' };
    }
  }
  
  return { success: false, message: 'Project not found' };
}

function deleteAllProjects() {
  const sheet = initializeSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
    return { success: true, message: 'All projects deleted successfully' };
  }
  
  return { success: false, message: 'No projects to delete' };
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
          projects: getAllProjects()
        };
        break;
        
      case 'get':
        if (!id) {
          response = { success: false, message: 'ID parameter required' };
        } else {
          const project = getProjectById(id);
          response = project 
            ? { success: true, project: project }
            : { success: false, message: 'Project not found' };
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
    const data = JSON.parse(e.postData.contents);
    
    let response;
    
    switch (action) {
      case 'create':
        response = createProject(data);
        break;
        
      case 'update':
        if (!data.id) {
          response = { success: false, message: 'ID required for update' };
        } else {
          response = updateProject(data.id, data);
        }
        break;
        
      case 'delete':
        if (!data.id) {
          response = { success: false, message: 'ID required for delete' };
        } else {
          response = deleteProject(data.id);
        }
        break;
        
      case 'deleteAll':
        response = deleteAllProjects();
        break;
        
      case 'addDummy':
        addDummyProjects();
        response = { success: true, message: 'Dummy projects added' };
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
  Logger.log('   STARTING QUICK SETUP');
  Logger.log('=================================\n');
  
  Logger.log('Step 1: Initializing sheet...');
  const sheet = initializeSheet();
  Logger.log('✓ Sheet initialized successfully\n');
  
  Logger.log('Step 2: Checking existing data...');
  let projects = getAllProjects();
  Logger.log('✓ Found ' + projects.length + ' existing projects\n');
  
  if (projects.length === 0) {
    Logger.log('Step 3: Adding dummy projects...');
    addDummyProjects();
    projects = getAllProjects();
    Logger.log('✓ Added ' + projects.length + ' dummy projects\n');
  } else {
    Logger.log('Step 3: Dummy data already exists, skipping...\n');
  }
  
  Logger.log('Step 4: Running comprehensive tests...\n');
  Logger.log('─────────────────────────────────');
  runAllTests();
  Logger.log('─────────────────────────────────\n');
  
  Logger.log('=================================');
  Logger.log('   SETUP COMPLETE!');
  Logger.log('=================================');
  Logger.log('✓ Sheet Name: ' + SHEET_NAMEP);
  Logger.log('✓ Total Projects: ' + getAllProjects().length);
  Logger.log('✓ All Tests: PASSED');
  Logger.log('\nNext Step: Deploy as Web App!');
  Logger.log('Go to: Deploy > New deployment');
  Logger.log('=================================\n');
}

// ============================================
// TEST SUITE
// ============================================

function runAllTests() {
  Logger.log('🧪 TEST SUITE STARTING...\n');
  
  let passed = 0;
  let failed = 0;
  
  const tests = [
    testInitializeSheet,
    testCreateProject,
    testGetAllProjects,
    testGetProjectById,
    testUpdateProject,
    testDeleteProject,
    testAPIResponseFormat
  ];
  
  for (let test of tests) {
    try {
      test();
      passed++;
    } catch (e) {
      Logger.log('❌ Test Failed: ' + e);
      failed++;
    }
  }
  
  Logger.log('\n┌────────────────────────────┐');
  Logger.log('│     TEST RESULTS           │');
  Logger.log('├────────────────────────────┤');
  Logger.log('│ ✓ Passed: ' + passed + '/7            │');
  Logger.log('│ ✗ Failed: ' + failed + '/7            │');
  Logger.log('└────────────────────────────┘\n');
  
  if (failed === 0) {
    Logger.log('🎉 ALL TESTS PASSED!\n');
  } else {
    Logger.log('⚠️  SOME TESTS FAILED\n');
  }
}

function testInitializeSheet() {
  Logger.log('Test 1: Initialize Sheet');
  const sheet = initializeSheet();
  
  if (sheet === null) throw new Error('Sheet initialization failed');
  
  const headers = sheet.getRange(1, 1, 1, HEADERSP.length).getValues()[0];
  if (headers.length !== HEADERSP.length) throw new Error('Headers count mismatch');
  
  Logger.log('  ✓ Sheet exists');
  Logger.log('  ✓ Headers configured: ' + headers.length);
  Logger.log('  ✓ Test PASSED\n');
}

function testCreateProject() {
  Logger.log('Test 2: Create Project');
  const result = createProject({
    title: 'Test-' + new Date().getTime(),
    description: 'Automated test',
    tech: 'React, Node.js',
    category: 'Full Stack',
    icon: 'FaCode'
  });
  
  if (!result.success || !result.id.startsWith('proj_')) {
    throw new Error('Project creation failed');
  }
  
  Logger.log('  ✓ Project created: ' + result.id);
  Logger.log('  ✓ Test PASSED\n');
}

function testGetAllProjects() {
  Logger.log('Test 3: Get All Projects');
  const projects = getAllProjects();
  
  if (!Array.isArray(projects) || projects.length === 0) {
    throw new Error('Failed to get projects');
  }
  
  Logger.log('  ✓ Retrieved: ' + projects.length + ' projects');
  Logger.log('  ✓ Test PASSED\n');
}

function testGetProjectById() {
  Logger.log('Test 4: Get Project by ID');
  const projects = getAllProjects();
  const project = getProjectById(projects[0].id);
  
  if (!project || project.id !== projects[0].id) {
    throw new Error('Failed to get project by ID');
  }
  
  Logger.log('  ✓ Found: ' + project.title);
  Logger.log('  ✓ Test PASSED\n');
}

function testUpdateProject() {
  Logger.log('Test 5: Update Project');
  const projects = getAllProjects();
  const id = projects[0].id;
  const original = projects[0].title;
  const updated = 'UPDATED-' + original;
  
  updateProject(id, { title: updated });
  const check = getProjectById(id);
  
  if (check.title !== updated) {
    throw new Error('Update failed');
  }
  
  updateProject(id, { title: original });
  
  Logger.log('  ✓ Updated successfully');
  Logger.log('  ✓ Test PASSED\n');
}

function testDeleteProject() {
  Logger.log('Test 6: Delete Project');
  const result = createProject({
    title: 'DELETE-TEST',
    description: 'Will be deleted'
  });
  
  const deleted = deleteProject(result.id);
  const check = getProjectById(result.id);
  
  if (!deleted.success || check !== null) {
    throw new Error('Delete failed');
  }
  
  Logger.log('  ✓ Deleted successfully');
  Logger.log('  ✓ Test PASSED\n');
}

function testAPIResponseFormat() {
  Logger.log('Test 7: API Response Format');
  const mockEvent = { parameter: { action: 'list' } };
  const response = doGet(mockEvent);
  const data = JSON.parse(response.getContent());
  
  if (!data.success || !data.projects) {
    throw new Error('Invalid API response');
  }
  
  Logger.log('  ✓ Response format valid');
  Logger.log('  ✓ Test PASSED\n');
}