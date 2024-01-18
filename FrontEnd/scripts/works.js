const gallery = document.querySelector('.gallery');
const works = getWorks();

function generateWorks(works, output, includeFigcaption = true, includeButtons = false) {
    works.forEach((work) => {
        const figure = document.createElement('figure');
        
        const img = document.createElement('img');
        img.setAttribute('src', work.imageUrl);
        img.setAttribute('alt', work.title);

        figure.appendChild(img);

        if (includeFigcaption) {
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = work.title;
            figure.appendChild(figcaption);
        }

        if (includeButtons === true) {
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete__button');
            deleteButton.textContent = '🙃';
            figure.appendChild(deleteButton);

            deleteButton.addEventListener('click', async (e) => {
                e.preventDefault();
                deleteWorks(work.id);
            });
        }

        output.appendChild(figure);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const works = await getWorks();
        generateWorks(works, gallery);
    } catch (error) {
        console.error('Error getting works:', error.message);
    }
});


