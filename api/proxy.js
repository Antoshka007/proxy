const https = require('https');

export default function handler(request, response) {
    const { url } = request.url.split('?')[1].split('&').reduce((acc, param) => {
        const [key, value] = param.split('=');
        return { ...acc, [key]: value };
    }, {});

    if (!url) {
        response.end('url param is reqired');
        return;
    }

    const decodedUrl = decodeURIComponent(url);
    const options = { method: 'GET' };
    const proxy = https.request(decodedUrl, options, (res) => {
        response.writeHead(res.statusCode, {
            ...res.headers,
            'Access-Control-Allow-Origin': '*',
        });
        res.pipe(response, { end: true });
    });

    request.pipe(proxy, { end: true });
}
