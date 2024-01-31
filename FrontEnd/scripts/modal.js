import { getWorks, uploadPhoto } from './api.js';
import { displayWorks } from './works.js';
import { createToast, closeToastDuration } from './toasts.js';
import { isLoggedIn } from './login-flow.js';



export const modalGallery = document.querySelector('.modalGallery__container');
const showModal = document.querySelector('.modify__modal');
const dialog = document.querySelector('dialog');
const dialogButton = document.querySelector('.close');


if (isLoggedIn()) { 
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
    
    window.showAddPhotoSection = function() {
        document.querySelector('.modalGallery').style.display = 'none';
        document.querySelector('.uploadWorks').style.display = 'block';
        document.querySelector('.back').style.visibility = "visible";
        document.querySelector('.dialog__bottom').style.display = "none"
      }
    
    window.showWorksSection = function() {
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
    
    document.getElementById('photo').addEventListener('change', function(event) {
        const label = document.querySelector(".fa-regular");
        const uploadContainer = document.querySelector(".uploadButtons");
        const file = event.target.files[0];
        const title = document.getElementById("title");
    
        if (file) {
            const imageURL = URL.createObjectURL(file);
            title.value = file.name;
            label.style.display = "none";
            uploadContainer.innerHTML = `<img src="${imageURL}" alt="Selected Image" id="selectedImage">`;
            // Set the file name as the inner text of the input element
            document.getElementById('photo').value = file.name;
        }
    });
    
    document.querySelector('#uploadButton').addEventListener('click', function (event) {
        // Prevent the default click behavior
        event.preventDefault();
    
        // Trigger click on the file input
        document.getElementById('photo').click();
    });
    
    document.querySelector('.submitImage').addEventListener('submit', function (event) {
        event.preventDefault();
    
        try {
            const formData = new FormData(this);
            uploadPhoto(formData);
            this.reset();
    
            // Reset the image container to show the icon
            const label = document.querySelector(".fa-regular");
            const uploadContainer = document.querySelector(".uploadButtons");
            label.style.display = "block";
            uploadContainer.innerHTML = `<button id="uploadButton">+ Ajouter Photo</button>
                                         <p class="uploadCriteria">jpg, png : 4mo max</p>`;
    
            // Clear the selected image if it exists
            const selectedImageContainer = document.getElementById("selectedImage");
            if (selectedImageContainer) {
                selectedImageContainer.innerHTML = "";
            }
    
            createToast("Ajout Image", "Success");
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

