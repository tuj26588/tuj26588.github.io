class Oscil {
    constructor(audioCtx, freq, gain) { // the constructor() method is always the first method listed in a class; methods are properties of classes (aka Objects) that are functions.
        this.audioCtx = audioCtx;   //
        this.oscillator = this.audioCtx.createOscillator();
        this.vol = this.audioCtx.createGain();
        this.vol.gain.value = gain;
        this.oscillator.type = "sine";
        this.oscillator.frequency.value = freq;
        this.oscillator.connect(this.vol);
        this.vol.connect(this.audioCtx.destination);
    }

    play() {
        this.oscillator.start();
        return this;
    }

    stop() {
        this.oscillator.stop();
    }
}