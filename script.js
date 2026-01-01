// window.addEventListener("load",()=>{
//     const loader=document.getElementById("loadingScreen");
//     setTimeout(() =>{
//             loader.classList.add("hidden");
//     },4000);
// });

document.addEventListener('DOMContentLoaded', () => {
  const messages = ["Loading...", "Loading...", "Please Wait...", "Welcome!"];
  let index = 0;
  const textElement = document.getElementById("loadingText");
  const loadingScreen = document.getElementById("loadingScreen");
  const homePage = document.getElementById("homePage");

  const intervalId = setInterval(() => {
    textElement.textContent = messages[index];

    if (messages[index] === "Welcome!") {
      clearInterval(intervalId);
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        homePage.style.display = 'block';
        document.querySelector('.nav').style.display = 'flex';
      }, 500);
    }
    index++;
  }, 1300);
});


const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  // icon swap
  if (body.classList.contains("light-theme")) {
    themeToggle.innerHTML = "<i class='bx bx-moon'></i>";  // moon icon in light mode
  } else {
    themeToggle.innerHTML = "<i class='bx bx-sun'></i>";   // sun in dark mode
  }
});

const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  mobileMenu.style.right = "0";
  overlay.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.style.right = "-250px";
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  mobileMenu.style.right = "-250px";
  overlay.classList.remove("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.style.right = "-250px";
    overlay.classList.remove("active");
  });
});

// Typed text wrapper animation for role descriptions
const roles = ["Software Engineer", "Full Stack Developer", "AI Enthusiast"];
const typedElement = document.getElementById('typed');
let roleIndex = 0;
let charIndex = 0;
let typing = true;
let delayBetweenRoles = 2000;
let typingSpeed = 100;
let deletingSpeed = 50;

function type() {
  const currentRole = roles[roleIndex];
  if (typing) {
    typedElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      typing = false;
      setTimeout(type, delayBetweenRoles);
    } else {
      setTimeout(type, typingSpeed);
    }
  } else {
    typedElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 100);
    } else {
      setTimeout(type, deletingSpeed);
    }
  }
}
type();


function scrollToSection() {
  const nextSection = document.querySelector("#About");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".menu a");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
const navbar = document.querySelector(".navbar");
const mobileMenu = document.querySelector(".mobile-menu");

const navbarHeight = navbar.offsetHeight;

window.addEventListener("scroll", () => {
  let currentSection = "Home";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbarHeight - 50;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.dataset.section === currentSection) {
      link.classList.add("active");
    }
  });

  mobileMenuLinks.forEach(link => {
    link.classList.remove("active");
    if (link.dataset.section === currentSection) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.getElementById("Skills");
  const progressBars = document.querySelectorAll(".progress");

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;

          progressBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.width;
            }, index * 200); // stagger animation
          });
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  observer.observe(skillsSection);
});


const track = document.querySelector('.track');
const cards = document.querySelectorAll('.img-card');
const dotsContainer = document.getElementById('sliderDots');

let index = 0;
let auto;

/* Slides per view */
function slidesPerView() {
  return window.innerWidth <= 768 ? 1 : 3;
}

/* Create dots */
function createDots() {
  dotsContainer.innerHTML = '';
  const totalDots = cards.length - slidesPerView() + 1;

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {
      index = i;
      updateSlider();
      resetAuto();
    });

    dotsContainer.appendChild(dot);
  }
}

/* Update slider + dots */
function updateSlider() {
  const perView = slidesPerView();
  track.style.transform = `translateX(-${index * (100 / perView)}%)`;

  document.querySelectorAll('.slider-dots span').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

/* Auto slide */
function startAuto() {
  auto = setInterval(() => {
    const maxIndex = cards.length - slidesPerView();
    index = index >= maxIndex ? 0 : index + 1;
    updateSlider();
  }, 2500);
}

function resetAuto() {
  clearInterval(auto);
  startAuto();
}

/* Resize fix */
window.addEventListener('resize', () => {
  index = 0;
  createDots();
  updateSlider();
  resetAuto();
});

/* INIT */
createDots();
updateSlider();
startAuto();

/* Modal (unchanged) */
function openImage(src) {
  document.getElementById('modalImg').src = src;
  document.getElementById('imgModal').style.display = 'flex';
}

function closeImage() {
  document.getElementById('imgModal').style.display = 'none';
}

// Pause auto slide on hover
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    clearInterval(auto);
  });

  card.addEventListener('mouseleave', () => {
    resetAuto();
  });
});

const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');

prevBtn.addEventListener('click', () => {
  const perView = slidesPerView();
  index = index <= 0 ? cards.length - perView : index - 1;
  updateSlider();
  resetAuto();
});

nextBtn.addEventListener('click', () => {
  const perView = slidesPerView();
  index = index >= cards.length - perView ? 0 : index + 1;
  updateSlider();
  resetAuto();
});




document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const formStatus = document.getElementById('formStatus');

  submitBtn.disabled = true;
  btnText.textContent = 'Sending...';

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('https://contactform-backend-flax.vercel.app/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      formStatus.textContent = '✓ Message sent successfully!';
      formStatus.className = 'form-status success';
      form.reset();
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    formStatus.textContent = '✗ Failed to send. Please try again.';
    formStatus.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
  }
});






const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});


const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg-2");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".modal-close");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    modalImg.src = card.querySelector("img").src;
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalDesc.textContent = card.querySelector("p").textContent;
    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("active");
});




// const scrollBtn = document.getElementById("scrollTopBtn");
// const aboutSection = document.getElementById("About");

// let hideTimeout;
// let hasShown = false; // prevent continuous retrigger

// window.addEventListener("scroll", () => {
//   const aboutTop = aboutSection.offsetTop;
//   const scrollPos = window.scrollY + window.innerHeight / 2;

//   // When user reaches About OR scrolls past it
//   if (scrollPos >= aboutTop && !hasShown) {
//     scrollBtn.classList.add("show");
//     hasShown = true;

//     clearTimeout(hideTimeout);

//     hideTimeout = setTimeout(() => {
//       scrollBtn.classList.remove("show");
//     }, 3000);
//   }

//   // Reset when user scrolls back above About
//   if (scrollPos < aboutTop) {
//     hasShown = false;
//     scrollBtn.classList.remove("show");
//     clearTimeout(hideTimeout);
//   }
// });

// scrollBtn.addEventListener("click", () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth"
//   });
// });

const scrollBtn = document.getElementById("scrollTopBtn");
const aboutSection = document.getElementById("About");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const aboutTop = aboutSection.offsetTop;

  // Home section → hide
  if (scrollY < aboutTop) {
    scrollBtn.classList.remove("show");
  }
  // About & after → permanently show
  else {
    scrollBtn.classList.add("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});