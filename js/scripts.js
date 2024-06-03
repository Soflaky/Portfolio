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
});
