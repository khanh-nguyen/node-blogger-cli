'use strict';

const program = require('commander'),
    blogger = require('../lib/config').blogger,
    blogId = require('../lib/config').blogId;

program.parse(process.argv);

let id = program.args[0];

if (!id) {
    console.log('post ID is required');
    return program.outputHelp();
}

if (id.length !== 19 || isNaN(id)) {
    console.log('Incorrect format of post ID');
    return;
}

blogger.posts.delete({blogId: blogId, postId: id}, function(err) {
   if (err) {
       console.log('Cannot delete post', id);
       console.log(err);
       return;
   }

   console.log('Successfully deleted post', id);
});



