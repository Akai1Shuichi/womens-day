const musicList = {
    "uoc-mo-cua-me": "Ước mơ của mẹ",
    "nhat-ky-cua-me": "Nhật ký của mẹ",
    "gap-me-trong-mo": "Gặp mẹ trong mơ",
    "ganh-me": "Gánh mẹ",
    "con-no-me": "Con nợ mẹ",
    "chua-bao-gio-me": "Chưa bao giờ mẹ kể"
}

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
const musicContainer = document.getElementById("musicContainer");
const playBtn = document.getElementById("play");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

function loadSong(src) {
    audio.src = src || `https://storage.googleapis.com/webai-54992.appspot.com/uoc-mo-cua-me.mp3`;
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

// Chuyển đổi màu hex sang RGB
function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.5)`; // Giảm độ trong suốt
}

function initStyle() {
    document.getElementById('progressTitle').innerText = 'Ước mơ của mẹ';
    document.getElementById('titleHeader').innerText = 'Chúc Mừng Ngày Phụ nữ Việt Nam 20/10';
    document.getElementById('contentHeader').innerText = '🌹 Chúc những người phụ nữ Việt Nam luôn xinh đẹp, luôn hạnh phúc và gặp nhiều may mắn trong cuộc sống ☘️';
    loadSong();
}

window.onload = async function() {
    const headerContainer = document.getElementById('headerContainer');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
        initStyle();
    }
    else {
        try {
            const response = await fetch(`https://us-central1-webai-54992.cloudfunctions.net/women_day_ai?id=${id}`);
            
            if (!response.ok) {
                throw new Error('Không tìm thấy dữ liệu cho ID này.');
            }
            
            const {data} = await response.json();
            const fileNameMusic = data?.musicLink?.split('/')?.pop()?.split('.')[0];
            document.getElementById('progressTitle').innerText = musicList[fileNameMusic] || 'Ước mơ của mẹ';
            document.getElementById('titleHeader').innerText = data?.tieuDe || 'Chúc Mừng Ngày Phụ nữ Việt Nam 20/10';
            document.getElementById('contentHeader').innerText = data?.message || '🌹💐 Chúc những người phụ nữ  Việt Nam luôn xinh đẹp\nluôn hạnh phúc và gặp nhiều may mắn trong cuộc sống ☘️';
            document.documentElement.style.setProperty('--primary-color', data?.color || '#ee5286');
            document.documentElement.style.setProperty('--secondary-color', hexToRgb(data?.color ||"#ee5286"));
            loadSong(data?.musicLink);
        } catch (error) {
            initStyle();
        }
    }
    headerContainer.style.display = 'block';   
     
};

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);