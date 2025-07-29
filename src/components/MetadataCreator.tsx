import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { Metadata, MetadataSchema, defaultMetadata } from '../types/metadata';
import MainFieldsForm from './MainFieldsForm';
import PromptList from './PromptList';
import JsonPreview from './JsonPreview';
import Notification from './Notification';
import ConfirmDialog from './ConfirmDialog';
import { useNotification } from '../hooks/useNotification';
import { useConfirmDialog } from '../hooks/useConfirmDialog';

const MetadataCreator: React.FC = () => {
  const [isValid, setIsValid] = useState(false);
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
    mode: 'all',
  });

  const fieldArray = useFieldArray({
    control,
    name: 'prompts',
  });

  const watchedData = watch();

  // Auto-populate UUID with hfi_id if UUID is empty
  useEffect(() => {
    if (watchedData.hfi_id && !watchedData.uuid) {
      setValue('uuid', watchedData.hfi_id);
    }
  }, [watchedData.hfi_id, watchedData.uuid, setValue]);

  // Validate form whenever data changes
  useEffect(() => {
    const validateForm = async () => {
      const result = await trigger();
      setIsValid(result);
    };
    validateForm();
  }, [watchedData, trigger]);

  // UUID generation removed - these come from portal

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
        showSuccess('All fields have been reset successfully!');
      },
      {
        confirmText: 'Reset All',
        cancelText: 'Keep Data',
        type: 'danger'
      }
    );
  };

  return (
    <div className="metadata-creator">
      <header className="app-header">
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

      <div className="app-content">
        <div className="form-section">
          <form>
            <MainFieldsForm register={register} errors={errors} />
            <PromptList 
              register={register} 
              errors={errors} 
              fieldArray={fieldArray}
            />
          </form>
        </div>

        <div className="preview-section">
          <JsonPreview data={watchedData} isValid={isValid} />
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

export default MetadataCreator;
