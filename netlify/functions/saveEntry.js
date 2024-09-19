const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../entries.json');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { content } = JSON.parse(event.body);
    if (!content) {
        return { statusCode: 400, body: 'Invalid input' };
    }

    const date = new Date().toLocaleString();

    let entries = [];
    if (fs.existsSync(filePath)) {
        entries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    entries.push({ date, content });

    fs.writeFileSync(filePath, JSON.stringify(entries));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Entry saved', entries }),
    };
};
