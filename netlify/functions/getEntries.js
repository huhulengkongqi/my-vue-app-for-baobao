const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../entries.json');

exports.handler = async function (event, context) {
    let entries = [];
    if (fs.existsSync(filePath)) {
        entries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ entries }),
    };
};
