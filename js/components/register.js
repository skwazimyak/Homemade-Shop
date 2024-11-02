const [...nameInput] = document.querySelectorAll("#name-input")
const phoneInput = document.getElementById("phone-input")
const emailInput = document.getElementById("email-input")
const registerBtn = document.getElementById("register-btn")

window.addEventListener("DOMContentLoaded", () => {
    nameInput.forEach(el => {
        el.addEventListener("focusout", (e) => {
            checkName(e.target)
        })
        el.addEventListener("input", (e) => {
            checkName(e.target)
        })
    })

    phoneInput.addEventListener("focusout", (e) => {
        checkPhone(e.target)
    })
    phoneInput.addEventListener("beforeinput", () => {
        if (phoneInput.selectionStart < 4) {
            phoneInput.selectionStart = 4
        }
    })
    phoneInput.addEventListener("input", (e) => {
        checkPhone(e.target)
    })

    emailInput.addEventListener("focusout", (e) => {
        checkEmail(e.target)
    })
    emailInput.addEventListener("input", (e) => {
        checkEmail(e.target)
    })

    register()
})

function checkName(currentInput) {
    const checkNameValue = /^[а-я-їієА-Я-ЇІЄ]{2,20}$/
    if (currentInput.value.search(checkNameValue) === -1) {
        currentInput.nextElementSibling.classList.add("show")
        currentInput.classList.add("warned")
    }
    else if (currentInput.value.search(checkNameValue) === 0) {
        currentInput.nextElementSibling.classList.remove("show")
        currentInput.classList.remove("warned")
    }
}

function checkPhone(currentInput) {
    const checkPhoneValue = /^\+380\d{9}$/
    const lastChar = phoneInput.value.slice(phoneInput.value.length - 1, phoneInput.value.length)
    const lastCharNumber = /[0-9]/
    if (lastChar.search(lastCharNumber) === -1 && phoneInput.value.length !== 0) {
        phoneInput.value = phoneInput.value.slice(0, phoneInput.value.length - 1)
    }

    const numberStart = /^\+380/
    if (phoneInput.value.search(numberStart) === -1) {
        phoneInput.value = "+380" + phoneInput.value.slice(3, phoneInput.value.length - 1)
    }

    if (phoneInput.value.length > 13) {
        phoneInput.value = phoneInput.value.slice(0, phoneInput.value.length - 1)
    }

    if (phoneInput.value.search(checkPhoneValue) === -1) {
        currentInput.nextElementSibling.classList.add("show")
        currentInput.classList.add("warned")
    }
    else if (phoneInput.value.search(checkPhoneValue) === 0) {
        currentInput.nextElementSibling.classList.remove("show")
        currentInput.classList.remove("warned")
    }
}

function checkEmail(currentInput) {
    const checkEmailValue = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (emailInput.value.search(checkEmailValue) === -1) {
        currentInput.nextElementSibling.classList.add("show")
        currentInput.classList.add("warned")
    }
    else if (emailInput.value.search(checkEmailValue) === 0) {
        currentInput.nextElementSibling.classList.remove("show")
        currentInput.classList.remove("warned")
    }

}

function register() {
    registerBtn.addEventListener("click", () => {
        let warned = false
        nameInput.forEach(el => {
            checkName(el)
        })
        checkPhone(phoneInput)
        checkEmail(emailInput)
        const warnings = document.querySelectorAll(".warning")
        warnings.forEach(e => {
            const [...warningClassList] = e.classList
            if (warningClassList.includes("show")) {
                e.previousElementSibling.focus()
                warned = true
            }
        })
        if(!warned){
            window.location = "../../html/thankyou.html"
        }
    })
}