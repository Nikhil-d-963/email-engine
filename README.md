# Email Engine Application

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
2. **MongoDB**: Ensure you have MongoDB installed and running. You can use MongoDB Atlas (a cloud service) or install it locally from [here](https://www.mongodb.com/try/download/community).
3. **Google Cloud Project**: Ensure you have a Google Cloud Project set up with OAuth 2.0 credentials for your application.

## Step-by-Step Guide

### 1. Clone the Repository

Clone your project repository to your local machine:
git clone https://github.com/your-username/your-repository.git
cd your-repository

2. Install Dependencies
Navigate to the backend directory and install the necessary dependencies:
cd backend
npm install

4. Set Up Environment Variables
Create a .env file in the backend directory to store your environment variables. Replace the placeholders with your actual values:
touch .env

Add the following content to the .env file:
MONGO_URI=your-mongodb-uri
CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
REDIRECT_URI=http://localhost:3000/auth/callback
TOKEN_URI=https://oauth2.googleapis.com/token
AUTH_URI=https://accounts.google.com/o/oauth2/auth
SCOPES=https://www.googleapis.com/auth/gmail.readonly


4. Start MongoDB
If you are running MongoDB locally, make sure your MongoDB server is running:
mongod

6. Start the Backend Server
Start your Node.js backend server:
node app.js

6. Access the Application
Open your browser and navigate to http://localhost:3000.

File Structure
Here is the file structure of your project for reference:
```
your-repository/
├── backend/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── emailController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Email.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── emailRoutes.js
│   ├── utils/
│   │   └── tokenUtils.js
│   ├── app.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── index.html
    └── sync.html

```

Google OAuth2 Setup
Ensure your Google Cloud Project is correctly set up for OAuth 2.0:

Create OAuth 2.0 Credentials: Go to the Google Cloud Console, navigate to APIs & Services > Credentials, and create OAuth 2.0 Client IDs.
Authorized Redirect URIs: Make sure http://localhost:3000/auth/callback is added as an authorized redirect URI.
Running Tests
To test the OAuth2 flow using curl commands:

Step 1: Generate Authorization URL
Visit this URL in your browser, log in, and authorize the application to get an authorization code:\
https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/auth/callback&response_type=code&scope=https://www.googleapis.com/auth/gmail.readonly
Step 2: Exchange Authorization Code for Access Token
Use the following curl command to exchange the authorization code for an access token:
```
curl -X POST "https://oauth2.googleapis.com/token" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "code=YOUR_AUTHORIZATION_CODE" \
-d "client_id=YOUR_CLIENT_ID" \
-d "client_secret=YOUR_CLIENT_SECRET" \
-d "redirect_uri=http://localhost:3000/auth/callback" \
-d "grant_type=authorization_code"
Step 3: Access Gmail API
Use the access token obtained in the previous step to access the Gmail API:
```
```
curl -X GET "https://www.googleapis.com/gmail/v1/users/me/messages" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
