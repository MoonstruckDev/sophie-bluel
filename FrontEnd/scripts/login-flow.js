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

function showError(errorMsg) {
    const errorWrapper = document.querySelector('.error__wrapper');
    const error = document.querySelector('.error');
    errorWrapper.classList.remove('hidden');

    // Use response status text if available, otherwise use the provided errorMsg
    const displayErrorMsg = errorMsg || 'HTTP error';

    error.textContent = displayErrorMsg;
    // setTimeout(() => {
    //     error.classList.add('hidden');
    // }, 20000);
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
            showError(response.statusText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here
        console.log("Login successful:", data);
        sessionStorage.setItem('token', data.token);
    })
    .catch(error => {
        // Handle errors here
        if (error instanceof TypeError) {
            // Network error, API offline
            showError("API is offline or encountered a network error");
            console.error("Network error:", error);
        } else {
            // Other errors

            console.error("Error:", error);
        }
    });
}

