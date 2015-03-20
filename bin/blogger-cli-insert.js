'use strict';

const program = require('commander'),
    config = require('../lib/config'),
    async = require('async'),
    google = require('googleapis'),
    oauth2Client = require('../lib/config').oauth2Client,
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

let blogId = config.get('BLOG_ID'),
    blogger = google.blogger({version: 'v3', auth: oauth2Client});

// NOTE: we must insert posts sequentially,
// otherwise, we'll get Backend error.
async.eachSeries(files, function(file, done) {
   insertPost(file, blogger, blogId, isDraft, done);
});
