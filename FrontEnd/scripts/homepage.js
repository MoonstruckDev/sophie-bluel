if (isLoggedIn()) {

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


    const adminContainer = document.createElement("div");
    adminContainer.classList.add("admin", "admin__header");

    const adminIcon = document.createElement("i");
    adminIcon.classList.add("fa-solid", "fa-pen-to-square");

    const adminText = document.createElement("span");
    adminText.innerText = "Mode Édition";

    const spacer = document.createElement("div")
    spacer.classList.add("spacer")

    // Append the elements to the admin container
    adminContainer.appendChild(adminIcon);
    adminContainer.appendChild(adminText);
    adminContainer.appendChild(spacer);

    // Find the header element (adjust the selector if needed)
    const header = document.querySelector("header");

    // Insert the admin element before the header
    header.parentNode.insertBefore(adminContainer, header);

    header.style.margin = "6.75rem 0 3.125rem 0";
}


const showModal = document.querySelector('.modify__modal');
const dialog = document.querySelector('dialog');
const dialogButton = document.querySelector('.close');
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
  const imagePlaceholder = document.getElementById('imagePlaceholder');
  const photoInput = document.getElementById('photo');

  // Open file browser when clicking the button
  uploadButton.addEventListener('click', () => {
    photoInput.click();
  });

  document.getElementById('photo').addEventListener('change', function(event) {
    const label = document.querySelector(".fa-regular")
    const uploadContainer = document.querySelector(".uploadButtons")
    const file = event.target.files[0];
    

    if (file) {
        const imageURL = URL.createObjectURL(file);
        label.style.display = "none";
        uploadContainer.innerHTML = ""
        uploadContainer.innerHTML = `<img src="${imageURL}" alt="Selected Image" id="selectedImage">`;
    }
});


function closeToast(event) {
	let toastClose = event.target;
	toastClose.closest('.toast-container').remove();
}
function closeToastDuration() {
	if (document.querySelectorAll('.toast-container')) {
		let toasts = document.querySelectorAll('.toast-container');
		toasts.forEach(toast => {
			setTimeout(() => {
				toast.remove();
			}, 10000);
		});
	}
}
closeToastDuration();
if (document.getElementById('toast-container')) {
	let mutationObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			closeToastDuration();
		});
	});
	mutationObserver.observe(document.getElementById('toast-container'), {
		attributes: true,
		characterData: true,
		childList: true,
		subtree: true,
		attributeOldValue: true,
		characterDataOldValue: true
	});
}
  

