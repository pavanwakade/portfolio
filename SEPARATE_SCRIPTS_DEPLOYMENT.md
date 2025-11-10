# Separate Skills & Technologies Scripts Deployment Guide

## Overview
You now have separate Google Apps Script files for Skills and Technologies, making them independent and easier to manage.

## New Files Created

### 1. google_sheet/skills_only.gs
- Manages **Skills** data only
- Sheet name: "Skills"
- ID prefix: `skill_`
- Fields: name, level, percentage, icon, color

### 2. google_sheet/technologies_only.gs
- Manages **Technologies** data only
- Sheet name: "Technologies"
- ID prefix: `tech_`
- Fields: name, category, icon, color

## Deployment Steps

### Step 1: Create New Google Sheets (or use existing)

**Option A: Create Two Separate Spreadsheets (Recommended)**
1. Create a new Google Sheet for Skills
2. Create another new Google Sheet for Technologies

**Option B: Use Same Spreadsheet with Different Sheets**
1. Use your existing spreadsheet
2. The scripts will create separate sheets within it

### Step 2: Deploy Skills Script

1. Open your Skills Google Sheet
2. Go to **Extensions > Apps Script**
3. Delete any existing code
4. Copy the entire content from `google_sheet/skills_only.gs`
5. Paste it into the script editor
6. Click **Save** (💾 icon)
7. Run `quickSetup` function:
   - Select `quickSetup` from the dropdown
   - Click **Run** (▶️)
   - Authorize the script when prompted
   - Check logs: **View > Logs** (should show setup complete)
8. Deploy as Web App:
   - Click **Deploy > New deployment**
   - Click gear icon ⚙️ > Select **Web app**
   - Description: "Skills API"
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
   - Copy the Web App URL
   - Save this URL - you'll need it!

### Step 3: Deploy Technologies Script

1. Open your Technologies Google Sheet
2. Go to **Extensions > Apps Script**
3. Delete any existing code
4. Copy the entire content from `google_sheet/technologies_only.gs`
5. Paste it into the script editor
6. Click **Save** (💾 icon)
7. Run `quickSetup` function:
   - Select `quickSetup` from the dropdown
   - Click **Run** (▶️)
   - Authorize the script when prompted
   - Check logs: **View > Logs** (should show setup complete)
8. Deploy as Web App:
   - Click **Deploy > New deployment**
   - Click gear icon ⚙️ > Select **Web app**
   - Description: "Technologies API"
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
   - Copy the Web App URL
   - Save this URL - you'll need it!

### Step 4: Update Frontend URLs

1. Open `src/admin/AdminDashboard.jsx`
2. Find the `API_URLS` object (around line 18)
3. Replace the placeholder URLs:

```javascript
const API_URLS = {
  projects: 'https://script.google.com/macros/s/YOUR_PROJECT_URL/exec',
  skills: 'PASTE_YOUR_SKILLS_URL_HERE',
  technologies: 'PASTE_YOUR_TECHNOLOGIES_URL_HERE',
  contacts: 'https://script.google.com/macros/s/YOUR_CONTACTS_URL/exec'
}
```

4. Save the file

### Step 5: Test Everything

1. Start your development server: `npm run dev`
2. Navigate to the admin dashboard
3. Test each tab:

#### Test Skills:
- Click **Skills** tab
- Should see list of skills
- Click **Add New** - create a test skill
- Click **Edit** - modify a skill
- Click **Delete** - remove a skill

#### Test Technologies:
- Click **Technologies** tab
- Should see list of technologies
- Click **Add New** - create a test technology
- Click **Edit** - modify a technology
- Click **Delete** - remove a technology

## Benefits of Separate Scripts

✅ **Independent Management** - Skills and Technologies are completely separate
✅ **Easier Debugging** - Issues in one don't affect the other
✅ **Better Organization** - Each script has its own sheet and data
✅ **Simpler Code** - No need to determine item type based on ID prefix
✅ **Flexible Deployment** - Can use different spreadsheets or same one

## API Endpoints

### Skills API
- **GET** `?action=list` → Returns `{ success: true, skills: [...] }`
- **POST** `?action=create` + body → Create skill
- **POST** `?action=update` + body → Update skill
- **POST** `?action=delete` + body → Delete skill

### Technologies API
- **GET** `?action=list` → Returns `{ success: true, technologies: [...] }`
- **POST** `?action=create` + body → Create technology
- **POST** `?action=update` + body → Update technology
- **POST** `?action=delete` + body → Delete technology

## Troubleshooting

### Skills not showing:
1. Check the Skills script URL in AdminDashboard.jsx
2. Verify the script is deployed as Web App
3. Check browser console for errors (F12)
4. Test the URL directly: `YOUR_SKILLS_URL?action=list`

### Technologies not showing:
1. Check the Technologies script URL in AdminDashboard.jsx
2. Verify the script is deployed as Web App
3. Check browser console for errors (F12)
4. Test the URL directly: `YOUR_TECHNOLOGIES_URL?action=list`

### "Action parameter is required" error:
- Make sure you're using the correct URL format with `?action=list`
- Check that the script is properly deployed

### Authorization errors:
- Re-run the `quickSetup` function
- Make sure you authorized the script
- Check that "Who has access" is set to "Anyone"

## Old vs New Structure

### Old (Combined):
- ❌ One script file for both skills and technologies
- ❌ Complex logic to determine item type
- ❌ Shared API endpoint

### New (Separate):
- ✅ Separate script files
- ✅ Simple, focused logic
- ✅ Independent API endpoints
- ✅ Easier to maintain and debug

## Next Steps

After successful deployment:
1. You can delete the old `google_sheet/skills.gs` file (keep as backup first)
2. Update your production environment with the new URLs
3. Test thoroughly before going live
