'use strict';

const program = require('commander'),
    _ = require('lodash'),
    path = require('path'),
    nconf = require('nconf'),
    google = require('googleapis'),
    OAuth2Client = google.auth.OAuth2,
    readPost = require('../lib/read-post'),
    co = require('co');

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

insertPostSequentially(files, 0);

// NOTE: we must insert post sequentially, otherwise, we will get Backend error
// as Google does not allow multiple inserts at the same time.
function insertPostSequentially(files, idx) {
    if (idx >= files.length) {
        return;
    }

    let file = files[idx],
        filePath = path.resolve(file);

    readPost(filePath, function(err, postContent) {
        if (err) {
            console.log('Fail to read file', filePath);
            return insertPostSequentially(files, idx + 1);
        }
        let opts = _.merge({resource: postContent}, {
            blogId: blogId,
            isDraft: isDraft
        });
        blogger.posts.insert(opts, function(err, res) {
            if (err) {
                if (err.code === 401) {
                    // TODO: if there's a way to get refresh_token, we can just refresh here.
                    console.log('Your credential has expired. Use `blogger-cli auth` to reauthorize.');
                    process.exit(0);
                }
                console.log('Fail to insert file', file, 'Error:', err);
                insertPostSequentially(files, idx + 1);
            }
            console.log(file, ': Post inserted successfully! ID =', res.id);
            insertPostSequentially(files, idx + 1);
        });
    });
}
