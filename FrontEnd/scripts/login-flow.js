import { logout } from './admin.js'; 
import { closeToastDuration, createToast } from './toasts.js';


const form = document.querySelector(".login");

if (window.location.pathname.endsWith("/login.html")) {
    form.addEventListener("submit", function (event) {
        console.log("Form submitted");
        event.preventDefault();
        const formData = new FormData(form);
        const userData = {
          email: formData.get('email'),
          password: formData.get('password'),
        };
    
        loginUser(userData);
    });
}

export function goHome() {
    window.location.href = 'index.html';
}

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

export function loginUser(loginDetails) {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            createToast("Error", response.statusText, "red");
            closeToastDuration();
            
            console.log(response.statusText);
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here
        console.log("Login successful:", data);

        const token = data.token;
        const userId = data.userId;
        
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        
        createToast("Success", "Login successful!", "green");
        
        
        // Add a delay of 2 seconds before calling goHome()
        setTimeout(() => {
            goHome();
        }, 2000);



    })
    .catch(error => {
        // Handle errors here
        if (error instanceof TypeError) {
            // Network error, API offline
            console.error("Network error:", error);
        } else {
            console.error("Error:", error.message);
        }
    });
}

const loginButton = document.querySelector('.login__button');
loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (loginButton.textContent == "logout") {
        logout();
        loginButton.textContent = "login";

        // Remove elements with class "admin"
        document.querySelectorAll(".admin").forEach(function(element) {
            element.remove();
        });

    }
    else window.location.href = "login.html";
} )





