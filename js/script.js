const contactDialog = document.querySelector('dialog');
const openButton = document.querySelector('#contact-open');
const closeButton = document.querySelector('#contact-close');

openButton.addEventListener('click', () => contactDialog.showModal());
closeButton.addEventListener('click', () => contactDialog.close());
