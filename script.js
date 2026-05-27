// ===== FIXED: Pass 'event' parameter =====
function filterGallery(category, event) {
  var items = document.querySelectorAll('.gallery-item, .masonry-item');
  items.forEach(function(item) {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
  var buttons = document.querySelectorAll('.filter-btn, .tag-pill');
  buttons.forEach(function(btn) { btn.classList.remove('active'); });
  if (event && event.target) event.target.classList.add('active');
}

function filterBlog(category, event) {
  var cards = document.querySelectorAll('.blog-card');
  cards.forEach(function(card) {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
  document.querySelectorAll('.tag-pill').forEach(function(pill) {
    pill.classList.remove('active');
  });
  if (event && event.target) event.target.classList.add('active');
}

// ===== Consolidated DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', function() {
  initLoadingScreen();
  initNavigation();
  initReveal();
  initChatbot();
  initParticles();
  initParallax();
  initBASlider();
  initModals();
  initTooltips();
  initDatePickers();
  initLazyLoading();
  animateCounters(); // Agar counters hain toh
});

// ===== Safe Touch Handler =====
function initBASlider() {
  var sliders = document.querySelectorAll('.ba-slider');
  sliders.forEach(function(slider) {
    var handle = slider.querySelector('.ba-handle');
    var afterImg = slider.querySelector('.ba-after');
    var isDragging = false;
    if (!handle || !afterImg) return;

    function updateSlider(x) {
      var rect = slider.getBoundingClientRect();
      var pos = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      afterImg.style.clipPath = 'inset(0 ' + (100 - pos * 100) + '% 0 0)';
      handle.style.left = (pos * 100) + '%';
    }

    slider.addEventListener('mousedown', function(e) {
      isDragging = true;
      updateSlider(e.clientX);
    });
    slider.addEventListener('mousemove', function(e) {
      if (isDragging) updateSlider(e.clientX);
    });
    document.addEventListener('mouseup', () => isDragging = false);

    slider.addEventListener('touchstart', function(e) {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    });
    slider.addEventListener('touchmove', function(e) {
      if (isDragging && e.touches[0]) {
        e.preventDefault();
        updateSlider(e.touches[0].clientX);
      }
    });
    document.addEventListener('touchend', () => isDragging = false);
  });
}

// ===== Counter Animation with Flag =====
function animateCounters() {
  var counters = document.querySelectorAll('[data-count]');
  counters.forEach(function(counter) {
    if (counter.dataset.animated) return;
    counter.dataset.animated = 'true';
    var target = parseInt(counter.getAttribute('data-count'));
    var current = 0;
    var increment = target / 60;
    var timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current).toLocaleString();
    }, 30);
  });
}

// ===== Safe Newsletter Subscribe =====
function subscribeNewsletter() {
  var emailInput = document.querySelector('.newsletter-form input[type="email"]') || 
                   document.querySelector('.form-input[type="email"]');
  if (emailInput && emailInput.value.trim() && emailInput.checkValidity()) {
    showToast('Thank you for subscribing! 📬✨');
    emailInput.value = '';
  } else {
    showToast('Please enter a valid email address! ⚠️');
  }
}

// ===== Lazy Loading =====
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    var lazyImages = document.querySelectorAll('img[data-src]');
    var imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(function(img) { imageObserver.observe(img); });
  }
}

// ===== Baaki functions (initLoadingScreen, initNavigation, etc.) =====
// Yahan aap apne original functions paste karein jo maine pehle fix kiye the
// (Space bachane ke liye yahan truncate kiya hai)