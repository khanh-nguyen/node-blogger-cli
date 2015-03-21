'use strict';

const program = require('commander');

program
    .version(require('../package.json').version)
    // TODO: support multiple files
    .command('insert [file]', 'insert post(s) from file(s).')
    .command('delete [id]', 'delete post by ID.')
    .command('list', 'list posts on the blog.')
    .command('auth', 'authorize the session.')
    .parse(process.argv);


