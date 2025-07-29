import React from 'react';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { Metadata, defaultPrompt } from '../types/metadata';
import PromptForm from './PromptForm';

interface PromptListProps {
  register: UseFormRegister<Metadata>;
  errors: FieldErrors<Metadata>;
  fieldArray: UseFieldArrayReturn<Metadata, 'prompts', 'id'>;
}

const PromptList: React.FC<PromptListProps> = ({ 
  register, 
  errors, 
  fieldArray 
}) => {
  const { fields, append, remove } = fieldArray;

  const handleAddPrompt = () => {
    append(defaultPrompt);
  };

  const handleRemovePrompt = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="prompt-list">
      <div className="prompt-list-header">
        <h2>Prompts</h2>
        <button 
          type="button" 
          onClick={handleAddPrompt}
          className="add-button"
          aria-label="Add new prompt"
        >
          + Add Prompt
        </button>
      </div>

      <div className="prompts-container">
        {fields.map((field, index) => (
          <PromptForm
            key={field.id}
            index={index}
            register={register}
            errors={errors}
            onRemove={() => handleRemovePrompt(index)}
            canRemove={fields.length > 1}
          />
        ))}
      </div>

      {errors.prompts && (
        <div className="error">
          {typeof errors.prompts.message === 'string' && errors.prompts.message}
        </div>
      )}
    </div>
  );
};

export default PromptList;
