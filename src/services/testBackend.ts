import { apiService } from '@/services/api';

// Simple test to check if API is accessible
export const testBackendConnection = async () => {
  try {
    // Test the health check endpoint
    const response = await fetch('http://localhost:8000/health');
    if (response.ok) {
      console.log('Backend is running and accessible');
      return true;
    } else {
      console.log('Backend is not accessible, status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('Could not connect to backend:', error);
    return false;
  }
};