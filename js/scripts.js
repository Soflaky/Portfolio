const form = document.getElementById('form');
const btn  = document.getElementById('button');

if (form && btn) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        btn.value = 'Sending…';

        const serviceID  = 'service_rinx9d4';
        const templateID = 'template_keurcys';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Message';
                alert('Message sent!');
                form.reset();
            }, (err) => {
                btn.value = 'Send Message';
                alert(JSON.stringify(err));
            });
    });
}
