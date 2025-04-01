var mm = new MMv3(c1,300,300);
var mm2 = new MMv3(c1,300,300);
var mm3 = new MMv3(c1,300,300);
var mm4 = new MMv3(c1,300,300);
var mm5 = new MMv3(c1,300,300);
var controlSizeCountry = new MMv3(c2,window.innerWidth*0.9,window.innerHeight*0.5);
mm.connect('canvas');
mm.border();
mm2.connect('canvas');
mm2.border();
mm3.connect('canvas');
mm3.border();
mm4.connect('canvas');
mm4.border();
mm5.connect('canvas');
mm5.border();
controlSizeCountry.connect('canvas');
controlSizeCountry.connect('keyboard');
controlSizeCountry.connect('mouse');
controlSizeCountry.border();

var kpt = 1;
var arrMap = [];
var allptts = [];
var AIindex = 7;
var AIs = [];
for (let i = 0; i < 5; i++) {
    AIs.push(new Ai(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)));
}
var time = 0;
keyDown = () => {
    if(controlSizeCountry.keyboard.key['t']){
        settingsON();
    }
    if(controlSizeCountry.keyboard.key[1]){
        AIindex = 0;
    }
    if(controlSizeCountry.keyboard.key[2]){
        AIindex = 1;
    }
    if(controlSizeCountry.keyboard.key[3]){
        AIindex = 2;
    }
    if(controlSizeCountry.keyboard.key[4]){
        AIindex = 3;
    }
    if(controlSizeCountry.keyboard.key[5]){
        AIindex = 4;
    }
    if(controlSizeCountry.keyboard.key['a']){
        AIs[AIindex].cs.push(AIs[AIindex].cA);
        AIs[AIindex].cA = []
    }
    if(controlSizeCountry.keyboard.key['p'] && kpt){
        kpt = 0;
        var pts = controlSizeCountry.canvas2ptV3(2,2,2);
        for (let j = 0; j < 5; j++) {
            for (var i = 0; i < pts.length; i++){
                if(pts[i].color[0] == AIs[j].r && pts[i].color[1] == AIs[j].g && pts[i].color[2] == AIs[j].b){
                    pts[i].whois = j;
                    pts[i].life = true;
                    pts[i].GPD = parseInt(AIs[j].setup[0]);
                    pts[i].resources = parseInt(AIs[j].setup[1]);
                    pts[i].techDev = parseInt(AIs[j].setup[2]);
                    pts[i].GovType = parseInt(AIs[j].setup[3]);
                    pts[i].IR = parseInt(AIs[j].setup[4]);
                    pts[i].Stability = parseInt(AIs[j].setup[5]);
                    pts[i].MS = parseInt(AIs[j].setup[6]);
                    pts[i].DF = parseInt(AIs[j].setup[7]);
                    pts[i].Population = parseInt(AIs[j].setup[8]);
                    pts[i].EH = parseInt(AIs[j].setup[9]);
                    pts[i].ED = parseInt(AIs[j].setup[10]);
                    AIs[j].ptts.push(pts[i]);
                    allptts.push(pts[i]);
                }
            }
        }
        controlSizeCountry.cls();
        for (let i = 0; i < 5; i++) {
            AIs[i].drawPtts(controlSizeCountry);
        }
        update();
    }
}

function mouseDown(){
    if(kpt){
        if(AIs[AIindex]){
            AIs[AIindex].cA.push([controlSizeCountry.mouse.x, controlSizeCountry.mouse.y]);
        }
        controlSizeCountry.cls();
        for (let i = 0; i < AIs.length; i++) {
            AIs[i].draw(controlSizeCountry);        
        }
    }
}
aiselect.onclick = () =>{
    if(AIs[aiselect.value].setup.length == 0){
        var inpRs = document.querySelectorAll('#inpR');
        for (let i = 0; i < inpRs.length; i++) {
            inpRs[i].onclick = () =>{
                var inpRs = document.querySelectorAll('#inpR');
                var s = [];
                for (let i = 0; i < inpRs.length; i++) {
                    s.push(inpRs[i].value);
                    AIs[aiselect.value].setup = s;
                }
            }
    }
    }else{
        var inpRs = document.querySelectorAll('#inpR');
        for (let i = 0; i < AIs[aiselect.value].setup.length; i++) {
            inpRs[i].value = AIs[aiselect.value].setup[i];
        }
    }
    
}
var dx = Math.floor(controlSizeCountry.w/3);
var dy = Math.floor(controlSizeCountry.h/3);
var mapArr = new Array(dx*dy);

var yellow1 = createPG(30,'yellow',2,mm.w,mm.h);
var red1 = createPG(30,'red',2,mm.w,mm.h);
var green1 = createPG(30,'green',2,mm.w,mm.h);
var blue1 = createPG(30,'blue',2,mm.w,mm.h);

var particles1 = [yellow1,red1,green1,blue1];

var yellow2 = createPG(30,'yellow',2,mm.w,mm.h);
var red2 = createPG(30,'red',2,mm.w,mm.h);
var green2 = createPG(30,'green',2,mm.w,mm.h);
var blue2 = createPG(30,'blue',2,mm.w,mm.h);

var particles2 = [yellow2,red2,green2,blue2];

var yellow3 = createPG(30,'yellow',2,mm.w,mm.h);
var red3 = createPG(30,'red',2,mm.w,mm.h);
var green3 = createPG(30,'green',2,mm.w,mm.h);
var blue3 = createPG(30,'blue',2,mm.w,mm.h);

var particles3 = [yellow3,red3,green3,blue3];

var yellow4 = createPG(30,'yellow',2,mm.w,mm.h);
var red4 = createPG(30,'red',2,mm.w,mm.h);
var green4 = createPG(30,'green',2,mm.w,mm.h);
var blue4 = createPG(30,'blue',2,mm.w,mm.h);

var particles4 = [yellow4,red4,green4,blue4];

var yellow5 = createPG(30,'yellow',2,mm.w,mm.h);
var red5 = createPG(30,'red',2,mm.w,mm.h);
var green5 = createPG(30,'green',2,mm.w,mm.h);
var blue5 = createPG(30,'blue',2,mm.w,mm.h);

var particles5 = [yellow5,red5,green5,blue5];

var random1 = [];
var random2 = [];
var random3 = [];
var random4 = [];
var random5 = [];
for (let i = 0; i < 16; i++) {
    random1.push((Math.random()*4) - 2);
    random2.push((Math.random()*4) - 2);
    random3.push((Math.random()*4) - 2);
    random4.push((Math.random()*4) - 2);
    random5.push((Math.random()*4) - 2);
}
function rules(a,b,c,d,random){
    rule(a, a, 3,  20);
    rule(a, b, random[1],  80);
    rule(a, c, random[2],  80);
    rule(a, d, random[3],  80);

    rule(b, b, 3,  20);
    rule(b, a, random[5],  80);
    rule(b, c, random[6],  80);
    rule(b, d, random[7],  80);

    rule(c, c, 3,  20);
    rule(c, a, random[9],  80);
    rule(c, b, random[10], 80);
    rule(c, d, random[11], 80);

    rule(d, d, 3, 20);
    rule(d, a, random[13], 80);
    rule(d, b, random[14], 80);
    rule(d, c, random[15], 80);
}
// update();
function update(){
    time += 1;
    rules(yellow1,red1,green1,blue1,random1);
    rules(yellow2,red2,green2,blue2,random2);
    rules(yellow3,red3,green3,blue3,random3);
    rules(yellow4,red4,green4,blue4,random4);
    rules(yellow5,red5,green5,blue5,random5);


    mm.cls("rgba(0,0,0,0.1)");
    mm2.cls("rgba(0,0,0,0.1)");
    mm3.cls("rgba(0,0,0,0.1)");
    mm4.cls("rgba(0,0,0,0.1)");
    mm5.cls("rgba(0,0,0,0.1)");
    for (let i = 0; i < particles1.length; i++) {
        for (let j = 0; j < particles1[i].length; j++) {
            particles1[i][j].draw(mm);
        }
    }
    for (let i = 0; i < particles2.length; i++) {
        for (let j = 0; j < particles2[i].length; j++) {
            particles2[i][j].draw(mm2);
        }
    }
    for (let i = 0; i < particles3.length; i++) {
        for (let j = 0; j < particles3[i].length; j++) {
            particles3[i][j].draw(mm3);
        }
    }
    for (let i = 0; i < particles4.length; i++) {
        for (let j = 0; j < particles4[i].length; j++) {
            particles4[i][j].draw(mm4);
        }
    }
    for (let i = 0; i < particles5.length; i++) {
        for (let j = 0; j < particles5[i].length; j++) {
            particles5[i][j].draw(mm5);
        }
    }
    var stk = 1;
    if(time >= 600){
        stk = 0;
    }
    if(stk == 0){
        Industry = Industry.split('\n').join('').split('.');
        Finance = Finance.split('\n').join('').split('.');
        Trade = Trade.split('\n').join('').split('.');
        LogisticsAndTransport = LogisticsAndTransport.split('\n').join('').split('.');
        Energy = Energy.split('\n').join('').split('.');
        CivilRights = CivilRights.split('\n').join('').split('.');
        Ecology = Ecology.split('\n').join('').split('.');
        Education = Education.split('\n').join('').split('.');
        SocialPolicy = SocialPolicy.split('\n').join('').split('.');
        MilitaryAndSecurity = MilitaryAndSecurity.split('\n').join('').split('.');
        ScienceAndTechnology = ScienceAndTechnology.split('\n').join('').split('.');
        Economy = Economy.split('\n').join('').split('.');
        var textD = "";
        for (let i = 0; i < 5; i++) {
            if(AIs[i].cA.length > 0){
                textD += "<p>ai-"+(i+1)+"\n";
                textD += Industry[Math.floor(rand(100))] + ".\n";
                textD += Finance[Math.floor(rand(100))] + ".\n";
                textD += Trade[Math.floor(rand(100))]+ ".\n";
                textD += LogisticsAndTransport[Math.floor(rand(100))]+ ".\n";
                textD += Energy[Math.floor(rand(100))]+ ".\n";
                textD += Economy[Math.floor(rand(100))]+ ".\n";
                textD += SocialPolicy[Math.floor(rand(100))]+".\n";
                textD += MilitaryAndSecurity[Math.floor(rand(100))]+".\n";
                textD += Education[Math.floor(rand(100))]+".\n";
                textD += "</p>"
            }
        }
        alert("Done");
        document.write(textD);

    }
    if(!kpt){
        eachElemptts(controlSizeCountry,allptts,time)
    }
    if(stk != 0){
        requestAnimationFrame(update);
    }
}
function settingsON(){
    if(settings.style.display == 'flex'){
        settings.style.display = 'none';
    }else{
        settings.style.display = 'flex';
    }
}
var ctx = eicanvas.getContext('2d');
eicanvas.width = window.innerWidth*0.8;
eicanvas.height = window.innerHeight*0.8;
var EIFIIOH = document.createElement("AUDIO");
var images = [];
for (let i = 123; i < 202; i++) {
    var img = document.createElement("img");
    img.src = './EI-img/EI'+i+'.png';
    images.push(img);
}
var commertial = 1;

var tanimate = 1;
EIFIIOH.src = "./EI-tfiih/My Project_0.wav"
var tempIndex = 0;
if(commertial){
    eicanvas.onclick = () =>{
        if(tanimate){
            drawAnimationEI(ctx, tempIndex, eicanvas, 100);
            EIFIIOH.play();
            tanimate = 0;
        }
    }
}else{
    tbody.style.background = 'none';
    eicanvas.style.display = 'none';
}
function drawAnimationEI(ctx, tI, c, timesTamp){
    ctx.beginPath();
    ctx.drawImage(images[tI],c.width/2-c.width/1.2/2,c.height/2-c.height/1.2/2,c.width/1.2,c.height/1.2);
    ctx.fillRect(0,0,c.width,c.height);
    if (tI > 40 && tI < 55){
        ctx.fillStyle = 'rgba(30,30,30,0.1)';
    }else{
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
    }
    if(tI == 57){
        timesTamp = 200;
    }
    ctx.closePath();
    tI+=1;
    if(tI < 79){
        setTimeout(drawAnimationEI, timesTamp, ctx, tI, c, timesTamp);
    }else{
        tbody.style.background = 'none';
        c.style.display = 'none';
    }
}
function eachElemptts(mm,pixels,time){
    mm.cls();
    arrMap = []
    var width = Math.floor(controlSizeCountry.w/3);
    var height = Math.floor(controlSizeCountry.h/3);
    for (let index = 0; index < Math.floor(controlSizeCountry.w/3)*Math.floor(controlSizeCountry.h/3); index++) {
        arrMap.push([]);
    }
    
    for (let i = 0; i < pixels.length; i++) {
        if(arrMap[Math.floor(pixels[i].x / 3) + Math.floor(pixels[i].y / 3) * width]){
            if(pixels[i].life){
                arrMap[Math.floor(pixels[i].x / 3) + Math.floor(pixels[i].y / 3) * width].push(pixels[i]);
            }
        }
    }
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            var ps = [];
            for (let k = 0; k < 3; k++) {
                for (let d = 0; d < 3; d++) {
                    if(arrMap[(i+k)+(j+d)*width] && arrMap[(i+k)+(j+d)*width].length != 0){
                        ps = ps.concat([].concat(arrMap[(i+k)+(j+d)*width]));
                    }
                }
            }
            for (let i = 0; i < ps.length; i++) {
                mm.pt(ps[i].x,ps[i].y,3,true,`rgb(${ps[i].color[0]},${ps[i].color[1]},${ps[i].color[2]})`)
                for (let j = i+1; j < ps.length; j++) {
                    var t1 = 0;
                    if(ps[j].whois == ps[i].whois){
                        t1+=1;
                    }
                    if(t1 > 100){
                        t1 = 0;
                        ps[i].Population-=0.1;
                    }
                    if(t1 > 95 && Math.random() < 0.0001){
                        var t = ps[i];
                        t.x += (Math.random()*10)-5;
                        t.y += (Math.random()*10)-5;
                        pixels.push(t);
                    }
                    
                    if(dist2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y) > 2){
                        ps[i].x += Math.cos(angle2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)) * dist2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)*0.01*ps[i].Population*0.1;
                        ps[i].y += Math.sin(angle2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)) * dist2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)*0.01*ps[i].Population*0.1;
                        ps[j].x -= Math.cos(angle2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)) * dist2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)*0.01*ps[j].Population*0.1;
                        ps[j].y -= Math.sin(angle2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)) * dist2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)*0.01*ps[j].Population*0.1;
                    }
                    if(ps[i].whois != ps[j].whois){
                        if(ps[i].MS > ps[j].MS){
                            ps[i].x += Math.cos(angle2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)) * dist2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)*0.1;
                            ps[i].y += Math.sin(angle2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)) * dist2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)*0.1;
                            ps[j].life = false;
                        }else{
                            ps[j].x -= Math.cos(angle2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)) * dist2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)*0.1;
                            ps[j].y -= Math.sin(angle2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)) * dist2pt(ps[i].x,ps[i].y,ps[j].x,ps[j].y)*0.1;
                            ps[i].life = false;
                        }
                    }
                }
                if(j < 20){
                    ps[i].life = false;
                }
            }
        }
    }
}