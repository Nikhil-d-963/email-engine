const Email = require('../models/Email');
const { fetchEmails } = require('../services/gmailService');

exports.syncEmails = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).send('User not found');
    }

    const emails = await fetchEmails(user.accessToken);
    await Email.deleteMany({ userId: userId });
    
    const emailPromises = emails.map(email => {
        return Email.create({
            userId: userId,
            messageId: email.id,
            subject: email.subject,
            sender: email.sender,
            snippet: email.snippet,
            read: email.read,
            labels: email.labels,
        });
    });

    await Promise.all(emailPromises);
    res.send('Emails synchronized');
};
