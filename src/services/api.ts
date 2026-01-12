// src/services/api.ts - Firebase implementation
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db, analytics } from '@/lib/firebase';

class ApiService {
  // Events API
  async getEvents() {
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(doc.id) || Date.now(),
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
      });
    } catch (error) {
      console.error('Error getting events:', error);
      return [];
    }
  }

  async getEvent(id: number) {
    // Note: In Firestore, document IDs are typically strings
    // This function would need to be adjusted based on your actual implementation
    const events = await this.getEvents();
    return events.find(event => event.id == id) || null;
  }

  async createEvent(eventData: any) {
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...eventData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(docRef.id) || Date.now(),
        title: eventData.title || '',
        description: eventData.description || '',
        date: eventData.date || '',
        location: eventData.location || '',
        time: eventData.time || '',
        image_url: eventData.image_url || '',
        registration_required: eventData.registration_required || false,
        max_attendees: eventData.max_attendees || null,
        attendees_count: eventData.attendees_count || 0,
        is_active: eventData.is_active || true,
        is_featured: eventData.is_featured || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  }

  async updateEvent(eventData: any) {
    try {
      const eventRef = doc(db, 'events', eventData.id.toString());
      await updateDoc(eventRef, {
        ...eventData,
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(eventData.id.toString()) || eventData.id,
        title: eventData.title || '',
        description: eventData.description || '',
        date: eventData.date || '',
        location: eventData.location || '',
        time: eventData.time || '',
        image_url: eventData.image_url || '',
        registration_required: eventData.registration_required || false,
        max_attendees: eventData.max_attendees || null,
        attendees_count: eventData.attendees_count || 0,
        is_active: eventData.is_active || true,
        is_featured: eventData.is_featured || false,
        created_at: eventData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating event:', error);
      return null;
    }
  }

  async deleteEvent(id: number) {
    try {
      const eventRef = doc(db, 'events', id.toString());
      await deleteDoc(eventRef);
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }

  // Artists API
  async getArtists() {
    try {
      const q = query(collection(db, 'artists'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(doc.id) || Date.now(),
          name: data.name || '',
          bio: data.bio || '',
          genre: data.genre || '',
          image_url: data.image_url || '',
          social_links: data.social_links || '{}',
          is_featured: data.is_featured || false,
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString()
        };
      });
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
      const docRef = await addDoc(collection(db, 'artists'), {
        ...artistData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(docRef.id) || Date.now(),
        name: artistData.name || '',
        bio: artistData.bio || '',
        genre: artistData.genre || '',
        image_url: artistData.image_url || '',
        social_links: artistData.social_links || '{}',
        is_featured: artistData.is_featured || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating artist:', error);
      return null;
    }
  }

  async updateArtist(artistData: any) {
    try {
      const artistRef = doc(db, 'artists', artistData.id.toString());
      await updateDoc(artistRef, {
        ...artistData,
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(artistData.id.toString()) || artistData.id,
        name: artistData.name || '',
        bio: artistData.bio || '',
        genre: artistData.genre || '',
        image_url: artistData.image_url || '',
        social_links: artistData.social_links || '{}',
        is_featured: artistData.is_featured || false,
        created_at: artistData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating artist:', error);
      return null;
    }
  }

  async deleteArtist(id: number) {
    try {
      const artistRef = doc(db, 'artists', id.toString());
      await deleteDoc(artistRef);
      return true;
    } catch (error) {
      console.error('Error deleting artist:', error);
      return false;
    }
  }

  // Donations API
  async getDonations() {
    try {
      const q = query(collection(db, 'donations'), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(doc.id) || Date.now(), // Convert to number or use timestamp
          amount: data.amount || 0,
          currency: data.currency || 'USD',
          donor_name: data.donor_name || '',
          donor_email: data.donor_email || '',
          message: data.message || '',
          transaction_id: data.transaction_id || '',
          payment_method: data.payment_method || 'credit_card',
          status: data.status || 'completed',
          donor_id: data.donor_id || 0,
          created_at: data.created_at || new Date().toISOString()
        };
      });
    } catch (error) {
      console.error('Error getting donations:', error);
      return [];
    }
  }

  async createDonation(donationData: any) {
    try {
      const docRef = await addDoc(collection(db, 'donations'), {
        ...donationData,
        status: donationData.status || 'completed',
        created_at: new Date().toISOString()
      });
      return {
        id: parseInt(docRef.id) || Date.now(),
        ...donationData,
        status: donationData.status || 'completed',
        created_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating donation:', error);
      return null;
    }
  }

  async updateDonation(donationData: any) {
    try {
      const donationRef = doc(db, 'donations', donationData.id.toString());
      await updateDoc(donationRef, {
        ...donationData,
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(donationData.id.toString()) || donationData.id,
        ...donationData
      };
    } catch (error) {
      console.error('Error updating donation:', error);
      return null;
    }
  }

  async deleteDonation(id: number) {
    try {
      const donationRef = doc(db, 'donations', id.toString());
      await deleteDoc(donationRef);
      return true;
    } catch (error) {
      console.error('Error deleting donation:', error);
      return false;
    }
  }

  // Contact API
  async createContactMessage(messageData: any) {
    try {
      const docRef = await addDoc(collection(db, 'contact_messages'), {
        ...messageData,
        created_at: new Date().toISOString()
      });
      return { id: docRef.id, ...messageData };
    } catch (error) {
      console.error('Error creating contact message:', error);
      return null;
    }
  }

  // News API
  async getNews() {
    try {
      const q = query(
        collection(db, 'news'),
        where('is_published', '==', true),
        orderBy('published_at', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(doc.id) || Date.now(),
          title: data.title || '',
          content: data.content || '',
          author: data.author || '',
          published_at: data.published_at || new Date().toISOString(),
          image_url: data.image_url || '',
          is_published: data.is_published || true,
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString()
        };
      });
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
      const docRef = await addDoc(collection(db, 'news'), {
        ...newsData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(docRef.id) || Date.now(),
        title: newsData.title || '',
        content: newsData.content || '',
        author: newsData.author || '',
        published_at: newsData.published_at || new Date().toISOString(),
        image_url: newsData.image_url || '',
        is_published: newsData.is_published || true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating news:', error);
      return null;
    }
  }

  async updateNews(newsData: any) {
    try {
      const newsRef = doc(db, 'news', newsData.id.toString());
      await updateDoc(newsRef, {
        ...newsData,
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(newsData.id.toString()) || newsData.id,
        title: newsData.title || '',
        content: newsData.content || '',
        author: newsData.author || '',
        published_at: newsData.published_at || new Date().toISOString(),
        image_url: newsData.image_url || '',
        is_published: newsData.is_published || true,
        created_at: newsData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating news:', error);
      return null;
    }
  }

  async deleteNews(id: number) {
    try {
      const newsRef = doc(db, 'news', id.toString());
      await deleteDoc(newsRef);
      return true;
    } catch (error) {
      console.error('Error deleting news:', error);
      return false;
    }
  }

  // Merchandise API
  async getMerchandise() {
    try {
      const q = query(collection(db, 'merchandise'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(doc.id) || Date.now(),
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
      });
    } catch (error) {
      console.error('Error getting merchandise:', error);
      return [];
    }
  }

  async createMerchandise(merchData: any) {
    try {
      const docRef = await addDoc(collection(db, 'merchandise'), {
        ...merchData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(docRef.id) || Date.now(),
        name: merchData.name || '',
        description: merchData.description || '',
        price: merchData.price || 0,
        image_url: merchData.image_url || '',
        category: merchData.category || '',
        stock_quantity: merchData.stock_quantity || 0,
        is_available: merchData.is_available || (merchData.stock_quantity > 0),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating merchandise:', error);
      return null;
    }
  }

  async updateMerchandise(merchData: any) {
    try {
      const merchRef = doc(db, 'merchandise', merchData.id.toString());
      await updateDoc(merchRef, {
        ...merchData,
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(merchData.id.toString()) || merchData.id,
        name: merchData.name || '',
        description: merchData.description || '',
        price: merchData.price || 0,
        image_url: merchData.image_url || '',
        category: merchData.category || '',
        stock_quantity: merchData.stock_quantity || 0,
        is_available: merchData.is_available || (merchData.stock_quantity > 0),
        created_at: merchData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating merchandise:', error);
      return null;
    }
  }

  async deleteMerchandise(id: number) {
    try {
      const merchRef = doc(db, 'merchandise', id.toString());
      await deleteDoc(merchRef);
      return true;
    } catch (error) {
      console.error('Error deleting merchandise:', error);
      return false;
    }
  }

  // Staff API
  async getStaff() {
    try {
      const q = query(collection(db, 'staff'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(doc.id) || Date.now(),
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
      });
    } catch (error) {
      console.error('Error getting staff:', error);
      return [];
    }
  }

  async createStaff(staffData: any) {
    try {
      const docRef = await addDoc(collection(db, 'staff'), {
        ...staffData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(docRef.id) || Date.now(),
        name: staffData.name || '',
        role: staffData.position || staffData.role || '', // Use position or role
        image: staffData.image_url || staffData.image || '', // Use image_url or image
        bio: staffData.bio || '',
        email: staffData.email || '',
        phone: staffData.phone || '',
        social_links: staffData.social_links || '{}',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating staff:', error);
      return null;
    }
  }

  async updateStaff(staffData: any) {
    try {
      const staffRef = doc(db, 'staff', staffData.id.toString());
      await updateDoc(staffRef, {
        ...staffData,
        updated_at: new Date().toISOString()
      });
      return {
        id: parseInt(staffData.id.toString()) || staffData.id,
        name: staffData.name || '',
        role: staffData.position || staffData.role || '', // Use position or role
        image: staffData.image_url || staffData.image || '', // Use image_url or image
        bio: staffData.bio || '',
        email: staffData.email || '',
        phone: staffData.phone || '',
        social_links: staffData.social_links || '{}',
        created_at: staffData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating staff:', error);
      return null;
    }
  }

  async deleteStaff(id: number) {
    try {
      const staffRef = doc(db, 'staff', id.toString());
      await deleteDoc(staffRef);
      return true;
    } catch (error) {
      console.error('Error deleting staff:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();