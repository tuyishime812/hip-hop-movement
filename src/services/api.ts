// src/services/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle different response types based on status
      if (!response.ok) {
        // Try to get error message from response body if possible
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch (e) {
          // If we can't parse the error response, use the status code
        }

        throw new Error(errorMessage);
      }

      // Check if response has content before trying to parse JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // For responses that are not JSON, return text
        return await response.text();
      }
    } catch (error: any) {
      console.error('API request failed:', error);
      // Re-throw the error to be handled by calling components
      throw error;
    }
  }

  // Events API
  async getEvents() {
    return this.request('/api/events/');
  }

  async getEvent(id: number) {
    return this.request(`/api/events/${id}`);
  }

  async createEvent(eventData: any) {
    return this.request('/api/events/', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // Artists API
  async getArtists() {
    return this.request('/api/artists/');
  }

  async getArtist(id: number) {
    return this.request(`/api/artists/${id}`);
  }

  async createArtist(artistData: any) {
    return this.request('/api/artists/', {
      method: 'POST',
      body: JSON.stringify(artistData),
    });
  }

  // Donations API
  async getDonations() {
    return this.request('/api/donations/');
  }

  async createDonation(donationData: any) {
    return this.request('/api/donations/', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  // Contact API
  async createContactMessage(messageData: any) {
    return this.request('/api/contact/', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  // News API
  async getNews() {
    return this.request('/api/news/');
  }

  async getNewsSources() {
    return this.request('/api/news/sources');
  }

  // Merchandise API
  async getMerchandise() {
    return this.request('/api/merchandise/');
  }
}

export const apiService = new ApiService();