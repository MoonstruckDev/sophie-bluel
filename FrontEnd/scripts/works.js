const gallery = document.querySelector('.gallery');
const works = getWorks();



function displayWorks(works, output, includeFigcaption = true, includeButtons = false) {
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
            deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

            figure.appendChild(deleteButton);
            

            deleteButton.addEventListener('click', async (e) => {
                e.preventDefault();
                deleteWork(work.id);
            });
        }

        output.appendChild(figure);
    });
}

function resetWorks(targetElement, works = null) {
    if (works) {
        targetElement.innerHTML = '';
        displayWorks(works, targetElement);
    } else {
        targetElement.innerHTML = '';
    }
}


async function updateGallery(workId) {
    try {
        
        const gallery = document.querySelector('.gallery');
        const modalGallery = document.querySelector('.modalGallery__container');

        const currentWorks = JSON.parse(sessionStorage.getItem('allWorks'));
        const updatedWorks = currentWorks.filter(work => parseInt(work.id) !== workId);

        resetWorks(gallery)
        resetWorks(modalGallery)

        sessionStorage.setItem('allWorks', JSON.stringify(updatedWorks));

        displayWorks(updatedWorks, gallery);
        displayWorks(updatedWorks, modalGallery, false, true);

    } catch (error) {
        console.error('Error refreshing images:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const works = await getWorks();
        displayWorks(works, gallery);
    } catch (error) {
        console.error('Error getting works:', error.message);
    }
});


