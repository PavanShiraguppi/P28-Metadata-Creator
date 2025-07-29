import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Metadata } from '../types/metadata';

interface MainFieldsFormProps {
  register: UseFormRegister<Metadata>;
  errors: FieldErrors<Metadata>;
}

const MainFieldsForm: React.FC<MainFieldsFormProps> = ({ register, errors }) => {
  return (
    <div className="main-fields-form">
      <h2>Initial Metadata Fields</h2>
      <p className="step-description">
        <strong>Let's get started!</strong> Fill in the basic project information below. Don't worry about UUID, HFI ID, and final codebase link - we'll collect those after your prompts are processed.
      </p>

      <div className="form-grid">

        <div className="form-group">
          <label htmlFor="language">Language *</label>
          <select id="language" {...register('language')}>
            <option value="">Select language</option>
            <option value="python">Python</option>
            <option value="javascript/typescript">JavaScript/TypeScript</option>
            <option value="rust">Rust</option>
          </select>
          {errors.language && <span className="error">{errors.language.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="interface">Interface *</label>
          <select id="interface" {...register('interface')}>
            <option value="">Select interface</option>
            <option value="pr_writer_v2">PR Writer v2</option>
            <option value="pr_writer_rust_v2">PR Writer Rust v2</option>
            <option value="pr_writer_javascript_v2">PR Writer JavaScript v2</option>
          </select>
          {errors.interface && <span className="error">{errors.interface.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="starting_commit_hash">Starting Commit Hash *</label>
          <input
            id="starting_commit_hash"
            type="text"
            {...register('starting_commit_hash')}
            placeholder="Enter commit hash"
          />
          {errors.starting_commit_hash && <span className="error">{errors.starting_commit_hash.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="jira">JIRA *</label>
          <input
            id="jira"
            type="text"
            {...register('jira')}
            placeholder="Enter JIRA ticket"
          />
          {errors.jira && <span className="error">{errors.jira.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="root_gdrive">Root Google Drive *</label>
          <input
            id="root_gdrive"
            type="url"
            {...register('root_gdrive')}
            placeholder="Enter Google Drive folder URL"
          />
          {errors.root_gdrive && <span className="error">{errors.root_gdrive.message}</span>}
        </div>



        <div className="form-group">
          <label htmlFor="worker_id">Worker ID *</label>
          <input
            id="worker_id"
            type="email"
            {...register('worker_id')}
            placeholder="Enter your email address"
          />
          {errors.worker_id && <span className="error">{errors.worker_id.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="build_creator">Build Creator *</label>
          <select id="build_creator" {...register('build_creator')}>
            <option value="default">Default</option>
            <option value="worker">Worker</option>
          </select>
          {errors.build_creator && <span className="error">{errors.build_creator.message}</span>}
        </div>
      </div>

      <div className="repo-section">
        <h3>Repository Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="repo.repo_link">Repository Link *</label>
            <input
              id="repo.repo_link"
              type="url"
              {...register('repo.repo_link')}
              placeholder="Enter GitHub repository URL"
            />
            {errors.repo?.repo_link && <span className="error">{errors.repo.repo_link.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="repo.codebase_category">Codebase Category *</label>
            <select id="repo.codebase_category" {...register('repo.codebase_category')}>
              <option value="">Select category</option>
              <option value="small">Small</option>
              <option value="large">Large</option>
            </select>
            {errors.repo?.codebase_category && <span className="error">{errors.repo.codebase_category.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="repo.repo_type">Repository Type *</label>
            <select id="repo.repo_type" {...register('repo.repo_type')}>
              <option value="">Select type</option>
              <option value="application">Application</option>
              <option value="library">Library</option>
              <option value="sdk">SDK</option>
            </select>
            {errors.repo?.repo_type && <span className="error">{errors.repo.repo_type.message}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFieldsForm;
