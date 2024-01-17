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
            .then((works) => {generateWorks(works, modalGallery, false, true)})
            .catch((error) => {
                console.error('Error getting works:', error.message);
            });
    }
});



document.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('.delete__button');
    if (deleteButton) {
  
        const dataId = deleteButton.closest('figure').querySelector('img').getAttribute('data-id');
        deleteWorks(dataId);
        console.log(dataId);
    }
});


dialogButton.addEventListener('click', () => {
    dialog.close();
});
