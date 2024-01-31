import { logout } from './admin.js'; 

export function isLoggedIn() {
    const loginButton = document.querySelector('.login__button');

    if (sessionStorage.getItem('token') !== null) {
        // User is logged in
        console.log("User is logged in");
        loginButton.textContent = 'logout';
        return true;
        // Add additional logic for logged-in state if needed
    } else {
        // User is not logged in
        console.log("User is not logged in");
        loginButton.textContent = 'login';
        return false;
        // Add additional logic for not logged-in state if needed
    }
}

if (isLoggedIn()) {

    const adminbuttonContainer = document.querySelector('.project__header > h2');
    const adminbutton = document.createElement("span");
    const adminicon = document.createElement("i");
    const modifyModal = document.createElement("div"); // Create the modify__modal div

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

    const spacer = document.createElement("div")
    spacer.classList.add("spacer")

    // Append the elements to the admin container
    adminContainer.appendChild(adminIcon);
    adminContainer.appendChild(adminText);
    adminContainer.appendChild(spacer);

    // Find the header element (adjust the selector if needed)
  

    // Insert the admin element before the header
    document.body.insertBefore(adminContainer, document.body.firstChild);


}



  

