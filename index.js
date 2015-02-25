'use strict';

/**
 * Scenario:
 * $ node-blogger-cli post file.post
 * $ node-blogger-cli listPost
 * $ node-blogger-cli preview file.post
 */
let nconf = require('nconf');
//    gapi = require('gapi'),
//    url = require('url');

nconf.argv()
     .env();

let apiKey = nconf.get('GOOGLE_API_KEY'),
    request = require('request'),
    clientID = 'xxx';

gapi.client.setApiKey(apiKey);

function auth(clientId) {
  var config = {
    'client_id': clientId,
    'scope': 'https://www.googleapis.com/auth/blogger'
  };
  gapi.auth.authorize(config, function() {
    console.log('login complete');
    console.log(gapi.auth.getToken());
  });
}

auth(clientID);


request.post(
    {
        url: 'https://www.googleapis.com/blogger/v3/blogs/6874707406485433326/posts?fetchBody=true&isDraft=true&key=' + apiKey,
        form: {
            labels: ['nodejs', 'sandbox'],
            title: 'Test API',
            content: 'This is a test from sandbox'
        },
        auth: {
            bearer: 'ya29.IgFKuBmWk52yxaPYUIJCQ6mOTu8DELt4Wf3HwiUKs4AJ1daWrlPTYT2UbFQrHoMnE1Ula750Zoui0w'
        }

    },
    function(error, response) {
        if (error) {
            console.log('got error');
            throw error;
        }

        if (!error) {
            console.log('Mission completed!', response.statusCode);
        }
    }
);

