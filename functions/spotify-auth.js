const axios = require('axios');
const querystring = require('querystring');

exports.handler = async (event, context) => {
    const code = JSON.parse(event.body).code;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUrl = process.env.REDIRECT_URL;

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUrl,
            client_id: clientId,
            client_secret: clientSecret
        }));

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Permitir acceso desde cualquier origen
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            body: JSON.stringify({ accessToken: response.data.access_token })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Permitir acceso desde cualquier origen
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            body: 'Error fetching token'
        };
    }
};
