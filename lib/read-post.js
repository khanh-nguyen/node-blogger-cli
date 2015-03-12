'use strict';

/**
 * == Post format ==:
 *      title : A title here
 *      labels : keywords, separated, by, commas
 *      * === *
 *      Content goes here
 */

const readline = require('readline'),
    fs = require('fs'),
    FIELD_SEPARATOR = '* === *',
    _ = require('lodash');

/**
 * @description parse a file content to get information about a post
 * @param {string} fileContent post content in a specific format
 * @param {function} cb a callback function
 */
module.exports = function readPost(filePath, cb) {
    if (!fs.existsSync(filePath)) {
        let err = new Error('File does not exist: ' + filePath);
        return cb(err);
    }

    if (fs.lstatSync(filePath).isDirectory()) {
        let err = new Error('Expect file but directory was given: ' + filePath);
        return cb(err);
    }

    let post = {
            title: '',
            labels: null,
            content: ''
        },
        hasContent = false,
        rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            terminal: false
        });

    rl.on('line', function(line) {
        if (hasContent) {
            post.content += line + '\n';
            return;
        }

        if (line === FIELD_SEPARATOR) {
            hasContent = true;
            return;
        }

        // Assumption: `:` is not used as a separate word in title or labels
        line = line.trim();
        let fields = line.split(':'),
            key = fields[0].trim();

        if (!_.has(post, key)) {
            throw new Error('Invalid file format.' + line);
        }

        post[key] = processValue(key, fields[1]);
    });

    rl.on('close', function() {
        cb(null, post);
    });
}

function processValue(key, value) {
    if (key === 'title') {
        return value.trim();
    }
    else if (key === 'labels') {
        return _.map(value.split(','), function(word) { return word.trim();});
    }
    else {
        throw new Error('Key must be either `title` or `labels`, but given ' + key);
    }
}
