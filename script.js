const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
  });
});

document.querySelectorAll('.artwork img, .lightbox-img').forEach((img) => {
  img.addEventListener('contextmenu', (e) => e.preventDefault());
  img.addEventListener('dragstart', (e) => e.preventDefault());
});

const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.artwork img').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

const artworks = document.querySelectorAll('.artwork');
if (artworks.length) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    artworks.forEach((a) => io.observe(a));
  } else {
    artworks.forEach((a) => a.classList.add('is-visible'));
  }
}
