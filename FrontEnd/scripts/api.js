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


function resetWorks() {
    gallery.innerHTML = "";
}

function RefreshWorks(workId) {
    const currentWorks = JSON.parse(sessionStorage.getItem('allWorks'));
    const updatedWorks = currentWorks.filter(work => parseInt(work.id) !== workId);

    sessionStorage.setItem('allWorks', JSON.stringify(updatedWorks));
    refreshImages(); 
}

async function deleteWorks(workId) {
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

        
        RefreshWorks(workId);

    } catch (error) {
        console.error('Error deleting work:', error.message);
    }
}