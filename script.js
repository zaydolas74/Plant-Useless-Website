let fruits = document.querySelectorAll("button");
let seed = document.querySelector("#seed");
let bloemPot = document.querySelector("#bloemPot");
let bloemPotFoto = document.querySelector("#bloemPotFoto");
let timerText = document.querySelector("#timerText");
let waterBottle2 = document.querySelector("#water2");
let waterBottle = document.querySelector("#water");
let waterBottleVisible = true;
let watered = false;
let seedPlanted = false;
let hours = 0;
let minutes = 0;
let seconds = 0;

fruits.forEach((fruit) => {
  fruit.addEventListener("click", (e) => {
    if (e.target.innerText != "") {
      seed.innerText = "🫘";
    }
    fruits.forEach((fruit) => {
      fruit.style.backgroundColor = "white";
    });
    if (e.target.innerText != "" && seedPlanted == false) {
      e.target.style.backgroundColor = "lightgreen";
    }
  });
});

const onMouseMove = (e) => {
  seed.style.left = e.pageX - 22 + "px";
  seed.style.top = e.pageY - 20 + "px";
  seed.style.cursor = "pointer";
};

document.addEventListener("mousemove", onMouseMove);

function seedAnimation() {
  //breng de seed van het midden naar de bloempot in een animatie
  seed.classList.add("seedAnimation");
  //voeg een timer toe voor de image verandering
  setTimeout(() => {
    seed.style.display = "none";
    bloemPotFoto.src = "Images/BloemPotGegroeid.svg";
    timer();
  }, 1500);
}

//Met hulp van GPT-3.5
function timer() {
  setInterval(() => {
    console.log("timer");
    seconds++;

    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }

    const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    timerText.innerHTML = formattedTime;

    if (seconds <= 10 && minutes == 0 && hours == 0) {
      if (watered == false) {
        bloemPotFoto.src = "Images/BloemPotGegroeid.svg";
      } else {
        bloemPotFoto.src = "Images/BloemPotWet.svg";
      }
    } else {
      if (seconds >= 40 && minutes >= 0 && hours >= 0) {
        bloemPotFoto.src = "Images/BloemPotStage3.svg";
      } else if (seconds >= 30 && minutes == 0 && hours == 0) {
        bloemPotFoto.src = "Images/BloemPotStage2.svg";
      } else if (seconds >= 20 && minutes == 0 && hours == 0) {
        bloemPotFoto.src = "Images/BloemPotStage1.svg";
      }
    }
  }, 1000);
}

function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

bloemPot.addEventListener("click", () => {
  if (seed.innerText == "🫘") {
    if (seedPlanted == false) {
      console.log("seed planted");
      seedPlanted = true;
      //postion div seed in the center of the screen
      seedAnimation();
      //stop the move from following the mouse
      document.removeEventListener("mousemove", onMouseMove);
      waterBottle.addEventListener("click", () => {
        if (waterBottleVisible) {
          waterBottle.style.visibility = "hidden";
          waterBottleVisible = false;

          document.addEventListener("mousemove", (e) => {
            waterBottle2.style.left = e.pageX - 80 + "px";
            waterBottle2.style.top = e.pageY - 150 + "px";
            //get 50% from screen width
            if (
              e.pageX <= window.innerWidth / 2 + 180 &&
              e.pageX >= window.innerWidth / 2 - 180 &&
              waterBottle2.style.display == "block"
            ) {
              waterBottle2.style.transform = "rotate(-120deg)";
              bloemPotFoto.src = "Images/BloemPotWet.svg";
              watered = true;
            } else {
              waterBottle2.style.transform = "rotate(0deg)";
            }
          });
          waterBottle2.style.top = window.innerHeight * 2 + "px";
          waterBottle2.style.display = "block";
        } else {
          waterBottle.style.visibility = "visible";
          waterBottleVisible = true;
          waterBottle2.style.display = "none";
        }

        // Second click function
        waterBottle2.addEventListener("click", () => {
          waterBottle.style.visibility = "visible";
          waterBottleVisible = true;
          waterBottle2.style.display = "none";
        });
      });
    }
  }
});

//Moeite met 2de click systeem dus heb ik hulp aan gpt gevraagd
