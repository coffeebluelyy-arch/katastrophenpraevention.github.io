const triggers = document.querySelectorAll('.modal-trigger');
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalClose = document.getElementById('modalClose');

const searchToggle = document.getElementById('searchToggle');
const searchPanel = document.getElementById('searchPanel');

const menuToggle = document.getElementById('menuToggle');
const menuPanel = document.getElementById('menuPanel');

function openModal(title, text) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function closeSearch() {
    searchPanel.classList.remove('open');
    searchToggle.setAttribute('aria-label', 'Suche öffnen');
}

function openSearch() {
    searchPanel.classList.add('open');
    searchToggle.setAttribute('aria-label', 'Suche schließen');
}

function closeMenu() {
    menuPanel.classList.remove('open');
    menuToggle.setAttribute('aria-label', 'Menü öffnen');
}

function openMenu() {
    menuPanel.classList.add('open');
    menuToggle.setAttribute('aria-label', 'Menü schließen');
}

triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        openModal(trigger.dataset.title, trigger.dataset.text);
    });
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

searchToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = searchPanel.classList.contains('open');

    closeMenu();

    if (isOpen) {
        closeSearch();
    } else {
        openSearch();
    }
});

menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = menuPanel.classList.contains('open');

    closeSearch();

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

searchPanel.addEventListener('click', (event) => {
    event.stopPropagation();
});

menuPanel.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.addEventListener('click', () => {
    closeSearch();
    closeMenu();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
        closeSearch();
        closeMenu();
    }
});