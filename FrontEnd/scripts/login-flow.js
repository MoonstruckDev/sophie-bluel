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

function postLogin(loginDetails) {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log('Response Headers:', response.headers);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here
        console.log("Login successful:", data);
    })
    .catch(error => {
        // Handle errors here
        console.error("Error:", error);
    });
}
