var http = require('http');

http.createServer(onRequest).listen(8080);

function onRequest(request, response) {
    const { url } = request.url.split('?')[1].split('&').reduce((acc, param) => {
        const [key, value] = param.split('=');
        return { ...acc, [key]: value };
    }, {});

    if (!url) {
        response.end('url params is reqired');
    } else {
        const decodedUrl = decodeURIComponent(url);

        response.end(JSON.stringify({ url: decodedUrl }));
    }
}
