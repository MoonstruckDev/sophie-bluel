function isAdmin() {
    return parseInt(sessionStorage.getItem('userId')) === 1;
}

function getBearerToken() {
    return sessionStorage.getItem('token');
}

// if (isAdmin()) {
//     // Show the admin page
//     document.querySelector('.admin').classList.remove('hidden');
//     console.log("Admin page is shown");
// }

// const adminbuttonContainer = document.querySelector('.project__header > h2');
// const adminbutton = document.createElement("span");
// const adminicon = document.createElement("i");
// const modifyModal = document.createElement("div"); // Create the modify__modal div

// adminicon.classList.add("fa-solid", "fa-pen-to-square");
// adminicon.style.color = "black";
// adminbutton.innerText = "Modifier";
// adminbutton.style.color = "black";

// adminbuttonContainer.appendChild(adminicon);
// adminbuttonContainer.appendChild(adminbutton);

// modifyModal.classList.add("admin");
// modifyModal.classList.add("modify__modal");
// modifyModal.classList.add("hidden"); // Add the modify__modal class to the div
// adminbuttonContainer.after(modifyModal); // Insert the modify__modal div after adminbuttonContainer
// modifyModal.appendChild(adminicon); // Append the adminicon to the modify__modal div
// modifyModal.appendChild(adminbutton); // Append the adminbutton to the modify__modal div

debugger


