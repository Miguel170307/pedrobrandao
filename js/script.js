const contactDialog = document.querySelector('dialog');
const closeButton = document.querySelector('#contact-close');

// Replace the preview dialog with the WhatsApp link when contact is confirmed.
document.querySelectorAll('[data-contact-open]').forEach((button) => {
  button.addEventListener('click', () => contactDialog.showModal());
});
closeButton.addEventListener('click', () => contactDialog.close());
