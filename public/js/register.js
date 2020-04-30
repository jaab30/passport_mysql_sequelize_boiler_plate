
const emailInputReg = document.querySelector("#emailInputReg");
const passwordInputReg = document.querySelector("#passwordInputReg");
const passwordTwoInputReg = document.querySelector("#passwordTwoInputReg");
const submitBtnReg = document.querySelector("#submitBtnReg");
const rowAlertReg = document.querySelector(".alertAppendReg");
const divAlertReg = document.createElement("div");

// Function to handle the form
const handleSubmit = async (e) => {
    e.preventDefault();
    // Create Object to be used on the Regiter request with information from the form
    divAlertReg.value = "";
    const userObj = {
        email: emailInputReg.value,
        password: passwordInputReg.value,
        passwordTwo: passwordTwoInputReg.value
    }
    // Create Object to be used on the log-in request after successful registration with information from the form
    const loginObj = {
        email: emailInputReg.value,
        password: passwordInputReg.value
    }
    // Request to server to Register passing the User information (userObj)
    const response = await fetch("/auth/register", {
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
        divAlertReg.setAttribute("class", "alert alert-danger");
        divAlertReg.setAttribute("role", "alert");
        divAlertReg.textContent = message;
        rowAlertReg.prepend(divAlertReg);
    } else {
        // Request to server to log-in passing the User information (loginObj)
        await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginObj)
        })
        // redirect to Main page (Authorize)
        window.location.href = "/"
    }
}
// Click event to submit the form
submitBtnReg.addEventListener("click", handleSubmit);
