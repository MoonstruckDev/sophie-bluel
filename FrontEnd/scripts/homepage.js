document.addEventListener("userLoggedIn", () => {

    const adminbuttonContainer = document.querySelector('.project__header > h2');
    const adminbutton = document.createElement("span");
    const adminicon = document.createElement("i");
    const modifyModal = document.createElement("div"); // Create the modify__modal div
    
    adminicon.classList.add("fa-solid", "fa-pen-to-square");
    adminicon.style.color = "black";
    adminbutton.innerText = "Modifier";
    adminbutton.style.color = "black";
    
    adminbuttonContainer.appendChild(adminicon);
    adminbuttonContainer.appendChild(adminbutton);
    
    modifyModal.classList.add("modify__modal");
    adminbuttonContainer.after(modifyModal); 
    modifyModal.appendChild(adminicon); 
    modifyModal.appendChild(adminbutton);
    
})


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
