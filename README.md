# Notes

## Installation

Provide step-by-step instructions on how to set up and run your project locally. Include any dependencies that need to be installed and configuration steps.

```bash
# Clone the repository
git clone https://github.com/nullnord/backend-notes.git

# Change to the project directory
cd backend-notes

# Install dependencies
npm install

# Create a .env file and add your environment variables
# Example .env file:
# PORT=3000
# MONGODB_URI=your-mongodb-uri
# JWT_SECRET=your-secret-key

# Start the server
npm start

```
# API Endpoints (as requested)
Authentication Endpoints

```
POST /api/auth/signup: create a new user account.
POST /api/auth/login: log in to an existing user account and receive an access token.
Note Endpoints

GET /api/notes: get a list of all notes for the authenticated user.
GET /api/notes/:id: get a note by ID for the authenticated user.
POST /api/notes: create a new note for the authenticated user.
PUT /api/notes/:id: update an existing note by ID for the authenticated user.
DELETE /api/notes/:id: delete a note by ID for the authenticated user.
POST /api/notes/:id/share: share a note with another user for the authenticated user.
GET /api/search?q=:query: search for notes based on keywords for the authenticated user```

```
```
api
└── v1
    ├── controllers
    │   ├── authController.js
    │   └── noteController.js
    ├── models
    │   ├── note.js
    │   └── user.js
    └── routes
        ├── authRoute.js
        └── noteRoutes.js
lib
└── middleware
    └── middleware.js
.env
server.js
```


