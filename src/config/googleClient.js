const { google } = require('googleapis');
const config = require('./env');

function createOAuthClient() {
  return new google.auth.OAuth2(
    config.clientId,
    config.clientSecret,
    config.redirectUri
  );
}

module.exports = {
  createOAuthClient
};
