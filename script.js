var typed = new Typed('#element', {
    strings: ["Let's play", 'Play it again', "And again"],
    typeSpeed: 50,
    loop: true
});

let userScore = 0;
let compScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const yetMsg = document.querySelector("#msg-yet");
const audio = document.querySelector("#myAudio");
const refreshBtn = document.querySelector(".head");

function handleClick() {
    window.location.reload();
}

refreshBtn.addEventListener("click", handleClick);

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        // console.log(userChoice);
        playGame(userChoice);
    })
});
const drawfunc = (Uc, Cc) => {
    msg.innerText = "Game was Draw, Play again";
    msg.style.backgroundColor = "brown";
    yetMsg.innerText = `User Choosed ${Uc} and Computer Choosed ${Cc} so it's Draw`
    audio.pause();
}
const showwinner = (user, Uc, Cc) => {
    if (user) {
        msg.innerText = "You Win";
        userScore++;
        userScorePara.innerText = userScore;
        msg.style.backgroundColor = "green";
        yetMsg.innerText = `You choosed ${Uc} and Computer Choosed ${Cc}\n so You win`;
        audio.play();
    } else {
        compScore++;
        msg.innerText = "You Lose"
        compScorePara.innerText = compScore;
        msg.style.backgroundColor = "red";
        yetMsg.innerText = `Computer choosed ${Cc} and You Choosed ${Uc}\n so You lose`;
        audio.pause();
    }
}

const playGame = (userChoice) => {
    console.log("user choice =", userChoice);
    const compChoice = genCompChoice();
    console.log("comp choice =", compChoice);

    if (userChoice === compChoice) {
        //Draw
        drawfunc(userChoice, compChoice);
    } else {
        let userwin = true;
        if (userChoice === "rock") {
            userwin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userwin = compChoice === "scissor" ? false : true;
        } else {
            userwin = compChoice === "rock" ? false : true;
        }
        showwinner(userwin, userChoice, compChoice);
    }
}

const genCompChoice = () => {
    const opt = ["rock", "paper", "scissor"];
    const rand = Math.floor(Math.random() * 3);
    return opt[rand];
}