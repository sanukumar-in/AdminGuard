import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
    
    if (axios.isAxiosError(error)) {
        
        // Network errors
        if (!error.response) {
            return "Network error. Please check your internet connection.";
        }

        // HTTP Status Code errors
        const status = error.response.status;
        
        switch (status) {
            case 400:
                return "Bad request. Please check your input.";
            case 401:
                return "Unauthorized. Please log in again.";
            case 403:
                return "You don't have permission to access this.";
            case 404:
                return "The requested resource was not found.";
            case 500:
                return "Server error. Please try again later.";
            case 503:
                return "Service temporarily unavailable. Please try again later.";
            default:
                return `An error occurred (${status}). Please try again.`;
        }
    }

    // timeout error
    if (error instanceof Error && error.name === 'AbortError') {
        return "Request timed out. Please try again.";
    }

    return "An unexpected error occurred. Please try again.";
};