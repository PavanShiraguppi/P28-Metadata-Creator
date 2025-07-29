# Metadata JSON Creator

A React/TypeScript application for creating and validating metadata JSON files with a user-friendly interface. This application is part of a larger repository scraping and metadata management system.

## 🚀 Features

- ✅ **Form-based JSON creation** - Create metadata JSON through intuitive forms
- ✅ **Real-time validation** - Zod schema validation with instant feedback
- ✅ **Dynamic prompt management** - Add/remove prompts with a plus button
- ✅ **JSON preview** - Live preview of generated JSON
- ✅ **Export functionality** - Download JSON files or copy to clipboard
- ✅ **Import support** - Load existing JSON files for editing
- ✅ **UUID generation** - Automatic UUID generation for required fields
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
cd metadata-creator
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
   cd <repository-name>/metadata-creator
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

#### **Step 2: Prompt Builder**
Add and configure all your prompts:
- Use the "+ Add Prompt" button to add multiple prompts
- For each prompt, complete all required fields:
  - Prompt text
  - Response time (seconds)
  - PDF and output file links
  - Use case and issue type
  - Choices ratings (-1 to 7 scale)
  - Level of correctness (-1, 0, 1, 2)
  - Build creator (default/worker)
  - Comments

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

### Workflow Benefits

- **Matches Development Process**: Fields are requested when they become available
- **Prevents Errors**: No need to guess UUID/HFI ID values before they exist
- **Clear Progression**: Step-by-step workflow guides you through the process
- **Validation**: Each step is validated before proceeding to the next

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
- **interaction_rating**: Scale 0-7 for interaction quality
- **Other choice ratings**: Scale -1 to 7 for various code quality aspects
- **level_of_correctness**: Overall correctness rating (-1, 0, 1, 2)

#### Final Details (Step 3) - *Available after prompts are processed*
- **uuid**: Unique identifier from portal (after first prompt completion)
- **hfi_id**: Human-feedback interface identifier from portal (after first prompt completion)
- **final_codebase_link**: Link to the final codebase (after all prompts are completed)

## 🛠️ Development

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
metadata-creator/
├── public/
│   └── index.html             # HTML template
├── src/
│   ├── components/
│   │   ├── MetadataCreator.tsx    # Main component
│   │   ├── MainFieldsForm.tsx     # Main metadata fields
│   │   ├── PromptForm.tsx         # Individual prompt form
│   │   ├── PromptList.tsx         # Prompt management
│   │   └── JsonPreview.tsx        # JSON preview and export
│   ├── types/
│   │   └── metadata.ts            # TypeScript interfaces and Zod schemas
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # Utility functions
│   ├── App.tsx                    # Main App component
│   ├── App.css                    # Global styles
│   └── index.tsx                  # Entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

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

### Building for Production

```bash
npm run build
```

This creates a `build/` folder with optimized files ready for deployment.

### Deployment Options

- **Static hosting**: Deploy the `build/` folder to services like Netlify, Vercel, or GitHub Pages
- **Web server**: Serve the `build/` folder with any web server (nginx, Apache, etc.)
