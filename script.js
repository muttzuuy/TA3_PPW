/* ==========================================================
   🌿 GOTO LANDING PAGE INTERACTIONS (Script Premium)
   ========================================================== */

// ===== Sticky Header on Scroll =====
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===== Mobile Menu Toggle =====
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
let menuOpen = false;

menuBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    navMenu.classList.remove("hidden");
    navMenu.classList.add("flex", "flex-col", "absolute", "bg-white", "top-16", "right-6", "p-6", "shadow-2xl", "rounded-xl", "z-50");
    menuBtn.textContent = "✕";
  } else {
    navMenu.classList.add("hidden");
    navMenu.classList.remove("flex", "absolute", "bg-white", "shadow-2xl");
    menuBtn.textContent = "☰";
  }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
    if (menuOpen) { // close mobile menu after click
      menuBtn.click();
    }
  });
});

// ===== Scroll Reveal Animation =====
const scrollElements = document.querySelectorAll(".animate-scroll");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  scrollElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// ===== Load Saved Theme from Local Storage =====
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }
});

// ===== Parallax Effect on Hero Background =====
const hero = document.getElementById("home");
window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.4;
  hero.style.backgroundPositionY = `${offset}px`;
});

// ===== Button Ripple Effect =====
document.querySelectorAll(".btn-primary, .btn-outline").forEach(btn => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    circle.classList.add("ripple");
    this.appendChild(circle);

    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    setTimeout(() => circle.remove(), 500);
  });
});

// ===== Interactive Header Shadow Glow =====
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 200) {
    header.style.boxShadow = "0 10px 30px rgba(0, 170, 19, 0.15)";
  } else {
    header.style.boxShadow = "";
  }
});

// ===== Scroll-to-Top Button (Optional Bonus) =====
const toTopBtn = document.createElement("button");
toTopBtn.textContent = "↑";
toTopBtn.className =
  "fixed bottom-6 right-6 bg-[#00AA13] text-white p-3 rounded-full text-xl shadow-lg hover:bg-green-700 transition hidden";
document.body.appendChild(toTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    toTopBtn.classList.remove("hidden");
  } else {
    toTopBtn.classList.add("hidden");
  }
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Animated Counter on Scroll (Fixed Version) =====
const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const duration = 2000; // waktu total animasi (ms)
  const stepTime = Math.max(Math.floor(duration / target), 10);
  let current = 0;

  const update = () => {
    current += Math.ceil(target / (duration / stepTime));
    if (current < target) {
      counter.innerText = current.toLocaleString("id-ID");
      setTimeout(update, stepTime);
    } else {
      counter.innerText = target.toLocaleString("id-ID");
    }
  };

  update();
};

// IntersectionObserver biar animasi jalan saat section terlihat
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const sectionCounters = section.querySelectorAll(".counter");
        sectionCounters.forEach((counter) => {
          if (!counter.classList.contains("counted")) {
            counter.classList.add("counted");
            animateCounter(counter);
          }
        });
        observer.unobserve(section); // supaya cuma animasi sekali
      }
    });
  },
  { threshold: 0.5 } // setengah elemen terlihat di layar
);

// Apply observer ke section stats
const statsSection = document.querySelector("#stats");
if (statsSection) {
  observer.observe(statsSection);
}
