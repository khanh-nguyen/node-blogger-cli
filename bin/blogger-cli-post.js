'use strict';

const program = require('commander'),
    nconf = require('nconf'),
    async = require('async'),
    google = require('googleapis'),
    OAuth2Client = google.auth.OAuth2,
    insertPost = require('../lib/insert-post');

program
    .option('-p, --publish', 'by default a post is draft. Use this option to publish post.')
    .parse(process.argv);

let isDraft = program.publish ? false : true,
    files = program.args;

if (!files.length) {
    console.error('Files required');
    process.exit(1);
}

nconf.argv()
    .env();

const TOKEN_FILE = nconf.get('BLOGGER_TOKEN_FILE');
nconf.file({file: TOKEN_FILE});

let CLIENT_ID = nconf.get('BLOGGER_CLIENT_ID'),
    CLIENT_SECRET = nconf.get('BLOGGER_CLIENT_SECRET'),
    blogId = nconf.get('BLOG_ID'),
    accessToken = nconf.get('BLOGGER_ACCESS_TOKEN'),

    oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET),

    blogger = google.blogger({version: 'v3', auth: oauth2Client});

oauth2Client.setCredentials({access_token: accessToken});

// NOTE: we must insert posts sequentially,
// otherwise, we'll get Backend error.
async.eachSeries(files, function(file, done) {
   insertPost(file, blogger, blogId, isDraft, done);
});
