import { updateGallery, resetWorks, gallery} from './works.js';
import { modalGallery } from './modal.js';

export async function getWorks() {
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

export async function deleteWork(workId) {
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

export async function uploadPhoto(formData) {
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


        resetWorks(gallery, false, worksArray);
        resetWorks(modalGallery, true, worksArray);
       

    } catch (error) {
        console.error('Error uploading photo:', error.message);
    }
}



