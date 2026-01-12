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
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
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
      return { id: docRef.id, ...eventData };
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
      return { id: eventData.id, ...eventData };
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
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
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
      const docRef = await addDoc(collection(db, 'artists'), {
        ...artistData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return { id: docRef.id, ...artistData };
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
      return { id: artistData.id, ...artistData };
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
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting donations:', error);
      return [];
    }
  }

  async createDonation(donationData: any) {
    try {
      const docRef = await addDoc(collection(db, 'donations'), {
        ...donationData,
        status: 'completed',
        created_at: new Date().toISOString()
      });
      return { id: docRef.id, ...donationData, status: 'completed' };
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
      return { id: donationData.id, ...donationData };
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
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
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
      const docRef = await addDoc(collection(db, 'news'), {
        ...newsData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return { id: docRef.id, ...newsData };
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
      return { id: newsData.id, ...newsData };
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
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
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
      return { id: docRef.id, ...merchData };
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
      return { id: merchData.id, ...merchData };
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
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
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
      return { id: docRef.id, ...staffData };
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
      return { id: staffData.id, ...staffData };
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