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
    const label = document.querySelector(".uploadArea");

    // Add event listener to upload button that clicks the photo input
    uploadButton.addEventListener('click', () => {
        photoInput.click();
      });

    // On change of the photo element, get files, if file is true then execute code inside
    document.getElementById('photo').addEventListener('change', function(event) {

        const file = event.target.files[0];
        const title = document.getElementById("title");
        const uploadCriteria = document.querySelector('.uploadCriteria');

        // Preview image and set title from filename
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
        event.preventDefault();
        document.getElementById('photo').click();
    });
    

    // On submit execute code
    document.querySelector('.submitImage').addEventListener('submit', function (event) {
        event.preventDefault();
    
        try {
            const formData = new FormData(this);
            uploadPhoto(formData);
            this.reset();
            dialog.close();
    
            // Reset selected image
            const selectedImageContainer = document.querySelector("#selectedImage");
            if (selectedImageContainer) {
                selectedImageContainer.remove();
            }

            // Reset selected image class
            label.classList.remove("has-image")

            // Create toast
            createToast("Image ajoutée avec succès", "Succès", "green");
            closeToastDuration();
   
         
        } catch (error) {
            console.error('Error handling form submission:', error.message);
        }
    });
    
    // Use IDs for the select input
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
    if (event.target.id === 'dialog') {
        dialog.close();
    }
});
