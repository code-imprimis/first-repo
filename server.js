const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function(request, response){
    console.log('request came', request.url, request.method);
    if (request.method === 'GET') {
        try {
            let fileName = path.join(__dirname, request.url);
            if (request.url === '/') {
                fileName += 'index.html';
            }
            console.log('Getting file: ', fileName);
            const content = fs.readFileSync(fileName);
            response.write(content.toString());
        } catch (e) {
            console.error(e);
            response.statusCode = 404;
            response.end();
        }
    } else if (request.method === 'POST') {
        let packets = [];
        // Packet Came
        request.on('data', function(packet) {
            packets.push(packet);
            console.log('PACKET PUSHED');
        });
        // Packets ended
        request.on('end', function(){
            try {
                // Joining packets
                const finalContent = Buffer.concat(packets);
                // Converting Packet Buffer to string
                const todo = finalContent.toString();
                // Reading old todo from db.json and converting it to json format
                let fileBuffer = fs.readFileSync('./db.json');
                let oldTodos = JSON.parse(fileBuffer.toString());
                // Pushing new todo to oldTodos json array
                oldTodos.push(todo);
                // converting json to string and writing it in the file
                fs.writeFileSync('./db.json', JSON.stringify(oldTodos));
            } catch(e) {
                console.error(e);
            }
        });
        response.write('HELLO WORLD');
    }
    response.end();
});

server.listen(3000, function() {
    console.log('listening on port', 3000);
    console.log('Dir name', __dirname);
})