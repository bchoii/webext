const videos = document.getElementsByTagName("video");

const _incVideoTime = (inc) => {
    for (const video of videos) {
        video.currentTime += inc;
    }
}

document.onkeydown = (event) => {
    switch (event.key) {
        case 'z':
            _incVideoTime(-3);
            break;
        case 'x':
            _incVideoTime(5);
            break;
        case 'v':
            _incVideoTime(30);
            break;
        case 'b':
            _incVideoTime(60);
            break;
        default:
            break;
    }
}

