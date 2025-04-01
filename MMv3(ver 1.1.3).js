const m = {pi:Math.PI};
// MMv3 for using like pro :)
// Created By Abdulloh Soxobataliyev
// BASE FUNCTION INSCRIPTION
// 
class MMv3{
    constructor(teg,width,height){
        this.teg = teg;
        if(width == 'max'){
            width = window.innerWidth*0.98;
        }
        if(height == 'max'){
            height = window.innerHeight*0.97;
        }
        this.w = width;
        this.h = height;

        this.ai = null;
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;

        this.ControlCanvas = document.createElement('canvas');
        this.ControlCanvas.width = window.innerWidth*0.99;
        this.ControlCanvas.height = window.innerHeight*0.99;
        this.ControlCanvas.style = `
            background:transparent;
            top:0;
            left:0;
            position:absolute;
        `

        this.TempCanvas = document.createElement('canvas');
        this.TempCanvas.width = width;
        this.TempCanvas.height = height;

        this.PixelCanvas = document.createElement('canvas');
        this.PixelCanvas.width = width;
        this.PixelCanvas.height = height;

        this.canvas.classList.add("canvasMMv3" );
        
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.TempCtx = this.TempCanvas.getContext('2d');
        this.Pctx = this.PixelCanvas.getContext('2d', { willReadFrequently: true });
        this.control = null
        this.mouse = {};
        this.keyboard = {};
        this.keyboard.key = {};
        this.pointer = {};
        this.globalVar = {translate:{x:0,y:0},colors:{background:'white',fillC:'black',strokeC:'black'},};
        this.camera = {
            x:0,
            y:0,
            rays:[],
        };
        document.addEventListener("onload", function () {
            this.canvas_resize(this);
        })
        window.addEventListener("orientationchange", this.canvas_resize, this);
        window.addEventListener("resize", this.canvas_resize, this);
    }
    canvas_resize(c){
        c.width = c.width * window.devicePixelRatio;
        c.height = c.width * window.devicePixelRatio;
    }
    connect(x){
        switch (x) {
            case 'canvas':
                this.teg.appendChild(this.canvas);
                break;
            case 'mouse':
                this.#addMouseEvent();
                break;
            case 'animation':
                this.#addAnimation();
                return new animation(this.ctx,this.w,this.h);
            case 'keyboard':
                this.#addKeyboard();
                break;
            case 'controls':
                this.#addControlls();
                this.teg.appendChild(this.ControlCanvas);
                break;
            case 'pixel':
                this.teg.appendChild(this.PixelCanvas);
                break;
            case 'ai':
                break;
            default:break;
        }
    }
    grid(x,y){
        this.bP();
        for (let i = 0; i < this.w; i+=x) {
            for (let j = 0; j < this.h; j+=y) {
                this.pt(i,j,3,'red')
                this.text(i+":"+j,i+2,j+(x+y)/10,(x+y)/10);
                this.fl();
                this.rect(i,j,x,y,2);
                this.st();
            }
        }
        this.cP();
    }
    theme(x){
        switch (x) {
            case 'dark':
                    this.globalVar.colors.background = '#222';
                    this.globalVar.colors.fillC = '#fff';
                    this.globalVar.colors.strokeC = '#fff';
                    this.ctx.fillStyle = '#222';
                    this.ctx.fillRect(0,0,this.w,this.h);
                break;
            case 'white':
                    this.globalVar.colors.background = '#fff';
                    this.globalVar.colors.fillC = 'black';
                    this.globalVar.colors.strokeC = 'black';
                break;
            default:
                break;
        }
    }
    border(w=1,style='solid',color='black',round=0){
        this.canvas.style.border = w+"px "+style+" "+color;
        this.canvas.style.borderRadius = round+"px"
    }
    #addControlls(){
        this.control = function (type,x,y,w,h){
            return new MMv3Control(this.ControlCanvas,type,x,y,w,h);
        }
    }
    #addKeyboard(){
        document.addEventListener('keydown',(event)=>{
            this.keyboard.event = event;
            this.keyboard.keyDown = event.key;
            this.keyboard.ctrlKey = event.ctrlKey;
            this.keyboard.altKey = event.altKey;
            this.keyboard.keydown = true;
            this.keyboard.keyup = false;
            this.keyboard.key[event.key]=true;
            if(typeof(keyDown)=='function'){
                keyDown();
            }
        })
        document.addEventListener('keypress',(event)=>{
            this.keyboard.keyPress = event.key;
            this.keyboard.ctrlKey = event.ctrlKey;
            this.keyboard.altKey = event.altKey;
            this.keyboard.keypress = true;
            if(typeof(keyPress)=='function'){
                keyPress();
            }
        })
        document.addEventListener('keyup',(event)=>{
            this.keyboard.keyUp = event.key;
            this.keyboard.ctrlKey = event.ctrlKey;
            this.keyboard.altKey = event.altKey;
            this.keyboard.keyup = true;
            this.keyboard.keydown = false;
            this.keyboard.key[event.key]=false;
            this.keyboard.key[event.key]=false;
            var tempS = 0;
            for (let index = 0; index < Object.keys(this.keyboard.key).length; index++) {
                if(tempS < 2){
                    if(this.keyboard.key[Object.keys(this.keyboard.key)[index]]){
                        tempS+=1;
                    }
                }else{
                    this.keyboard.key[Object.keys(this.keyboard.key)[index]] == false;
                }
            }
            if(typeof(keyUp)=='function'){
                keyUp();
            }
        })
    }
    #addMouseEvent(){
        this.mouse.x = Infinity;
        this.mouse.y = Infinity;

        this.mouse.angle = (x,y) => {
            return Math.atan2((y-this.mouse.y),(x-this.mouse.x))
        }
        this.canvas.addEventListener('contextlost',(event)=>{
            this.mouse.contextlost = true;
        });
        this.canvas.addEventListener('mousedown',(event)=>{
            this.mouse.event = event;
            this.mouse.x = event.offsetX-this.globalVar.translate.x;
            this.mouse.y = event.offsetY-this.globalVar.translate.y;
            this.mouse.downX = event.offsetX-this.globalVar.translate.x;
            this.mouse.downY = event.offsetY-this.globalVar.translate.y;
            this.mouse.down = true;
            this.mouse.up = false;
            this.mouse.context = false;
            if(typeof(mouseDown) == 'function'){
                mouseDown();
            }
        });
        this.canvas.addEventListener('mouseup',(event)=>{
            this.mouse.event = event;
            this.mouse.x = event.offsetX-this.globalVar.translate.x;
            this.mouse.y = event.offsetY-this.globalVar.translate.y;
            this.mouse.upX = event.offsetX-this.globalVar.translate.x;
            this.mouse.upY = event.offsetY-this.globalVar.translate.y;
            this.mouse.up = true;
            this.mouse.down = false;
            if(typeof(mouseUp) == 'function'){
                mouseUp();
            }
        });
        this.canvas.addEventListener('mousemove',(event)=>{
            this.mouse.event = event;
            this.mouse.x = event.offsetX-this.globalVar.translate.x;
            this.mouse.y = event.offsetY-this.globalVar.translate.y;
            this.mouse.moveX = event.offsetX-this.globalVar.translate.x;
            this.mouse.moveY = event.offsetY-this.globalVar.translate.y;
            this.mouse.move = true;
            setTimeout(()=>{
                this.mouse.backX = event.offsetX-this.globalVar.translate.x;
                this.mouse.backY = event.offsetY-this.globalVar.translate.y;
            },200);
            if(Math.abs(this.mouse.backX - this.mouse.moveX) == 0 || Math.abs(this.mouse.backY - this.mouse.moveY) == 0){
                this.mouse.move = false;
            }
            if(typeof(mouseMove) == 'function'){
                mouseMove();
            }
        });
        this.canvas.addEventListener('mousewheel',(event)=>{
            this.mouse.event = event;
            this.mouse.x = event.offsetX-this.globalVar.translate.x;
            this.mouse.y = event.offsetY-this.globalVar.translate.y;
            this.mouse.wheelX = event.offsetX-this.globalVar.translate.x;
            this.mouse.wheelY = event.offsetY-this.globalVar.translate.y;
            this.mouse.deltaX = event.deltaX;
            this.mouse.deltaY = event.deltaY;
            this.mouse.deltaZ = event.deltaZ;
            this.mouse.wheel = true;
            if(typeof(mouseWheel) == 'function'){
                mouseWheel();
            }
        });
        this.canvas.addEventListener('mouseout',(event)=>{
            this.mouse.event = event;
            this.mouse.x = event.offsetX-this.globalVar.translate.x;
            this.mouse.y = event.offsetY-this.globalVar.translate.y;
            this.mouse.outX = event.offsetX-this.globalVar.translate.x;
            this.mouse.outY = event.offsetY-this.globalVar.translate.y;
            this.mouse.up = true;
            this.mouse.out = true;
            this.mouse.enter = false;
            this.mouse.down = false;
            if(typeof(mouseOut) == 'function'){
                mouseOut();
            }
        });
        this.canvas.addEventListener('mouseenter',(event)=>{
            this.mouse.event = event;
            this.mouse.x = event.offsetX-this.globalVar.translate.x;
            this.mouse.y = event.offsetY-this.globalVar.translate.y;
            this.mouse.enterX = event.offsetX-this.globalVar.translate.x;
            this.mouse.enterY = event.offsetY-this.globalVar.translate.y;
            this.mouse.enter = true;
            this.mouse.out = false;
            if(typeof(mouseEnter) == 'function'){
                mouseEnter();
            }
        });
    }
    #addAnimation(){
        updateFrame();
        function updateFrame(){
            if(typeof(update)=='function'){
                update()
            }
            requestAnimationFrame(updateFrame);
        }
    }
    canvas2ptV3(freq = 1,action=1, wPX = 1, br = 255, bg = 255, bb = 255){
        var tos = freq;
        var particle = []
        let pixel = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
        if(action == 1){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index+3] != 0 && tos <= 0){
                        if(pixel.data[index] != br && pixel.data[index+1] != bg && pixel.data[index] != bb){
                            particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                            tos=freq;
                        }
                    }
                }
            }
            return particle;
        }else if(action == 2){
            if(wPX % 2 == 0){
                wPX+=1;
            }
            for (let y = 1; y < this.canvas.height; y+=wPX) {
                for (let x = 1; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq == 0 && y % freq == 0){
                        if(pixel.data[index] != br && pixel.data[index+1] != bg && pixel.data[index] != bb){
                            particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                            tos=freq;
                        }
                    }
                }
            }
            return particle;
        }else if(action == 3){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq**2 == 0 && y % freq == 0){
                        if(pixel.data[index] != br && pixel.data[index+1] != bg && pixel.data[index] != bb){
                            particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                            tos=freq;
                        }
                    }
                }
            }
            return particle;
        }else if(action == 4){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq == 0 && y % freq**2 == 0){
                        if(pixel.data[index] != br && pixel.data[index+1] != bg && pixel.data[index] != bb){
                            particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                            tos=freq;
                        }
                    }
                }
            }
            return particle;
        }else if(action == 5){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq**2 == 0 && y % freq**2 == 0){
                        if(pixel.data[index] != br && pixel.data[index+1] != bg && pixel.data[index] != bb){
                            particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                            tos=freq;
                        }
                    }
                }
            }
            return particle;
        }
    }
    canvas2ptV2(freq = 1,action=1, wPX = 1){
        var tos = freq;
        var particle = []
        var particles = [];
        let pixel = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
        if(action == 1){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index+3] != 0 && tos <= 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
                particles.push(particle);
                particle = [];
            }
            return particles;
        }else if(action == 2){
            if(wPX % 2 == 0){
                wPX+=1;
            }
            for (let y = 1; y < this.canvas.height; y+=wPX) {
                for (let x = 1; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq == 0 && y % freq == 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
                particles.push(particle);
                particle = [];
            }
            return particles;
        }else if(action == 3){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq**2 == 0 && y % freq == 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
                particles.push(particle);
                particle = [];
            }
            return particles;
        }else if(action == 4){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq == 0 && y % freq**2 == 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
                particles.push(particle);
                particle = [];
            }
            return particles;
        }else if(action == 5){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq**2 == 0 && y % freq**2 == 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
                particles.push(particle);
                particle = [];
            }
            return particles;
        }
    }
    canvas2pt(freq = 1,action=1, wPX = 1){
        var tos = freq;
        var particle = []
        let pixel = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
        if(action == 1){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index+3] != 0 && tos <= 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
            }
            return particle;
        }else if(action == 2){
            if(wPX % 2 == 0){
                wPX+=1;
            }
            for (let y = 1; y < this.canvas.height; y+=wPX) {
                for (let x = 1; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq == 0 && y % freq == 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
            }
            return particle;
        }else if(action == 3){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] > 0 && x % freq**2 == 0 && y % freq == 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
            }
            return particle;
        }else if(action == 4){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] > 0 && x % freq == 0 && y % freq**2 == 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
            }
            return particle;
        }else if(action == 5){
            for (let y = 0; y < this.canvas.height; y+=wPX) {
                for (let x = 0; x < this.canvas.width; x+=wPX) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] != 0 && x % freq**2 == 0 && y % freq**2 == 0){
                        particle.push(new PTD(x,y,0,wPX,[pixel.data[index],pixel.data[index+1],pixel.data[index+2],pixel.data[index+3]]));
                        tos=freq;
                    }
                }
            }
            return particle;
        }
    }
    ToPixel(w,h,fun,xe=null,ye=null,we=null,he=null){
        this.ctx.save();
        var data = this.ctx.getImageData(0,0,this.w,this.h).data;
        this.ctx.restore();
        var pixels = [];
        this.pixelData = data;
        this.Pctx.clearRect(0,0,this.w,this.h);
        this.Pctx.beginPath();
        for (var y = 0; y < this.h; y+=Math.floor(this.h/h)) {
            for (var x = 0; x < this.w; x+=Math.floor(this.w/w)) {
                var index = (x + y * this.w) * 4;
                this.Pctx.fillStyle = 'rgba('+data[index]+','+data[index+1]+','+data[index+2]+','+data[index+3]+')';
                this.Pctx.fillRect(x,y,Math.floor(this.w/w),Math.floor(this.h/h));
                pixels.push([x,y,Math.floor(this.w/w),Math.floor(this.h/h),'rgba('+data[index]+','+data[index+1]+','+data[index+2]+','+data[index+3]+')']);
            }
        }
        this.Pctx.closePath();
        if(fun == 'return'){
            var tos = this.Pctx.getImageData(0,0,this.w,this.h);
            if(xe && ye && we && he){
                this.ctx.putImageData(tos, 0, 0,xe,ye,we,he);
            }else{
                this.ctx.putImageData(tos, 0, 0);
            }
        }else if(fun == 'pixels'){
            return pixels;
        }
    }
    ToPixel2(w,h,fun,xe=null,ye=null,we=null,he=null){
        var off = 0;
        this.ctx.save();
        var data = this.ctx.getImageData(0,0,this.w,this.h).data;
        this.ctx.restore();
        var pixels = [];
        this.pixelData = data;
        this.Pctx.clearRect(0,0,this.w,this.h);
        this.Pctx.beginPath();
        for (var y = 0; y < this.h; y+=Math.floor(this.h/h)) {
            for (var x = 0; x < this.w; x+=Math.floor(this.w/w)) {
                var s = [];
                var f = (x + y * this.w) * 4;
                var ff = parseInt(data[f])+parseInt(data[(f+1)])+parseInt(data[(f+2)])+parseInt(data[(f+3)]);
                for (var j = 0; j < Math.floor(this.h/h); j++) {
                    for (var i = 0; i < Math.floor(this.w/w); i++) {
                        var t = (x+i + (y+j) * this.w) * 4;
                        var tt = parseInt(data[t])+parseInt(data[(t+1)])+parseInt(data[(t+2)])+parseInt(data[t+3]);
                        if(ff >= tt){
                            ff = tt;
                            s[0] = i;
                            s[1] = j;
                        }
                    }                    
                }
                var index = (x+s[0] + (y+s[1]) * this.w) * 4;
                this.Pctx.fillStyle = 'rgba('+(data[index]-off)+','+(data[index+1]-off)+','+(data[index+2]-off)+','+(data[index+3])+')';
                this.Pctx.fillRect(x,y,Math.floor(this.w/w),Math.floor(this.h/h));
                pixels.push([x,y,Math.floor(this.w/w),Math.floor(this.h/h),'rgba('+data[index]+','+data[index+1]+','+data[index+2]+','+data[index+3]+')']);
            }
        }
        this.Pctx.closePath();
        if(fun == 'return'){
            var tos = this.Pctx.getImageData(0,0,this.w,this.h);
            if(xe && ye && we && he){
                this.ctx.putImageData(tos, 0, 0,xe,ye,we,he);
            }else{
                this.ctx.putImageData(tos, 0, 0);
            }
        }else if(fun == 'pixels'){
            return pixels;
        }
    }
    ToPixel3(w,h,fun,xe=null,ye=null,we=null,he=null){
        this.ctx.save();
        var data = this.ctx.getImageData(0,0,this.w,this.h).data;
        this.ctx.restore();
        var pixels = [];
        this.pixelData = data;
        this.Pctx.clearRect(0,0,this.w,this.h);
        this.Pctx.beginPath();
        var k = 0;
        var l = 0;
        for (var y = 0; y < this.h; y+=Math.floor(this.h/h)) {
            l = 1;
            k++;
            for (var x = 0; x < this.w; x+=Math.floor(this.w/w)) {
                var s = [];
                var f = (x + y * this.w) * 4;
                var ff = parseInt(data[f])+parseInt(data[(f+1)])+parseInt(data[(f+2)])+parseInt(data[(f+3)]);;
                for (var j = y; j <= k*Math.floor(this.h/h); j+=1) {
                    for (var i = x; i <= l*Math.floor(this.w/w); i+=1) {
                        var t = (i + j * this.w) * 4;
                        var tt = parseInt(data[t])+parseInt(data[(t+1)])+parseInt(data[(t+2)])+parseInt(data[t+3]);
                        if(ff <= tt){
                            ff = tt;
                            s[0] = i;
                            s[1] = j;
                        }
                    }                    
                }
                var index = (s[0] + (s[1]) * this.w) * 4;
                this.Pctx.fillStyle = 'rgba('+data[index]+','+data[index+1]+','+data[index+2]+','+data[index+3]+')';
                this.Pctx.fillRect(x,y,Math.floor(this.w/w),Math.floor(this.h/h));
                pixels.push([x,y,Math.floor(this.w/w),Math.floor(this.h/h),'rgba('+data[index]+','+data[index+1]+','+data[index+2]+','+data[index+3]+')']);
                l+=1;
            }
        }
        this.Pctx.closePath();
        if(fun == 'return'){
            var tos = this.Pctx.getImageData(0,0,this.w,this.h);
            if(xe && ye && we && he){
                this.ctx.putImageData(tos, 0, 0,xe,ye,we,he);
            }else{
                this.ctx.putImageData(tos, 0, 0);
            }
        }else if(fun == 'pixels'){
            return pixels;
        }
    }
    ToPixel4(w,h,fun,xe=null,ye=null,we=null,he=null){
        this.ctx.save();
        var data = this.ctx.getImageData(0,0,this.w,this.h).data;
        this.ctx.restore();
        var pixels = [];
        this.pixelData = data;
        this.Pctx.clearRect(0,0,this.w,this.h);
        this.Pctx.beginPath();
        for (var y = 0; y < this.h; y+=Math.floor(this.h/h)) {
            for (var x = 0; x < this.w; x+=Math.floor(this.w/w)) {
                var s = [];
                var f = (x + y * this.w) * 4;
                var ff = parseInt(data[f])+parseInt(data[(f+1)])+parseInt(data[(f+2)])+parseInt(data[(f+3)]);
                for (var j = 0; j < Math.floor(this.h/h); j++) {
                    for (var i = 0; i < Math.floor(this.w/w); i++) {
                        var t = (x+i + (y+j) * this.w) * 4;
                        var tt = parseInt(data[t])+parseInt(data[(t+1)])+parseInt(data[(t+2)])+parseInt(data[t+3]);
                        if(ff >= tt){
                            ff = tt;
                            s[0] = i;
                            s[1] = j;
                        }
                    }                    
                }
                var g = [];
                for (var j = 0; j < Math.floor(this.h/h); j++) {
                    for (var i = 0; i < Math.floor(this.w/w); i++) {
                        var t = (x+i + (y+j) * this.w) * 4;
                        var tt = parseInt(data[t])+parseInt(data[(t+1)])+parseInt(data[(t+2)])+parseInt(data[t+3]);
                        if(ff >= tt && i != s[0] || j != s[1]){
                            ff = tt;
                            g[0] = i;
                            g[1] = j;
                        }
                    }                    
                }
                var index = (x+g[0] + (y+g[1]) * this.w) * 4;
                this.Pctx.fillStyle = 'rgba('+(data[index])+','+(data[index+1])+','+(data[index+2])+','+(data[index+3])+')';
                this.Pctx.fillRect(x,y,Math.floor(this.w/w),Math.floor(this.h/h));
                pixels.push([x,y,Math.floor(this.w/w),Math.floor(this.h/h),'rgba('+data[index]+','+data[index+1]+','+data[index+2]+','+data[index+3]+')']);
            }
        }
        this.Pctx.closePath();
        if(fun == 'return'){
            var tos = this.Pctx.getImageData(0,0,this.w,this.h);
            if(xe && ye && we && he){
                this.ctx.putImageData(tos, 0, 0,xe,ye,we,he);
            }else{
                this.ctx.putImageData(tos, 0, 0);
            }
        }else if(fun == 'pixels'){
            return pixels;
        }
    }
    ToPixel5(w,h,off=9,fun,xe=null,ye=null,we=null,he=null){
        this.ctx.save();
        var data = this.ctx.getImageData(0,0,this.w,this.h).data;
        this.ctx.restore();
        var pixels = [];
        this.pixelData = data;
        this.Pctx.clearRect(0,0,this.w,this.h);
        this.Pctx.beginPath();
        for (var y = 0; y < this.h; y+=Math.floor(this.h/h)) {
            for (var x = 0; x < this.w; x+=Math.floor(this.w/w)) {
                var s = [];
                var f = (x + y * this.w) * 4;
                var ff = parseInt(data[f])+parseInt(data[(f+1)])+parseInt(data[(f+2)])+parseInt(data[(f+3)]);
                for (var j = 0; j < Math.floor(this.h/h); j++) {
                    for (var i = 0; i < Math.floor(this.w/w); i++) {
                        var t = (x+i + (y+j) * this.w) * 4;
                        var tt = parseInt(data[t])+parseInt(data[(t+1)])+parseInt(data[(t+2)])+parseInt(data[t+3]);
                        if(ff >= tt){
                            ff = tt;
                            s[0] = i;
                            s[1] = j;
                        }
                    }                    
                }
                var g = [];
                for (var j = 0; j < Math.floor(this.h/h)-Math.floor(this.h/h)*0.8; j++) {
                    for (var i = 0; i < Math.floor(this.w/w)-Math.floor(this.w/w)*0.4; i++) {
                        var t = (x+i + (y+j) * this.w) * 4;
                        var tt = parseInt(data[t])+parseInt(data[(t+1)])+parseInt(data[(t+2)])+parseInt(data[t+3]);
                        if(ff >= tt && i != s[0] || j != s[1]){
                            ff = tt;
                            g[0] = i;
                            g[1] = j;
                        }
                    }                    
                }
                var tom = [[[],[],[]],
                           [[],[],[]],
                           [[],[],[]]];
                tom[0][0] = ((x+g[0]-1) + (y+g[1]-1) * this.w) * 4;
                tom[1][0] = (x+g[0] + (y+g[1]-1) * this.w) * 4;
                tom[2][0] = ((x+g[0]+1) + (y+g[1]-1) * this.w) * 4;
                tom[0][1] = ((x+g[0]-1) + (y+g[1]) * this.w) * 4;
                tom[1][1] = (x+g[0] + (y+g[1]) * this.w) * 4;
                tom[2][1] = ((x+g[0]+1) + (y+g[1]) * this.w) * 4;
                tom[0][2] = ((x+g[0]-1) + (y+g[1]+1) * this.w) * 4;
                tom[1][2] = ((x+g[0]) + (y+g[1]+1) * this.w) * 4;
                tom[2][2] = ((x+g[0]+1) + (y+g[1]+1) * this.w) * 4;
                var red = 0;
                var green = 0;
                var blue = 0;
                var opacity = 0;
                for (let i = 0; i < tom.length; i++) {
                    for (let j = 0; j < tom[i].length; j++) {
                        red += data[tom[i][j]];
                        green += data[(tom[i][j]+1)];
                        blue += data[(tom[i][j]+2)];
                        opacity += data[(tom[i][j]+3)];
                    }
                }
                this.Pctx.fillStyle = 'rgba('+(red/off)+','+(green/off)+','+(blue/off)+','+(opacity/off)+')';
                this.Pctx.fillRect(x,y,Math.floor(this.w/w),Math.floor(this.h/h));
                pixels.push([x,y,Math.floor(this.w/w),Math.floor(this.h/h),'rgba('+(red/off)+','+(green/off)+','+(blue/off)+','+(opacity/off)+')']);
            }
        }
        this.Pctx.closePath();
        if(fun == 'return'){
            var tos = this.Pctx.getImageData(0,0,this.w,this.h);
            if(xe && ye && we && he){
                this.ctx.putImageData(tos, 0, 0,xe,ye,we,he);
            }else{
                this.ctx.putImageData(tos, 0, 0);
            }
        }else if(fun == 'pixels'){
            return pixels;
        }
    }
    FasText2pt(text,x,y,size,fors=true,freq = 2,wpx = 1,action = 2,speare=1,align='start',style='normal'){
        return this.text2pt(text,x,y,size,'black',fors,align,freq,wpx,style,'arial',action,speare);
    }
    text2pt(text,x=this.w/2,y=this.h/2,size=20,color='black',fors=true,align='center',freq = 1,wPX=1,fontStyle='normal',font='arial',action=1,speare=1){
        this.TempCtx.clearRect(0,0,this.TempCanvas.width,this.TempCanvas.height)
        this.TempCtx.font = fontStyle + " " + size +"px "+ font;
        this.TempCtx.textAlign = align;
        if(fors){
            this.TempCtx.fillStyle = color;
            this.TempCtx.fillText(text,x,y);
        }else{
            this.TempCtx.lineWidth = wPX;
            this.TempCtx.strokeStyle = color;
            this.TempCtx.strokeText(text,x,y);
        }
        var tos = freq;
        let particle = [];
        let pixel = this.TempCtx.getImageData(0,0,this.TempCanvas.width,this.TempCanvas.height);
        if(action == 1){
            for (let y = 0; y < this.canvas.height; y++) {
                for (let x = 0; x < this.canvas.width; x++) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] > 0 && tos <= 0){
                        particle.push(new PTD(x*speare,y*speare,wPX,x*speare,y*speare,color));
                        tos=freq;
                    }
                }
            }
            return particle;
        }else if(action == 2){
            for (let y = 0; y < this.canvas.height; y++) {
                for (let x = 0; x < this.canvas.width; x++) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] > 0 && x % freq == 0 && y % freq == 0){
                        particle.push(new PTD(x*speare,y*speare,wPX,x*speare,y*speare,color));
                        tos=freq;
                    }
                }
            }
            return particle;
        }else if(action == 3){
            for (let y = 0; y < this.canvas.height; y++) {
                for (let x = 0; x < this.canvas.width; x++) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] > 0 && x % freq**2 == 0 && y % freq == 0){
                        particle.push(new PTD(x*speare,y*speare,wPX,x*speare,y*speare,color));
                        tos=freq;
                    }
                }
            }
            return particle;
        }else if(action == 4){
            for (let y = 0; y < this.canvas.height; y++) {
                for (let x = 0; x < this.canvas.width; x++) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] > 0 && x % freq == 0 && y % freq**2 == 0){
                        particle.push(new PTD(x*speare,y*speare,wPX,x*speare,y*speare,color));
                        tos=freq;
                    }
                }
            }
            return particle;
        }else if(action == 5){
            for (let y = 0; y < this.canvas.height; y++) {
                for (let x = 0; x < this.canvas.width; x++) {
                    tos--;
                    var index = (x + y * this.canvas.width) * 4;
                    if(pixel.data[index + 3] > 0 && x % freq**2 == 0 && y % freq**2 == 0){
                        particle.push(new PTD(x*speare,y*speare,wPX,x*speare,y*speare,color));
                        tos=freq;
                    }
                }
            }
            return particle;
        }
    }
    text(text,x=0,y=0,size='20',color='black',fors=true,align="start",fontStyle='normal',font='arial'){
        this.bP();
        this.ctx.textAlign = align;
        this.ctx.font = fontStyle+" " + size +"px "+ font;
        if(fors){
            this.ctx.fillStyle = color;
            this.ctx.fillText(text,x,y);
        }else{
            this.ctx.strokeStyle = color;
            this.ctx.strokeText(text,x,y);
        }
        this.cP();
    }
    log(x){
        console.log(x);
    }
    tr(x,y){
        this.ctx.translate(x,y);
        this.globalVar.translate = {x,y};
    }
    repeat(n,fun,...funArg){
        for (let index = 0; index < n; index++) {
            fun(...funArg);
        }
    }
    bP(){
        this.ctx.beginPath();
    }
    cP(){
        this.ctx.closePath();
    }
    rR(x,y,w,h,r){
        this.ctx.roundRect(x,y,w,h,r);
    }
    cRG(x,y,r,x2,y2,r2,...colors){
        const grad = this.ctx.createRadialGradient(x, y, r, x2, y2, r2);
        var procent = 1/colors.length
        for (let index = 0; index < colors.length; index++) {
            grad.addColorStop(index*procent, colors[index]);
        }
        return grad
    }
    line(x,y,x2,y2,color='black'){
        this.bP();
        if(typeof(x) == 'object' && typeof(y) == 'object'){
            this.mT(x.x,x.y);
            this.lT(y.x,y.y);
        }else{
            this.mT(x,y);
            this.lT(x2,y2);
        }
        this.stst(color);
        this.st();
        this.cP();
    }
    lAngle(x,y,w,alfa){
        this.bP();
        this.mT(x,y);
        this.lT(x+w*Math.cos(alfa),y+w*Math.sin(alfa));
        this.st();
        this.cP();
    }
    mT(x,y){
        this.ctx.moveTo(x,y);
    }
    lT(x,y){
        this.ctx.lineTo(x,y);
    }
    flst(x){
        this.globalVar.colors.fillC = x;
    }
    stst(x){
        this.globalVar.colors.strokeC = x;
    }
    fl(){
        this.ctx.fillStyle = this.globalVar.colors.fillC
        this.ctx.fill();
    }
    st(){
        this.ctx.strokeStyle = this.globalVar.colors.strokeC;
        this.ctx.stroke();
    }
    lW(x){
        this.ctx.lineWidth = x;
    }
    sW(x){
        this.ctx.lineWidth = x;
    }
    lC(x){
        this.ctx.lineCap = x;
    }
    lJ(x){
        this.ctx.lineJoin = x;
    }
    sav(){
        this.ctx.save();
    }
    res(){
        this.ctx.restore();
    }
    rot(x){
        this.ctx.rotate(x);
    }
    tra(x,y){
        this.ctx.translate(x,y);
    }
    cls(color=null){
        this.bP();
        if(color){
            this.ctx.fillStyle = color;
        }else{
            this.ctx.fillStyle = this.globalVar.colors.background;
        }
        this.ctx.fillRect(-this.globalVar.translate.x,-this.globalVar.translate.y,this.canvas.width,this.canvas.height);
        this.cP();
    }
    clear(x=0,y=0,w=this.w,h=this.h){
        this.ctx.clearRect(x,y,w,h)
    }
    ptr(x,y,r=5,fors=true,color='black'){
        this.bP();
        if(typeof(x) == 'object'){
            this.ctx.rect(x.x,x.y,r,r);
        }else{
            this.ctx.rect(x,y,r,r);
        }
        if(color){
            this.flst(color);
            this.stst(color);
        }
        if(fors){
            this.fl();
        }else{
            this.st();
        }
    }
    pt(x,y,r=5,fors=true,color=null){
        this.bP();
        if(typeof(x) == 'object'){
            this.ctx.arc(x.x,x.y,y,0,m.pi*2,false);
        }else{
            this.ctx.arc(x,y,r,0,m.pi*2,false);
        }
        if(color){
            this.flst(color);
            this.stst(color);
        }
        if(fors){
            this.fl();
        }else{
            this.st();
        }
        this.stst('black');
        this.flst('black');
        this.cP();
    }
    rect(x,y,w,h,fors=null){
        this.ctx.rect(x,y,w,h);
        if(fors==1){
            this.fl();
        }
        else if(fors==2){
            this.st();
        }
    }
    arc(x,y,r,startA,endA,clock){
        this.ctx.arc(x,y,r,startA,endA,clock);
    }
    getData(x,y,w,h){
        this.ctx.getImageData(x,y,w,h);
    }
    PTout(a){
        if(a.x > this.w || a.x < 0 || a.y > this.h || a.y < 0){
            return true;
        }else{
            return false;
        }
    }
}
// Controls
class MMv3Control{
    constructor(canvas,type='joystick',x,y,w,h){
        this.type = type;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.mox = x;
        this.moy = y;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouseD = false;
        this.mouseU = true;
        this.stick = {x:0,y:0}
        this.stickX = this.x;
        this.stickY = this.y;
        this.on = false;
        this.signal = '';
        this.touches = null;
        this.touchIndex = 0;
        this.active = false;
        this.fun = null;
        this.#addMouseEvent();
        this.#addTouchEvent();
    }
    #addTouchEvent(){
        this.canvas.addEventListener('touchstart', (event) => {
            this.touches = event
            if(this.active){
                for (let i = 0; i < event.touches.length; i++) {
                    if(dist2pt(event.touches[i].clientX,event.touches[i].clientY,this.x,this.y) <= (this.w+this.h)/2){
                        this.mouseD = true
                        this.touchIndex = i;
                        this.mox = event.touches[i].clientX-(this.w+this.h)/6/2
                        this.moy = event.touches[i].clientY-(this.w+this.h)/6/2
                        this.stickX = this.mox;
                        this.stickY = this.moy;
                    }
                }
            } 
        });
        this.canvas.addEventListener('touchmove', (event) => {
            this.touches = event
            if(this.active){
                this.mox = event.touches[this.touchIndex].clientX-(this.w+this.h)/6/2
                this.moy = event.touches[this.touchIndex].clientY-(this.w+this.h)/6/2
                this.stickX = this.mox;
                this.stickY = this.moy;
                if(this.mouseD){
                    this.draw();
                }
                if(typeof(this.fun) == 'function'){
                    this.fun();
                }
            }
            
        });
        this.canvas.addEventListener('touchend', (event) => {
            this.mouseD = false
            this.touches = event
            if(this.active){
                this.mox = this.x
                this.moy = this.y
                this.stickX = this.x;
                this.stickY = this.y;
                this.draw();
            }
        });
    }
    #addMouseEvent(){
        this.canvas.addEventListener('mouseout',(event) => {
            this.mouseD = false;
            this.mouseU = true;
            if(this.active){
                this.mox = event.offsetX;
                this.moy = event.offsetY;
                this.stickX = this.x;
                this.stickY = this.y;
                this.draw();
            }
        });
        this.canvas.addEventListener('mousedown',(event) => {
            if(this.active){
                if(dist2pt(event.offsetX,event.offsetY,this.x,this.y) <= (this.w+this.h)/2){
                    this.mouseD = true;
                    this.mouseU = false;
                    this.mox = event.offsetX;
                    this.moy = event.offsetY;
                    this.stickX = this.mox;
                    this.stickY = this.moy;
                }
            }
        });
        this.canvas.addEventListener('mouseup',(event) => {
            this.mouseD = false;
            this.mouseU = true;
            if(this.active){
                this.mox = event.offsetX;
                this.moy = event.offsetY;
                this.stickX = this.x;
                this.stickY = this.y;
                this.draw();
            }
        });
        this.canvas.addEventListener('mousemove',(event) => {
            if(this.active){
                this.mox = event.offsetX;
                this.moy = event.offsetY;
                this.stickX = this.mox;
                this.stickY = this.moy;
                if(this.mouseD){
                    this.draw();
                }
                if(typeof(this.fun) == 'function'){
                    this.fun();
                }
            }
        });
    }
    draw(){
        switch (this.type) {
            case 'joystick':
                this.ctx.beginPath();
                this.ctx.clearRect(this.x-this.w-(this.w+this.h)/6,this.y-this.y-(this.w+this.h)/6,this.w*2+(this.w+this.h)/3,this.y*2+(this.w+this.h)/3);
                this.ctx.strokeStyle = 'rgb(220,220,220)'
                this.ctx.arc(this.x,this.y,(this.w+this.h)/2,0,Math.PI*2,false);
                this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.beginPath();
                if(dist2pt(this.mox,this.moy,this.x,this.y) <= ((this.w+this.h)/2)){
                    this.ctx.fillStyle = 'rgb(200,200,200)'
                    this.ctx.arc(this.stickX,this.stickY,(this.w+this.h)/6,0,Math.PI*2,false);
                }else if(this.mouseD){
                    this.stickX = this.x+cos(angle2pt(this.mox,this.moy,this.x,this.y))*(this.w+this.h)/2
                    this.stickY = this.y+sin(angle2pt(this.mox,this.moy,this.x,this.y))*(this.w+this.h)/2
                    this.ctx.arc(this.stickX,this.stickY,(this.w+this.h)/6,0,Math.PI*2,false);
                }
                else{
                    this.ctx.arc(this.stickX,this.stickY,(this.w+this.h)/6,0,Math.PI*2,false);
                }
                this.ctx.fill();
                this.ctx.closePath();
                this.stick.x = (this.stickX-this.x)/this.w
                this.stick.y = (this.stickY-this.y)/this.h
                break;
        
            default:
                break;
        }
    }
    update(){

    }
}
// Neuro
class Neuro{
    constructor(Inputs, Outputs){
        this.inp = Inputs;
        this.out = Outputs;
    }
}
// animation DATA
class animation{
    constructor(ctx,w,h,data = []){
        this.c = ctx;
        this.data = data;
        this.w = w;
        this.h = h;
        this.index = 0;
        this.rep = 1;
    }
    save(){
        this.c.save();
        this.data.push(this.c.getImageData(0,0,this.w,this.h));
        this.c.restore();
    }
    run(index){
        if(this.data[index]){
            this.c.putImageData(this.data[index],0,0);
        }else{
            alert('ANIMATION FRAME '+index+' NOT FOUND')
        }
    }
    animate(time){
        if(this.rep == 'inf'){
            var anim = (time,data,index,c) =>{
                c.putImageData(data[index],0,0);
                if(data.length-1 > index){
                    index++;
                }else{
                    index = 0;
                }
            setTimeout(anim,time,time,data,index,c);
            }
            anim(1000/time,this.data,this.index,this.c);
        }else{
            var anim = (time,data,index,c,rep) =>{
                c.putImageData(data[index],0,0);
                if(data.length-1 > index){
                    index++;
                }else{
                    index = 0;
                    rep--;
                }
                if(rep > 0){
                    setTimeout(anim,time,time,data,index,c,rep);
                }else{
                    c.putImageData(data[index],0,0);
                }
            }
            anim(1000/time,this.data,this.index,this.c,this.rep);
        }
        
    }
}
    // TextMMv3
class TextMMv3{
    constructor(MMv3){
        this.m = MMv3;
    }
    write(){
        
    }
}
class PlayCard{
    constructor(num,symbol,sum,x,y,w){
        this.num = num;
        this.symbol = symbol;
        this.sum = sum;
        this.x = x;
        this.y = y;
        this.w = w;
        this.wd = 4;
        this.hd = 5;
        this.face = true;
    }
    draw(mm){
        mm.bP();
        mm.flst('white')
        mm.rR(this.x,this.y,this.wd*this.w,this.hd*this.w,5);
        mm.fl();
        mm.st();
        mm.cP();
        if(this.face){
            if(this.symbol == 0){
                mm.text(this.num,this.x+this.wd*this.w/6,this.y+this.hd*this.w/4,this.w*1.2,'red',true,'center');
                mm.text('♦',this.x+this.wd*this.w/2,this.y+this.hd*this.w/1.5,this.w*3,'red',true,'center');
            }else if(this.symbol == 1){
                mm.text(this.num,this.x+this.wd*this.w/6,this.y+this.hd*this.w/4,this.w*1.2,'black',true,'center');
                mm.text('♣',this.x+this.wd*this.w/2,this.y+this.hd*this.w/1.5,this.w*3,'black',true,'center');
            }else if(this.symbol == 2){
                mm.text(this.num,this.x+this.wd*this.w/6,this.y+this.hd*this.w/4,this.w*1.2,'red',true,'center');
                mm.text('♥',this.x+this.wd*this.w/2,this.y+this.hd*this.w/1.5,this.w*3,'red',true,'center');
            }else if(this.symbol == 3){
                mm.text(this.num,this.x+this.wd*this.w/6,this.y+this.hd*this.w/4,this.w*1.2,'black',true,'center');
                mm.text('♠',this.x+this.wd*this.w/2,this.y+this.hd*this.w/1.5,this.w*3,'black',true,'center');
            } 
        }else{
            mm.flst('#e76161')
            mm.fl();
            mm.rR(this.x,this.y,this.wd*this.w,this.hd*this.w,this.r);
            for (let j = 0; j < this.w/4.5; j++) {
                for (let i = 0; i < this.w/5; i++) {
                    mm.lAlfa(this.x+20*i,this.y+j*22,25,g2r(45));                
                }
            }
            for (let j = 0; j < 7; j++) {
                for (let i = 0; i < 6; i++) {
                    mm.lAlfa(this.x+20*i+this.w/1.5,this.y+j*22,25,g2r(90+45));                
                }
            }
            mm.st();
        }
    }
}
class PlayCards{
    constructor(n,x,y,w,off=[],set={}){
        this.n = n;
        if(set.j){
            this.Vj = set.j;
        }else{
            this.Vj = 11;
        }
        if(set.q){
            this.Vq = set.q;
        }else{
            this.Vq = 12;
        }
        if(set.k){
            this.Vk = set.k;
        }else{
            this.Vk = 13;
        }
        if(set.a){
            this.Va = set.a;
        }else{
            this.Va = 1;
        }
        this.cards = [];
        for (let index = 0; index < n; index++) {
            if(off.find((e) => e == 'A') == undefined){
                this.cards.push(new PlayCard('A',0,this.Va,x,y,w));
                this.cards.push(new PlayCard('A',1,this.Va,x,y,w));
                this.cards.push(new PlayCard('A',2,this.Va,x,y,w));
                this.cards.push(new PlayCard('A',3,this.Va,x,y,w));
            }
            for (let i = 2; i <= 10; i++) {
                if(off.find((e) => e == i) == undefined){
                    this.cards.push(new PlayCard(i,0,i,x,y,w));
                    this.cards.push(new PlayCard(i,1,i,x,y,w));
                    this.cards.push(new PlayCard(i,2,i,x,y,w));
                    this.cards.push(new PlayCard(i,3,i,x,y,w));
                }  
            }
            if(off.find((e) => e == 'J') == undefined){
                this.cards.push(new PlayCard('J',0,this.Vj,x,y,w));
                this.cards.push(new PlayCard('J',1,this.Vj,x,y,w));
                this.cards.push(new PlayCard('J',2,this.Vj,x,y,w));
                this.cards.push(new PlayCard('J',3,this.Vj,x,y,w));
            }
            if(off.find((e) => e == 'Q') == undefined){
                this.cards.push(new PlayCard('Q',0,this.Vq,x,y,w));
                this.cards.push(new PlayCard('Q',1,this.Vq,x,y,w));
                this.cards.push(new PlayCard('Q',2,this.Vq,x,y,w));
                this.cards.push(new PlayCard('Q',3,this.Vq,x,y,w));
            }
            if(off.find((e) => e == 'K') == undefined){
                this.cards.push(new PlayCard('K',0,this.Vk,x,y,w));
                this.cards.push(new PlayCard('K',1,this.Vk,x,y,w));
                this.cards.push(new PlayCard('K',2,this.Vk,x,y,w));
                this.cards.push(new PlayCard('K',3,this.Vk,x,y,w));
            }
        }
        this.c = this.cards
    }
    shuffle(option=1){
        var newC = [];
        if(option == 1){
            var s = this.cards.slice();
            for (let i = 0; i < this.cards.length; i++) {
                var r = Math.floor(rand(0,s.length));
                newC.push(s[r]);
                s = dIndexA(s,r);
            }
        }
        this.c = newC;
    }
}
// Buttons
class ButtonMMv3{
    constructor(canvas,x=0,y=0,w=50,h=30,fun,text='',fontS=8,offsetY = 1.4,bg='#555',color='white',rad=0,fl=true,st=true){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fun = fun;
        this.text = text;
        this.click = false;
        this.canvas = canvas;
        this.rad = rad;
        this.bg = bg;
        this.fl = fl;
        this.st = st;
        this.offsetY = offsetY;
        this.fontS = fontS;
        this.color = color;
        this.disable = false;
        this.canvas.addEventListener('click',(e)=>{this.run(e,this.x,this.y,this.w,this.h,this.fun,this.disable)})
        this.ctx = this.canvas.getContext('2d');
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.bg;
        // this.ctx.rect(this.x,this.y,this.w,this.h);
        this.ctx.roundRect(this.x,this.y,this.w,this.h,this.rad);
        if(this.fl){
            this.ctx.fill();
        }
        if(this.st){
            this.ctx.stroke();
        }
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.font = 'normal '+(this.w+this.h)/this.fontS+'px arial'
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.text,this.x+this.w/2,this.y+this.h/this.offsetY);
    }
    run(e,x,y,w,h,fun,disable){
        if(!disable){
            if(e.offsetX > x && e.offsetX < x+w && e.offsetY > y && e.offsetY < y+h){
                fun();
            }
        }
    }
}
// Matrix
class Matrix{
    constructor(w,h,...items){
        this.w = w;
        this.h = h;
        this.arr = new Array(h);
        for (let i = 0; i < h; i++) {
            this.arr[i] = new Array(w);         
        }
        if(items){
            for (let i = 0; i < this.arr.length; i++) {
                for (let j = 0; j < this.arr[i].length; j++) {
                    this.arr[i][j] = items[j+i*this.h];
                }
            }
        }
    }
    log(){

    }
}
class PTD{
    constructor(x, y, z = 0, w = 1, color){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.oX = x;
        this.oY = y;
        this.color = color;
    }
    p3d(focal){
        return {x:focal*this.x/(focal+this.z),y:focal*this.y/(focal+this.z)}
    }
}
class LND{
    constructor(x = 0, y = 0, x2 = 0, y2 = 0){
        if(typeof(x) == 'object' && typeof(y) == 'object'){
            this.x = x.x;
            this.y = x.y;
            this.x2 = y.x;
            this.y2 = y.y;
        }else{
            this.x = x;
            this.y = y;
            this.x2 = x2;
            this.y2 = y2;
        }
    }

}
class InfoPlus{
    constructor(MMv3,x,y,w){
        this.MMv3 = MMv3;
        this.x = x;
        this.y = y;
        this.w = w;
    }
    log(info, offset = 10, x = 0, y = 0){
        info = info.toString();
        this.MMv3.bP();
        this.MMv3.flst('rgba(255,255,255,0.2)');
        var Vs = this.MMv3.text2pt(info,this.x,this.y,this.w,'black',true,'center',2,1,'normal','arial',5);
        let vP1 = findArr('min','x',Vs);
        let vP2 = findArr('min','y',Vs);
        let vP3 = findArr('max','x',Vs);
        let vP4 = findArr('max','y',Vs);
        this.MMv3.rect(Math.abs(vP1.x-offset)+x,Math.abs(vP2.y-offset)+y,Math.abs(vP3.x-vP1.x)+offset*2+x,Math.abs(vP4.y-vP2.y)+offset*2+y);
        this.MMv3.text(info,this.x,this.y,this.w,'black',true,'center');
        this.MMv3.cP();
    }
    dLog(){
        
    }
}

// OTHER Functions
function timer(){
    setTimeout(timeS,1000)
    function timeS(){
        console.log('second');
        setTimeout(timeS,1000);
    }
}
function movePT(a,x,y,timeStart,time){
    var Ax = 0;
    var Ay = 0;
    time = time*30
    Ax = (x-a.x)/time;
    Ay = (y-a.y)/time;
    setTimeout(AniMoves, timeStart, a, x, y, Ax, Ay);
}
function AniMoves(a, x2, y2, ax, ay){
    if(a.x <= x2+10 && a.x >= x2-10 && a.y <= y2+10 && a.y >= y2-10){
        return false;
    }else{
        console.log(a.x,a.y)
        a.x+=ax;
        a.y+=ay;
        setTimeout(AniMoves, 20, a, x2, y2, ax, ay)
    }
}
function distPTS(p1,p2){
    var s = [];
    var t = 0;
    for (let index = 0; index < p1.length; index++) {
        s.push(abs(p1[index] - p2[index]));
    }
    for (let i = 0; i < s.length; i++) {
        t += s[i]**2
    }
    return Math.sqrt(t);
}
function dist2pt(x,y,x2,y2){
    if(typeof(x) == 'object' && typeof(y) == 'object'){
        return Math.hypot(abs(x.x-y.x),abs(x.y-y.y));
    }
    return Math.hypot(abs(x-x2),abs(y-y2));
}
function lerp(a,b,t){
    return a+(b-a)*t;
}
function inter3d2line(a,b,c,d){

}
function inter2d2line(a,b,c,d){
    const tTop = (d.x-c.x)*(a.y-c.y)-(d.y-c.y)*(a.x-c.x);
    const uTop = (c.y-a.y)*(a.x-b.x)-(c.x-a.x)*(a.y-b.y);
    const bottom = (d.y-c.y)*(b.x-a.x)-(d.x-c.x)*(b.y-a.y)
    if(bottom != 0){
        const t = tTop/bottom;
        const u = uTop/bottom;
        if(t >= 0 && t <= 1 && u >= 0 && u <= 1){
            return {
                x:lerp(a.x,b.x,t),
                y:lerp(a.y,b.y,t),
                offset:t
            }
        }
    }
    return null;
}
function abs(x){
    return Math.abs(x);
}
function floor(x){
    return Math.floor(x);
}
function rand(min,max=null){
    if(max){
        if(min < 0){
            return (Math.random()*(max-min+1))+min;
        }else{
            return (Math.random()+min)*(max-min);
        }
    }
    else{
        return Math.random()*min;
    }
}
function findArr(min_OR_max_OR_center_OR_close,array,output='value',ab=0,def=0){
    if(min_OR_max_OR_center_OR_close == 'min'){
        var s = array[0];
        var sIndex = 0;
        for (let i = 0; i < array.length; i++) {
            if(s > array[i]){
                s = array[i];
                sIndex = i;
            }
        }
        if(output == 'value'){
            return s;
        }else if(output == 'index'){
            return sIndex;
        }

    }
    else if(min_OR_max_OR_center_OR_close == 'max'){
        var s = array[0];
        var sIndex = 0;
        for (let i = 0; i < array.length; i++) {
            if(s < array[i]){
                s = array[i];
                sIndex = i;
            }
        }
        if(output == 'value'){
            return s;
        }else if(output == 'index'){
            return sIndex;
        }
    }
    else if(min_OR_max_OR_center_OR_close == 'center'){
        var t = Math.floor(array.length/2);
        var tempA = array.sort(function (a, b) {
            return a - b;
        });
        if(output=='value'){
            return tempA[t];
        }
        else if(output == 'index'){
            return t;
        }
    }
    else if(min_OR_max_OR_center_OR_close == 'close'){
        var temp = array[0];
        var index = 0;
        var s = array[0];
        if(def == 0){
            def = Math.abs(array[0] - ab);
            for (let i = 0; i < array.length; i++) {
                if(def > Math.abs(array[i] - ab)){
                    def = Math.abs(array[i] - ab);
                    temp = array[i];
                    index = i;
                }
            }
            if(output=='value'){
                return temp;
            }
            else if(output == 'index'){
                return index;
            }
        }
        for (let i = 0; i < array.length; i++) {
            if(def < Math.abs(array[i] - ab) && def*3 > Math.abs(array[i] - ab)){
                if(output=='value'){
                    return array[i];
                }
                else if(output == 'index'){
                    return i;
                }
            }
        }
    }
}
function logArray(x){
    console.log("------logArray-----");
    console.log('length : '+x.length);
    
    if(x[0][0]){
        console.log('type - Matrix');
        console.log('first : ' + x[0][0]);
        console.log('last : ' + x[x.length-1][x[x.length-1].length-1]);

        console.log('[x, y] -> e');
        for (let i = 0; i < x.length; i++) {
            for (let j = 0; j < x[i].length; j++) {
                console.log('['+i+', '+j+'] -> ' + x[i][j]);
            }
        }
        console.log('-----|-TABLE-|-----')
    for (let i = 0; i < x.length; i++) {
            var tempText = '';
            for (let j = 0; j < x[i].length; j++) {
                tempText += '| '+x[i][j]+" ";
            }
            console.log(tempText+"|");
        }
    }else{
        console.log('type - Array');
        console.log('first : ' + x[0]);
        console.log('last : ' + x[x.length-1]);
        console.table(x);
    }
    console.log('-------------------');

}
function dIndexA(arr,i){
    return [].concat(arr.slice(0,i),arr.slice(i+1));
}
function chIndexA(arr,f,s){
    var temp1 = arr[f];
    var temp2 = arr[s];
    arr[s] = temp1;
    arr[f] = temp2;
}
function grid(w,h){
    var tempArr = new Array(w);
    for (let i = 0; i < tempArr.length; i++) {
        tempArr[i] = new Array(h);        
    }
    return tempArr;
}
function trimArr(a,sym=null){
    if(sym != null){
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < a.length; i++) {
                if(a[i] == sym){
                    a = dellEindexA(a,i);
                }
            }
        }
        
    }else{
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < a.length; i++) {
                if(a[i].length == 0){
                    a = dellEindexA(a,i);
                }
            }
        }
    }
}
function cos(x){
    return Math.cos(x);
}
function sin(x){
    return Math.sin(x);
}
function r2g(x){
    return 180/m.pi*x;
}
function g2r(x){
    return m.pi/180*x;
}
function angle2pt(x, y, x2, y2){
    if(typeof(x) == 'object' && typeof(y) == 'object'){
        return Math.atan2((x.y-y.y),(x.x-y.x));
    }
    return Math.atan2((y-y2),(x-x2));
}
function ArrayMult(a,b){
    var tempArr = [];
    for (let i = 0; i < a.length; i++) {
        tempArr.push(a[i]*b);        
    }
    return tempArr;
}
function matrixCard(w,h){
    var tempArr = new Array(w);
    for (let i = 0; i < tempArr.length; i++) {
        tempArr[i] = new Array(h);        
    }
    return tempArr;
}
function matrix(w,...value){
    if(value.length==1 && typeof(value) != 'number'){
        value = value[0]
    }
    const tempArr = [];
    var s = [];
    for (let i = 0; i < value.length; i++) {
        s.push(value[i]);
        if((i+1) % w == 0){
            tempArr.push(s);
            s = [];
        }
    }
    return tempArr;
}

function matrixMult(a,b){
    let aH = a.length;
    let aW = a[0].length;

    let bH = b.length;
    let bW = b[0].length;

    if(aH == bW){
        var tempM = matrixCard(bW,aH);
        for (let i = 0; i < bW; i++) {
            for (let j = 0; j < aH; j++) {
                tempM[i][j] = 0;
                for (let k = 0; k < aW; k++) {
                    tempM[i][j] += a[i][k] * b[k][j];
                }                
            }  
        }
        return tempM;
    }
    else if(aW == bH){
        var tempM = matrixCard(bW,aH);
        for (let i = 0; i < aH; i++) {
            var s = 0;
            for (let j = 0; j < aW; j++) {
                s += a[i][j] * b[j];
            }
            tempM[i] = s;
        }
        return tempM;
    }
    else{
        console.log("Error in entering values");
    }
}
function record(canvas,time){
    startRecord(canvas);
    setTimeout(stopRecord,time);
}
function startRecord(canvas) {
    const stream = canvas.captureStream();
    mediaRecorder = new MediaRecorder(stream, {mimeType: 'video/mp4;codecs=vp9', ignoreMutedMedia: true, videoBitsPerSecond:5000000});
    recordedChunks = [];
    mediaRecorder.ondataavailable = e => {
        if(e.data.size > 0){
            recordedChunks.push(e.data);
        }
    };
    mediaRecorder.start();
}
function stopRecord() {
    mediaRecorder.stop();
        setTimeout(() => {
        const blob = new Blob(recordedChunks, {
            type: "video/mp4"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.mp4";
        a.click();
        URL.revokeObjectURL(url);
    },1);
}
function animate(animation,time){
    animation.c.putImageData(animation.data[animation.index],0,0);
    if(animation.data.length-1 > animation.index){
        animation.index++;
    }else{
        animation.index = 0;
    }
    setTimeout(animate,time,animation,time);
}