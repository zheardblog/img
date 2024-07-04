const axios = require('axios');
const querystring = require('querystring');

exports.handler = async (event, context) => {
    const code = JSON.parse(event.body).code;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: 36fed23316dd4c06a45252b4c807a13d,
            client_secret: e0d59a88062c417fb898e6b851a0777c
        }));
        return {
            statusCode: 200,
            body: JSON.stringify({ accessToken: response.data.access_token })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Error fetching token'
        };
    }
};
