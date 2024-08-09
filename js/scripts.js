

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
