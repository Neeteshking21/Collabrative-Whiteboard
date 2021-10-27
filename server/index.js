const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

let connections = []

io.on('connect', (skt)=>{
    connections.push(skt)
    console.log(`${skt.id} has been connected`)

    skt.on('draw', (data)=>{
        connections.forEach(con=>{
            if(con.id !== skt.id) {
                con.emit('ondraw', {x: data.x, y:data.y})
            }
        })
    })

    skt.on('disconnect', (reason)=>{
        console.log(`${skt.id} is disconnect`)
        connections = connections.filter((con)=> con.id !== skt.id)
    })
})

const PORT = process.env.PORT || 5000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Welcome to Collabrative WhiteBoard')
})

httpServer.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))