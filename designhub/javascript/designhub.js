    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    window.addEventListener('scroll', function () {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    backToTopButton.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
        // Contact form: open a prefilled Gmail compose window with a mail-app fallback
        document.querySelectorAll('form').forEach(function(form) {
            if (!form.querySelector('textarea')) return;
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = form.querySelector('input[type="text"]');
                const email = form.querySelector('input[type="email"]');
                const textInputs = form.querySelectorAll('input[type="text"]');
                const subject = textInputs.length > 1 ? textInputs[1] : null;
                const message = form.querySelector('textarea');
                const recipient = 'rutaabali3@gmail.com';
                const subjectText = (subject && subject.value.trim()) || 'EduWeb contact form message';
                const bodyText = [
                    'Name: ' + (name ? name.value.trim() : ''),
                    'Email: ' + (email ? email.value.trim() : ''),
                    '',
                    message ? message.value.trim() : ''
                ].join('\n');
                const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(recipient) + '&su=' + encodeURIComponent(subjectText) + '&body=' + encodeURIComponent(bodyText);
                const mailtoUrl = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subjectText) + '&body=' + encodeURIComponent(bodyText);
                const composeWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
                if (!composeWindow) {
                    window.location.href = mailtoUrl;
                }
            });
        });
