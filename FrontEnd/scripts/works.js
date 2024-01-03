async function getAPIworks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
}

const gallery = document.querySelector('.gallery');

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
    const works = await getAPIworks();
    generateWorks(works);
});
