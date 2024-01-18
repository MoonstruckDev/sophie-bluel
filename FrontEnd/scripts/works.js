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
            deleteButton.textContent = '🙃  ';
            figure.appendChild(deleteButton);

            deleteButton.addEventListener('click', async () => {
                try {
                    await deleteWorks(work.id);
                } catch (error) {
                    console.error('Error deleting work:', error.message);
                }
            });
            
        }

        output.appendChild(figure);
    });
}

document.addEventListener('DOMContentLoaded', async (e) => {
    try {
        const works = await getWorks();
        generateWorks(works, gallery);
    } catch (error) {
        console.error('Error getting works:', error.message);
    }
});



function removeWorkFromUI(workId) {
    const elementsToRemove = document.querySelectorAll(`[data-id="${workId}"]`);

    elementsToRemove.forEach(element => {
        const figure = element.closest('figure');

        if (figure) {
            figure.remove();
        } else {
            console.warn('Parent figure not found for one of the selected elements.');
        }
    });

    if (elementsToRemove.length === 0) {
        console.warn('No elements found with the specified data-id.');
    }
}

async function refreshImages() {
    try {
        const works = await getWorks();
        resetWorks();
        generateWorks(works, gallery);
    } catch (error) {
        console.error('Error refreshing images:', error.message);
    }
}
