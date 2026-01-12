# Hip-Hop Foundation Website

A dynamic, full-stack web application for the Hip-Hop Foundation, featuring a Next.js frontend with Firebase integration and FastAPI backend.

Project Name in Firebase: hip-hop-movement-4241f

## Features

- Dynamic content management through FastAPI backend and Firebase Firestore
- Artist profiles and information
- Event listings and management
- Donation system
- Contact form with message management
- Admin dashboard for content management
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Database**: Firebase Firestore (primary), SQLite (backup)
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth and JWT tokens with bcrypt password hashing

## Project Structure

```
hip-hop-foundation/
├── backend/                 # FastAPI backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── database/           # Database utilities
│   ├── utils/              # Utility functions
│   ├── main.py             # Main application file
│   ├── config.py           # Configuration settings
│   └── requirements.txt    # Python dependencies
├── src/                    # Next.js frontend source
│   ├── app/               # Application pages
│   └── services/          # API service
├── package.json           # Node.js dependencies
└── start_app.bat          # Startup script (Windows)
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Backend Setup (Windows)

1. Install Python dependencies:
```bash
npm run backend-install
```

2. Start the backend server:
```bash
npm run backend-dev
```

Alternative command:
```bash
cd backend && python run_app.py
```

The backend will start on `http://localhost:8000`

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### Complete Setup (Windows)

Run the combined startup script:
```bash
start_app.bat
```

This will start both the backend and frontend applications.

**Note**: If you encounter API connection errors, it's likely because the backend server is not running. Make sure to start the backend first:

1. Open a terminal/command prompt and navigate to the project directory
2. Start the backend: `npm run backend-dev` or `cd backend && python run_app.py`
3. In a new terminal, start the frontend: `npm run dev`

### Environment Variables

The application uses environment variables for configuration:

Backend (backend/.env):
- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: JWT secret key
- `ADMIN_EMAIL`: Initial admin user email
- `ADMIN_PASSWORD`: Initial admin user password

Frontend (.env.local):
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase app ID

### Firebase Integration

The frontend uses Firebase for real-time data storage and retrieval. The following collections are managed in Firestore:

- `artists`: Information about featured artists
- `events`: Event listings and details
- `donations`: Donation records and information
- `news`: News articles and updates
- `merchandise`: Available merchandise items
- `staff`: Staff member information
- `contact_messages`: Messages submitted through the contact form

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Artists
- `GET /api/artists/` - Get all artists
- `POST /api/artists/` - Create an artist
- `GET /api/artists/{id}` - Get specific artist
- `PUT /api/artists/{id}` - Update an artist
- `DELETE /api/artists/{id}` - Delete an artist

### Events
- `GET /api/events/` - Get all events
- `POST /api/events/` - Create an event
- `GET /api/events/{id}` - Get specific event
- `PUT /api/events/{id}` - Update an event
- `DELETE /api/events/{id}` - Delete an event

### Donations
- `GET /api/donations/` - Get all donations
- `POST /api/donations/` - Create a donation
- `GET /api/donations/{id}` - Get specific donation

### Contact
- `POST /api/contact/` - Submit a contact message
- `GET /api/contact/` - Get contact messages (admin only)

### Admin
- `GET /api/admin/stats` - Get site statistics
- `GET /api/admin/users` - Get all users (admin only)

## Admin Access

An initial admin user is created during database initialization with:
- Email: `admin@hiphopfoundation.org`
- Password: `adminpassword123`

**Important**: Change these credentials immediately in production.

## Database Initialization

The database is automatically initialized when the application starts. Tables are created if they don't exist, and an initial admin user is created.

## Running in Production

For production deployment:
1. Update environment variables with production values
2. Change the JWT secret and admin credentials
3. Consider using PostgreSQL instead of SQLite
4. Set up proper SSL certificates
5. Use a process manager like PM2 for the backend

## Development

The backend and frontend run independently and communicate via HTTP requests. Both have hot-reloading capabilities for development.

## License

This project is licensed under the MIT License.