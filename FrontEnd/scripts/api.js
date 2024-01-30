async function getWorks() {
    try {
        const cachedItems = sessionStorage.getItem('allWorks');
        
        if (cachedItems) {
            return JSON.parse(cachedItems);
        } else {
            const response = await fetch('http://localhost:5678/api/works');
            const works = await response.json();
    
            sessionStorage.setItem('allWorks', JSON.stringify(works));
            return JSON.parse(sessionStorage.getItem('allWorks'));
        }
    } catch (error) {
        console.error('Error fetching works:', error);
        throw error;
    }
}

async function deleteWork(workId) {
    try {
        const authToken = sessionStorage.getItem('token');
        const apiUrl = `http://localhost:5678/api/works/${workId}`;

        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        updateGallery(workId);

    } catch (error) {
        console.error('Error deleting work:', error.message);
    }
}

async function uploadPhoto(formData) {
    try {
        const authToken = sessionStorage.getItem('token');
        const apiUrl = 'http://localhost:5678/api/works';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("work added")
        sessionStorage.removeItem("allWorks")

        const works = await getWorks();
        const worksArray = Array.isArray(works) ? works : [works];


        resetWorks(gallery, worksArray);
        resetWorks(modalGallery, worksArray, true);
       

    } catch (error) {
        console.error('Error uploading photo:', error.message);
    }
}

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

          createToast("Ajout Image", "Success")
          closeToastDuration();
          

    } catch (error) {
        console.error('Error preparing form data:', error.message);
    }
});

