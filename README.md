# Metadata JSON Creator

A React/TypeScript application for creating and validating metadata JSON files with a user-friendly interface. This application is part of a larger repository scraping and metadata management system.

## 🚀 Features

- ✅ **4-Step Wizard Workflow** - Guided process that matches the development workflow
- ✅ **Form-based JSON creation** - Create metadata JSON through intuitive forms
- ✅ **Real-time validation** - Zod schema validation with instant feedback at each step
- ✅ **Advanced prompt builder** - Visual prompt cards with persistent form state
- ✅ **Smart field ordering** - Fields appear when they become available in the workflow
- ✅ **JSON preview** - Live preview of generated JSON with masked placeholders
- ✅ **Export functionality** - Download JSON files or copy to clipboard
- ✅ **Import support** - Load existing JSON files for editing
- ✅ **Persistent form state** - No data loss when switching between prompts
- ✅ **Responsive design** - Works on desktop and mobile devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** for version control

### Checking Your Installation

```bash
# Check Node.js version (should be 16.x or higher)
node --version

# Check npm version
npm --version

# Check if you're in the correct directory
pwd
```

## 🛠️ Installation & Setup

### 1. Navigate to the Project Directory

```bash
cd P28-Metadata-Creator
```

### 2. Install Dependencies

Using npm (recommended):
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Start the Development Server

```bash
npm start
```

The application will automatically open in your default browser at [http://localhost:3000](http://localhost:3000).

### 4. Verify Installation

You should see the Metadata Creator interface with form fields for creating metadata JSON files.

## 🚀 Quick Start Guide

### First Time Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd P28-Metadata-Creator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Creating Metadata - Step-by-Step Workflow

The metadata creator follows a 4-step wizard workflow designed to match the actual development process:

#### **Step 1: Initial Metadata Fields**
Fill in the basic project information to get started:
- **Language** (programming language)
- **Interface** type
- **Starting commit hash**
- **JIRA** ticket reference
- **Google Drive root** link
- **Worker ID** (email)
- **Build creator** (default/worker)
- **Repository Information**:
  - Repository link
  - Codebase category
  - Repository type

#### **Step 2: Prompt Builder** 🎯
Advanced prompt management with visual interface:
- **Visual Prompt Cards**: See all prompts at a glance with completion status
- **Click to Edit**: Select any prompt card to edit its details
- **Persistent State**: Form data is preserved when switching between prompts
- **Add/Remove Prompts**: Use the "+ Add Prompt" button to add more prompts
- **Complete Form Fields** for each prompt:
  - Prompt text (textarea)
  - Response time in seconds
  - PDF link (Google Drive)
  - Output files link (Google Drive)
  - Use case description
  - Issue type (dropdown)
  - Choices ratings (interaction: 0-7, others: -1 to 7)
  - Level of correctness (-1, 0, 1, 2)
  - Build creator (default/worker)
  - Comments (textarea)

#### **Step 3: Final Details** ⭐ *New Step*
Complete these fields **after** all prompts have been processed:
- **UUID** - Available from portal after first prompt completion
- **HFI ID** - Available from portal after first prompt completion
- **Final Codebase Link** - Available after all prompts are completed

#### **Step 4: Review & Export**
Review your complete metadata and export the JSON file.

### Validation & Export

- **Real-time validation** ensures all required fields are filled
- **Invalid fields** are highlighted with error messages
- **JSON preview** shows validation status and generated JSON
- **Export** is only enabled when all validation passes

### Export/Import Options

- **💾 Export**: Download the JSON file to your computer
- **📋 Copy**: Copy JSON to clipboard for pasting elsewhere
- **📁 Import JSON**: Load an existing JSON file for editing
- **🗑️ Reset**: Clear all fields and start over

### Advanced Prompt Builder Features

- **Visual Prompt Cards**: Each prompt is displayed as a card showing completion status
- **Persistent Form State**: Switch between prompts without losing data
- **Click-to-Edit Interface**: Simply click any prompt card to edit its details
- **Real-time Validation**: Instant feedback on required fields and validation errors
- **Completion Indicators**: Visual status showing ✅ Complete or ❌ Incomplete
- **Flexible Management**: Add, remove, and reorder prompts as needed

### Workflow Benefits

- **Matches Development Process**: Fields are requested exactly when they become available
- **Prevents Data Loss**: No form data is lost when switching between prompts or steps
- **Clear Progression**: Step-by-step workflow guides you through the entire process
- **Smart Validation**: Each step is validated independently before proceeding
- **User-Friendly**: Intuitive interface with helpful descriptions and visual cues

## 📄 JSON Structure

The application creates JSON files with the following structure:

```json
{
  "uuid": "string (UUID)",
  "hfi_id": "string (UUID)",
  "language": "string",
  "interface": "string",
  "starting_commit__hash": "string",
  "jira": "string",
  "root_gdrive": "string (URL)",
  "final_codebase_link": "string (URL)",
  "worker_id": "string (email)",
  "repo": {
    "repo_link": "string (URL)",
    "codebase_category": "string",
    "repo_type": "string"
  },
  "prompts": [
    {
      "prompt": "string",
      "response_time_seconds": "number",
      "pdf_link": "string (URL)",
      "output_files_link": "string (URL)",
      "usecase": "string",
      "issue_type": "string",
      "choices": {
        "interaction_rating": "number (0-7)",
        "code_logic": "number (-1 to 7)",
        "naming_clarity": "number (-1 to 7)",
        "organization_modularity": "number (-1 to 7)",
        "interface_design": "number (-1 to 7)",
        "error_handling": "number (-1 to 7)",
        "documentation": "number (-1 to 7)",
        "review_readiness": "number (-1 to 7)"
      },
      "level_of_correctness": "number (-1, 0, 1, 2)",
      "build_creator": "string (default/worker)",
      "comment": "string"
    }
  ]
}
```

### Field Descriptions

#### Initial Fields (Step 1)
- **language**: Programming language of the codebase
- **interface**: Type of interface used
- **starting_commit_hash**: Git commit hash where work began
- **jira**: JIRA ticket reference
- **root_gdrive**: Google Drive root folder link
- **worker_id**: Email of the person creating the metadata
- **build_creator**: Either "default" or "worker"

#### Prompt Fields (Step 2)
- **prompt**: The actual prompt text (textarea)
- **response_time_seconds**: Time taken to respond in seconds
- **pdf_link**: Google Drive link to PDF documentation
- **output_files_link**: Google Drive link to output files
- **usecase**: Description of the use case
- **issue_type**: Type of issue (dropdown selection)
- **interaction_rating**: Scale 0-7 for interaction quality
- **Other choice ratings**: Scale -1 to 7 for various code quality aspects
- **level_of_correctness**: Overall correctness rating (-1, 0, 1, 2)
- **build_creator**: Per-prompt build creator setting (default/worker)
- **comment**: Comments about the prompt response

#### Final Details (Step 3) - *Available after prompts are processed*
- **uuid**: Unique identifier from portal (after first prompt completion)
- **hfi_id**: Human-feedback interface identifier from portal (after first prompt completion)
- **final_codebase_link**: Link to the final codebase (after all prompts are completed)

## � Recent Improvements

### ✅ **Fixed: Form Data Persistence**
- **Issue**: Previously, switching between prompts would clear form fields
- **Solution**: Implemented stable component rendering that keeps all forms mounted
- **Result**: Form data now persists when navigating between prompts

### ✅ **Enhanced Workflow**
- **4-Step Wizard**: Restructured into logical steps that match development workflow
- **Smart Field Ordering**: UUID, HFI ID, and final codebase link appear only after prompts
- **Visual Improvements**: Better styling, animations, and user feedback

### ✅ **Schema Updates**
- **Per-Prompt Build Creator**: Each prompt now has its own build_creator setting
- **Comprehensive Validation**: Improved validation with better error messages
- **Type Safety**: Enhanced TypeScript integration with Zod schemas

## �🛠️ Development

### Available Scripts

- **`npm start`** - Start development server (opens http://localhost:3000)
- **`npm build`** - Build for production (creates optimized build in `build/` folder)
- **`npm test`** - Run tests in interactive watch mode
- **`npm run eject`** - Eject from Create React App (⚠️ irreversible)

### Development Workflow

1. **Start development server**:
   ```bash
   npm start
   ```

2. **Make your changes** in the `src/` directory

3. **Test your changes** - the app will automatically reload

4. **Run tests** (when available):
   ```bash
   npm test
   ```

5. **Build for production** (optional):
   ```bash
   npm run build
   ```

### Project Structure

```
P28-Metadata-Creator/
├── public/
│   └── index.html                 # HTML template
├── src/
│   ├── components/
│   │   ├── ConfirmDialog.tsx      # Custom confirmation dialogs
│   │   ├── FinalDetailsForm.tsx   # Step 3: Final details (UUID, HFI ID, etc.)
│   │   ├── JsonPreview.tsx        # Step 4: JSON preview and export
│   │   ├── MainFieldsForm.tsx     # Step 1: Initial metadata fields
│   │   ├── MetadataCreator.tsx    # Main metadata creator component
│   │   ├── MetadataWizard.tsx     # Main wizard component (4-step workflow)
│   │   ├── Notification.tsx       # Custom notification system
│   │   ├── PromptBuilder.tsx      # Step 2: Advanced prompt management
│   │   ├── PromptCard.tsx         # Individual prompt editor
│   │   ├── PromptForm.tsx         # Individual prompt form component
│   │   └── PromptList.tsx         # Prompt list management component
│   ├── hooks/
│   │   ├── useConfirmDialog.ts    # Dialog management hook
│   │   └── useNotification.ts     # Notification management hook
│   ├── types/
│   │   └── metadata.ts            # TypeScript interfaces and Zod schemas
│   ├── utils/                     # Utility functions (currently empty)
│   ├── App.tsx                    # Main App component
│   ├── App.css                    # Global styles
│   └── index.tsx                  # Entry point
├── package.json                   # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🧰 Technologies Used

- **React 18** - Modern UI framework with hooks and concurrent features
- **TypeScript** - Type safety and enhanced developer experience
- **React Hook Form** - Advanced form management with array field support
- **Zod** - Runtime schema validation with TypeScript integration
- **UUID** - UUID generation for unique identifiers
- **Create React App** - Build tooling and development server
- **CSS3** - Modern styling with gradients, animations, and responsive design

## 🔧 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or start on a different port
PORT=3001 npm start
```

**Node modules issues:**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**TypeScript errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**Build fails:**
```bash
# Clear build cache
rm -rf build/
npm run build
```

### Getting Help

1. Check the browser console for error messages
2. Ensure all required fields are filled in the form
3. Verify that URLs are properly formatted
4. Check that Node.js version is 16.x or higher

## 🚀 Deployment

### GitHub Pages Deployment (Recommended)

This project is configured for easy deployment to GitHub Pages. Follow these steps:

#### Prerequisites

1. **Create a GitHub repository** for your project
2. **Push your code** to the repository
3. **Enable GitHub Pages** in repository settings

#### Step 1: Configure Your Repository URL

Update the `homepage` field in `package.json` with your actual GitHub information:

```json
{
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/P28-Metadata-Creator"
}
```

**Example**: If your GitHub username is `johndoe`, change it to:
```json
{
  "homepage": "https://johndoe.github.io/P28-Metadata-Creator"
}
```

#### Step 2: Deploy to GitHub Pages

```bash
# Build and deploy in one command
npm run deploy
```

This command will:
1. Build the production version (`npm run build`)
2. Create/update the `gh-pages` branch
3. Deploy the built files to GitHub Pages

#### Step 3: Access Your Deployed App

After deployment, your app will be available at:
```
https://YOUR_GITHUB_USERNAME.github.io/P28-Metadata-Creator
```

#### GitHub Pages Setup in Repository

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** branch and **/ (root)** folder
6. Click **Save**

#### Deployment Commands

- **`npm run deploy`** - Build and deploy to GitHub Pages
- **`npm run predeploy`** - Build for production (runs automatically before deploy)
- **`npm run build`** - Build for production only

### Alternative Deployment Options

#### Building for Production

```bash
npm run build
```

This creates a `build/` folder with optimized files ready for deployment.

#### Other Hosting Services

- **Netlify**: Drag and drop the `build/` folder or connect your GitHub repository
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Web server**: Serve the `build/` folder with any web server (nginx, Apache, etc.)

### Deployment Troubleshooting

#### Common Issues

**Deployment fails with permission errors:**
```bash
# Make sure you're logged into GitHub and have push access
git remote -v
git push origin main
```

**App shows blank page after deployment:**
- Check that the `homepage` URL in `package.json` matches your GitHub Pages URL exactly
- Ensure the repository name matches the URL path

**404 errors on refresh:**
- This is normal for single-page apps on GitHub Pages
- Users should navigate using the app's internal navigation

**Build fails during deployment:**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json build
npm install
npm run build
```

#### Updating Your Deployment

To update your deployed app:
```bash
# Make your changes, then redeploy
npm run deploy
```

The deployment typically takes 1-2 minutes to become live.
