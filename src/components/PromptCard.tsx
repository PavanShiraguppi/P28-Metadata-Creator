import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Metadata } from '../types/metadata';

interface PromptCardProps {
  index: number;
  register: UseFormRegister<Metadata>;
  errors: FieldErrors<Metadata>;
  onRemove: () => void;
  canRemove: boolean;
  isExpanded?: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({ 
  index, 
  register, 
  errors, 
  onRemove, 
  canRemove,
  isExpanded = false
}) => {
  const promptErrors = errors.prompts?.[index];

  if (!isExpanded) {
    return null; // This component is only for expanded view
  }

  return (
    <div className="prompt-card-editor">
      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor={`prompts.${index}.prompt`}>Prompt *</label>
          <textarea
            id={`prompts.${index}.prompt`}
            {...register(`prompts.${index}.prompt` as const)}
            placeholder="Enter the prompt text..."
            rows={4}
          />
          {promptErrors?.prompt && <span className="error">{promptErrors.prompt.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor={`prompts.${index}.response_time_seconds`}>Response Time (seconds) *</label>
          <input
            id={`prompts.${index}.response_time_seconds`}
            type="number"
            min="1"
            {...register(`prompts.${index}.response_time_seconds` as const, { valueAsNumber: true })}
            placeholder="e.g., 600"
          />
          {promptErrors?.response_time_seconds && <span className="error">{promptErrors.response_time_seconds.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor={`prompts.${index}.usecase`}>Use Case *</label>
          <select id={`prompts.${index}.usecase`} {...register(`prompts.${index}.usecase` as const)}>
            <option value="">Select use case</option>
            <option value="feature_implementation">Feature Implementation</option>
            <option value="feature_extension">Feature Extension</option>
            <option value="code_refactor">Code Refactor</option>
            <option value="optimization_testing">Optimization Testing</option>
            <option value="feature_reimplementation">Feature Reimplementation</option>
            <option value="test_coverage">Test Coverage</option>
            <option value="test_coverage_bootstrap">Test Coverage Bootstrap</option>
            <option value="debugging_fixes">Debugging Fixes</option>
          </select>
          {promptErrors?.usecase && <span className="error">{promptErrors.usecase.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor={`prompts.${index}.pdf_link`}>PDF Link *</label>
          <input
            id={`prompts.${index}.pdf_link`}
            type="url"
            {...register(`prompts.${index}.pdf_link` as const)}
            placeholder="Enter PDF Google Drive link"
          />
          {promptErrors?.pdf_link && <span className="error">{promptErrors.pdf_link.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor={`prompts.${index}.output_files_link`}>Output Files Link *</label>
          <input
            id={`prompts.${index}.output_files_link`}
            type="url"
            {...register(`prompts.${index}.output_files_link` as const)}
            placeholder="Enter output files Google Drive link"
          />
          {promptErrors?.output_files_link && <span className="error">{promptErrors.output_files_link.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor={`prompts.${index}.issue_type`}>Issue Type</label>
          <select id={`prompts.${index}.issue_type`} {...register(`prompts.${index}.issue_type` as const)}>
            <option value="">Select issue type</option>
            <option value="technical_inconsistency">Technical Inconsistency</option>
            <option value="tool">Tool</option>
            <option value="code_correctness">Code Correctness</option>
            <option value="setup">Setup</option>
            <option value="other">Other</option>
          </select>
          {promptErrors?.issue_type && <span className="error">{promptErrors.issue_type.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor={`prompts.${index}.level_of_correctness`}>Level of Correctness *</label>
          <select id={`prompts.${index}.level_of_correctness`} {...register(`prompts.${index}.level_of_correctness` as const, { valueAsNumber: true })}>
            <option value={-1}>-1</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          {promptErrors?.level_of_correctness && <span className="error">{promptErrors.level_of_correctness.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor={`prompts.${index}.build_creator`}>Build Creator *</label>
          <select id={`prompts.${index}.build_creator`} {...register(`prompts.${index}.build_creator` as const)}>
            <option value="default">Default</option>
            <option value="worker">Worker</option>
          </select>
          {promptErrors?.build_creator && <span className="error">{promptErrors.build_creator.message}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor={`prompts.${index}.comment`}>Comment *</label>
          <textarea
            id={`prompts.${index}.comment`}
            {...register(`prompts.${index}.comment` as const)}
            placeholder="Enter comment about the response..."
            rows={3}
          />
          {promptErrors?.comment && <span className="error">{promptErrors.comment.message}</span>}
        </div>
      </div>

      {/* Choices Section */}
      <div className="choices-section">
        <h4>Choices (Interaction Rating: 0-7, Others: -1 to 7)</h4>
        <div className="choices-grid">
          <div className="form-group">
            <label htmlFor={`prompts.${index}.choices.interaction_rating`}>Interaction Rating</label>
            <select {...register(`prompts.${index}.choices.interaction_rating` as const, { valueAsNumber: true })}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={`prompts.${index}.choices.code_logic`}>Code Logic</label>
            <select {...register(`prompts.${index}.choices.code_logic` as const, { valueAsNumber: true })}>
              {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={`prompts.${index}.choices.naming_clarity`}>Naming Clarity</label>
            <select {...register(`prompts.${index}.choices.naming_clarity` as const, { valueAsNumber: true })}>
              {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={`prompts.${index}.choices.organization_modularity`}>Organization Modularity</label>
            <select {...register(`prompts.${index}.choices.organization_modularity` as const, { valueAsNumber: true })}>
              {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={`prompts.${index}.choices.interface_design`}>Interface Design</label>
            <select {...register(`prompts.${index}.choices.interface_design` as const, { valueAsNumber: true })}>
              {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={`prompts.${index}.choices.error_handling`}>Error Handling</label>
            <select {...register(`prompts.${index}.choices.error_handling` as const, { valueAsNumber: true })}>
              {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={`prompts.${index}.choices.documentation`}>Documentation</label>
            <select {...register(`prompts.${index}.choices.documentation` as const, { valueAsNumber: true })}>
              {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={`prompts.${index}.choices.review_readiness`}>Review Readiness</label>
            <select {...register(`prompts.${index}.choices.review_readiness` as const, { valueAsNumber: true })}>
              {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
