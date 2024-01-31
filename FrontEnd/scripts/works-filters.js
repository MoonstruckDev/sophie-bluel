import { getWorks } from './api.js';
import { isLoggedIn } from './login-flow.js';
import { resetWorks, gallery } from './works.js';

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
    ulElement.classList.add("filter__list");

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

    // Apply hidden style if logged in
    if (isLoggedIn()) {
      ulElement.style.display = "none";
    }

    // Move the event listeners inside the .then() block
    function handleFilterClick(categoryId) {
      console.log(`Filtering works for category ID: ${categoryId}`);

      if (categoryId === "All") {
        resetWorks(gallery, false, allWorks);
      }
      if (categoryId !== "All") {
        const filteredWorks = allWorks.filter(
          (work) => work.categoryId === categoryId
        );

        resetWorks(gallery, false, filteredWorks);
      }
    }
  })
  .catch((error) => {
    throw new Error(error);
  });
