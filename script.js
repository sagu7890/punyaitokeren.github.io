// ============ LOADING SCREEN ============
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");

  // Minimum loading time untuk efek dramatis
  setTimeout(() => {
    loadingScreen.classList.add("hide");

    // Hapus dari DOM setelah animasi selesai
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 800);
  }, 2000); // 2 detik loading
});

// ============ PARTICLES BACKGROUND ============
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.color = Math.random() > 0.7 ? "212, 175, 55" : "139, 92, 246";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = `rgba(${this.color}, 0.8)`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(
    80,
    Math.floor((canvas.width * canvas.height) / 15000),
  );
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
animate();

// ============ MOBILE MENU ============
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Navbar effect on scroll
  if (scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active nav link
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach((a) => a.classList.remove("active"));
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) active.classList.add("active");
    }
  });
});

// ============ PURNAMA TOGGLE (DARK/LIGHT MODE) ============
const purnamaToggle = document.getElementById("purnamaToggle");
const purnamaIcon = purnamaToggle.querySelector("i");

// Cek preferensi tema yang tersimpan
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  purnamaIcon.classList.remove("fa-moon");
  purnamaIcon.classList.add("fa-sun");
}

purnamaToggle.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    purnamaIcon.classList.remove("fa-moon");
    purnamaIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    purnamaIcon.classList.remove("fa-sun");
    purnamaIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "dark");
  }

  // Efek animasi saat toggle
  this.style.transform = "rotate(360deg) scale(1.2)";
  setTimeout(() => {
    this.style.transform = "rotate(0deg) scale(1)";
  }, 600);
});

// ============ SCROLL REVEAL ============
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-card, .gallery-item").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = `all 0.6s ease ${i * 0.1}s`;
  observer.observe(el);
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ============ CONTACT FORM HANDLING ============
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Format email tidak valid.");
      return;
    }

    // Tampilkan success message
    contactForm.style.display = "none";
    formSuccess.classList.add("show");

    // Reset form setelah 5 detik
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = "block";
      formSuccess.classList.remove("show");
    }, 6000);
  });
}

// ============ PARALLAX EFFECT ON MOUSE MOVE ============
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  const photoFrame = document.querySelector(".photo-frame");
  if (photoFrame) {
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    photoFrame.style.transform = `translate(${moveX}px, ${moveY}px) rotateY(${mouseX * 10 - 5}deg)`;
  }
});

console.log(
  "%c✨ JITRON Portfolio Loaded Successfully!",
  "color: #a78bfa; font-size: 14px; font-weight: bold;",
);

// ============ TYPING ANIMATION ============
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');
const textArray = ["Web Developer", "UI/UX Designer", "Mobile Developer", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// ============ STATISTICS COUNTER ============
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const duration = 2000; // 2 detik
                const increment = target / (duration / 16); 
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target + '+';
                    }
                };
                updateCounter();
            });
        }
    });
}, { threshold: 0.5 });

if (document.querySelector('.stats-section')) {
    statsObserver.observe(document.querySelector('.stats-section'));
}

// ============ PROJECT MODAL ============
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTech = document.getElementById('modalTech');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modalTitle.textContent = item.getAttribute('data-title');
        modalDesc.textContent = item.getAttribute('data-desc');
        modalTech.textContent = item.getAttribute('data-tech');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Mencegah scroll background
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// ============ SCROLL TO TOP ============
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});