
const userName = document.querySelector(".userName");

// Get current User and display email information.
// Here you can display any User information coming from the server.
fetch("/auth/user")
    .then(response => response.json())
    .then(data => { userName.textContent = data.email; })
    .catch(err => console.log(err));