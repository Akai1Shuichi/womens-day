const storage_url = 'https://storage.googleapis.com/webai-54992.appspot.com/';
const musicList = {
    "uoc-mo-cua-me": "Ước mơ của mẹ",
    "nhat-ky-cua-me": "Nhật ký của mẹ",
    "gap-me-trong-mo": "Gặp mẹ trong mơ",
    "ganh-me": "Gánh mẹ",
    "con-no-me": "Con nợ mẹ",
    "chua-bao-gio-me": "Chưa bao giờ mẹ kể",
    "falling-you": "Falling You",
    "oi-mat-riu": "Ôi Mất Rìu" ,
    "say-yes-vi": "Say Yes VietNamese",
    "iu-la-day": "Iu là đây",
    "chi-can-co-nhau": "CHỈ CẦN CÓ NHAU",
    "anh-nang-cua-anh": "Ánh nắng của anh",
    "vo-tuyet-voi-nhat":"Vợ Tuyệt Vời Nhất",
    "nu-cuoi-18-20":"nụ cười 18 20",
    "co-hen-voi-thanh-xuan":"có hẹn với thanh xuân",
    "hb-always-14": "Happy Birthday to You (Always 14)",
    "cmsn-pdt": "Khúc hát chúc mừng sinh nhật"
}
const formDataInit = {
    tieuDe: "Happy Birthday To You 🕯️",
    color: "#ee5286",
    musicLink: "https://storage.googleapis.com/webai-54992.appspot.com/hb-always-14.mp3",
    message: "🌹💐 Chúc mừng sinh nhật bạn ☘️",
    musicName: "Happy Birthday to You (Always 14)"
}

document.getElementById("submitButton").addEventListener("click",async function(event) {
    event.preventDefault();
    const tieuDeElement = document.getElementById('tieuDe');
    const colorElement = document.getElementById('color');
    const musicLinkElement = document.getElementById('musicLink');
    const messageElement = document.getElementById('message');
    const fileMusicName = musicLinkElement?.value?.split('/')?.pop()?.split('.')[0];


    const formData = {
        tieuDe: tieuDeElement.value,
        color: colorElement.value,
        musicLink: musicLinkElement.value,
        message: messageElement.value,
        musicName: musicList[fileMusicName],
    };

    if (formDataInit.tieuDe == formData.tieuDe && formDataInit.color == formData.color && formDataInit.musicLink == formData.musicLink && formDataInit.message == formData.message && formDataInit.musicName == formData.musicName) {
        alert('Nội dung giống thiệp gốc họăc vừa tạo .\nNếu muốn tạo mới hãy thay đổi nội dung .')
        return;
    }

    formData.createdAt = new Date().toISOString();

    try {
        const response = await fetch('https://us-central1-webai-54992.cloudfunctions.net/women_day_ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            const resultLabel = document.getElementById('result');
            resultLabel.style.display = 'block';
            resultLabel.innerHTML = `<a href="https://thiep-chuc-mung.vercel.app?id=${result.id}" target="_blank">https://thiep-chuc-mung.vercel.app?id=${result.id}</a>`;
            Object.assign(formDataInit, formData);
        } else {
            alert('Đã xảy ra lỗi khi gửi dữ liệu!');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Đã xảy ra lỗi mạng!');
    }
});