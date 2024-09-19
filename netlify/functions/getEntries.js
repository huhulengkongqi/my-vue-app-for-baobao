const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async function () {
    const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

    try {
        const result = await client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection('entries'))),
                q.Lambda('ref', q.Get(q.Var('ref')))
            )
        );

        const entries = result.data.map(item => item.data);

        return {
            statusCode: 200,
            body: JSON.stringify({ entries }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};
