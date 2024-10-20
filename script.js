/** MODAL */
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];

// Khi người dùng nhấn vào thiệp (icon), mở modal
btn.onclick = function() {
    modal.style.display = "block";
    playSong();
}

// Khi người dùng nhấn vào dấu "×", đóng modal
span.onclick = function() {
    modal.style.display = "none";
}

// Khi người dùng nhấn ra ngoài modal, đóng modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/** MUSIC */
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

function loadSong() {
    audio.src = `https://cherryradio.com.au/cdn1/2021/07/100919/320/uoc-mo-cua-me-the-heroes-version-100919.mp3`;
}

// Play song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Lắng nghe sự kiện
playBtn.addEventListener("click", () => {
    // Kiểm tra xem musicContainer có chứa class "play" hay không?
    const isPlaying = musicContainer.classList.contains("play");

    // Nếu có thì thực hiện pause
    // Nếu không thì thực hiện play
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

window.onload = function() {
    document.getElementById('titleHeader').innerText = 'Chúc Mừng Ngày Phụ nữ Việt Nam 20/10';
    document.getElementById('contentHeader').innerText = 'Chúc mừng Ngày Phụ nữ Việt Nam!\nChúc bạn luôn vui vẻ, hạnh phúc và thành công!';
    document.documentElement.style.setProperty('--primary-color', '#ee5286');
    loadSong();
};

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);