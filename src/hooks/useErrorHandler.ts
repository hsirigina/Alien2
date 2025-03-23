import { useCallback, useState } from 'react';
import { useAnalytics } from './useAnalytics';
import { ERROR_MESSAGES } from '../constants';

interface ErrorState {
  message: string;
  code?: string;
  details?: any;
  timestamp: string;
}

export const useErrorHandler = () => {
  const [errors, setErrors] = useState<ErrorState[]>([]);
  const { logError } = useAnalytics();

  const handleError = useCallback(async (error: Error | string, context?: string) => {
    const errorState: ErrorState = {
      message: typeof error === 'string' ? error : error.message,
      code: error instanceof Error ? error.name : undefined,
      details: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    };

    // Add error to state
    setErrors(prev => [...prev, errorState]);

    // Log error to analytics
    if (error instanceof Error) {
      await logError(error, context);
    }

    // Here you would typically handle different types of errors
    // For example, showing a toast, navigating to an error screen, etc.
  }, [logError]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getErrorMessage = useCallback((error: Error | string) => {
    if (typeof error === 'string') {
      return error;
    }

    // Map error types to user-friendly messages
    switch (error.name) {
      case 'NetworkError':
        return ERROR_MESSAGES.NETWORK_ERROR;
      case 'ServerError':
        return ERROR_MESSAGES.SERVER_ERROR;
      case 'UnauthorizedError':
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 'ValidationError':
        return ERROR_MESSAGES.VALIDATION_ERROR;
      case 'DocumentError':
        return ERROR_MESSAGES.DOCUMENT_ERROR;
      default:
        return error.message || 'An unexpected error occurred';
    }
  }, []);

  const handleNetworkError = useCallback(async (error: Error) => {
    await handleError(error, 'network');
  }, [handleError]);

  const handleServerError = useCallback(async (error: Error) => {
    await handleError(error, 'server');
  }, [handleError]);

  const handleAuthError = useCallback(async (error: Error) => {
    await handleError(error, 'auth');
  }, [handleError]);

  const handleValidationError = useCallback(async (error: Error) => {
    await handleError(error, 'validation');
  }, [handleError]);

  const handleDocumentError = useCallback(async (error: Error) => {
    await handleError(error, 'document');
  }, [handleError]);

  return {
    errors,
    handleError,
    clearErrors,
    getErrorMessage,
    handleNetworkError,
    handleServerError,
    handleAuthError,
    handleValidationError,
    handleDocumentError,
  };
}; 