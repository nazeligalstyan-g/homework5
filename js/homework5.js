const canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 400;



// Task 1 / Create Points array

const ctx = canvas.getContext('2d');

const rand = function(num){
    return Math.floor(Math.random()*num + 1);
};

const colors = ['#1A7DD7', '#F2B809', '#03275A', '#F37402', '#F34605'];
const points = [];
const createPoints = function(count, canvasWidth, canvasHeight){
    if(count <= 0){
        return;
    }
    const helper = function(count, coord, canvasWidth, canvasHeight){
        if (count < 0) {
            return;
        }
        const point = {
            x: rand(coord),
            y: rand(coord),
            width: 30,
            height: 30,
            xDelta: 2,
            yDelta: 2,
            color: colors[rand(5) - 1]
        };
        if (point.x < canvas.width - point.width && point.y < canvas.height - point.height && point.x > 0 && point.y > 0){
            points.push(point);
        }
        helper(count - 1, coord, canvasWidth, canvasHeight);
        return points;
    };
    return helper(count-1, 350, canvasWidth, canvasHeight);

};

// Task 2 / Bunch of boxes, with different colors, bouncing around all over the screen

const gameData = createPoints(25, canvas.width, canvas.height);

console.log(gameData);


const draw = function(i){
    if(i >= gameData.length){
        return;
    }
    ctx.fillStyle =  gameData[i].color;
    ctx.fillRect(gameData[i].x, gameData[i].y, gameData[i].width, gameData[i].height);
    draw(i+1);
};

const update = function(i){
    if(i >= gameData.length){
        return;
    }
    gameData[i].x += gameData[i].xDelta;
    gameData[i].y += gameData[i].yDelta;
    gameData[i].color = colors[rand(5) - 1];

    if(gameData[i].x >= canvas.width - gameData[i].width || gameData[i].y >= canvas.height - gameData[i].height){
        gameData[i].xDelta = -gameData[i].xDelta;
        gameData[i].yDelta = -gameData[i].yDelta;
    }
    if(gameData[i].x <= 0 || gameData[i].y <= 0){
        gameData[i].xDelta = -gameData[i].xDelta;
        gameData[i].yDelta = -gameData[i].yDelta;
    }
    update(i+1);
};

const loop = function(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    draw(0);
    update(0);
    requestAnimationFrame(loop);
};

loop();


// Task 3 // Bad guys game 

const canvas1 = document.getElementById('canvas1');
canvas1.width = 1000;
canvas1.height = 800;

const context = canvas1.getContext('2d');

const rand1 = function(num){
    return Math.floor(Math.random()*num + 55);
};

const backImg = new Image();
backImg.src = 'https://s3.envato.com/files/171194231/Jump_Game_Background_2_4267x2133.jpg';
const heroImg = new Image();
heroImg.src = 'https://orig00.deviantart.net/4b75/f/2017/166/9/b/zayats__nu__pogodi___by_ninjawoodpeckers91-dbcupe0.png';
const badGuy = new Image();
badGuy.src  = 'https://vignette.wikia.nocookie.net/villains/images/1/19/Wolf_nu_pogodi.png/revision/latest?cb=20160628153727';
const blackWolf = new Image();
blackWolf.src = 'https://t08.deviantart.net/nvTJWXj_KgBbgTD_5bV4E6j6gjk=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre13/c6a0/th/pre/i/2012/158/4/0/volk_trace_by_doublevtovka22-d52llew.png';
const panda = new Image();
panda.src = 'http://lezebre.lu/images/detailed/26/65456-JDM-PANDA-ARMES.png';

let firstAlert =  false;

const badGuysImg = [badGuy, blackWolf, panda];


const badGuys = [];
const createBadGuys = function(count, canvasWidth, canvasHeight){

    if(count <= 0){
        return;
    }
    const helper = function(count, coord, canvasWidth, canvasHeight){
        if (count < 0) {
            return;
        }
        const badGuy = {
            x: rand(coord),
            y: rand(coord),
            width: rand1(60),
            height: rand1(60),
            img: badGuysImg[rand(3) - 1],
            xDelta: 2,
            yDelta: 2
        };
        if (badGuy.x < canvas1.width - badGuy.width && badGuy.y < canvas1.height - badGuy.height && badGuy.x > 0 && badGuy.y > 0){
            badGuys.push(badGuy);
        }
        helper(count-1, coord, canvasWidth, canvasHeight);
        return badGuys;
    };
    return helper(count-1, 300, canvasWidth, canvasHeight);

};

let badGuysCount = 1;
const gameData1 = {
    hero: {
        x: 50,
        y: 510,
        img: heroImg,
        width: 40,
        height: 55,
        xDelta: 20,
        yDelta: 0
    },
    badGuys: createBadGuys(badGuysCount, canvas1.width, canvas1.height)
};
console.log(badGuys);

const hero = gameData1.hero;
const maxJumpHeight = canvas1.height - hero.y - (hero.height*2);

const draw1 = function(){
    context.drawImage(backImg, 0, 0, canvas1.width, canvas1.height);
    context.drawImage(hero.img, hero.x, hero.y, hero.width, hero.height);
    const f = function(i){
        if(i>=badGuys.length){
            return;
        }else{
            context.drawImage(badGuys[i].img, badGuys[i].x, badGuys[i].y, badGuys[i].width, badGuys[i].height);
        }
        f(i+1);
    };
    f(0);
};

const updateData1 = function(){
    if(hero.yDelta !==0){
        hero.y -= hero.yDelta;
        if(hero.y <= maxJumpHeight){
            hero.yDelta = -hero.yDelta;
        }else if(hero.y >= 225){
            hero.yDelta =0;
        }
    }

    const f = function(i){
        if(i>= badGuys.length){
            return;
        }else{
            if(badGuys[i].x < canvas1.width - badGuys[i].width || badGuys[i].y < canvas1.width - badGuys[i].width ){
                badGuys[i].x += badGuys[i].xDelta;
                badGuys[i].y += badGuys[i].yDelta;
            }else{
                badGuys[i].x = 0;
                badGuys[i].y = 0;
            }

            if(badGuys[i].x >canvas1.width - badGuys[i].width || badGuys[i].y >canvas1.height - badGuys[i].height){
                badGuys[i].xDelta = -badGuys[i].xDelta;
                badGuys[i].yDelta = -badGuys[i].yDelta;
            }else if(badGuys[i].x < 0 || badGuys[i].y < 0){
                badGuys[i].xDelta = -badGuys[i].xDelta;
                badGuys[i].yDelta = -badGuys[i].yDelta;
            }
            if( (hero.x + hero.width > badGuys[i].x) && (hero.x < badGuys[i].x + badGuys[i].width) && (hero.y + hero.height > badGuys[i].y && hero.y < badGuys[i].y + badGuys[i].height ) ){

                //badGuys[i].xDelta = -badGuys[i].xDelta;
                //badGuys[i].yDelta = -badGuys[i].yDelta;

                if( !firstAlert ) {
                    alert("Sorry, try again!");
                    firstAlert = true;
                }
                location.reload();
            }
        }
        f(i+1);
    }
    f(0);
};

const loop1 = function(){
    draw1();
    updateData1();

    requestAnimationFrame(loop1);
};

loop1();


const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

document.addEventListener('keydown', function(event){
    if(event.keyCode === rightKey) {
        hero.x += hero.xDelta;
        if(hero.x >= canvas1.width-hero.width){
            hero.x = 0;
           // hero.xDelta = 0;

            alert('congrats! go for more!');

            if(badGuysCount < 4){
                createBadGuys(1, canvas1.width, canvas1.height);
            }
            badGuysCount+=1;
        }

    }else if(event.keyCode === leftKey){
        hero.x -= hero.xDelta;
        if(hero.x<0){
            hero.x = canvas1.width-hero1.width;
        }
    }else if(event.keyCode === upKey){
        if(hero.yDelta === 0){
            hero.yDelta = 4;
        }
    }
}, false);






