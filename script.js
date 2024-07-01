let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

const songsList = [
    {
        name: "20 DEEP",
        artist: "O $IDE MAFIA",
        src: "music/20 DEEP.mp3",
        cover: "images/music.jpg"
    },
    {
        name: "CRASHIN",
        artist: "O $IDE MAFIA",
        src: "music/crashin.mp3",
        cover: "images/music.jpg"
    },
    {
        name: "DRUGS IN THE CLUB",
        artist: "O $IDE MAFIA",
        src: "music/drugs in the club.mp3",
        cover: "images/music.jpg"
    },
    {
        name: "FREESTYLE",
        artist: "O $IDE MAFIA",
        src: "music/freestyle.mp3",
        cover: "images/music.jpg"
    },
    {
        name: "GET LOW",
        artist: "O $IDE MAFIA",
        src: "music/gelow.mp3",
        cover: "images/music.jpg"
    },
    {
        name: "GO GETTA",
        artist: "O $IDE MAFIA",
        src: "music/go getta.mp3",
        cover: "images/music.jpg"
    },
    {
        name: "KUNAN MONG PIC",
        artist: "O $IDE MAFIA",
        src: "music/kunan mong pic.mp3",
        cover: "images/music.jpg"
    },
    {
        name: "MY THANG",
        artist: "O $IDE MAFIA",
        src: "music/my thang.mp3",
        cover: "images/music.jpg"
    },
    {
        name: "SMD",
        artist: "O $IDE MAFIA",
        src: "music/smd.mp3",
        cover: "images/music.jpg"
    },
    {
        name: "X",
        artist: "O $IDE MAFIA",
        src: "music/X.mp3",
        cover: "images/music.jpg"
    },
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}