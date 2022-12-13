const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let nyquist = audioCtx.sampleRate / 2;
let oscilBank = [];

let oscNum = 4;

function createOscillator(incomingFrequency) {  // 'incomingFrequency' is the fundamental frequency of the note
    let freq = incomingFrequency;
    let partial = 1;

    while (freq <= nyquist) {  // 'while' loops run while a condition remains true
        let amp = 0.3 * 1;
        amp /= partial;

        let oscilBankLen = oscilBank.length;

        oscilBank[oscilBankLen] = [];
        oscilBank[oscilBankLen][0] = incomingFrequency;

        for (i = 0; i < oscNum; i++) {
            let randomOffset = Math.random() * 5;     
            let fatFreq = freq - randomOffset;
            fatFreq += i;
            oscilBank[oscilBankLen][i + 1] = new Oscil(audioCtx, fatFreq, amp).play();

        }
        partial++;
        freq = incomingFrequency * partial;
    }
};

function stopOscillator(e) {
    let freqVal;

    if (e.type === "mouseup") {
        let clickedKey = e.target.id;
        clickedKey = clickedKey.slice(3);
        clickedKey = parseInt(clickedKey);
        freqVal = Object.values(keyFreqMap)[clickedKey];
    }
    else {
        if (e.repeat === false) {
            let typedKey = e.key;
            freqVal = keyFreqMap[typedKey];
        }
    }
        
    const oscilsOff = oscilBank.filter( (origOscilBank) => {
        if (origOscilBank[0] === freqVal) {
            return true;
        }
    });

    for (i = 0; i < oscilsOff.length; i++) { // 'i' created in a "for loop" is a local variable
        for (j = 0; j < oscNum; j++) {   // 'j' is used for a loop within a loop
            oscilsOff[i][j + 1].stop();
        }
    }
    
};

function getFrequency(e) { // 'e' as an argument to the function in an event listener accesses the 'event' object
    if (e.repeat === false) {
        let typedKey = e.key;
        let freqVal = keyFreqMap[typedKey];
        createOscillator(freqVal);
    }
}

let x = 0;

function checkOctave() {
    let octave = document.getElementById("octaveList").value;
    changeOctave(octave);
}

function changeOctave(octave){
    if (octave === "octaveOne") {
        keyFreqMap = {
            "a": 130.82,    // C4
            "w": 138.59,    // C#4/Db4
            "s": 146.83,    // D4
            "e": 155.57,    // etc.
            "d": 164.82,
            "f": 174.62,
            "t": 185.00,
            "g": 196.00,
            "y": 207.65,
            "h": 220.00,
            "u": 233.08,
            "j": 246.94,
            "k": 261.63,
            "o": 277.19,
            "l": 293.67,
            "p": 311.13,
            ";": 329.63     // E5
            }
        console.log("One");
        console.log(keyFreqMap)
    } else if (octave === "octaveTwo") {
        keyFreqMap = {
            "a": 261.63,    // C4
            "w": 277.18,    // C#4/Db4
            "s": 293.66,    // D4
            "e": 311.13,    // etc.
            "d": 329.63,
            "f": 349.23,
            "t": 369.99,
            "g": 392.00,
            "y": 415.30,
            "h": 440.00,
            "u": 466.16,
            "j": 493.88,
            "k": 523.25,
            "o": 554.37,
            "l": 587.33,
            "p": 622.25,
            ";": 659.25     // E5
            }
        console.log("Two");
        console.log(keyFreqMap);
    } else if (octave === "octaveThree") {
        keyFreqMap = {
            "a": 523.26,    // C4
            "w": 554.36,    // C#4/Db4
            "s": 587.32,    // D4
            "e": 622.26,    // etc.
            "d": 659.26,
            "f": 698.46,
            "t": 739.98,
            "g": 784.00,
            "y": 830.60,
            "h": 880.00,
            "u": 932.32,
            "j": 987.76,
            "k": 1046.50,
            "o": 1108.74,
            "l": 1174.66,
            "p": 1244.50,
            ";": 1318.50     // E5
            }
        console.log("Three");
        console.log(keyFreqMap)
    } else {
        console.log("error");
    }
}

var keyFreqMap = {
    "a": 261.63,    // C4
    "w": 277.18,    // C#4/Db4
    "s": 293.66,    // D4
    "e": 311.13,    // etc.
    "d": 329.63,
    "f": 349.23,
    "t": 369.99,
    "g": 392.00,
    "y": 415.30,
    "h": 440.00,
    "u": 466.16,
    "j": 493.88,
    "k": 523.25,
    "o": 554.37,
    "l": 587.33,
    "p": 622.25,
    ";": 659.25     // E5
    }

window.addEventListener('keydown', getFrequency);

window.addEventListener('keyup', stopOscillator);

const btn = document.getElementById("octaveBtn");
btn.addEventListener("click", checkOctave);
console.log(btn);

// ===== CLICK ON KEYS TO PLAY SYNTH ===== //
function getClickedFrequency(e) {
    let clickedKey = e.target.id;
    clickedKey = clickedKey.slice(3);   // the .slice Array method chops off the characters in an item starting from the beginning and going to the X number of places in the string.
    clickedKey = parseInt(clickedKey);  // turn the string number into a number number
    let keyFreq = Object.values(keyFreqMap)[clickedKey];
    createOscillator(keyFreq);
}



const keys = document.querySelectorAll(".key"); // this creates a 'nodeList' --> an array-like collection of data

const keysArray = Array.from(keys);

keysArray.forEach(key => key.addEventListener('mousedown', getClickedFrequency) ) //'key' is a local variable (local to this .forEach method) that is a stand-in name for the key being clicked)

keysArray.forEach(key => key.addEventListener('mouseup', stopOscillator));
