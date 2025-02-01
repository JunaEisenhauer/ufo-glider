import {Audio, AudioListener} from "three";
import * as assetLoader from "../../../utils/assetLoader";
import ThreeObject from "../threeObject";

export default class Sound extends ThreeObject {
    constructor(parameters = {}) {
        const audioListener = new AudioListener();
        super(audioListener);
        this.audioListener = audioListener;
        this.audios = {};
        if (parameters.sounds) {
            parameters.sounds.forEach(soundParameter => this.load(soundParameter));
        }
    }

    load(soundParameters) {
        const audio = new Audio(this.audioListener);
        this.audios[soundParameters.name] = audio;
        const audioBuffer = assetLoader.getAudio(soundParameters.name);
        audio.setBuffer(audioBuffer);
        audio.setLoop(soundParameters.loop || false);
        audio.setVolume(soundParameters.volume || 0.5);
    }
}
