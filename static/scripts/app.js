'use strict';

const FRAME_COUNT = 14;

let divRoot = document.getElementById('div-root');

let audioMusic = createAudioElement({
    'audio/ogg': 'static/sounds/music.ogg',
    'audio/mpeg': 'static/sounds/music.mp3'
});
audioMusic.loop = true;
audioMusic.volume = 0.8;

let audioReact = createAudioElement({
    'audio/ogg': 'static/sounds/react.ogg',
    'audio/mpeg': 'static/sounds/react.mp3'
});

let imageFrames = [];
let imageIndex = FRAME_COUNT - 1;

function createAudioElement(sources) {
    const audio = document.createElement('audio');

    Object.keys(sources).forEach(function(key) {
        const source = document.createElement('source');
        source.type = key;
        source.src = sources[key];
        audio.appendChild(source);
    });

    return audio;
}

function setFrame(index) {
    for(let i = 0; i < imageFrames.length; ++i) {
        imageFrames[i].style.display = i === index ? 'block' : 'none';
    }
}

function updateFrame() {
    if(imageIndex < FRAME_COUNT - 1) imageIndex++;
    setFrame(imageIndex);
}

function chop(e) {
    try { if(audioMusic.paused) audioMusic.play(); } catch(err) {}

    imageIndex = 0;

    audioReact.currentTime = 0;
    audioReact.play();
}

for(let i = 0; i < FRAME_COUNT; ++i) {
    let image = document.createElement('img');
    image.src = 'static/images/' + i.toString() + '.png';
    image.className = 'image-frame';
    image.style.display = 'none';
    image.draggable = false;

    divRoot.appendChild(image);

    imageFrames[i] = image;
}

divRoot.addEventListener('click', chop);

setInterval(updateFrame, 50);
