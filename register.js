const storage_url = 'https://storage.googleapis.com/webai-54992.appspot.com/';
const musicList = {
    "uoc-mo-cua-me": "Ước mơ của mẹ",
    "nhat-ky-cua-me": "Nhật ký của mẹ",
    "gap-me-trong-mo": "Gặp mẹ trong mơ",
    "ganh-me": "Gánh mẹ",
    "con-no-me": "Con nợ mẹ",
    "chua-bao-gio-me": "Chưa bao giờ mẹ kể",
    "falling-you": "Falling You",
    "oi-mat-riu": "Ôi Mất Rìu" 
}
const formDataInit = {
    tieuDe: "Chúc Mừng Ngày Phụ nữ Việt Nam 20/10",
    color: "#ee5286",
    musicLink: "https://storage.googleapis.com/webai-54992.appspot.com/uoc-mo-cua-me.mp3",
    message: "🌹 Chúc những người phụ nữ Việt Nam luôn xinh đẹp, luôn hạnh phúc và gặp nhiều may mắn trong cuộc sống ☘️",
    musicName: "Ước mơ của mẹ"
}

document.getElementById("registerForm").addEventListener("submit",async function(event) {
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
        alert('Nội dung giống thiệp gốc .\nNếu muốn tạo mới hãy thay đổi nội dung .')
        return;
    }

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
            resultLabel.innerHTML = `<a href="https://womens-day-blond.vercel.app?id=${result.id}" target="_blank">https://womens-day-blond.vercel.app?id=${result.id}</a>`;
        } else {
            alert('Đã xảy ra lỗi khi gửi dữ liệu!');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Đã xảy ra lỗi mạng!');
    }
});