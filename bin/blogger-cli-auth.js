'use strict';

const config = require('../lib/config'),
      getAccessToken = require('../lib/get-access-token');

// retrieve an access token
getAccessToken(function(tokens) {
    // TODO: check if tokens.access_code exist
    config.set('BLOGGER_ACCESS_TOKEN', tokens.access_token);
    config.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('Successfully authorized! Tokens saved to', config.get('BLOGGER_TOKEN_FILE'));
    });
});
