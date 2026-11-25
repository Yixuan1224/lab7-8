// PART E: CONTACT FORM VALIDATION (contact.html)
// - On submit: preventDefault, check every required field.
const form = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstName");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const consent = document.querySelector("#consent");
const confirmBox = document.querySelector("#confirmBox");

//Form submission
form.addEventListener("submit", event => {
    event.preventDefault();
    confirmBox.classList.add("d-none");

    if (firstName.validity.valueMissing) {
        showError(firstName, "Please enter your first name");
    }
    if (email.validity.valueMissing) {
        showError(email, "Please enter your email");
    } else if (email.validity.typeMismatch) {
        showError(email, "Enter a valid email address");
    }
    if (message.validity.valueMissing) {
        showError(message, "Please enter your message");
    } else if (message.validity.tooShort) {
        showError(message, "Please enter at least 10 characters");
    }
    if (consent.validity.valueMissing) {
        showError(consent, "Please agree to be contacted");
    }
// - Move focus to the first invalid field.
    const firstInvalid = document.querySelector(".is-invalid");
    if (firstInvalid) {
        firstInvalid.focus();
        return;
    }

// - When valid: show "Thanks, <first name>! ..." in #confirmBox using
//   textContent, remove d-none, and reset the form. No alert().
    confirmBox.textContent = `Thanks, ${firstName.value}! We will reply soon.`;
    confirmBox.classList.remove("d-none");
    form.reset();
    for (const field of fields) {
        clearError(field);
    }
});

// - Show a specific message in the feedback div and add is-invalid.
function showError(input, message) {
    input.classList.add("is-invalid");
    document.querySelector(`#${input.id}Feedback`).textContent = message;
}

// - Clear errors as the visitor corrects a field (input event).
// Remove the error class and message.
function clearError(input) {
    input.classList.remove("is-invalid");
    document.querySelector(`#${input.id}Feedback`).textContent = "";
}
const fields = [firstName, email, message, consent];

// Clear errors when a field becomes valid.
for (const field of fields) {
    field.addEventListener("input", () => {
        if (field.validity.valid) {
            clearError(field);
        }
    });
}

