'use strict';

const program = require('commander');

program
    .version(require('../package.json').version)
    // TODO: support multiple files
    .command('post [file]', 'post a blogpost from a file.')
    .command('auth', 'authorize the session.')
    .parse(process.argv);


