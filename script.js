
var audio = new Audio('audio/baron.mp3');
var musicToggle = document.getElementById("musicToggle");

function toggleSound() {
    if (musicToggle.checked) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Rest of the script...

const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["AKTIV", "ONLINE"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 200);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, 1300);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(type, 2250);
});
