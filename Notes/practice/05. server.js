const http = require('http');

const server = http.createServer(
    (request, response) => {
        console.log('request url is : ', request.url);
        switch (request.url) {
            case '/text': {
                response.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                response.end('This is the first response from the server..')
            }
                break;
            case '/json': {
                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                response.end(JSON.stringify({
                    name: 'pratik',
                    id: 123
                }));
            }
                break;
            case '/object': {
                request.on('data', (data) => {
                    console.log(`Object is : ${JSON.stringify(JSON.parse(data.toString()))}`);
                });
                response.end('Object has been logged in the console please check server logs');
            }
                break;
            case '/array': {
                request.on('data', (data) => {
                    console.log(`Array is : ${data}`);
                });
                response.end('Object has been logged in the console please check server logs');
            }
            default: {
                response.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                response.end('nothing to send this is empty response');
            }
        }
    }
);

server.listen(3000, () => {
    console.log('server started at port number 3000');
});