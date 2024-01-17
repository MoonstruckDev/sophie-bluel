async function setWorksFromAPI() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();
        sessionStorage.setItem('allWorks', JSON.stringify(works));
        console.log("You are now using session storage")
        return works; // Return the fetched works
    } catch (error) {
        console.error('Error fetching works:', error);
        throw error; // Propagate the error for better error handling
    }
}

const gallery = document.querySelector('.gallery');
const allWorks = JSON.parse(sessionStorage.getItem('allWorks'))
checkSessionStorage();

function checkSessionStorage() {
    if (!allWorks) {
        setWorksFromAPI();
    }
    return allWorks;
}

function resetWorks() {
    gallery.innerHTML = "";
}

function generateWorks(works) {
    works.forEach((work) => {
        const figure = document.createElement('figure');
        figure.innerHTML = `
            <img data-id=${work.id} src=${work.imageUrl} alt=${work.title}>
            <figcaption>${work.title}</figcaption>
        `;
        gallery.appendChild(figure);
    });
}

function generateWorksTable(works, output) {
    let tr; // Variable to hold the current <tr> element
    let count = 0; // Counter to keep track of the number of images

    works.forEach((work, index) => {
        if (index % 5 === 0) {
            tr = document.createElement('tr'); // Create a new <tr> element
            output.appendChild(tr); // Append the <tr> element to the output
        }

        const td = document.createElement('td');
        const figure = document.createElement('figure');
        figure.innerHTML = `
        <img data-id=${work.id} src=${work.imageUrl} alt=${work.title}>`;
        td.appendChild(figure);
        tr.appendChild(td); // Append the <td> element to the current <tr> element

        count++; // Increment the counter
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const works = await setWorksFromAPI();
    generateWorks(allWorks);
});

function deleteWorkAndUpdateUI(workId) {
    const authToken = sessionStorage.getItem('token');
    const apiUrl = `http://localhost:5678/api/works/${workId}`;

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Work deleted successfully:', data);
        removeWorkFromUI(workId); // Update UI by removing the deleted work
        updateSessionStorageAfterDeletion(workId); // Update session storage
    })
    .catch(error => {
        console.error('Error deleting work:', error.message);
        // Handle errors accordingly
    });
}

function removeWorkFromUI(workId) {
    const imageToRemove = document.querySelector(`[data-id="${workId}"]`);
    if (imageToRemove) {
        imageToRemove.parentNode.remove(); // Remove the parent node (figure or td)
    }
}

function updateSessionStorageAfterDeletion(workId) {
    const currentWorks = JSON.parse(sessionStorage.getItem('allWorks'));
    
    // Filter out the deleted work from the current works
    const updatedWorks = currentWorks.filter(work => work.id !== workId);

    // Update session storage with the new works
    sessionStorage.setItem('allWorks', JSON.stringify(updatedWorks));
}

deleteWorkAndUpdateUI(workIdToDelete);

