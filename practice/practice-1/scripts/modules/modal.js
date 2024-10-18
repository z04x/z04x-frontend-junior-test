export function initModal(modal, openButton, cancelButton) {
    openButton.addEventListener('click', () => openModal(modal));
    cancelButton.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('modal_opened')) {
            closeModal(modal);
        }
    });
}

function openModal(modal) {
    modal.classList.add('modal_opened');
    document.body.style.overflow = 'hidden';
    modal.setAttribute('aria-hidden', 'false');
    trapFocus(modal);
}

function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.body.style.overflow = 'auto';
    modal.setAttribute('aria-hidden', 'true');
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    firstFocusableElement.focus();
}