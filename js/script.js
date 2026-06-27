const triggers = document.querySelectorAll('.modal-trigger');
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalLink = document.getElementById('modalLink');
const modalClose = document.getElementById('modalClose');

const searchToggle = document.getElementById('searchToggle');
const searchPanel = document.getElementById('searchPanel');

const menuToggle = document.getElementById('menuToggle');
const menuPanel = document.getElementById('menuPanel');

function openModal(title, text, link = '', linkLabel = '') {
    if (!modal || !modalTitle || !modalText) return;

    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (modalLink) {
        if (link && linkLabel) {
            modalLink.href = link;
            modalLink.textContent = linkLabel;
            modalLink.hidden = false;
        } else {
            modalLink.hidden = true;
            modalLink.removeAttribute('href');
            modalLink.textContent = '';
        }
    }
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function closeSearch() {
    if (!searchPanel || !searchToggle) return;
    searchPanel.classList.remove('open');
    searchToggle.setAttribute('aria-label', 'Suche öffnen');
}

function openSearch() {
    if (!searchPanel || !searchToggle) return;
    searchPanel.classList.add('open');
    searchToggle.setAttribute('aria-label', 'Suche schließen');
}

function closeMenu() {
    if (!menuPanel || !menuToggle) return;
    menuPanel.classList.remove('open');
    menuToggle.setAttribute('aria-label', 'Menü öffnen');
}

function openMenu() {
    if (!menuPanel || !menuToggle) return;
    menuPanel.classList.add('open');
    menuToggle.setAttribute('aria-label', 'Menü schließen');
}

triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        openModal(
            trigger.dataset.title,
            trigger.dataset.text,
            trigger.dataset.link,
            trigger.dataset.linkLabel
        );
    });
});

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

if (searchToggle && searchPanel) {
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
}

if (menuToggle && menuPanel) {
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
}

if (searchPanel) {
    searchPanel.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

if (menuPanel) {
    menuPanel.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

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

const bottomAlert = document.getElementById('bottomAlert');
const bottomAlertClose = document.getElementById('bottomAlertClose');

if (bottomAlert && bottomAlertClose) {
    document.body.classList.add('has-bottom-alert');

    bottomAlertClose.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        bottomAlert.classList.add('is-hidden');
        document.body.classList.remove('has-bottom-alert');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleModules = document.querySelectorAll('.toggle-module');

    toggleModules.forEach((module) => {
        const hitbox = module.querySelector('.toggle-hitbox');
        const openImage = module.querySelector('.toggle-image[data-variant="open"]');
        const closedImage = module.querySelector('.toggle-image[data-variant="closed"]');

        if (!hitbox || !openImage || !closedImage) return;

        hitbox.addEventListener('click', function () {
            const isOpen = module.dataset.state === 'open';
            const nextState = isOpen ? 'closed' : 'open';

            module.dataset.state = nextState;

            openImage.classList.toggle('is-active', nextState === 'open');
            closedImage.classList.toggle('is-active', nextState === 'closed');
        });
    });
});