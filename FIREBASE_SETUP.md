# Firebase Setup Guide for Hip-Hop Foundation Website

This guide explains how to set up and configure Firebase for the Hip-Hop Foundation website, which is built with Next.js.

## Current Firebase Configuration

Firebase is already integrated into the project with the following configuration:

### Firebase SDK Installation
The project already has Firebase installed as a dependency:
```bash
npm install firebase
```

### Firebase Configuration File
Located at `src/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
```

## Setting Up Firebase in Your Project

### Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the setup wizard
3. Choose your Google Analytics account (optional)
4. Click "Create Project"

### Step 2: Configure Firebase for Web

1. In your Firebase project dashboard, click the "</>" icon to add a web app
2. Register your app with a nickname (e.g., "hip-hop-foundation-web")
3. Skip the Firebase SDK snippet download step (we'll handle this differently)

### Step 3: Get Firebase Configuration Values

After registering your web app, you'll receive a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};
```

### Step 4: Set Up Environment Variables

Create or update your `.env.local` file in the project root with the following variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456789
```

**Important Notes:**
- Prefix all Firebase environment variables with `NEXT_PUBLIC_` so they're available on the client side
- Never commit your actual API keys to version control
- Store the `.env.local` file in your `.gitignore`

## Using Firebase in Components

### Example: Reading Data from Firestore

```typescript
'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Artist {
  id: string;
  name: string;
  bio: string;
  genre: string;
  image_url: string;
  is_featured: boolean;
}

const ArtistsPage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const q = query(collection(db, 'artists'), orderBy('name'));
        const querySnapshot = await getDocs(q);
        const artistsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Artist[];
        
        setArtists(artistsData);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <div>Loading artists...</div>;
  }

  return (
    <div>
      <h1>Artists</h1>
      {artists.map(artist => (
        <div key={artist.id}>
          <h2>{artist.name}</h2>
          <p>{artist.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default ArtistsPage;
```

### Example: Writing Data to Firestore

```typescript
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface NewArtist {
  name: string;
  bio: string;
  genre: string;
  image_url: string;
  is_featured: boolean;
}

const createArtist = async (artistData: NewArtist) => {
  try {
    const docRef = await addDoc(collection(db, 'artists'), {
      ...artistData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    
    console.log('Artist added with ID:', docRef.id);
    return { id: docRef.id, ...artistData };
  } catch (error) {
    console.error('Error adding artist:', error);
    throw error;
  }
};
```

## Firebase Services Used in This Project

### Firestore Database
- Used for storing artists, events, donations, news, merchandise, and staff information
- Collections include: `artists`, `events`, `donations`, `news`, `merchandise`, `staff`, `contact_messages`

### Authentication
- Firebase Authentication is set up for user management
- Located in `src/lib/firebase.ts`

## Firestore Security Rules

Set up your Firestore security rules in the Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
      
      // Allow write access only to authenticated users
      allow write: if request.auth != null;
    }
    
    // Specific rules for contact messages (allow creation without auth)
    match /contact_messages/{messageId} {
      allow read, write: if request.auth != null;
      allow create: if true;  // Allow anyone to submit contact form
    }
    
    // Specific rules for donations (allow creation without auth)
    match /donations/{donationId} {
      allow read: if true;
      allow write: if request.auth != null;
      allow create: if true;  // Allow anyone to make donations
    }
  }
}
```

## Environment-Specific Configuration

For different environments (development, staging, production), you can create separate Firebase projects and use different environment variable files:

- `.env.development` for development
- `.env.staging` for staging
- `.env.production` for production

## Troubleshooting Common Issues

### 1. Environment Variables Not Working
- Make sure variables are prefixed with `NEXT_PUBLIC_`
- Restart your development server after changing environment variables
- Check that your `.env.local` file is in the project root

### 2. Firestore Connection Errors
- Verify your Firebase configuration is correct
- Check that your security rules allow the operations you're trying to perform
- Ensure your Firebase project is properly initialized

### 3. Build Errors
- Make sure all Firebase imports are properly handled in client-side components
- Use `'use client'` directive at the top of components that use Firebase

## Best Practices

1. **Security**: Always validate and sanitize data before writing to Firestore
2. **Performance**: Use queries efficiently and implement pagination for large datasets
3. **Environment Variables**: Never hardcode Firebase configuration values
4. **Error Handling**: Implement proper error handling for all Firebase operations
5. **Authentication**: Protect sensitive data by requiring authentication for write operations

## Deployment

When deploying your Next.js application:
1. Ensure your environment variables are set in your hosting platform (Vercel, Netlify, etc.)
2. Verify that your Firebase project is properly configured for the production environment
3. Test all Firebase-dependent features after deployment