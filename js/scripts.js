

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
    const textInput = document.getElementById('textInput').value;
    const fileInput = document.getElementById('fileInput').files[0];

    if (textInput && fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;

                for (let i = 0; i < textInput.length; i++) {
                    const charCode = textInput.charCodeAt(i);
                    pixels[i * 4] = charCode;
                }

                ctx.putImageData(imageData, 0, 0);
                const outputImage = document.getElementById('outputImage');
                outputImage.src = canvas.toDataURL();
                document.getElementById('downloadButton').style.display = 'block';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(fileInput);
    } else {
        alert("Please enter text and choose an image.");
    }
});

document.getElementById('extractTextButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput').files[0];

    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                let extractedText = '';

                for (let i = 0; i < pixels.length; i += 4) {
                    if (pixels[i] === 0) break;
                    extractedText += String.fromCharCode(pixels[i]);
                }

                alert("Extracted Text: " + extractedText);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(fileInput);
    } else {
        alert("Please choose an image.");
    }
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'steganography.png';
    link.click();
});
