

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
document.getElementById('hideButton').addEventListener('click', function() {
    const imageInput = document.getElementById('imageInput');
    const textInput = document.getElementById('textInput').value;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const file = imageInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < textInput.length; i++) {
                data[i * 4] = textInput.charCodeAt(i);
            }

            ctx.putImageData(imageData, 0, 0);

            const link = document.createElement('a');
            link.download = 'image_with_hidden_text.png';
            link.href = canvas.toDataURL();
            link.click();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('extractButton').addEventListener('click', function() {
    const imageInput = document.getElementById('imageInput');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const file = imageInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            let extractedText = '';
            for (let i = 0; i < data.length; i += 4) {
                if (data[i] === 0) break;
                extractedText += String.fromCharCode(data[i]);
            }

            alert('Extracted Text: ' + extractedText);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
