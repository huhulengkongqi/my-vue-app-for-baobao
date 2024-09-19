const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

    try {
        const result = await client.query(
            q.Create(
                q.Collection('entries'),
                {
                    data: { content: data.content, date: new Date().toISOString() },
                }
            )
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Entry saved', entry: result.data }),
        };
    } catch (error) {
        console.error('Error:', error); // 添加详细错误信息
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
