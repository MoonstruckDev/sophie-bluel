
const allWorks = JSON.parse(sessionStorage.getItem('allWorks'));

const uniqueCategoryIds = [...new Set(allWorks.map(item => item.categoryId))];


const allButton = document.createElement("button");
allButton.innerText = "Tous";
allButton.classList.add("gallery__btn");
allButton.addEventListener("click", () => handleFilterClick("All"));


const ulElement = document.createElement("ul");


const allLiElement = document.createElement("li");
allLiElement.appendChild(allButton);
ulElement.appendChild(allLiElement);


const buttonContainer = document.querySelector(".project__header");
buttonContainer.insertAdjacentElement('afterend', ulElement);

uniqueCategoryIds.forEach(categoryId => {
    const button = document.createElement("button");
    const category = allWorks.find(item => item.categoryId === categoryId).category;

    button.innerText = category.name;
    button.classList.add("gallery__btn");
    button.addEventListener("click", () => handleFilterClick(category.id));

    const liElement = document.createElement("li");
    liElement.appendChild(button);
    ulElement.appendChild(liElement);
});


function handleFilterClick(categoryId) {
    console.log(`Filtering works for category ID: ${categoryId}`);
    const filteredWorks = allWorks.filter(work => work.categoryId === categoryId);


    if (categoryId === "All") {
        resetWorks();
        generateWorks(allWorks, gallery);
    } else {
        resetWorks();
        generateWorks(filteredWorks, gallery);
    }
}


