document.addEventListener('DOMContentLoaded', () => {
    isLoggedIn();
});

const showModal = document.querySelector('.modify__modal');
const dialog = document.querySelector('dialog');
const dialogButton = document.querySelector('dialog > button');

showModal.addEventListener('click', () => {
    dialog.showModal();
});

dialogButton.addEventListener('click', () => {
    dialog.close();
});