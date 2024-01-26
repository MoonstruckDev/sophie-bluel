document.addEventListener('DOMContentLoaded', () => {
    isLoggedIn();
});


const showModal = document.querySelector('.modify__modal');
const dialog = document.querySelector('dialog');
const dialogButton = document.querySelector('dialog button');
const modalGallery = document.querySelector('.modalGallery__container');


showModal.addEventListener('click', () => {
    dialog.showModal();

    if (modalGallery.children.length === 0) {
        getWorks()
            .then((works) => {displayWorks(works, modalGallery, false, true)})
            .catch((error) => {
                console.error('Error getting works:', error.message);
            });
    }
});

dialogButton.addEventListener('click', () => {
    dialog.close();
});

function showAddPhotoSection() {
    document.querySelector('.modalGallery').style.display = 'none';
    document.querySelector('.uploadWorks').style.display = 'block';
  }

  function showWorksSection() {
    document.querySelector('.uploadWorks').style.display = 'none';
    document.querySelector('.modalGallery').style.display = 'block';
  }
