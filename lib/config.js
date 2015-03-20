'use strict';

const nconf = require('nconf'),
    google = require('googleapis'),
    OAuth2Client = google.auth.OAuth2;

nconf.argv()
    .env();

const TOKEN_FILE = nconf.get('BLOGGER_TOKEN_FILE');
nconf.file({file: TOKEN_FILE});

let CLIENT_ID = nconf.get('BLOGGER_CLIENT_ID'),
    CLIENT_SECRET = nconf.get('BLOGGER_CLIENT_SECRET'),
    REDIRECT_URL = nconf.get('BLOGGER_REDIRECT_URL'),
    accessToken = nconf.get('BLOGGER_ACCESS_TOKEN'),

    oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.setCredentials({access_token: accessToken});

module.exports = nconf;
module.exports.oauth2Client = oauth2Client;
