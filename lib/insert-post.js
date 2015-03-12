'use strict';

var readPost = require('./read-post'),
    path = require('path'),
    _ = require('lodash');

module.exports = function insertPosts(file, blogger, blogId, isDraft, done) {
    var filePath = path.resolve(file);

    readPost(filePath, function(err, postContent) {
        if (err) {
            console.log(err);
            return done();
        }
        var opts = _.merge({resource: postContent}, {
            blogId: blogId,
            isDraft: isDraft
        });
        blogger.posts.insert(opts, function(err, res) {
            if (err) {
                if (err.code === 401) {
                    console.log('Your credential has expired. Use `blogger-cli auth` to reauthorize.');
                    process.exit(0);
                }
                console.log('Fail to insert file', file, 'Error:', err);
                return done();
            }
            console.log(file, ': Post inserted successfully! ID =', res.id);
            done();
        });
    });
}
