import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
createApp({
    data() {
        return {
            totalRounds: null,
            currentRound: 1,
            score1: 0,
            score2: 0,
            wins1: 0,
            wins2: 0,
            gameStarted: false,
            player1Turn: true,
            player2Turn: false,
            roll1: null,
            roll2: null,
            preRoll1: null,
            preRoll2: null,
            isFirstPlayerRolling: null,
            message: '',
            resultMessage: '',
            count:0,
            totalCount:0
        }
    },
    methods: {
        startGame() {
            if (!this.totalRounds || isNaN(this.totalRounds)) {
                this.message = "Please enter a valid number of rounds.";
                return;
            }
            if (this.totalRounds % 2 !== 1) {
                this.message = "Please enter an odd number.";
                return;
            }

            this.gameStarted = true;
            this.message = '';
            this.currentRound = 0;
            this.score1 = 0;
            this.score2 = 0;
            this.wins1 = 0;
            this.wins2 = 0;
            this.resultMessage = '';
        },
        rollDicePlayer1() {
            if (this.currentRound===0){
                this.preRoll1 = this.rollDice();
                this.player1RollMessage = 'Player 1 rolled: ' + this.preRoll1; 
                this.player1Turn = false;
                this.player2Turn = true;
            }
            else{
            this.roll1 = this.rollDice();
            this.player1RollMessage = 'Player 1 rolled: ' + this.roll1;
            this.score1 += this.roll1;
            this.totalCount++;
            this.count++;
            if (this.count===3){
                this.player1Turn = false;
                this.player2Turn = true;
                this.count=0;
                if (this.totalCount===6){
                    this.checkScores();
            }
                }
            }
        },
        rollDicePlayer2() {
            if (this.currentRound===0){
                this.preRoll2 = this.rollDice();
                this.player2RollMessage = 'Player 2 rolled: ' + this.preRoll2; 
                this.player2Turn = false;
                this.checkScores();
            }
            else{
            this.roll2 = this.rollDice();
            this.player2RollMessage = 'Player 2 rolled: ' + this.roll2;
            this.score2 += this.roll2;
            this.totalCount++;
            this.count++;
            if (this.count===3){
                this.player2Turn = false;
                this.player1Turn = true;
                this.count=0;
                if (this.totalCount===6){
                    this.checkScores();
            }
                }
            }
        },
        rollDice() {
            return Math.floor(Math.random() * 6) + 1;
        },
        checkScores() {
            if (this.currentRound===0){
                if (this.preRoll1 > this.preRoll2) {
                    this.isFirstPlayerRolling = true;
                    this.player1Turn = true;
                    this.player2Turn = false;
                    this.resultMessage= 'Player 1 rolls first';
                } 
                else if (this.preRoll1===this.preRoll2){
                    this.player1Turn = true;
                    this.player2Turn = false;
                }else {
                    this.isFirstPlayerRolling = false;
                    this.player2Turn = true;
                    this.player1Turn = false;
                    this.resultMessage= 'Player 2 rolls first';
                }
                this.currentRound++;
            }
            else {
                if (this.score1 > this.score2) {
                    this.wins1++;
                    this.resultMessage = "Player 1 wins this round!";
                    this.score1=0;
                    this.score2=0;
                    this.player1RollMessage = '';
                    this.player2RollMessage = '';
                } else if (this.score2 > this.score1) {
                    this.wins2++;
                    this.resultMessage = "Player 2 wins this round!";
                    this.score1=0;
                    this.score2=0;
                    this.player1RollMessage = '';
                    this.player2RollMessage = '';
                } else {
                    this.score1=0;
                    this.score2=0;
                    this.wins1++;
                    this.wins2++;
                    this.player1RollMessage = '';
                    this.player2RollMessage = '';
                    this.resultMessage = "It's a tie!";
                }
                this.currentRound++;
                this.score1 = 0;
                this.score2 = 0;
                this.player1RollMessage = '';
                this.player2RollMessage = '';
                this.totalCount=0;
                if (this.currentRound>this.totalRounds){
                    if (this.wins1>this.wins2){
                        this.resultMessage="Player 1 wins!" ;                       
                    }
                    if (this.wins1<this.wins2){
                        this.resultMessage="Player 2 wins!" ;                       
                    }
                    this.player1Turn = false;
                     this.player2Turn = false;
                     this.player1RollMessage = '';
                     this.player2RollMessage = '';
                }
            }
        },
        restartGame() {
            this.totalRounds = null;
            this.currentRound = 1;
            this.score1 = 0;
            this.score2 = 0;
            this.wins1 = 0;
            this.wins2 = 0;
            this.gameStarted = false;
            this.player1Turn = true;
            this.player2Turn = false;
            this.roll1 = null;
            this.roll2 = null;
            this.isFirstPlayerRolling = true;
            this.message = '';
            this.resultMessage = '';
            this.preRoll1= null;
            this.preRoll2= null;
            this.totalCount=0;
            this.count=0;
            this.player1RollMessage = '';
            this.player2RollMessage = '';
        }
    },
}).mount('#app');