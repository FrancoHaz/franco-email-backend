const { google } = require('googleapis');
const { createOAuthClient } = require('../config/googleClient');

async function listInboxMessages(tokens, maxResults = 10) {
  const oauth2Client = createOAuthClient();
  oauth2Client.setCredentials(tokens);

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const listRes = await gmail.users.messages.list({
    userId: 'me',
    maxResults
  });

  const messages = listRes.data.messages || [];
  const results = [];

  for (const msg of messages) {
    const full = await gmail.users.messages.get({
      userId: 'me',
      id: msg.id,
      format: 'metadata',
      metadataHeaders: ['Subject', 'From', 'Date']
    });

    const headers = full.data.payload.headers;
    const get = (name) =>
      headers.find((h) => h.name === name)?.value || '';

    results.push({
      id: msg.id,
      subject: get('Subject'),
      from: get('From'),
      date: get('Date'),
      snippet: full.data.snippet || ''
    });
  }

  return results;
}

module.exports = {
  listInboxMessages
};
