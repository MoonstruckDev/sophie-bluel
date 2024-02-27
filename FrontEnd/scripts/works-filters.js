import { getWorks } from "./api.js";
import { isLoggedIn } from "./login-flow.js";
import { resetWorks, gallery } from "./works.js";

// get all works, once done create a new array of unique IDs
getWorks()
  .then((allWorks) => {
    // The spread operator (...) is used here to convert the Set object back into an array.
    const uniqueCategoryIds = [
      ...new Set(allWorks.map((item) => item.categoryId)),
    ];

    // Creating the all button
    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.classList.add("gallery__btn");
    allButton.addEventListener("click", () => handleFilterClick("All"));

    // Creating the UL that the buttons reside in
    const ulElement = document.createElement("ul");
    ulElement.classList.add("filter__list");

    // Creating and appending the LI to the ul with the "tous" button
    const allLiElement = document.createElement("li");
    allLiElement.appendChild(allButton);
    ulElement.appendChild(allLiElement);

    // Inseting after the project section header
    const buttonContainer = document.querySelector(".project__header");
    buttonContainer.insertAdjacentElement("afterend", ulElement);

    // foreach category ID within the set make a button
    uniqueCategoryIds.forEach((categoryId) => {
      const button = document.createElement("button");

      // find item in allWorks where item category = categoryId then get it's category
      const category = allWorks.find(
        (item) => item.categoryId === categoryId
      ).category;

      button.innerText = category.name;
      button.classList.add("gallery__btn");
      // add event listener that passes the category ID for later use.
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

    // Is this the all button? no? then filter the works where work is equal to the category ID 😊
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
