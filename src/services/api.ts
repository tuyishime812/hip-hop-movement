// src/services/api.ts - Frontend-only version with mock data
class ApiService {
  // Events API
  async getEvents() {
    // Return mock data instead of making API call
    return [
      {
        id: 1,
        title: "Hip-Hop for Humanity Festival",
        description: "Annual charity event bringing together artists and community",
        date: "2025-03-15T18:00:00",
        location: "Community Center, Local City",
        image_url: "/src/images/hiphop.jpg",
        registration_required: true,
        max_attendees: 500,
        attendees_count: 245,
        is_active: true,
        created_at: "2024-01-01T00:00:00",
        updated_at: "2024-01-01T00:00:00"
      },
      {
        id: 2,
        title: "Youth Hip-Hop Workshop",
        description: "Educational workshop for young artists",
        date: "2025-02-20T14:00:00",
        location: "Youth Center, Local City",
        image_url: "/src/images/hiphop_lifestyle time.jpg",
        registration_required: false,
        max_attendees: null,
        attendees_count: 78,
        is_active: true,
        created_at: "2024-01-01T00:00:00",
        updated_at: "2024-01-01T00:00:00"
      }
    ];
  }

  async getEvent(id: number) {
    const events = await this.getEvents();
    return events.find(event => event.id === id) || events[0];
  }

  async createEvent(eventData: any) {
    // In frontend-only mode, we just return the data as if it was created
    return { ...eventData, id: Date.now() };
  }

  // Artists API
  async getArtists() {
    // Return mock data instead of making API call
    return [
      {
        id: 1,
        name: "DJ Khaled",
        bio: "Legendary hip-hop producer and DJ",
        genre: "Hip-Hop",
        image_url: "/src/images/hiphop.jpg",
        social_links: JSON.stringify({ instagram: "@djkhlaed", twitter: "@djkhlaed" }),
        is_featured: true,
        created_at: "2024-01-01T00:00:00",
        updated_at: "2024-01-01T00:00:00"
      },
      {
        id: 2,
        name: "Eminem",
        bio: "Pulitzer Prize-winning rapper",
        genre: "Rap",
        image_url: "/src/images/hiphop_time.jpg",
        social_links: JSON.stringify({ instagram: "@eminem", twitter: "@eminem" }),
        is_featured: true,
        created_at: "2024-01-01T00:00:00",
        updated_at: "2024-01-01T00:00:00"
      },
      {
        id: 3,
        name: "Kendrick Lamar",
        bio: "Influential rapper and songwriter",
        genre: "Hip-Hop",
        image_url: "/src/images/hiphop_movement help young-talented designer.jpg",
        social_links: JSON.stringify({ instagram: "@kendricklamar", twitter: "@kendricklamar" }),
        is_featured: true,
        created_at: "2024-01-01T00:00:00",
        updated_at: "2024-01-01T00:00:00"
      }
    ];
  }

  async getArtist(id: number) {
    const artists = await this.getArtists();
    return artists.find(artist => artist.id === id) || artists[0];
  }

  async createArtist(artistData: any) {
    // In frontend-only mode, we just return the data as if it was created
    return { ...artistData, id: Date.now() };
  }

  // Donations API
  async getDonations() {
    // Return mock data instead of making API call
    return [
      {
        id: 1,
        amount: 50.0,
        currency: "USD",
        donor_name: "John Doe",
        donor_email: "john@example.com",
        message: "Supporting the cause!",
        transaction_id: "txn_123456",
        payment_method: "credit_card",
        status: "completed",
        donor_id: 1,
        created_at: "2024-01-01T00:00:00"
      },
      {
        id: 2,
        amount: 25.0,
        currency: "USD",
        donor_name: "Jane Smith",
        donor_email: "jane@example.com",
        message: "Great work!",
        transaction_id: "txn_789012",
        payment_method: "paypal",
        status: "completed",
        donor_id: 2,
        created_at: "2024-01-02T00:00:00"
      }
    ];
  }

  async createDonation(donationData: any) {
    // In frontend-only mode, we just return the data as if it was created
    return { ...donationData, id: Date.now(), status: "completed", created_at: new Date().toISOString() };
  }

  // Contact API
  async createContactMessage(messageData: any) {
    // In frontend-only mode, we just return the data as if it was created
    return { ...messageData, id: Date.now(), created_at: new Date().toISOString() };
  }

  // News API
  async getNews() {
    // Return mock data instead of making API call
    return [
      {
        id: 1,
        title: "Hip-Hop Foundation Announces New Community Program",
        content: "We're excited to announce our new program aimed at supporting young artists in underserved communities.",
        author: "Foundation Staff",
        image_url: "/src/images/hiphop.jpg",
        published_at: "2024-12-15T00:00:00",
        is_published: true,
        created_at: "2024-12-15T00:00:00",
        updated_at: "2024-12-15T00:00:00"
      },
      {
        id: 2,
        title: "Local Artist Receives Grant from Foundation",
        content: "Local hip-hop artist receives funding to produce an album focused on social justice themes.",
        author: "Foundation Staff",
        image_url: "/src/images/hiphop_time.jpg",
        published_at: "2024-12-10T00:00:00",
        is_published: true,
        created_at: "2024-12-10T00:00:00",
        updated_at: "2024-12-10T00:00:00"
      }
    ];
  }

  async getNewsSources() {
    // Return mock data instead of making API call
    return [
      { id: 1, name: "Rolling Stone", url: "https://rollingstone.com" },
      { id: 2, name: "Pitchfork", url: "https://pitchfork.com" },
      { id: 3, name: "HipHopDX", url: "https://hiphopdx.com" }
    ];
  }

  // Merchandise API
  async getMerchandise() {
    // Return mock data instead of making API call
    return [
      {
        id: 1,
        name: "Hip-Hop Movement Classic Tee",
        description: "Premium cotton t-shirt with our iconic logo",
        price: 25.00,
        image_url: "/src/images/t shirts.png",
        stock_quantity: 50,
        category: "T-Shirts",
        is_available: true,
        created_at: "2024-01-01T00:00:00",
        updated_at: "2024-01-01T00:00:00"
      },
      {
        id: 2,
        name: "Limited Edition Hoodie",
        description: "Exclusive hoodie with unique design",
        price: 50.00,
        image_url: "/src/images/hoodies.png",
        stock_quantity: 30,
        category: "Hoodies",
        is_available: true,
        created_at: "2024-01-01T00:00:00",
        updated_at: "2024-01-01T00:00:00"
      },
      {
        id: 3,
        name: "Hip-Hop Culture Cap",
        description: "Adjustable cap with embroidered logo",
        price: 18.00,
        image_url: "/src/images/caps.png",
        stock_quantity: 100,
        category: "Accessories",
        is_available: true,
        created_at: "2024-01-01T00:00:00",
        updated_at: "2024-01-01T00:00:00"
      }
    ];
  }

  // Staff API
  async getStaff() {
    try {
      const response = await fetch('/api/staff');
      const result = await response.json();
      return result.success ? result.data : [];
    } catch (error) {
      console.error('Error fetching staff:', error);
      // Return mock data in case of error
      return [
        { id: 1, name: "IKK", role: "Chairman", image: "/images/chairman.jpg", bio: "Chairman of the Hip-Hop Foundation, leading the movement with vision and purpose." },
        { id: 2, name: "Martin Angelz", role: "Vice Chairman", image: "/images/vice_chairman martin.jpg", bio: "Vice Chairman driving the mission forward in the hip-hop community." },
        { id: 3, name: "Tuyishime Martin", role: "IT Manager", image: "/images/IT manager.jpg", bio: "Ensuring digital innovation for the movement and technological advancement." }
      ];
    }
  }

  async createStaff(staffData: any) {
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error creating staff:', error);
      return null;
    }
  }

  async updateStaff(staffData: any) {
    try {
      const response = await fetch('/api/staff', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error updating staff:', error);
      return null;
    }
  }

  async deleteStaff(id: number) {
    try {
      const response = await fetch(`/api/staff?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error deleting staff:', error);
      return null;
    }
  }
}

export const apiService = new ApiService();