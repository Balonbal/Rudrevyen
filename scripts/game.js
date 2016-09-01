/**
 * Created by Sly on 03.12.2015.
 */
var lastTick = 0;
var direction;
var movement = .02, shotSpeed= 0.1;
var shots = [];
var enemies = [];
var player;
var shotInterval = 1000;
var shotcooldown = 0;
var enemylocs = ["5%", "15%", "25%", "40%", "55%"];
var spawnrate = 0.0005;
var score = 0;

function movePlayer(direction, percent) {
    var left = player.style.left == "" ? 0 : parseFloat(player.style.left);
    if (direction == "RIGHT") {
        player.style.left = left + percent + "%";
    } else if (direction=="LEFT") {
        player.style.left = left - percent + "%";
    }
    if (parseFloat(player.style.left) > 100) player.style.left = "95%";
    if (parseFloat(player.style.left) < 0) player.style.left = "0%";
}

function tick() {
    var now = new Date().getTime();
    var timePassed = now - lastTick;

    //Lost the game
    if (enemies.length >= 5) {
        clearInterval(gametick);
        clearInterval(enemySpawner);
        $("#lostLabel").css("display", "block");
    }

    movePlayer(direction, movement*timePassed);

    for (var i = 0; i < shots.length; i++) {
        var shot = shots[i];
        shot.style.top = parseFloat(shot.style.top) + shotSpeed*timePassed + "%";

        if (parseFloat(shot.style.top) > 95) {
            shot.parentNode.removeChild(shot);
            shots.splice(i, 1);
        }
        if (enemies.length <= 0) continue;
        //Lower down than the top of enemy
        if (parseFloat($(shot).offset().top) + $(shot).height() >= parseFloat($(enemies[0]).offset().top)) {
            for (var j  = 0; j < enemies.length; j++) {
                //Higher up than the bottom
                var enemy = enemies[j];
                if (parseFloat($(shot).offset().top) > parseFloat($(enemy).offset().top) + parseFloat(enemy.height)) continue;
                if (parseFloat($(shot).offset().left) + $(shot).width() < parseFloat($(enemy).offset().left)) continue;
                if (parseFloat($(shot).offset().left) > parseFloat($(enemy).offset().left) + parseFloat(enemy.width)) continue

                enemy.parentNode.removeChild(enemy);
                enemies.splice(j, 1);
                shot.parentNode.removeChild(shot);
                shots.splice(i, 1);
                score++;
                updateLabels();
            }
        }
    }

    lastTick = now;
    if (shotcooldown > 0) shotcooldown -= timePassed; else shotcooldown = 0;
    setCircleState("shotTimer", "#dc00ea", shotcooldown/shotInterval * 100);
}

function rollEnemy() {
    if (Math.random() < spawnrate*250) {
        spawnEnemy();
    }
}

function shoot() {
    if (shotcooldown > 0) return;
    var shotx = parseFloat(player.style.left);
    var shot = document.createElement("div");
    shot.style.left = shotx + 1.25 + "%";
    shot.style.top = $("#player").height()/$("#gameArea").height() * 100 + "%";
    shot.className = "shot";

    shots.push(shot);
    document.getElementById("gameArea").appendChild(shot);
    shotcooldown = shotInterval;
}

function spawnEnemy() {
    if (enemies.length >= 5) return;
    var enemy = document.createElement("img");
    enemy.src = "images/game/emil (2).png"
    var pos = Math.floor((Math.random() * 5));
    while (enemyOccupies(enemylocs[pos])) {
        pos = Math.floor((Math.random() * 5));
    }
    enemy.style.left = enemylocs[pos];
    enemy.style.top = "7%";
    enemy.className = "enemy";

    enemies.push(enemy);
    document.getElementById("targetArea").appendChild(enemy);
}

function enemyOccupies(loc) {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].style.left == loc) return true;
    }

    return false;
}

function updateLabels() {
    $("#scoreLabel").html(score);
    spawnrate = Math.log(score + 1) / Math.log(1.2) * 0.00004;
    $("#spawnrateLabel").html((spawnrate*25000).toFixed(3));
}

function setCircleState(id, color, state) {
    /* Fix state
    if (state == 0)
        state = 100;
    else if (state == 100)
        state = 0;*/

    // Get context and calculate angle
    var angle = state / 50 * Math.PI - 1 / 2 * Math.PI;   // Convert to radians
    var c = document.getElementById(id).getContext('2d'); // Get the drawing context

    // Clear the drawing area
    c.clearRect(0, 0, 200, 200);

    // Configure line styles
    c.lineWidth = 5;
    c.strokeStyle = color;
    c.lineCap = 'round';

    // Draw circle
    c.beginPath();   // Begin the path
    c.moveTo(50, 2); // Move to the top
    // Draw an arc
    // Parameters: x, y (middle of the canvas), startAngle (on the top), endAngle (our angle), direction
    c.arc(50, 50, 48, 3 / 2 * Math.PI, angle, true);
    c.stroke(); // Stroke the path

    $("#timeLeft").html(100 - Math.round(state) + "%");
}

function restart() {
    spawnrate = 0.0005;
    score = 0;

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].parentNode.removeChild(enemies[i]);
    }

    for (var i = 0; i < shots.length; i++) {
        shots[i].parentNode.removeChild(shots[i]);
    }
    enemies = [];
    shots = [];
    //Update displays
    updateLabels();
    spawnEnemy();
    $("#lostLabel").css("display", "none");
    gametick = setInterval(tick, 10);
    enemySpawner = setInterval(rollEnemy, 250);
}

function animateCircleState(id, color, begin, end) {
    setCircleState(id, color, begin); // Draw the circle

    if( begin < end ) // Check if we should continue to draw
    // set a timeout so it animates smoothly, but not too fast
        setTimeout(function(){
            // Call animateCircleState recursively with new angle (begin + 1)
            animateCircleState(id, color, begin + 1, end);
        }, 3); // Adjust the time if you want to slow the animation
}

$(document).ready(function() {

    $("body").bind("keyup", function (e) {
        var keyCode;
        if (e.keyCode) {
            keyCode = e.keyCode;
        } else {
            keyCode = e.which;
        }

        if (((keyCode == 68 || keyCode == 39) && direction == "RIGHT") ||
            ((keyCode == 65 || keyCode == 37) && direction == "LEFT")) direction = "";
    });

    $("body").bind("keydown", function (e) {
        var keyCode;
        if (e.keyCode) {
            keyCode = e.keyCode;
        } else {
            keyCode = e.which;
        }

        switch (keyCode) {
            case 68:
            case 39:
                direction = "RIGHT";
                break;
            case 65:
            case 37:
                direction = "LEFT";
                break;
            case 32:
                shoot();
        }
    });

    player = document.getElementById("player");
    player.style.left = "50%";
    updateLabels();
    spawnEnemy();
});
var gametick = setInterval(tick, 10);
var enemySpawner = setInterval(rollEnemy, 250);