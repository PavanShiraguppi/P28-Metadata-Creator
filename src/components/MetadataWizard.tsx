import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Metadata, MetadataSchema, defaultMetadata } from '../types/metadata';
import MainFieldsForm from './MainFieldsForm';
import PromptBuilder from './PromptBuilder';
import FinalDetailsForm from './FinalDetailsForm';
import JsonPreview from './JsonPreview';
import Notification from './Notification';
import ConfirmDialog from './ConfirmDialog';
import { useNotification } from '../hooks/useNotification';
import { useConfirmDialog } from '../hooks/useConfirmDialog';

type WizardStep = 'main-fields' | 'prompt-builder' | 'final-details' | 'preview';

const MetadataWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('main-fields');
  const [isValid, setIsValid] = useState(false);
  const [mainFieldsValid, setMainFieldsValid] = useState(false);
  const [promptsValid, setPromptsValid] = useState(false);
  const [finalDetailsValid, setFinalDetailsValid] = useState(false);
  const { notifications, hideNotification, showSuccess, showError } = useNotification();
  const { dialogState, showConfirm, hideConfirm, handleConfirm } = useConfirmDialog();

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<Metadata>({
    resolver: zodResolver(MetadataSchema),
    defaultValues: defaultMetadata,
    mode: 'all', // Validate on all events for immediate feedback
  });

  const fieldArray = useFieldArray({
    control,
    name: 'prompts',
  });

  const watchedData = watch();

  // Optimized validation - only validate when needed
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      // Only validate main fields when on main fields step (excluding final details fields)
      if (currentStep === 'main-fields') {
        const mainFieldsResult = await trigger([
          'language', 'interface', 'starting_commit_hash', 'jira',
          'root_gdrive', 'worker_id', 'build_creator', 'repo'
        ]);
        setMainFieldsValid(mainFieldsResult);
      } else if (currentStep === 'prompt-builder') {
        // Validate prompts when on prompt builder step
        const promptsResult = await trigger(['prompts']);
        setPromptsValid(promptsResult);
      } else if (currentStep === 'final-details') {
        // Validate final details fields
        const finalDetailsResult = await trigger(['uuid', 'hfi_id', 'final_codebase_link']);
        setFinalDetailsValid(finalDetailsResult);
      } else if (currentStep === 'preview') {
        // Full validation for preview
        const result = await trigger();
        setIsValid(result);
      }
    }, 500); // Increased debounce time

    return () => clearTimeout(timeoutId);
  }, [watchedData, trigger, currentStep]);

  const handleNextStep = async () => {
    if (currentStep === 'main-fields') {
      // Validate main fields before proceeding (excluding final details fields)
      const mainFieldsResult = await trigger([
        'language', 'interface', 'starting_commit_hash', 'jira',
        'root_gdrive', 'worker_id', 'build_creator', 'repo'
      ]);
      if (mainFieldsResult) {
        setMainFieldsValid(true);
        setCurrentStep('prompt-builder');
      }
    } else if (currentStep === 'prompt-builder') {
      // Validate prompts before proceeding
      const promptsResult = await trigger(['prompts']);
      if (promptsResult) {
        setPromptsValid(true);
        setCurrentStep('final-details');
      }
    } else if (currentStep === 'final-details') {
      // Validate final details before proceeding
      const finalDetailsResult = await trigger(['uuid', 'hfi_id', 'final_codebase_link']);
      if (finalDetailsResult) {
        setFinalDetailsValid(true);
        setCurrentStep('preview');
        // Trigger full validation for preview
        const result = await trigger();
        setIsValid(result);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'prompt-builder') {
      setCurrentStep('main-fields');
    } else if (currentStep === 'final-details') {
      setCurrentStep('prompt-builder');
    } else if (currentStep === 'preview') {
      setCurrentStep('final-details');
    }
  };

  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          const validatedData = MetadataSchema.parse(jsonData);

          // Reset form with imported data - handle nested structures properly
          // First clear existing prompts
          fieldArray.remove();

          // Set main fields
          setValue('uuid', validatedData.uuid);
          setValue('hfi_id', validatedData.hfi_id);
          setValue('language', validatedData.language);
          setValue('interface', validatedData.interface);
          setValue('starting_commit_hash', validatedData.starting_commit_hash);
          setValue('jira', validatedData.jira);
          setValue('root_gdrive', validatedData.root_gdrive);
          setValue('final_codebase_link', validatedData.final_codebase_link);
          setValue('worker_id', validatedData.worker_id);
          setValue('build_creator', validatedData.build_creator);

          // Set repo object
          setValue('repo', validatedData.repo);

          // Add prompts one by one to ensure proper field array handling
          validatedData.prompts.forEach((prompt) => {
            fieldArray.append(prompt);
          });

          showSuccess('JSON imported successfully!');
        } catch (error) {
          showError('Invalid JSON file. Please check the format.');
          console.error('Import error:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    showConfirm(
      'Reset All Fields',
      'Are you sure you want to reset all fields? This action cannot be undone and all your current data will be lost.',
      () => {
        Object.keys(defaultMetadata).forEach((key) => {
          setValue(key as keyof Metadata, defaultMetadata[key as keyof Metadata]);
        });
        setCurrentStep('main-fields');
        showSuccess('All fields have been reset successfully!');
      },
      {
        confirmText: 'Reset All',
        cancelText: 'Keep Data',
        type: 'danger'
      }
    );
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'main-fields':
        return 'Step 1: Initial Metadata Fields';
      case 'prompt-builder':
        return 'Step 2: Prompt Builder';
      case 'final-details':
        return 'Step 3: Final Details';
      case 'preview':
        return 'Step 4: Review & Export';
      default:
        return '';
    }
  };

  return (
    <div className="metadata-wizard">
      <header className="wizard-header">
        <h1>Metadata Creator</h1>
        <div className="header-actions">
          <label className="import-button">
            📁 Import JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              style={{ display: 'none' }}
            />
          </label>
          <button type="button" onClick={handleReset} className="reset-button">
            🗑️ Reset
          </button>
        </div>
      </header>

      <div className="wizard-progress">
        <div className="progress-steps">
          <div className={`step ${currentStep === 'main-fields' ? 'active' : mainFieldsValid ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Initial Fields</span>
          </div>
          <div className={`step ${currentStep === 'prompt-builder' ? 'active' : promptsValid ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Prompts</span>
          </div>
          <div className={`step ${currentStep === 'final-details' ? 'active' : finalDetailsValid ? 'completed' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Final Details</span>
          </div>
          <div className={`step ${currentStep === 'preview' ? 'active' : ''}`}>
            <span className="step-number">4</span>
            <span className="step-label">Preview</span>
          </div>
        </div>
      </div>

      <div className="wizard-content">
        <div className="step-header">
          <h2>{getStepTitle()}</h2>
        </div>

        <div className="step-content">
          {currentStep === 'main-fields' && (
            <div className="main-fields-step">
              <MainFieldsForm register={register} errors={errors} />
              <div className="step-actions">
                <button 
                  type="button" 
                  onClick={handleNextStep}
                  disabled={!mainFieldsValid}
                  className="next-button"
                >
                  Continue to Prompts →
                </button>
              </div>
            </div>
          )}

          {currentStep === 'prompt-builder' && (
            <div className="prompt-builder-step">
              <PromptBuilder
                register={register}
                errors={errors}
                fieldArray={fieldArray}
                watchedData={watchedData}
                trigger={trigger}
              />
              <div className="step-actions">
                <button 
                  type="button" 
                  onClick={handlePrevStep}
                  className="prev-button"
                >
                  ← Back to Main Fields
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!promptsValid}
                  className="next-button"
                >
                  Continue to Final Details →
                </button>
              </div>
            </div>
          )}

          {currentStep === 'final-details' && (
            <div className="final-details-step">
              <FinalDetailsForm register={register} errors={errors} />
              <div className="step-actions">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="prev-button"
                >
                  ← Back to Prompts
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!finalDetailsValid}
                  className="next-button"
                >
                  Review & Export →
                </button>
              </div>
            </div>
          )}

          {currentStep === 'preview' && (
            <div className="preview-step">
              <JsonPreview data={watchedData} isValid={isValid} />
              <div className="step-actions">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="prev-button"
                >
                  ← Back to Final Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Container */}
      <div className="notification-container">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={() => hideNotification(notification.id)}
          />
        ))}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        type={dialogState.type}
        onConfirm={handleConfirm}
        onCancel={hideConfirm}
      />
    </div>
  );
};

export default MetadataWizard;
