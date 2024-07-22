const { google } = require('googleapis');
const config = require('../config/config');

const oauth2Client = new google.auth.OAuth2(
    config.clientId,
    config.clientSecret,
    config.redirectUri
);

exports.getGmailClient = (accessToken) => {
    oauth2Client.setCredentials({ access_token: accessToken });
    return google.gmail({ version: 'v1', auth: oauth2Client });
};

exports.fetchUserInfo = async (oauth2Client) => {
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    return { email: data.email };
};

exports.fetchEmails = async (accessToken) => {
    const gmail = exports.getGmailClient(accessToken);
    const { data } = await gmail.users.messages.list({ userId: 'me' });

    const emails = await Promise.all(data.messages.map(async (msg) => {
        const { data: msgData } = await gmail.users.messages.get({ userId: 'me', id: msg.id });
        const headers = msgData.payload.headers.reduce((acc, header) => {
            acc[header.name] = header.value;
            return acc;
        }, {});
        return {
            id: msg.id,
            subject: headers['Subject'] || 'No Subject',
            sender: headers['From'] || 'Unknown',
            snippet: msgData.snippet,
            read: msgData.labelIds.includes('UNREAD') ? false : true,
            labels: msgData.labelIds,
        };
    }));

    return emails;
};
