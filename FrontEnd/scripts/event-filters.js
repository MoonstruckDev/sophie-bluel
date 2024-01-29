getWorks()
  .then((allWorks) => {
    const uniqueCategoryIds = [
      ...new Set(allWorks.map((item) => item.categoryId)),
    ];

    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.classList.add("gallery__btn");
    allButton.addEventListener("click", () => handleFilterClick("All"));

    const ulElement = document.createElement("ul");

    const allLiElement = document.createElement("li");
    allLiElement.appendChild(allButton);
    ulElement.appendChild(allLiElement);

    const buttonContainer = document.querySelector(".project__header");
    buttonContainer.insertAdjacentElement("afterend", ulElement);

    uniqueCategoryIds.forEach((categoryId) => {
      const button = document.createElement("button");
      const category = allWorks.find(
        (item) => item.categoryId === categoryId
      ).category;

      button.innerText = category.name;
      button.classList.add("gallery__btn");
      button.addEventListener("click", () => handleFilterClick(category.id));

      const liElement = document.createElement("li");
      liElement.appendChild(button);
      ulElement.appendChild(liElement);
    });
  })
  .catch((error) => {
    throw new Error(error);
  });

function handleFilterClick(categoryId) {
  console.log(`Filtering works for category ID: ${categoryId}`);

  resetWorks(gallery, categoryId === "All" ? allWorks : null); // Clear the gallery and display all works if categoryId is "All"

  if (categoryId !== "All") {
    const filteredWorks = allWorks.filter(
      (work) => work.categoryId === categoryId
    );
    displayWorks(filteredWorks, gallery); // Display filtered works
  }
}
