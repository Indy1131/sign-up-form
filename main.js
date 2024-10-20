const form = document.querySelector("form");
const fields = document.querySelector(".fields");

const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector("#password + div")

const confirmInput = document.querySelector("#confirm-password");
const confirmError = document.querySelector("#confirm-password + div")

function setError(input, error) {
    input.classList.add("error-border");

    if (input.validity.valueMissing) {
        error.textContent = "* Field is required";
    } else if (input.validity.badInput) {
        error.textContent = `* Umm`;
    } else if (input.validity.patternMismatch) {
        if (input.getAttribute("id") == "phone-number") {
            error.textContent = `* Follow telephone format`;
        } else if (input.getAttribute("id") == "password") {
            if (!/[a-z]/.test(input.value)) {
                error.textContent = `* Password must contain a lowercase letter`;
            } else if (!/[A-Z]/.test(input.value)) {
                error.textContent = `* Password must contain an uppercase letter`;
            } else if (!/\d/.test(input.value)) {
                error.textContent = `* Password must contain a digit`;
            } else {
                error.textContent = `* Password must contain a special character`;
            }
        } else if (input.getAttribute("id") != "confirm-password") {
            error.textContent = `* Alphabetic characters only`;
        }
    } else if (input.validity.typeMismatch) {
        error.textContent = `* Must be a valid email address`;
    } else if (input.validity.tooShort) {
        error.textContent = `* Must be at least ${input.getAttribute('minlength')} characters`;
    }
}

for (const child of fields.children) {
    const input = child.children[1];
    const error = child.children[2]

    input.addEventListener("focus", () => {
        input.classList.remove("error-border");
        error.textContent = "";
    });

    input.addEventListener("focusout", () => {
        if (!input.checkValidity()) {
            setError(input, error);
        }
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let noErrors = true

    for (const child of fields.children) {
        const input = child.children[1];
        const error = child.children[2];

        if (!input.checkValidity()) {
            noErrors = false
            e.preventDefault();
            setError(input, error);
        }
    }

    if (passwordInput.value != confirmInput.value && passwordInput.checkValidity()) {
        noErrors = false
        passwordInput.value = "";
        confirmInput.value = "";

        passwordInput.classList.add("error-border");
        confirmInput.classList.remove("error-border");

        passwordError.textContent = "Passwords must match";
        confirmError.textContent = "";
    }

    if (noErrors) {
        form.submit();
    }
});