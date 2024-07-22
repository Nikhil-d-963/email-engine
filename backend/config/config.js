module.exports = {
    mongoURI: 'your-mongodb-uri',
    clientId: 'your-gmail-client-id',
    clientSecret: 'your-gmail-client-secret',
    redirectUri: 'http://localhost:3000/auth/callback',
    tokenUri: 'https://oauth2.googleapis.com/token',
    authUri: 'https://accounts.google.com/o/oauth2/auth',
    scopes: ['https://www.googleapis.com/auth/gmail.readonly']
};
