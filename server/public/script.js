let canvas = document.getElementById('canvas');

canvas.width = 0.98 *window.innerWidth
canvas.height = 0.90 * window.innerHeight

var io = io.connect('http://localhost:5000/')

let ctx = canvas.getContext('2d');
let x, y
let mouseDown = false

window.onmousedown = (e) =>{
    ctx.moveTo(x,y)
    mouseDown = true
}
window.onmouseup = (e) =>{
    mouseDown = false
}

io.on('ondraw',({x,y})=>{
    ctx.lineTo(x,y)
       ctx.stroke()
})

window.onmousemove = (e) =>{
   x = e.clientX 
   y = e.clientY 
//    console.log(x , y)
    if(mouseDown){
        io.emit('draw',{x,y})
       ctx.lineTo(x,y)
       ctx.stroke()
    }
}


