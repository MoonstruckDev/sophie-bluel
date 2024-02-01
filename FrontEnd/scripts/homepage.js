import { isLoggedIn } from './login-flow.js';

if (isLoggedIn()) {

    const adminbuttonContainer = document.querySelector('.project__header > h2');
    const adminbutton = document.createElement("span");
    const adminicon = document.createElement("i");
    const modifyModal = document.createElement("div");

    adminicon.classList.add("fa-solid", "fa-pen-to-square");
    adminicon.style.color = "black";
    adminbutton.innerText = "Modifier";
    adminbutton.style.color = "black";
    modifyModal.classList.add("admin");
    
    adminbuttonContainer.appendChild(adminicon);
    adminbuttonContainer.appendChild(adminbutton);
    
    modifyModal.classList.add("modify__modal");
    adminbuttonContainer.after(modifyModal); 
    modifyModal.appendChild(adminicon); 
    modifyModal.appendChild(adminbutton);


    const adminContainer = document.createElement("div");
    adminContainer.classList.add("admin", "admin__header");

    const adminIcon = document.createElement("i");
    adminIcon.classList.add("fa-solid", "fa-pen-to-square");

    const adminText = document.createElement("span");
    adminText.innerText = "Mode Édition";

    // Append the elements to the admin container
    adminContainer.appendChild(adminIcon);
    adminContainer.appendChild(adminText);

    // Find the header element (adjust the selector if needed)
  

    // Insert the admin element before the header
    document.body.insertBefore(adminContainer, document.body.firstChild);
}



  

