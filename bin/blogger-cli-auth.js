'use strict';

const google = require('googleapis'),
      OAuth2Client = google.auth.OAuth2,
      nconf = require('nconf'),
      getAccessToken = require('../lib/get-access-token');

nconf.argv()
    .env();

const REDIRECT_URL = nconf.get('BLOGGER_REDIRECT_URL'),
    TOKEN_FILE = nconf.get('BLOGGER_TOKEN_FILE');

nconf.file({file: TOKEN_FILE});

const CLIENT_ID = nconf.get('BLOGGER_CLIENT_ID'),
      CLIENT_SECRET = nconf.get('BLOGGER_CLIENT_SECRET'),

      oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// retrieve an access token
getAccessToken(oauth2Client, function(tokens) {
    // TODO: check if tokens.access_code exist
    nconf.set('BLOGGER_ACCESS_TOKEN', tokens.access_token);
    nconf.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('Successfully authorized! Tokens saved to', TOKEN_FILE);
    });
});
