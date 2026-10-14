document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const yearNode = document.getElementById('year');

  const typingTargets = document.querySelectorAll('.typing-text');

  typingTargets.forEach((element, index) => {
    const text = element.dataset.typingText || '';
    element.textContent = '';
    let charIndex = 0;

    const type = () => {
      if (charIndex <= text.length) {
        element.textContent = text.slice(0, charIndex);
        charIndex += 1;
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.setAttribute('aria-hidden', 'true');
        element.appendChild(cursor);
        setTimeout(() => {
          const cursorNode = element.querySelector('.typing-cursor');
          if (cursorNode) {
            cursorNode.remove();
          }
          type();
        }, 90);
      }
    };

    setTimeout(() => {
      type();
    }, 300 + index * 500);
  });

  const slideshowSlides = document.querySelectorAll('.slideshow .slide');
  if (slideshowSlides.length > 1) {
    let activeIndex = 0;
    const showNextSlide = () => {
      slideshowSlides[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % slideshowSlides.length;
      slideshowSlides[activeIndex].classList.add('active');
    };

    setInterval(showNextSlide, 2600);
  }

  document.querySelectorAll('.slideshow-card:not(.empty-gallery)').forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll('.slide'));
    if (slides.length > 1) {
      let activeIndex = slides.findIndex((slide) => slide.classList.contains('active'));
      if (activeIndex < 0) {
        activeIndex = 0;
        slides[activeIndex].classList.add('active');
      }

      const showNextSlide = () => {
        const previousSlide = slides[activeIndex];
        previousSlide.classList.remove('active');
        if (previousSlide instanceof HTMLVideoElement) {
          previousSlide.pause();
        }
        activeIndex = (activeIndex + 1) % slides.length;
        slides[activeIndex].classList.add('active');
      };

      setInterval(() => {
        if (!(slides[activeIndex] instanceof HTMLVideoElement)) {
          showNextSlide();
        }
      }, 2200);

      slides.forEach((slide, index) => {
        if (slide instanceof HTMLVideoElement) {
          slide.addEventListener('ended', () => {
            if (index === activeIndex) {
              showNextSlide();
            }
          });
        }
      });
    }
  });

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Request sent';
        button.disabled = true;
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          form.reset();
        }, 2000);
      }
    });
  }
});
