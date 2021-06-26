var maxHeight = 100;
var width = 10;
var counter = 0;
let interval;
var sound = document.getElementById("music");
var sticks;

sound.onended = function() {
  play();
  counter = 0;
  sticks.forEach((x) => x.classList.remove('bg-red'));
};

setTimeout(() => {
  if (sound.readyState >= 1)
    createStick(sound.duration);
}, 1000);

function createStick(duration) {
  let i = 0;
  for (; i < duration; i++) {
    let stickHeight = Math.random() * maxHeight;
    let stick = document.createElement('div');
    stick.style.height = `${stickHeight}px`;
    stick.style.width = `${width}px`;
    stick.classList.add('stick');
    stick.id = i;
    stick.addEventListener("click", manageTime);
    document.querySelector('.wrapper').appendChild(stick);
  }
  sticks = document.querySelectorAll('.stick');
  createSticks(i);
}

function play() {
  let target = document.getElementById('play');
  if (target.classList.contains('fa-play')) {
    sound.play();
    start();
    target.classList.replace('fa-play', 'fa-pause');
  } else {
    clearInterval(interval);
    sound.pause();
    target.classList.replace('fa-pause', 'fa-play');
  }
}

function start() {
  interval = setInterval(function() {
    controlSticks();
    counter++;
  }, 1000);
}

function manageTime(event) {
  counter = event.target.id;
  sound.currentTime = counter;
  sticks.forEach((x) => x.classList.remove('bg-red'));
  controlSticks();
}

function controlSticks() {
  sticks.forEach((x, i) => {
    if (counter >= i) {
      if (!x.classList.contains('bg-red'))
        x.classList.add('bg-red');
    }
  });
}

function createSticks(sticksCount) {
  let colors = ['green', 'blue', 'yellow', 'black', 'brown'];
  let counter = Math.floor(sticksCount / 5);
  let j=0;
  for (i = counter; i < sticksCount; i += counter) {
    let tag = document.createElement('div');
    tag.classList.add('tag-wrapper');
    tag.innerHTML = `<div class="box ${colors[j]}"> Test</div>`;
    tag.innerHTML += `<div class="pipe ${colors[j]}"></div>`;
    tag.innerHTML += `<div class="circle ${colors[j++]}""></div>`;
    document.getElementById(i).append(tag);
  }
}
