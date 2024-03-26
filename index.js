const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const reset = document.querySelector(".reset");
const timer = document.querySelector(".timer");
const btn = document.querySelector(".btn");
const text = document.querySelector(".message");

const audioclick = new Audio('click.mp3');
const audiobell = new Audio('bell.mp3');

let totalTime = 25 * 60; //in seconds
let timeLeft = totalTime;
let timeInterval;


// changes gets visible due to this function
function updateTimer(){
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;
    min.textContent = minutes < 10 ? '0'+ minutes : minutes;
    sec.textContent = seconds <10 ? '0' + seconds : seconds;
}





// timer ka logic is defined by this when to stop
function startTimer(){
    timeInterval = setInterval(()=>{
        timeLeft--;
        if(timeLeft<0) {
             clearInterval(timeInterval);
             document.querySelector(".timer").style.fontSize="2rem";
             audiobell.play();
             setTimeout(() => { 
                totalTime = 5 * 60; 
                timeLeft = totalTime;
                text.innerHTML= "Break Time";
                updateTimer();
           
                setTimeout(() => {
                    totalTime = 25 * 60;
                    timeLeft = totalTime;
                    text.innerHTML= "Study Time";
                    updateTimer();
                }, 300000); 
            }, 3000); 
        }

        else{
            updateTimer();
        } 
    }, 1000);
}





function pauseTimer() {
    clearInterval(timeInterval);
    audioclick.play();
}



// function of reset btn
function resetTimer(){
    clearInterval(timeInterval);
    timeLeft = totalTime;
    updateTimer();
}



play.addEventListener("click", ()=>{
    startTimer();
    audioclick.play();
});

pause.addEventListener("click", ()=>{
    if(timeInterval) pauseTimer();
    else startTimer();
    
});

reset.addEventListener("click",()=>{
    audioclick.play();
    resetTimer();  
} );

updateTimer();
