import { getWorks, uploadPhoto } from './api.js';
import { displayWorks } from './works.js';
import { closeToastDuration, createToast } from './toasts.js';
import { isLoggedIn } from './login-flow.js';



export const modalGallery = document.querySelector('.modalGallery__container');
const showModal = document.querySelector('.modify__modal');
const dialog = document.querySelector('dialog');
const dialogButton = document.querySelector('.close');


if (isLoggedIn()) { 
    showModal.addEventListener('click', () => {
        dialog.showModal();
        showWorksSection();
    
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

    document.querySelector(".back").addEventListener('click', () => {
        showWorksSection();  
    }) 
    document.querySelector(".gallery__btn").addEventListener('click', () => {
        showAddPhotoSection();  
    }) 

    function showAddPhotoSection() {
        document.querySelector('.modalGallery').style.display = 'none';
        document.querySelector('.uploadWorks').style.display = 'block';
        document.querySelector('.back').style.visibility = "visible";
        document.querySelector('.dialog__bottom').style.display = "none"
      }
    
    function showWorksSection() {
        document.querySelector('.uploadWorks').style.display = 'none';
        document.querySelector('.modalGallery').style.display = 'block';
        document.querySelector('.back').style.visibility = "hidden";
        document.querySelector('.dialog__bottom').style.display = ""
      }
    
      const uploadButton = document.getElementById('uploadButton');
      const photoInput = document.getElementById('photo');
    
      // Open file browser when clicking the button
      uploadButton.addEventListener('click', () => {
        photoInput.click();
      });
    

    const label = document.querySelector(".uploadArea");

    document.getElementById('photo').addEventListener('change', function(event) {

        const file = event.target.files[0];
        const title = document.getElementById("title");
        const uploadCriteria = document.querySelector('.uploadCriteria');

        if (file) {
            const imageURL = URL.createObjectURL(file);
            title.value = file.name;
            label.classList.add("has-image");

            const previewImage = document.createElement("img");
            previewImage.src = imageURL;
            previewImage.id = "selectedImage";
            previewImage.alt = "Selected Image";

            uploadCriteria.parentNode.insertBefore(previewImage, uploadCriteria.nextSibling);
        }
    });
    
    document.querySelector('#uploadButton').addEventListener('click', function (event) {
        // Prevent the default click behavior
        event.preventDefault();
        document.getElementById('photo').click();
    });
    
    document.querySelector('.submitImage').addEventListener('submit', function (event) {
        event.preventDefault();
    
        try {
            const formData = new FormData(this);
            uploadPhoto(formData);
            this.reset();
            dialog.close();
    
            const selectedImageContainer = document.querySelector("#selectedImage");
            if (selectedImageContainer) {
                selectedImageContainer.remove();
            }

            label.classList.remove("has-image")
            createToast("Image ajoutée avec succès", "Succès", "green");
            closeToastDuration();
   
         
        } catch (error) {
            console.error('Error handling form submission:', error.message);
        }
    });
    
    
    getWorks()
    .then((allWorks) => {
        const uniqueCategoryIds = [...new Set(allWorks.map((item) => item.categoryId))];
      
        // Assuming you have a <select> element with id 'categorySelect' in your HTML
        const selectElement = document.getElementById('categorySelect');
      
        // Clear existing options in case this code is executed multiple times
        selectElement.innerHTML = '';
      
        // Create and append options to the select element
        uniqueCategoryIds.forEach((categoryId) => {
          const optionElement = document.createElement('option');
          optionElement.value = categoryId;
          optionElement.textContent = categoryId; // You can replace this with actual category names if available
          selectElement.appendChild(optionElement);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      
}

dialog.addEventListener('click', (event) => {
    console.log(event.target.id)
    if (event.target.id === 'dialog') {
        dialog.close();
    }
});
