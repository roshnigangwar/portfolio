document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initProjectsFilterAndModal();
  initScrollSpyAndNav();
  initTypewriterEffect();
});

/* ==========================================================================
   1. CUSTOM CURSOR GLOW
   ========================================================================== */
function initCursorGlow() {
  const cursor = document.getElementById('cursor-glow');
  if (!cursor) return;

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

/* ==========================================================================
   2. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriterEffect() {
  const el = document.querySelector('.typing-cursor');
  if (!el) return;

  const words = ['Digital Experiences.', 'Intelligent Systems.', 'Scalable Backends.'];
  let currentWordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[currentWordIdx];
    
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      el.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 150;
    }

    if (!isDeleting && charIdx === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      currentWordIdx = (currentWordIdx + 1) % words.length;
      typingSpeed = 500; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. PROJECTS FILTERING & MODAL SYSTEM
   ========================================================================== */
const projectData = {
  calculator: {
    title: "Calculator App",
    category: "Frontend Logic",
    headline: "Sleek arithmetic engine with complex state management",
    overview: "A highly polished calculator application featuring a glassmorphic interface, error handling, and robust arithmetic parsing.",
    architecture: [
      "Event-driven DOM updates",
      "Robust state management for sequential operations",
      "CSS Grid layout with glassmorphic layers"
    ],
    stack: ["JavaScript", "HTML5", "CSS3"],
  },
  todo: {
    title: "To-Do Manager",
    category: "App Engineering",
    headline: "Interactive task organization system",
    overview: "A seamless task management interface designed for productivity. Users can create, toggle, and delete tasks with smooth animations.",
    architecture: [
      "LocalStorage integration for data persistence",
      "Dynamic DOM element creation",
      "CSS transitions for fluid UI feedback"
    ],
    stack: ["JavaScript", "Web Storage API", "CSS3"],
  },
  python_fundamentals: {
    title: "Programming Fundamentals using Python - Part 2",
    category: "Infosys Springboard Certification",
    headline: "Issued to Roshni Gangwar on June 22, 2026 by Infosys Limited",
    overview: "Comprehensive professional credential certifying mastery over advanced Python programming paradigms, structured problem-solving, modular function design, object-oriented concepts, and robust exception handling architectures.",
    architecture: [
      "Object-Oriented Programming (Classes, Inheritance, Encapsulation, Polymorphism)",
      "Exception Handling & Defensive Programming",
      "File I/O Streams and Data Manipulation",
      "Modular Architectures and Standard Library Tooling",
      "Authorized by: Satheesha B. Nanjappa (SVP & Head, Education, Training & Assessment, Infosys Ltd)"
    ],
    stack: ["Python 3", "OOP", "Exception Handling", "Modular Logic"],
    verifyUrl: "https://verify.onwingspan.com"
  },
  python_dsa: {
    title: "Data Structures and Algorithms using Python - Part 1",
    category: "Infosys Springboard Certification",
    headline: "Issued to Roshni Gangwar on June 22, 2026 by Infosys Limited",
    overview: "Rigorous coursework credential awarded for implementing foundational linear data structures, assessing asymptotic time and space complexity (Big-O), and engineering optimized searching and sorting routines in Python.",
    architecture: [
      "Linear Data Structures: Dynamic Arrays, Linked Lists, Stacks, Queues",
      "Searching & Sorting Algorithms (Linear/Binary Search, Bubble, Selection, Insertion Sort)",
      "Asymptotic Computational Complexity (Big-O Time & Space Analysis)",
      "Recursive Algorithmic Patterns and Memory Stack Optimization",
      "Authorized by: Satheesha B. Nanjappa (SVP & Head, Education, Training & Assessment, Infosys Ltd)"
    ],
    stack: ["Data Structures", "Algorithms", "Big-O Complexity", "Python 3"],
    verifyUrl: "https://verify.onwingspan.com"
  }
};

function initProjectsFilterAndModal() {
  // Filtering
  const filterBtns = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const categories = card.dataset.category || "";
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body-content');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  if (!modal || !modalBody || !modalClose) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <span class="modal-cat">${data.category}</span>
      <h3>${data.title}</h3>
      <p style="color:#fff; font-size:17px; font-weight:600; margin-bottom: 16px;">${data.headline}</p>
      <p>${data.overview}</p>
      <h4 style="color:#fff; margin-bottom:12px; font-family: var(--font-display);">Key Competencies & Modules</h4>
      <ul>
        ${data.architecture.map(a => `<li>${a}</li>`).join('')}
      </ul>
      ${data.verifyUrl ? `
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 12px; align-items: center;">
          <a href="${data.verifyUrl}" target="_blank" class="btn btn-primary btn-sm">
            <i class="fas fa-external-link-alt" style="margin-right: 6px;"></i> Verify on Wingspan
          </a>
          <span style="color: var(--text-muted); font-size: 13px;">Official credential verification portal</span>
        </div>
      ` : ''}
    `;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.project));
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   4. SCROLL SPY & NAV HIGHLIGHT
   ========================================================================== */
function initScrollSpyAndNav() {
  const nav = document.querySelector('.floating-nav');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!nav) return;

  window.addEventListener('scroll', () => {
    // Highlight nav item based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
}
