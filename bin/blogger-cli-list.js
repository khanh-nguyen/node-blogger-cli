'use strict';

const program = require('commander'),
    blogger = require('../lib/config').blogger,
    blogId = require('../lib/config').blogId,
    _ = require('lodash'),
    moment = require('moment'),
    Table = require('cli-table');

program
    .option('--endDate <date>', 'last date to fetch')
    .option('--labels <labels>', 'comma-separated list of lables' )
    .option('--maxResults <n>', 'maximum number of posts to fetch')
    // TODO .option('--orderBy <string>', 'sort search results')
    .option('--startDate <date>', 'earliest post date to fetch')
    .option('--status <status>', 'statuses to include in the results')
    .parse(process.argv);

if (program.status && program.status !== 'draft' && program.status !== 'live') {
    console.log('Status can only be either `draft`, `live` or undefined but given', program.status);
    process.exit(1);
}

let maxResults = parseInt(program.maxResults) || 5,
    opts = {
        blogId: blogId,
        fetchBodies: false,
        fetchImages: false,
        maxResults: maxResults,
        fields: 'items(id,title,published)',
        endDate: validateDate(program.endDate),
        labels: program.labels,
        startDate: validateDate(program.startDate),
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

    displayResult(data);
});

function validateDate(dateStr) {
    if (!dateStr) {
        return undefined;
    }

    let validDate = moment(dateStr).format('YYYY-MM-DDThh:mm:ss-hh:mm');
    if (validDate === 'Invalid date') {
        console.log('Invalid date string.', dateStr);
        process.exit(1);
    }

    return validDate;
}

function displayResult(data) {
    let table = new Table({
            head: ["No.", "ID", "Title", "Published"],
            colWidths: [5, 22, 100, 18]
        }),
        idx = 1;
    _.each(data.items, function(item) {
        table.push([idx++, item.id, item.title, moment(item.published).format('ddd YYYY-MM-DD')]);
    });
    console.log(table.toString());
}
