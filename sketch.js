
var birds = [];
var bgColor = 0;
function
    setup() {
    createCanvas(windowWidth, windowHeight);

    background(bgColor);
    frameRate(60);
    class Boid {
        constructor(x, y, vx, vy, r, color) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.r = r;
            this.color = color;
        }
        drawShape() {
            ;

        }
        update(vx, vy) {
            this.vx += vx;
            this.vy += vy;
            this.x += this.vx;
            this.y += this.vy;
        }


    }
    class Bird extends Boid {
        constructor(x, y, vx, vy, r, color) {
            super(x, y, vx, vy, r, color);
        }
        drawShape() {
            stroke(this.color);
            circle(this.x, this.y, this.r);
            var vecX;
            var vecY;
            [vecX, vecY] = normalize(this.vx, this.vy);
            line(this.x, this.y, this.x + vecX * 20, this.y + vecY * 20);

        }
    }

    for (var i = 0; i <= 70; i += 1) {
        var bird = new Bird(random(windowWidth / 2 - 20, windowWidth / 2 + 20), random(windowHeight / 2 - 20, windowHeight / 2 + 20), random(-0.1, 0.1), random(-0.1, 0.1), 10, [255, 255, 255]);
        birds.push(bird);


    }

}

function
    draw() {
    background(bgColor);
    var avgPosX = 0;
    var avgPosY = 0;
    var avgvX = 0;
    var avgvY = 0;
    var num = birds.length;



    for (var i = 0; i < birds.length; i += 1) {

        avgPosX += birds[i].x;
        avgPosY += birds[i].y;
        avgvX += birds[i].vx;
        avgvY += birds[i].vy;
    }
    avgPosX /= num;
    avgPosY /= num;
    avgvX /= num;
    avgvY /= num;

    for (var i = 0; i < num; i += 1) {
        //接近
        var vx1 = 0;
        var vy1 = 0;
        var avgPosiX = (avgPosX * num - birds[i].x) / num - 1;
        var avgPosiY = (avgPosY * num - birds[i].y) / num - 1;
        var distcenter = sqrt((avgPosiX - birds[i].x) ** 2 + (avgPosiY - birds[i].y) ** 2);
        var p = 30;
        if (distcenter < p) {
            ;
        } else {
            vx1 = (avgPosiX - birds[i].x);
            vy1 = (avgPosiY - birds[i].y);
        }

        //衝突回避

        var vx2 = 0;
        var vy2 = 0;

        for (var j = 0; j < birds.length; j += 1) {
            var dx = birds[j].x - birds[i].x;
            var dy = birds[j].y - birds[i].y;
            var dist = sqrt(dx * dx + dy * dy);
            if (i == j) {
                dist = 10000
            }

            if (dist < 20) {
                vx2 = -1 * dx;
                vy2 = -1 * dy;
            }

        }

        //整列
        var avgviX = (avgvX * num - birds[i].vx) / num - 1;
        var avgviY = (avgvY * num - birds[i].vy) / num - 1;

        var vx3 = (avgviX - birds[i].vx);
        var vy3 = (avgviY - birds[i].vy);


        //目標地点
        var vx4 = 0;
        var vy4 = 0;
        var p = 50;
        var dist = 0;
        var target_x = windowWidth / 2;
        var target_y = windowHeight / 2;
        if (mouseIsPressed == true) {
            target_x = mouseX;
            target_y = mouseY;

        }
        var dist = sqrt((birds[i].x - target_x) ** 2 + (birds[i].y - target_y) ** 2);
        if (dist < p) {
            ;
        } else {
            vx4 = target_x - birds[i].x;
            vy4 = target_y - birds[i].y;
        }
        ellipse(target_x, target_y, 40);
        [vx1, vy1] = normalize(vx1, vy1);
        [vx4, vy4] = normalize(vx4, vy4);

        var a1 = 0.7;
        var a2 = 0.4;
        var a3 = 0.2;
        var a4 = 0.9;

        max_speed = 0.08
        var vx = a1 * vx1 + a2 * vx2 + a3 * vx3 + a4 * vx4;
        var vy = a1 * vy1 + a2 * vy2 + a3 * vy3 + a4 * vy4;
        var v = sqrt(vx ** 2 + vy ** 2);
        if (v > max_speed) {
            vx = (vx / v) * max_speed;
            vy = (vy / v) * max_speed;
        }

        birds[i].drawShape();

        birds[i].update(vx, vy);
    }

}

function normalize(x, y) {
    var ans = [0, 0];
    if (x == 0 && y == 0) {
        return ans;
    } else {
        ans[0] = x / sqrt(x ** 2 + y ** 2);
        ans[1] = y / sqrt(x ** 2 + y ** 2);
        return ans;
    }
}