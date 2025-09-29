// Minimal JS : toggles nav, project modal, sets year
document.addEventListener('DOMContentLoaded', function() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // Nav toggle (mobile)
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');
    if (navToggle && siteNav) {
      navToggle.addEventListener('click', () => {
        siteNav.classList.toggle('show');
      });
    }
  
    // Projects modal
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTech = document.getElementById('modal-tech');
    const modalLink = document.getElementById('modal-link');
    const modalClose = document.getElementById('modal-close');
  
    function openModal(data) {
      modal.setAttribute('aria-hidden', 'false');
      modalTitle.textContent = data.title || '';
      modalDesc.textContent = data.desc || '';
      modalTech.textContent = data.tech || '';
      modalLink.href = data.link || '#';
      modalLink.textContent = data.link && data.link !== '#' ? 'Voir le projet' : 'Lien non fourni';
      document.body.style.overflow = 'hidden';
    }
  
    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const raw = card.getAttribute('data-project');
        try {
          const data = JSON.parse(raw);
          openModal(data);
        } catch (e) {
          openModal({title: 'Projet', desc: 'Détails non disponibles.'});
        }
      });
    });
  
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  
    // Simple progressive enhancement: submit form -> disable button
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Envoi...';
        }
      });
    }
  });