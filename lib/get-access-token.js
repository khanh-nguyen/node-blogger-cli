'use strict';

let readline = require('readline-sync'),
    url = require('url'),
    Nightmare = require('nightmare'),
    oauth2Client = require('./config').oauth2Client;

module.exports = function getAccessToken(cb) {
    // generate consent page url
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', // will return a refresh token
        scope: 'https://www.googleapis.com/auth/blogger'
    });

    console.log('Authorization in process ...');
    const email = readline.question('Enter your email address:'),
        password = readline.question('Enter your password:', {noEchoBack: true});

    new Nightmare()
        .goto(authUrl)
        .wait('input[type=email]')
        .type('input[type=email]', email)
        .type('input[type=password]', password)
        .click('input[type=submit]')
        .wait()
        .url(function(codeUrl) {
            // TODO: check error here
            let code = url.parse(codeUrl, true).query.code;
            oauth2Client.getToken(code, function(err, tokens) {
                if (err) {
                    throw new Error('Cannot get token. Make sure your username and password are correct.');
                }
                cb(tokens);
            });
        })
        .run(function (err, nightmare) {
            if (err) {
                throw new Error('PhantomJS failed ' + err);
            }
        });
}
