const { OAuth2Client } = require('google-auth-library');
const config = require('../config/config');
const User = require('../models/User');
const { getGmailClient, fetchUserInfo } = require('../services/gmailService');

const oauth2Client = new OAuth2Client(config.clientId, config.clientSecret, config.redirectUri);

exports.authenticateUser = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: config.scopes,
    });
    res.redirect(authUrl);
};

exports.callback = async (req, res) => {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user info from Gmail
    const userInfo = await fetchUserInfo(oauth2Client);

    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
        user = new User({
            localId: new mongoose.Types.ObjectId().toString(),
            email: userInfo.email,
            accessToken: tokens.access_token,
        });
        await user.save();
    } else {
        user.accessToken = tokens.access_token;
        await user.save();
    }

    res.redirect('/data');
};
