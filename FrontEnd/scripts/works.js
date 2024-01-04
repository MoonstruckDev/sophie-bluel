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
            <img src=${work.imageUrl} alt=${work.title}>
            <figcaption>${work.title}</figcaption>
        `;
        gallery.appendChild(figure);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const works = await setWorksFromAPI();
    generateWorks(allWorks);
});
