const http = require('http');
const fs = require('fs');

let server = http.createServer(function(req, res){
    console.log('Request came on url: ', req.url, ' with method:', req.method);
    if (req.method === 'GET') {
        let fileName = '.' + req.url;
        if (req.url === '/') {
            fileName = './index.html';
        }
        fs.readFile(fileName, function (err, content) {
            if (err) {
                res.writeHead(404);
            } else {
                res.writeHead(200);
                res.write(content.toString());
            }
            res.end();
        });
    } else if (req.method === 'POST') {
        let chunks = [];
        req.on("data", (chunk) => {
            chunks.push(chunk);
        });
        req.on("end", () => {
            const data = Buffer.concat(chunks);
            const newTodo = data.toString();
            const dbBuffer = fs.readFileSync('./db.json');
            const existingTodos = JSON.parse(dbBuffer.toString());
            existingTodos.push(newTodo);
            fs.writeFileSync('./db.json', JSON.stringify(existingTodos));
            res.write('Todo Added');
            res.end();
        });
        req.on('error', function(){
            res.write('Some Error Occured');
            res.end();
        })
    }
});

server.listen(3000, function(){
    console.log('port opened at ' + 3000);
});