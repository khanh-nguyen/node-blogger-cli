'use strict';

const program = require('commander'),
    blogger = require('../lib/config').blogger,
    blogId = require('../lib/config').blogId,
    readline = require('readline-sync');

program.parse(process.argv);

const id = program.args[0];

if (!id) {
    console.log('post ID is required');
    return program.outputHelp();
}

if (id.length !== 19 || isNaN(id)) {
    console.log('Incorrect format of post ID');
    return;
}

// FIXME: posts.get cannot get a DRAFT post
blogger.posts.get({
    blogId: blogId,
    postId: id,
    fetchBody:false,
    fetchImages: false,
    fields: 'title'
}, function(err, post) {
    if (err) {
        if (err.code === 404) {
            console.log('Post with ID', id, 'does not exist.');
            process.exit(1);
        }
        console.log(err);
        process.exit(1);
    }

    const title = post.title;
    while(true) {
        const ans = readline.question('Are you sure you want to delete the post: "' + title + '" ?[y/n]');
        if (ans === 'n') {
            process.exit(0);
        }

        if (ans === 'y') {
            return blogger.posts.delete({blogId: blogId, postId: id}, function(err) {
                if (err) {
                    console.log('Cannot delete post', id);
                    console.log(err);
                    return;
                }

                console.log('Successfully deleted post', id);
            });
        }

        console.log('Please choose either `y` or `n`.');
    }
});





