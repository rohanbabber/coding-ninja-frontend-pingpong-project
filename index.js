window.document.addEventListener('keydown', handleInputKeypress);
if(localStorage.getItem('highestScore') == undefined){
    window.alert('This is your first time!');
}
else{
    window.alert(localStorage.getItem('highName') + ' has maximum score of ' + localStorage.getItem('highestScore'));
}

const rod1 = document.getElementById('rod1');
const ball = document.getElementById('ball');
const rod2 = document.getElementById('rod2');

let isRoundRunning = false;

let scoreRod1 = 0;
let scoreRod2 = 0;

let dirl = 1;
let dirt = 1;

let windowInnerWidth = window.innerWidth;
let windowInnerHeight = window.innerHeight;

let ballPosRod1 = 20 + 'px';
let ballPosRod2 = windowInnerHeight - 35 + 'px';

initializeStartingPositions(ballPosRod2);

function handleInputKeypress(e){
    if(e.key === 'Enter'){
        if(!isRoundRunning){
            startRound();
        }
    }
    else if(e.key === 'a' && isRoundRunning){
        if(rod1.offsetLeft > 0){
            rod1.style.left = rod1.offsetLeft - 10 + 'px';
            rod2.style.left = rod2.offsetLeft - 10 + 'px';
        }
    }
    else if(e.key === 'd' && isRoundRunning){
        if(rod1.offsetLeft < windowInnerWidth - 200){
            rod1.style.left = rod1.offsetLeft + 10 + 'px';
            rod2.style.left = rod2.offsetLeft + 10 + 'px';
        }
    }
}

function initializeStartingPositions(ballPos){
    rod1.style.position = 'absolute';
    rod1.style.top = '0px';
    rod1.style.left = (windowInnerWidth/2 - 100) + 'px';


    rod2.style.position = 'absolute';
    rod2.style.top = windowInnerHeight - 20 + 'px';
    rod2.style.left = (windowInnerWidth/2 - 100) + 'px';

    ball.style.position = 'absolute';
    ball.style.top = ballPos;
    ball.style.left = (windowInnerWidth/2) + 'px';
}


function startRound(){

    isRoundRunning = true;
    const myInterval = setInterval(myTimer, 100);

    function myTimer() {
        ball.style.top = ball.offsetTop - 10 * dirt + 'px';
        ball.style.left = ball.offsetLeft - 10 * dirl + 'px';
        // Side Boundaries
        if(ball.offsetLeft < 0 || ball.offsetLeft > windowInnerWidth - 10){
            dirl *= -1;
        }
        // Rod1
        if(ball.offsetTop < 20){
            if(ball.offsetLeft >= rod1.offsetLeft && ball.offsetLeft <= rod1.offsetLeft + 200){
                dirt *= -1;
            }
            else{
                clearInterval(myInterval);
                initializeStartingPositions(ballPosRod1);
                isRoundRunning = false;
                scoreRod2 += 100;
                if(localStorage.getItem('highestScore') == undefined){
                    localStorage.setItem('highestScore', '100');
                    localStorage.setItem('highName', 'Rod 2');
                }
                else if(Number(localStorage.getItem('highestScore')) < scoreRod2){
                    localStorage.setItem('highestScore', scoreRod2);
                    localStorage.setItem('highName', 'Rod 2');
                }
                window.alert('Rod 2 wins with a score of ' + scoreRod2 + '. Maximum score is ' + localStorage.getItem('highestScore'));
            }
        }
        // Rod 2
        if(ball.offsetTop > windowInnerHeight - 35){
            if(ball.offsetLeft >= rod2.offsetLeft && ball.offsetLeft <= rod2.offsetLeft + 200){
                dirt *= -1;
            }
            else{
                clearInterval(myInterval);
                initializeStartingPositions(ballPosRod2);
                isRoundRunning = false;
                scoreRod1 += 100;
                if(localStorage.getItem('highestScore') == undefined){
                    localStorage.setItem('highestScore', '100');
                    localStorage.setItem('highName', 'Rod 1');
                }
                else if(Number(localStorage.getItem('highestScore')) < scoreRod1){
                    localStorage.setItem('highestScore', scoreRod1);
                    localStorage.setItem('highName', 'Rod 1');
                }
                window.alert('Rod 1 wins with a score of ' + scoreRod1 + '. Maximum score is ' + localStorage.getItem('highestScore'));
            }
        }
    }
}