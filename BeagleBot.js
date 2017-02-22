var express = require('express')
var http = require('https')
var telegram = require('telegram-bot-api')

var api = new telegram({
    token: '3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx8',
    updates: {
        enabled: true
    }
})

api.getMe().then(function(data){
        console.log('telegram bot connected')
    })
    .catch(function(err){
        console.log(err)
    })
    
api.on('message', function(message) {
    if (message.text.substring(0, 4).toLowerCase() == 'take') {
        var exec = require('child_process').exec
        var filename = "webcam.py"
        exec("python" + " " + filename,function(err,stdout,stderr){
            if(err)
            {
                console.log(err)
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: 'fail'
                })
            }
            if(stdout)
            {
                console.log(stdout)
                api.sendPhoto({
                    chat_id: message.chat.id,
                    caption: 'webcam image',
                    // you can also send file_id here as string (as described in telegram bot api documentation)
                    photo: './img.png'
                })
                .then(function(data)
                {
                    //console.log(util.inspect(data, false, null));
                })
            }
        })
    }
})

var app = express();
var server = require('http').Server(app);

server.listen(8082, function(err) {
    console.log('Running server on port 8082')
})

app.get('/', function(req, res) {
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('hello world')
    //console.log(text);
})
