
const userName = document.querySelector(".userName");

$.get("/auth/user")
    .then(data => {
        userName.textContent = data.email;
    })
    .catch(err => console.log(err));