var ball;
var database;
var pos;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database();
    var readRef = database.ref("Ball/Position");
    readRef.on("value",readOp,showErr);
}

function readOp(value){
    pos = value.val();
    ball.x = pos.x;
    ball.y = pos.y;
}

function showErr(){
    console.log("Error");
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;

    var writeRef = database.ref("Ball/Position");
    writeRef.set({
        x : ball.x + x,
        y : ball.y + y
    });
}
