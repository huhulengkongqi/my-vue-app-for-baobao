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
            q.Delete(q.Select("ref", q.Get(q.Match(q.Index("entry_by_index"), data.index))))
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Entry deleted', entry: result.data }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};
