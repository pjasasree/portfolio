document.addEventListener('DOMContentLoaded', () => {
    /* =======================================
       THEME TOGGLE LOGIC
       ======================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');
    
    // Check local storage for theme preference, default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.replace('light-theme', 'dark-theme');
        themeIcon.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀️';
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌙';
        }
    });

    /* =======================================
       FORM SUBMISSION HANDLING
       ======================================= */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Thanks for your message! I will get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Oops! There was a problem submitting your form.';
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                formStatus.textContent = 'Oops! There was a problem submitting your form.';
                formStatus.className = 'form-status error';
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Clear success/error message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }
        });
    }
});
