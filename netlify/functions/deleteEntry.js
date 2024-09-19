const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../entries.json');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { index } = JSON.parse(event.body);

    if (typeof index !== 'number') {
        return { statusCode: 400, body: 'Invalid index' };
    }

    let entries = [];
    if (fs.existsSync(filePath)) {
        entries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    if (index >= 0 && index < entries.length) {
        entries.splice(index, 1); // 删除指定条目
        fs.writeFileSync(filePath, JSON.stringify(entries));
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Entry deleted', entries }),
    };
};
