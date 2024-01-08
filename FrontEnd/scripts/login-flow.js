const form = document.querySelector(".login");

form.addEventListener("submit", function (event) {
    console.log("Form submitted");
    event.preventDefault();
    const formData = new FormData(form);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    postLogin(userData);
});

function showStatus(message, isError = false) {
    const statusWrapper = document.querySelector('.status__wrapper');
    const status = document.querySelector('.status');
    const statusIcon = document.querySelector('.status__wrapper i');

    // Determine the appropriate styles based on error or success
    const statusClass = isError ? 'error' : 'success';
    statusWrapper.classList.remove('hidden', 'error', 'success');
    statusWrapper.classList.add(statusClass);

    // Set the appropriate icon based on error or success
    statusIcon.className = isError ? 'fa-solid fa-triangle-exclamation' : 'fa-solid fa-check';

    // Use the provided message or default to 'HTTP error'
    const displayMessage = message || 'HTTP error';
    status.textContent = displayMessage;

    // // Hide the status message after 2 seconds
    // setTimeout(() => {
    //     statusWrapper.classList.add('hidden');
    // }, 2000);
}


function goHome() {
    window.location.href = 'index.html';
}
function postLogin(loginDetails) {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            showStatus(response.statusText, true);
            console.log(response.statusText);
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here
        console.log("Login successful:", data);
        sessionStorage.setItem('token', data.token);
        showStatus("Login successful!");
        
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



