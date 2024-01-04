// Get unique category IDs from allWorks
const uniqueCategoryIds = [...new Set(allWorks.map(item => item.categoryId))];

// Create "All" button
const allButton = document.createElement("button");
allButton.innerText = "Tous";
allButton.addEventListener("click", () => handleFilterClick("All"));

// Create <ul> element
const ulElement = document.createElement("ul");

// Create <li> element for "All" button and append it to the <ul>
const allLiElement = document.createElement("li");
allLiElement.appendChild(allButton);
ulElement.appendChild(allLiElement);

// Ooo discovering insertAdjacentElement()!
const buttonContainer = document.querySelector("#portfolio h2");
buttonContainer.insertAdjacentElement('afterend', ulElement);

// Iterate through unique category IDs to create buttons and append them to the <ul>
uniqueCategoryIds.forEach(categoryId => {
    const button = document.createElement("button");
    const category = allWorks.find(item => item.categoryId === categoryId).category;

    button.innerText = category.name;
    button.addEventListener("click", () => handleFilterClick(category.id));

    const liElement = document.createElement("li");
    liElement.appendChild(button);
    ulElement.appendChild(liElement);
});

// Function to handle filter clicks
function handleFilterClick(categoryId) {
    console.log(`Filtering works for category ID: ${categoryId}`);
    const filteredWorks = allWorks.filter(work => work.categoryId === categoryId);

    // Reset and display works based on the selected category
    if (categoryId === "All") {
        resetWorks();
        generateWorks(allWorks);
    } else {
        resetWorks();
        generateWorks(filteredWorks);
    }
}


