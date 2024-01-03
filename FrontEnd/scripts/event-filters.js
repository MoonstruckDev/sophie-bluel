// event-filters.js

function handleFilterClick(categoryName) {
    return function () {
        getAPIworks().then((works) => {
            const filteredWorks = works.filter((work) => work.category.name === categoryName);
            resetWorks();
            generateWorks(filteredWorks);
        });
    };
}

const filterObjects = document.querySelector(".filter--objects");
filterObjects.addEventListener("click", handleFilterClick("Objets"));

const filterAppartments = document.querySelector(".filter--appartments");
filterAppartments.addEventListener("click", handleFilterClick("Appartements"));

const filterHotels = document.querySelector(".filter--hotels");
filterHotels.addEventListener("click", handleFilterClick("Hotels & restaurants"));

const filterAll = document.querySelector(".filter--all");
filterAll.addEventListener("click", function () {
    getAPIworks().then((works) => {
        resetWorks();
        generateWorks(works);
    });
});
