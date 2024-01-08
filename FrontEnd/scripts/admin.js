function isAdmin() {
    return parseInt(sessionStorage.getItem('userId')) === 1;
}

function getBearerToken() {
    return sessionStorage.getItem('token');
}

if (isAdmin()) {
    // Show the admin page
    document.querySelector('.admin').classList.remove('hidden');
    console.log("Admin page is shown");
}

const adminbuttonContainer = document.querySelector('.admin > h2');
const adminbutton = document.createElement("span");
const adminicon = document.createElement("i");

adminicon.classList.add("fa-solid", "fa-pen-to-square"); // Fix the class assignment
adminicon.style.color = "black";
adminbutton.innerText = "Modifier";
adminbutton.style.color = "black";

adminbuttonContainer.appendChild(adminicon);
adminbuttonContainer.appendChild(adminbutton); // Append the adminbutton to the adminbuttonContainer
