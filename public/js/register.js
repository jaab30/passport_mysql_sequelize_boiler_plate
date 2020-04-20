
const emailInputReg = document.querySelector("#emailInputReg");
const passwordInputReg = document.querySelector("#passwordInputReg");
const passwordTwoInputReg = document.querySelector("#passwordTwoInputReg");
const submitBtnReg = document.querySelector("#submitBtnReg");
const rowAlertReg = document.querySelector(".alertAppendReg");
const divAlertReg = document.createElement("div");

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        divAlertReg.value = "";
        const userObj = {
            email: emailInputReg.value,
            password: passwordInputReg.value,
            passwordTwo: passwordTwoInputReg.value
        }

        const loginObj = {
            email: emailInputReg.value,
            password: passwordInputReg.value
        }

        const data = await $.post("/auth/register", userObj)
        if (data) {
            await $.get("/auth/login", loginObj)
            window.location.href = "/"
        }

    } catch (err) {
        const message = JSON.parse(err.responseText).message;
        divAlertReg.setAttribute("class", "alert alert-danger");
        divAlertReg.setAttribute("role", "alert");
        divAlertReg.textContent = message;
        rowAlertReg.prepend(divAlertReg);
    }
}

submitBtnReg.addEventListener("click", handleSubmit);