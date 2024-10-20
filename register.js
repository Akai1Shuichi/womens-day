const storage_url = 'https://storage.googleapis.com/webai-54992.appspot.com/';
const formDataInit = {
    tieuDe: "Chúc Mừng Ngày Phụ nữ Việt Nam 20/10",
    color: "#ee5286",
    musicLink: "https://storage.googleapis.com/webai-54992.appspot.com/uoc-mo-cua-me.mp3",
    message: "Chúc mừng Ngày Phụ nữ Việt Nam! Chúc bạn luôn vui vẻ, hạnh phúc và thành công!\""
}

document.getElementById("registerForm").addEventListener("submit",async function(event) {
    event.preventDefault();
    const tieuDeElement = document.getElementById('tieuDe');
    const colorElement = document.getElementById('color');
    const musicLinkElement = document.getElementById('musicLink');
    const messageElement = document.getElementById('message');

    const formData = {
        tieuDe: tieuDeElement.value,
        color: colorElement.value,
        musicLink: musicLinkElement.value,
        message: messageElement.value
    };

    if (formDataInit.tieuDe == formData.tieuDe && formDataInit.color == formData.color && formDataInit.musicLink == formData.musicLink && formDataInit.message == formData.message) {
        alert('Nội dung giống thiệp gốc .\n Nếu muốn tạo mới hãy thay đổi nội dung .')
        return;
    }

    try {
        const response = await fetch('https://us-central1-webai-54992.cloudfunctions.net/women_day_ai?', {
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
            resultLabel.innerHTML = `<a href="http://127.0.0.1:5500?id=${result.id}" target="_blank">http://127.0.0.1:5500?id=${result.id}</a>`;
        } else {
            alert('Đã xảy ra lỗi khi gửi dữ liệu!');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Đã xảy ra lỗi mạng!');
    }
});