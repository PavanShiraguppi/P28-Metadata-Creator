import { z } from 'zod';

// Zod schemas for validation
export const ChoicesSchema = z.object({
  interaction_rating: z.number().int().min(0).max(7),
  code_logic: z.number().int().min(-1).max(7),
  naming_clarity: z.number().int().min(-1).max(7),
  organization_modularity: z.number().int().min(-1).max(7),
  interface_design: z.number().int().min(-1).max(7),
  error_handling: z.number().int().min(-1).max(7),
  documentation: z.number().int().min(-1).max(7),
  review_readiness: z.number().int().min(-1).max(7),
});

export const PromptSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  response_time_seconds: z.number().positive('Response time must be positive'),
  pdf_link: z.string().url('Must be a valid URL'),
  output_files_link: z.string().url('Must be a valid URL'),
  usecase: z.string().min(1, 'Use case is required'),
  issue_type: z.string(),
  choices: ChoicesSchema,
  level_of_correctness: z.number().int().min(-1).max(2),
  comment: z.string().min(1, 'Comment is required'),
});

export const RepoSchema = z.object({
  repo_link: z.string().url('Must be a valid URL'),
  codebase_category: z.string().min(1, 'Codebase category is required'),
  repo_type: z.string().min(1, 'Repo type is required'),
});

// Base schema for initial fields (excluding final details)
export const InitialMetadataSchema = z.object({
  language: z.string().min(1, 'Language is required'),
  interface: z.string().min(1, 'Interface is required'),
  starting_commit_hash: z.string().min(1, 'Starting commit hash is required'),
  jira: z.string().min(1, 'JIRA is required'),
  root_gdrive: z.string().url('Must be a valid URL'),
  worker_id: z.string().email('Must be a valid email'),
  build_creator: z.string().min(1, 'Build creator is required'),
  repo: RepoSchema,
});

// Final details schema (fields that come after prompts)
export const FinalDetailsSchema = z.object({
  uuid: z.string().min(1, 'UUID is required'),
  hfi_id: z.string().min(1, 'HFI ID is required'),
  final_codebase_link: z.string().url('Must be a valid URL'),
});

// Complete metadata schema
export const MetadataSchema = InitialMetadataSchema.merge(FinalDetailsSchema).extend({
  prompts: z.array(PromptSchema).min(1, 'At least one prompt is required'),
});

// TypeScript interfaces derived from schemas
export type Choices = z.infer<typeof ChoicesSchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type Repo = z.infer<typeof RepoSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;

// Default values for forms
export const defaultChoices: Choices = {
  interaction_rating: 0,
  code_logic: -1,
  naming_clarity: -1,
  organization_modularity: -1,
  interface_design: -1,
  error_handling: -1,
  documentation: -1,
  review_readiness: -1,
};

export const defaultPrompt: Prompt = {
  prompt: '',
  response_time_seconds: 0,
  pdf_link: '',
  output_files_link: '',
  usecase: '',
  issue_type: '',
  choices: defaultChoices,
  level_of_correctness: 0,
  comment: '',
};

export const defaultRepo: Repo = {
  repo_link: '',
  codebase_category: '',
  repo_type: '',
};

export const defaultMetadata: Metadata = {
  uuid: '',
  hfi_id: '',
  language: '',
  interface: '',
  starting_commit_hash: '',
  jira: '',
  root_gdrive: '',
  final_codebase_link: '',
  worker_id: '',
  build_creator: 'default',
  repo: defaultRepo,
  prompts: [defaultPrompt],
};
