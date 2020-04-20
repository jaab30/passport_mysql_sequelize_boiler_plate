
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const submitBtn = document.querySelector("#submitBtn");
const rowAlert = document.querySelector(".alertAppend");
const divAlert = document.createElement("div");

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        divAlert.value = "";
        const userObj = {
            email: emailInput.value,
            password: passwordInput.value
        }
        await $.get("/auth/login", userObj);
        window.location.href = "/";
    } catch (err) {
        const message = JSON.parse(err.responseText).message;
        divAlert.setAttribute("class", "alert alert-danger");
        divAlert.setAttribute("role", "alert");
        divAlert.textContent = message;
        rowAlert.prepend(divAlert);
    }
}

submitBtn.addEventListener("click", handleSubmit);