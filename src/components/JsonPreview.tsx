import React, { useMemo } from 'react';
import { Metadata } from '../types/metadata';
import { useNotification } from '../hooks/useNotification';

interface JsonPreviewProps {
  data: Metadata;
  isValid: boolean;
}

const maskSensitiveData = (data: Metadata): Metadata => {
  const isEmpty = (value: string) => !value || value.trim() === '';

  return {
    ...data,
    uuid: isEmpty(data.uuid) ? '[UUID_FROM_PORTAL]' : data.uuid,
    hfi_id: isEmpty(data.hfi_id) ? '[HFI_ID_FROM_PORTAL]' : data.hfi_id,
    worker_id: isEmpty(data.worker_id) ? 'anonymous@example.com' : data.worker_id,
    root_gdrive: isEmpty(data.root_gdrive) ? 'https://drive.google.com/drive/folders/[FOLDER_ID]' : data.root_gdrive,
    final_codebase_link: isEmpty(data.final_codebase_link) ? 'https://drive.google.com/open?id=[FILE_ID]' : data.final_codebase_link,
    starting_commit_hash: isEmpty(data.starting_commit_hash) ? '[COMMIT_HASH]' : data.starting_commit_hash,
    jira: isEmpty(data.jira) ? '[JIRA_TICKET]' : data.jira,
    language: isEmpty(data.language) ? '[LANGUAGE]' : data.language,
    interface: isEmpty(data.interface) ? '[INTERFACE]' : data.interface,
    build_creator: isEmpty(data.build_creator) ? '[BUILD_CREATOR]' : data.build_creator,
    repo: {
      ...data.repo,
      repo_link: isEmpty(data.repo.repo_link) ? 'https://github.com/[OWNER]/[REPO]' : data.repo.repo_link,
      codebase_category: isEmpty(data.repo.codebase_category) ? '[CATEGORY]' : data.repo.codebase_category,
      repo_type: isEmpty(data.repo.repo_type) ? '[TYPE]' : data.repo.repo_type,
    },
    prompts: data.prompts.map(prompt => ({
      ...prompt,
      prompt: isEmpty(prompt.prompt) ? '[PROMPT_TEXT]' : prompt.prompt,
      pdf_link: isEmpty(prompt.pdf_link) ? 'https://drive.google.com/open?id=[PDF_ID]' : prompt.pdf_link,
      output_files_link: isEmpty(prompt.output_files_link) ? 'https://drive.google.com/open?id=[OUTPUT_ID]' : prompt.output_files_link,
      comment: isEmpty(prompt.comment) ? '[COMMENT_TEXT]' : prompt.comment,
      usecase: isEmpty(prompt.usecase) ? '[USECASE]' : prompt.usecase,
      issue_type: isEmpty(prompt.issue_type) ? '[ISSUE_TYPE]' : prompt.issue_type,

    })),
  };
};

const JsonPreview: React.FC<JsonPreviewProps> = ({ data, isValid }) => {
  const { showSuccess, showError } = useNotification();
  const handleExport = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'metadata.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = async () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(jsonString);
      showSuccess('JSON copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      showError('Failed to copy to clipboard');
    }
  };

  const maskedData = useMemo(() => maskSensitiveData(data), [data]);

  return (
    <div className="json-preview">
      <div className="json-preview-header">
        <h2>JSON Preview</h2>
        <div className="json-actions">
          <button 
            type="button" 
            onClick={handleCopyToClipboard}
            className="copy-button"
            disabled={!isValid}
          >
            📋 Copy
          </button>
          <button 
            type="button" 
            onClick={handleExport}
            className="export-button"
            disabled={!isValid}
          >
            💾 Export
          </button>
        </div>
      </div>
      
      <div className={`json-status ${isValid ? 'valid' : 'invalid'}`}>
        {isValid ? '✅ Valid JSON' : '❌ Invalid JSON - Please fix errors'}
      </div>

      <div className="json-content">
        <pre>
          <code>
            {JSON.stringify(maskedData, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default JsonPreview;
