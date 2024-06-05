document.addEventListener('DOMContentLoaded', () => {
    const expandButtons = document.querySelectorAll('.expand-btn');

    expandButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const project = event.target.closest('.project');
            const projectDetails = project.querySelector('.project-details');

            if (project.classList.contains('expanded')) {
                project.classList.remove('expanded');
                projectDetails.style.display = 'none';
            } else {
                project.classList.add('expanded');
                projectDetails.style.display = 'block';
            }

            
        });
    });

    expandButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const project2 = event.target.closest('.project2');
            const projectDetails2 = project2.querySelector('.project-details2');

            if (project2.classList.contains('expanded')) {
                project2.classList.remove('expanded');
                projectDetails2.style.display = 'none';
            } else {
                project2.classList.add('expanded');
                projectDetails2.style.display = 'block';
            }

            
        });
    });
});

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
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
