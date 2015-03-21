'use strict';

const program = require('commander'),
    blogger = require('../lib/config').blogger,
    blogId = require('../lib/config').blogId,
    _ = require('lodash');

program
    .option('--endDate <date>', 'last date to fetch')
    .option('--labels <labels>', 'comma-separated list of lables' )
    .option('--maxResults <n>', 'maximum number of posts to fetch')
    // TODO .option('--orderBy <string>', 'sort search results')
    .option('--startDate <date>', 'earliest post date to fetch')
    .option('--status <status>', 'statuses to include in the results')
    .parse(process.argv);

if (program.endDate) {
    validateDate(program.endDate);
}

if (program.startDate) {
    validateDate(program.startDate);
}

if (program.status && program.status !== 'draft' && program.status !== 'live') {
    console.log('Status can only be either `draft`, `live` or undefined but given', program.status);
    process.exit(1);
}

let maxResults = program.maxResults || 5,
    opts = {
        blogId: blogId,
        fetchBodies: false,
        fetchImages: false,
        maxResults: maxResults,
        fields: 'items(id,title,status,published)',
        endDate: program.endDate,
        labels: program.labels,
        startDate: program.startDate,
        status: program.status
    },
    params = _.reduce(opts, function(accum, val, key) {
        if (val !== undefined) {
            accum[key] = val;
        }
        return accum;
    }, {});

blogger.posts.list(params, function(err, data) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Result', data);
    // TODO: displayResult(data)
});

// TODO: verify that string is a validated date
function validateDate(dateStr) {
    return true;
}

// display result nicely
function displayResult(data) {

}
