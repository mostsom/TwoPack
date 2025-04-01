class PixelE{
    constructor(x, y, color, size){
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.size = size;
    }
    draw(mm){
        mm.pt(this.x, this.y, this.size, true, this.color);
    }
}
class Ai{
    constructor(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
        this.text = "";
        this.CareaPTs = [];
        this.cA = [];
        this.cs = [];
        this.ptts = [];
        this.setup = ["50","50","50","Democracy","50","50","50","50","50","50","50"];
        this.deathRace = 0.02;
    }
    draw(mm){
        for (let i = 0; i < this.cA.length; i++) {
            mm.pt(this.cA[i][0],this.cA[i][1],3,true,`rgb(${this.r},${this.g},${this.b})`);
        }
        mm.bP();
        mm.flst(`rgb(${this.r},${this.g},${this.b})`);
        for (let i = 0; i < this.cA.length; i++) {
            mm.lT(this.cA[i][0],this.cA[i][1]);
        }
        mm.cP();
        mm.fl();
        for (let j = 0; j < this.cs.length; j++) {
            for (let i = 0; i < this.cs[j].length; i++) {
                mm.pt(this.cs[j][i][0],this.cs[j][i][1],3,true,`rgb(${this.r},${this.g},${this.b})`);
            }
            mm.bP();
            mm.flst(`rgb(${this.r},${this.g},${this.b})`);
            for (let i = 0; i < this.cs[j].length; i++) {
                mm.lT(this.cs[j][i][0],this.cs[j][i][1]);
            }
            mm.cP();
            mm.fl();
        }
    }
    drawPtts(mm){
        for (let i = 0; i < this.ptts.length; i++) {
            mm.pt(this.ptts[i].x,this.ptts[i].y,3,true,`rgb(${this.r},${this.g},${this.b})`)                
        }
    }
}
rule = (p1, p2, g, range = 80,torqueS = 0.2, maxSpeed = 1, through = true) =>{
    for (let i = 0; i < p1.length; i++) {
        fx = 0;
        fy = 0;
        for (let j = 0; j < p2.length; j++) {   
            a = p1[i];
            b = p2[j];
            dx = a.x-b.x;
            dy = a.y-b.y;
            a.size = (Math.abs(dx)+Math.abs(dy))/2*0.05+2;
            b.size = (Math.abs(dx)+Math.abs(dy))/2*0.05+2;
            d = Math.sqrt(dx*dx + dy*dy);
            if(d > 0 && d < range){
                Ftend = g * 1/d
                fx += (Ftend * dx)*torqueS;
                fy += (Ftend * dy)*torqueS;
            }
        }
        if(maxSpeed == 0){
            a.vx = (a.vx + fx);
            a.vy = (a.vy + fy);
        }else{
            if(Math.abs(a.vx) < maxSpeed){
                a.vx = (a.vx + fx);
            }else{
                a.vx = a.vx / Math.hypot(a.vx, a.vy) * maxSpeed;
            }
            if(Math.abs(a.vy) < maxSpeed){
                a.vy = (a.vy + fy);
            }else{
                a.vy = a.vy / Math.hypot(a.vx, a.vy) * maxSpeed;
            }
        }
        a.x += a.vx;
        a.y += a.vy;
        if(through){
            if(a.x < 0){
                a.x = mm.w;
            }
            if(a.x > mm.w){
                a.x = 0;
            }
            if(a.y < 0){
                a.y = mm.w;
            }
            if(a.y > mm.w){
                a.y = 0;
            }
        }else{
            if(a.x <= 0 || a.x >= mm.w){
                a.vx *= -1;
            }
            if(a.y <= 0 || a.y >= mm.h){
                a.vy *= -1;
            }
        }
    }
}
function createPG(number, color, size,w,h){
    var g = [];
    for (let i = 0; i < number; i++) {
        g.push(new PixelE(rand(w),rand(h),color,size));
    }
    return g;
}

