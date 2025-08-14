// Shared types for Code Quality Automation Suite

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Feature-specific types
export interface Userauthentication {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserauthenticationRequest {
  name: string;
  description: string;
}

export interface UpdateUserauthenticationRequest {
  name?: string;
  description?: string;
}

export interface Apidocumentation {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateApidocumentationRequest {
  name: string;
  description: string;
}

export interface UpdateApidocumentationRequest {
  name?: string;
  description?: string;
}

export interface Datavalidation {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDatavalidationRequest {
  name: string;
  description: string;
}

export interface UpdateDatavalidationRequest {
  name?: string;
  description?: string;
}

export interface Ratelimiting {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRatelimitingRequest {
  name: string;
  description: string;
}

export interface UpdateRatelimitingRequest {
  name?: string;
  description?: string;
}

export interface Automatedtesting {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAutomatedtestingRequest {
  name: string;
  description: string;
}

export interface UpdateAutomatedtestingRequest {
  name?: string;
  description?: string;
}

export interface Codequalityanalysis {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCodequalityanalysisRequest {
  name: string;
  description: string;
}

export interface UpdateCodequalityanalysisRequest {
  name?: string;
  description?: string;
}

export interface Codedocumentation {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCodedocumentationRequest {
  name: string;
  description: string;
}

export interface UpdateCodedocumentationRequest {
  name?: string;
  description?: string;
}

export interface Cicdpipeline {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCicdpipelineRequest {
  name: string;
  description: string;
}

export interface UpdateCicdpipelineRequest {
  name?: string;
  description?: string;
}

export interface Errorhandling {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateErrorhandlingRequest {
  name: string;
  description: string;
}

export interface UpdateErrorhandlingRequest {
  name?: string;
  description?: string;
}

export interface Monitoringdashboard {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMonitoringdashboardRequest {
  name: string;
  description: string;
}

export interface UpdateMonitoringdashboardRequest {
  name?: string;
  description?: string;
}
