// Custom Audio Player
const player = document.getElementById('audio-player');
const playBtn = document.getElementById('playBtn');
const seekerSlider = document.getElementById('seekSlider');
const volumeSlider = document.getElementById('volumeSlider');
const songName = document.getElementById('songName');

const audio = player.querySelector('audio');
audio.volume = 0.5;

let playState = 'pause';

player.addEventListener('click', (e) => {
    const target = e.target;
    if (target.id === 'playBtn') {
        if (playState === 'pause' && audio.src) {
            audio.play();
        } else if (playState === 'playing') {
            audio.pause();
        }
    }
});

audio.addEventListener('loadedmetadata', () => {
    seekerSlider.max = Math.floor(audio.duration);
});
audio.addEventListener('play', () => {
    playBtn.classList.remove('bi-play-fill');
    playBtn.classList.add('bi-pause-fill');
    playState = 'playing';
});

audio.addEventListener('pause', () => {
    playBtn.classList.remove('bi-pause-fill');
    playBtn.classList.add('bi-play-fill');
    playState = 'pause';
});

audio.addEventListener('timeupdate', () => {
    seekerSlider.value = Math.floor(audio.currentTime);
});

seekerSlider.addEventListener('input', () => {
    audio.pause();
});

seekerSlider.addEventListener('change', () => {
    audio.currentTime = seekerSlider.value;
    audio.play();
});

volumeSlider.addEventListener('input', () => {
    localStorage.setItem('playerVolume', (volumeSlider.value / 100).toString());
    audio.volume = volumeSlider.value / 100;
});

const songCards = document.getElementsByClassName('song');
[...songCards].forEach(song => {
    return song.addEventListener('click', playSong);
});

function playSong(e) {
    const songId = e.currentTarget.dataset.id;
    if (e.target.classList.contains('favoriteBtn')) {
        if (e.target.dataset.favorited === '1') {
            // Unfavorite
            fetch(`/tracks/${songId}/favorites`, {
                method: 'DELETE'
            });

            e.target.classList.add('bi-heart');
            e.target.classList.remove('bi-heart-fill');

            e.target.dataset.favorited = "0";
        } else {
            // Favorite
            fetch(`/tracks/${songId}/favorites`, {
                method: 'PUT'
            });
            e.target.classList.add('bi-heart-fill');
            e.target.classList.remove('bi-heart');

            e.target.dataset.favorited = "1";
        }
    } else {
        songName.innerHTML = e.currentTarget.dataset.title
        audio.src = '/tracks/stream/' + songId;
        audio.play();
    }
}