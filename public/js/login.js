const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const submitBtn = document.querySelector("#submitBtn");
const rowAlert = document.querySelector(".alertAppend");
const divAlert = document.createElement("div");

// Function to handle the form
const handleSubmit = async (e) => {
    e.preventDefault();
    // Create Object with information from the form
    const userObj = {
        email: emailInput.value,
        password: passwordInput.value
    }
    // Request to server to log-in passing the User information (userObj)
    const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    const data = await response.json()
    // If there is an error, display error to screen.
    if (data.message) {
        const message = data.message;
        divAlert.setAttribute("class", "alert alert-danger");
        divAlert.setAttribute("role", "alert");
        divAlert.textContent = message;
        rowAlert.prepend(divAlert);
    } else {
        // redirect to Main page (Authorize)
        window.location.href = "/";
    }
}
// Click event to submit the form
submitBtn.addEventListener("click", handleSubmit);
