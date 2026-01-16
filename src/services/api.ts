// src/services/api.ts - Supabase implementation
import { supabase } from '@/lib/supabase';

class ApiService {
  // Events API
  async getEvents() {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error getting events:', error);
        return [];
      }

      return data.map(event => ({
        id: event.id,
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        location: event.location || '',
        time: event.time || '',
        image_url: event.image_url || '',
        registration_required: event.registration_required || false,
        max_attendees: event.max_attendees || null,
        attendees_count: event.attendees_count || 0,
        is_active: event.is_active || true,
        is_featured: event.is_featured || false,
        created_at: event.created_at || new Date().toISOString(),
        updated_at: event.updated_at || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error getting events:', error);
      return [];
    }
  }

  async getEvent(id: number) {
    const events = await this.getEvents();
    return events.find(event => event.id == id) || null;
  }

  async createEvent(eventData: any) {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          ...eventData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating event:', error);
        return null;
      }

      return {
        id: data.id,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        location: data.location || '',
        time: data.time || '',
        image_url: data.image_url || '',
        registration_required: data.registration_required || false,
        max_attendees: data.max_attendees || null,
        attendees_count: data.attendees_count || 0,
        is_active: data.is_active || true,
        is_featured: data.is_featured || false,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  }

  async updateEvent(eventData: any) {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          ...eventData,
          updated_at: new Date().toISOString()
        })
        .eq('id', eventData.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating event:', error);
        return null;
      }

      return {
        id: data.id,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        location: data.location || '',
        time: data.time || '',
        image_url: data.image_url || '',
        registration_required: data.registration_required || false,
        max_attendees: data.max_attendees || null,
        attendees_count: data.attendees_count || 0,
        is_active: data.is_active || true,
        is_featured: data.is_featured || false,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating event:', error);
      return null;
    }
  }

  async deleteEvent(id: number) {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting event:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }

  // Artists API
  async getArtists() {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error getting artists:', error);
        return [];
      }

      return data.map(artist => ({
        id: artist.id,
        name: artist.name || '',
        bio: artist.bio || '',
        genre: artist.genre || '',
        image_url: artist.image_url || '',
        social_links: artist.social_links || '{}',
        is_featured: artist.is_featured || false,
        created_at: artist.created_at || new Date().toISOString(),
        updated_at: artist.updated_at || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error getting artists:', error);
      return [];
    }
  }

  async getArtist(id: number) {
    const artists = await this.getArtists();
    return artists.find(artist => artist.id == id) || null;
  }

  async createArtist(artistData: any) {
    try {
      const { data, error } = await supabase
        .from('artists')
        .insert([{
          ...artistData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating artist:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name || '',
        bio: data.bio || '',
        genre: data.genre || '',
        image_url: data.image_url || '',
        social_links: data.social_links || '{}',
        is_featured: data.is_featured || false,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating artist:', error);
      return null;
    }
  }

  async updateArtist(artistData: any) {
    try {
      const { data, error } = await supabase
        .from('artists')
        .update({
          ...artistData,
          updated_at: new Date().toISOString()
        })
        .eq('id', artistData.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating artist:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name || '',
        bio: data.bio || '',
        genre: data.genre || '',
        image_url: data.image_url || '',
        social_links: data.social_links || '{}',
        is_featured: data.is_featured || false,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating artist:', error);
      return null;
    }
  }

  async deleteArtist(id: number) {
    try {
      const { error } = await supabase
        .from('artists')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting artist:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting artist:', error);
      return false;
    }
  }

  // Donations API
  async getDonations() {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting donations:', error);
        return [];
      }

      return data.map(donation => ({
        id: donation.id,
        amount: donation.amount || 0,
        currency: donation.currency || 'USD',
        donor_name: donation.donor_name || '',
        donor_email: donation.donor_email || '',
        message: donation.message || '',
        transaction_id: donation.transaction_id || '',
        payment_method: donation.payment_method || 'credit_card',
        status: donation.status || 'completed',
        donor_id: donation.donor_id || 0,
        created_at: donation.created_at || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error getting donations:', error);
      return [];
    }
  }

  async createDonation(donationData: any) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert([{
          ...donationData,
          status: donationData.status || 'completed',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating donation:', error);
        return null;
      }

      return {
        id: data.id,
        ...donationData,
        status: data.status || 'completed',
        created_at: data.created_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating donation:', error);
      return null;
    }
  }

  async updateDonation(donationData: any) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .update({
          ...donationData,
          updated_at: new Date().toISOString()
        })
        .eq('id', donationData.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating donation:', error);
        return null;
      }

      return {
        id: data.id,
        ...donationData
      };
    } catch (error) {
      console.error('Error updating donation:', error);
      return null;
    }
  }

  async deleteDonation(id: number) {
    try {
      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting donation:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting donation:', error);
      return false;
    }
  }

  // Contact API
  async createContactMessage(messageData: any) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          ...messageData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating contact message:', error);
        return null;
      }

      return { id: data.id, ...messageData };
    } catch (error) {
      console.error('Error creating contact message:', error);
      return null;
    }
  }

  // News API
  async getNews() {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error getting news:', error);
        return [];
      }

      return data.map(news => ({
        id: news.id,
        title: news.title || '',
        content: news.content || '',
        author: news.author || '',
        published_at: news.published_at || new Date().toISOString(),
        image_url: news.image_url || '',
        is_published: news.is_published || true,
        created_at: news.created_at || new Date().toISOString(),
        updated_at: news.updated_at || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error getting news:', error);
      return [];
    }
  }

  async getNewsSources() {
    // Return mock data for news sources since this is typically static
    return [
      { id: 1, name: "Rolling Stone", url: "https://rollingstone.com" },
      { id: 2, name: "Pitchfork", url: "https://pitchfork.com" },
      { id: 3, name: "HipHopDX", url: "https://hiphopdx.com" }
    ];
  }

  async createNews(newsData: any) {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([{
          ...newsData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating news:', error);
        return null;
      }

      return {
        id: data.id,
        title: data.title || '',
        content: data.content || '',
        author: data.author || '',
        published_at: data.published_at || new Date().toISOString(),
        image_url: data.image_url || '',
        is_published: data.is_published || true,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating news:', error);
      return null;
    }
  }

  async updateNews(newsData: any) {
    try {
      const { data, error } = await supabase
        .from('news')
        .update({
          ...newsData,
          updated_at: new Date().toISOString()
        })
        .eq('id', newsData.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating news:', error);
        return null;
      }

      return {
        id: data.id,
        title: data.title || '',
        content: data.content || '',
        author: data.author || '',
        published_at: data.published_at || new Date().toISOString(),
        image_url: data.image_url || '',
        is_published: data.is_published || true,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating news:', error);
      return null;
    }
  }

  async deleteNews(id: number) {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting news:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting news:', error);
      return false;
    }
  }

  // Merchandise API
  async getMerchandise() {
    try {
      const { data, error } = await supabase
        .from('merchandise')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error getting merchandise:', error);
        return [];
      }

      return data.map(merch => ({
        id: merch.id,
        name: merch.name || '',
        description: merch.description || '',
        price: merch.price || 0,
        image_url: merch.image_url || '',
        category: merch.category || '',
        stock_quantity: merch.stock_quantity || 0,
        is_available: merch.is_available || (merch.stock_quantity > 0),
        created_at: merch.created_at || new Date().toISOString(),
        updated_at: merch.updated_at || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error getting merchandise:', error);
      return [];
    }
  }

  async createMerchandise(merchData: any) {
    try {
      const { data, error } = await supabase
        .from('merchandise')
        .insert([{
          ...merchData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating merchandise:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name || '',
        description: data.description || '',
        price: data.price || 0,
        image_url: data.image_url || '',
        category: data.category || '',
        stock_quantity: data.stock_quantity || 0,
        is_available: data.is_available || (data.stock_quantity > 0),
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating merchandise:', error);
      return null;
    }
  }

  async updateMerchandise(merchData: any) {
    try {
      const { data, error } = await supabase
        .from('merchandise')
        .update({
          ...merchData,
          updated_at: new Date().toISOString()
        })
        .eq('id', merchData.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating merchandise:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name || '',
        description: data.description || '',
        price: data.price || 0,
        image_url: data.image_url || '',
        category: data.category || '',
        stock_quantity: data.stock_quantity || 0,
        is_available: data.is_available || (data.stock_quantity > 0),
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating merchandise:', error);
      return null;
    }
  }

  async deleteMerchandise(id: number) {
    try {
      const { error } = await supabase
        .from('merchandise')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting merchandise:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting merchandise:', error);
      return false;
    }
  }

  // Staff API
  async getStaff() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error getting staff:', error);
        return [];
      }

      return data.map(staff => ({
        id: staff.id,
        name: staff.name || '',
        role: staff.position || staff.role || '', // Use position or role
        image: staff.image_url || staff.image || '', // Use image_url or image
        bio: staff.bio || '',
        email: staff.email || '',
        phone: staff.phone || '',
        social_links: staff.social_links || '{}',
        created_at: staff.created_at || new Date().toISOString(),
        updated_at: staff.updated_at || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error getting staff:', error);
      return [];
    }
  }

  async createStaff(staffData: any) {
    try {
      const { data, error } = await supabase
        .from('staff')
        .insert([{
          ...staffData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating staff:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name || '',
        role: data.position || data.role || '', // Use position or role
        image: data.image_url || data.image || '', // Use image_url or image
        bio: data.bio || '',
        email: data.email || '',
        phone: data.phone || '',
        social_links: data.social_links || '{}',
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating staff:', error);
      return null;
    }
  }

  async updateStaff(staffData: any) {
    try {
      const { data, error } = await supabase
        .from('staff')
        .update({
          ...staffData,
          updated_at: new Date().toISOString()
        })
        .eq('id', staffData.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating staff:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name || '',
        role: data.position || data.role || '', // Use position or role
        image: data.image_url || data.image || '', // Use image_url or image
        bio: data.bio || '',
        email: data.email || '',
        phone: data.phone || '',
        social_links: data.social_links || '{}',
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating staff:', error);
      return null;
    }
  }

  async deleteStaff(id: number) {
    try {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting staff:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting staff:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();