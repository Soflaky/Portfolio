

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
document.getElementById('hideTextButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    const textInput = document.getElementById('textInput').value;
    const resultMessage = document.getElementById('resultMessage');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    if (fileInput.files.length === 0) {
        resultMessage.textContent = 'Please select an image first.';
        return;
    }

    const imageFile = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Hide the text in the image
            hideTextInImage(ctx, img.width, img.height, textInput);

            // Convert canvas to image and download
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'steganography.png';
            link.click();

            resultMessage.textContent = 'Text hidden and image downloaded.';
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(imageFile);
});

function hideTextInImage(ctx, width, height, text) {
    const binaryText = textToBinary(text);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Hide the binary text in the least significant bit of each pixel
    for (let i = 0; i < binaryText.length; i++) {
        data[i * 4] = (data[i * 4] & 0xFE) | parseInt(binaryText[i]);
    }

    ctx.putImageData(imageData, 0, 0);
}

function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
}
