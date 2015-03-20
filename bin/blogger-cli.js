'use strict';

const program = require('commander');

program
    .version(require('../package.json').version)
    // TODO: support multiple files
    .command('insert [file]', 'insert post(s) from file(s).')
    .command('delete [id]', 'delete post by ID.')
    .command('auth', 'authorize the session.')
    .parse(process.argv);


