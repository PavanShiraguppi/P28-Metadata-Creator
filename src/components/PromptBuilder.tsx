import React, { useState } from 'react';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn, UseFormTrigger } from 'react-hook-form';
import { Metadata, defaultPrompt } from '../types/metadata';
import PromptCard from './PromptCard';

interface PromptBuilderProps {
  register: UseFormRegister<Metadata>;
  errors: FieldErrors<Metadata>;
  fieldArray: UseFieldArrayReturn<Metadata, 'prompts', 'id'>;
  watchedData: Metadata;
  trigger: UseFormTrigger<Metadata>;
}

const PromptBuilder: React.FC<PromptBuilderProps> = ({
  register,
  errors,
  fieldArray,
  watchedData,
  trigger
}) => {
  const { fields, append, remove } = fieldArray;
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number | null>(null);

  const handleAddPrompt = async () => {
    append(defaultPrompt);
    setSelectedPromptIndex(fields.length); // Select the new prompt
    // Trigger validation for the new prompt after a short delay to ensure it's added
    setTimeout(() => {
      trigger(`prompts.${fields.length}`);
    }, 100);
  };

  const handleRemovePrompt = (index: number) => {
    if (fields.length > 1) {
      remove(index);
      if (selectedPromptIndex === index) {
        setSelectedPromptIndex(null);
      } else if (selectedPromptIndex !== null && selectedPromptIndex > index) {
        setSelectedPromptIndex(selectedPromptIndex - 1);
      }
    }
  };

  const handleSelectPrompt = (index: number) => {
    // Always trigger validation for the current prompt before switching
    if (selectedPromptIndex !== null) {
      trigger(`prompts.${selectedPromptIndex}`);
    }
    setSelectedPromptIndex(selectedPromptIndex === index ? null : index);
  };

  // Check if a prompt is actually complete (has all required fields filled)
  const isPromptComplete = (index: number) => {
    const prompt = watchedData.prompts[index];
    if (!prompt) return false;

    // Check all required fields are filled and valid
    const hasRequiredFields =
      prompt.prompt.trim() !== '' &&
      prompt.response_time_seconds > 0 &&
      prompt.pdf_link.trim() !== '' &&
      prompt.output_files_link.trim() !== '' &&
      prompt.usecase.trim() !== '' &&
      prompt.comment.trim() !== '';

    // Also check if there are any validation errors for this prompt
    const hasNoErrors = !errors.prompts?.[index];

    return hasRequiredFields && hasNoErrors;
  };

  // Simplified rendering without heavy memoization
  const renderPromptCards = () => {
    return fields.map((field, index) => (
      <div
        key={field.id}
        className={`prompt-card-container ${selectedPromptIndex === index ? 'selected' : ''}`}
      >
        <div
          className="prompt-card-preview"
          onClick={() => handleSelectPrompt(index)}
        >
          <div className="prompt-card-header">
            <h4>Prompt #{index + 1}</h4>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemovePrompt(index);
                }}
                className="remove-prompt-btn"
              >
                ✕
              </button>
            )}
          </div>
          <div className="prompt-preview-content">
            <p className="prompt-text">
              {watchedData.prompts[index]?.prompt || 'Click to add prompt...'}
            </p>
            <div className="prompt-meta">
              <span className="use-case">
                {watchedData.prompts[index]?.usecase || 'No use case'}
              </span>
              <span className="response-time">
                {watchedData.prompts[index]?.response_time_seconds || 0}s
              </span>
            </div>
          </div>
          <div className="prompt-status">
            {isPromptComplete(index) ? (
              <span className="status-complete">✅ Complete</span>
            ) : (
              <span className="status-error">❌ Incomplete</span>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="prompt-builder">
      <div className="prompt-overview">
        <div className="prompt-cards-grid">
          {renderPromptCards()}
          
          <div className="add-prompt-card" onClick={handleAddPrompt}>
            <div className="add-prompt-content">
              <div className="add-icon">+</div>
              <span>Add New Prompt</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prompt-editor-container">
        {selectedPromptIndex !== null ? (
          <div className="prompt-editor">
            <div className="editor-header">
              <h3>Editing Prompt #{selectedPromptIndex + 1}</h3>
              <button
                type="button"
                onClick={() => setSelectedPromptIndex(null)}
                className="close-editor-btn"
              >
                ✕ Close Editor
              </button>
            </div>
            {/* Render all prompt cards but only show the selected one */}
            {fields.map((field, index) => (
              <div
                key={field.id}
                style={{ display: index === selectedPromptIndex ? 'block' : 'none' }}
              >
                <PromptCard
                  index={index}
                  register={register}
                  errors={errors}
                  onRemove={() => handleRemovePrompt(index)}
                  canRemove={fields.length > 1}
                  isExpanded={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-prompt-selected">
            <div className="placeholder-content">
              <h3>Select a prompt to edit</h3>
              <p>Click on any prompt card above to start editing, or add a new prompt.</p>
            </div>
          </div>
        )}
      </div>

      {errors.prompts && (
        <div className="error">
          {typeof errors.prompts.message === 'string' && errors.prompts.message}
        </div>
      )}
    </div>
  );
};

export default PromptBuilder;
