const timeContainer = document.getElementById("timeContainer");
const mainTime = document.getElementById("mainTime");
const monthAndDate = document.getElementById("monthAndDate");
const secondsSpan = document.querySelector("#mainTime .seconds");
const ampmSpan = document.getElementById("ampm");

let currentMinute = new Date().getMinutes();

function setRandomPosition() {
  const maxX = window.innerWidth - timeContainer.offsetWidth;
  const maxY = window.innerHeight - timeContainer.offsetHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  timeContainer.style.left = `${randomX}px`;
  timeContainer.style.top = `${randomY}px`;
}

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  if (seconds === 58) {
    timeContainer.classList.add("fading-out");
  }

  if (minutes !== currentMinute) {
    currentMinute = minutes;
    timeContainer.classList.remove("fading-out");
    setRandomPosition();
    timeContainer.classList.add("fading-in");
    setTimeout(() => {
      timeContainer.classList.remove("fading-in");
    }, 2000);
  }

  const ampm = hours >= 12 ? "P M" : "A M";
  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = formattedMinutes;
  secondsSpan.textContent = `:${formattedSeconds}`;
  ampmSpan.textContent = ampm;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const dayStr = now.toLocaleDateString("en-US", { weekday: "short" });

  document.getElementById("dayAndDate").textContent = `${dayStr}, ${day} ${month}`;
  document.getElementById("year").textContent = year;
}

function tick() {
  updateTime();
  const now = new Date();
  const delay = 1000 - now.getMilliseconds();
  setTimeout(tick, delay);
}

window.addEventListener("load", () => {
  setRandomPosition();
  timeContainer.style.visibility = "visible";
  timeContainer.classList.add("initial-fade-in");
  setTimeout(() => {
    timeContainer.classList.remove("initial-fade-in");
  }, 1000);
});

tick();
