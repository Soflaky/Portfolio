

    const btn = document.getElementById('button');

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();

        btn.value = 'Sending...';

        const serviceID = 'service_rinx9d4';
        const templateID = 'template_keurcys';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                alert('Sent!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });
  /*  document.addEventListener('DOMContentLoaded', function () {
        const themeToggleBtn = document.getElementById('theme-toggle');
    
        themeToggleBtn.addEventListener('click', function () {
            document.body.classList.toggle('light-mode');
        });
    }); */  // theme related script
const imageInput = document.getElementById('imageInput');
const textInput = document.getElementById('textInput');
const canvas = document.getElementById('canvas');
const outputImage = document.getElementById('outputImage');
const decodedText = document.getElementById('decodedText');

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
        }
    }
    reader.readAsDataURL(file);
});

function encodeText() {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const text = textInput.value + '\0'; // Add a null character to mark the end of the text
    for (let i = 0; i < text.length * 4; i += 4) {
        const charCode = text.charCodeAt(i / 4);
        data[i] = (data[i] & 0xFC) | (charCode >> 6);
        data[i + 1] = (data[i + 1] & 0xFC) | ((charCode >> 4) & 0x03);
        data[i + 2] = (data[i + 2] & 0xFC) | ((charCode >> 2) & 0x03);
        data[i + 3] = (data[i + 3] & 0xFC) | (charCode & 0x03);
    }

    ctx.putImageData(imgData, 0, 0);
    outputImage.src = canvas.toDataURL();
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'stego-image.png';
    link.href = canvas.toDataURL();
    link.click();
}

function decodeText() {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    let decoded = '';
    for (let i = 0; i < data.length; i += 4) {
        const charCode = ((data[i] & 0x03) << 6) |
                         ((data[i + 1] & 0x03) << 4) |
                         ((data[i + 2] & 0x03) << 2) |
                         (data[i + 3] & 0x03);
        if (charCode === 0) break; // Stop at null character
        decoded += String.fromCharCode(charCode);
    }
    
    decodedText.textContent = decoded;
}
