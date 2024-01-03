function handleFilterClick(categoryName) {
    const allWorks = JSON.parse(sessionStorage.getItem('allWorks'));

    function filterAndGenerate(works) {
        const filteredWorks = works.filter((work) => work.category.name === categoryName);
        resetWorks();
        generateWorks(filteredWorks);
    }

    if (allWorks) {
        filterAndGenerate(allWorks);
    } else {
        setWorksFromAPI().then((works) => filterAndGenerate(works));
    }
}

function addFilterEventListener(selector, categoryName) {
    const filterElement = document.querySelector(selector);
    filterElement.addEventListener("click", () => handleFilterClick(categoryName));
}


function handleAllFilterClick() {
    resetWorks();
    generateWorks(JSON.parse(sessionStorage.getItem('allWorks')));
}

const filterAll = document.querySelector(".filter--all");
filterAll.addEventListener("click", handleAllFilterClick);

addFilterEventListener(".filter--objects", "Objets");
addFilterEventListener(".filter--appartments", "Appartements");
addFilterEventListener(".filter--hotels", "Hotels & restaurants");
addFilterEventListener(".filter--all", null); 

