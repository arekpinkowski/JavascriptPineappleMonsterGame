document.addEventListener("DOMContentLoaded", function () {

var self;//9

var Furry = function(){
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

var Coin = function() {
    this.x = Math.floor(Math.random()*10);
    this.y = Math.floor(Math.random()*10);
}

var Game = function(){
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin ();
    this.setScore = 0;
    this.score = document.querySelector("#score strong");
    this.position = function(x,y) {
        return x + (y*10);
    };
    this.idSetInterval = setInterval(function(){
        self.hideVisibleFurry();
        self.moveFurry();
        self.checkCoinCollision();
    }, 250);


    this.showFurry = function(){
        if(this.board[this.position(this.furry.x, this.furry.y)]) {
        this.board[this.position(this.furry.x, this.furry.y)].classList.add("furry")
    } else {
        this.gameOver();
    }
    }

    //9
    this.hideVisibleFurry = function(){
        var hideClass = document.querySelector(".furry");
        hideClass.classList.remove("furry");
        }


    this.showCoin = function() {
        this.board[this.position(this.coin.x, this.coin.y)].classList.add("coin")
    };

    //9
    this.moveFurry = function(){
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.showFurry();

    }

        //10
    this.turnFurry = function(event){
        switch (event.which) {
            case 37:
                this.furry.direction = "left"
                break;
            case 39:
                this.furry.direction = "right"
                break;
            case 40:
                this.furry.direction = "up"
                break;
            case 38:
                this.furry.direction = "down"
                break;
                    }
        }

            //11
    this.checkCoinCollision = function(){

        if (this.position(this.furry.x, this.furry.y) == this.position(this.coin.x, this.coin.y))
        {
            console.log("ok");
            var current = document.querySelector(".coin");
            current.classList.remove("coin");

            this.coin = new Coin();
            this.showCoin();
            this.setScore++;
            this.score.innerText = this.setScore;
            }
        }

    this.gameOver = function(){
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            console.log("koniec");
            clearInterval(this.idSetInterval);
            // this.hideVisibleFurry();
            document.querySelector("#finalScore").innerText = this.setScore;
            document.querySelector("#over").classList.remove("invisible");
        }
        return false;
    }

    this.startGame = function(){

        this.showFurry();
        this.showCoin();

        self = this;
        this.idSetInterval;
    };
};

var game = new Game();
game.startGame();
document.addEventListener("keydown", function(event){
    game.turnFurry(event);
    });

});
