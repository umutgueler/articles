import { UI } from "../../ui/UI";
import { LoginModalEvents } from "../../eventListener/LoginModalEvents"


export class ErrorHandling {



    constructor() {
        this.main = document.querySelector("main");


    }




    async asyncErrorHandling(func) {
        try {
            const result = await func;

            if (result?.status === 401) {
                this.authError();

            }

            return result;

        }
        catch (err) {
            throw "An error occurred while connecting"
        }
    }

    duplicateErorHandling(forms, variable) {
        forms.classList.remove("was-validated")
        let formInput;
        for (const form of Array.from(forms)) {
            if (form.name === variable) {

                formInput = form;
                break
            }
        }

        const message = formInput.nextElementSibling.nextElementSibling.innerHTML
        formInput.nextElementSibling.nextElementSibling.innerHTML = "This is already used !"
        formInput.classList.add("is-invalid");
        formInput.addEventListener("input", () => {
            formInput.classList.remove("is-invalid");
            formInput.nextElementSibling.nextElementSibling.innerHTML = message
        }, { once: true });
    }

    validateErorHandling(forms, data) {
        if (forms.classList.contains("was-validated")){
            forms.classList.remove("was-validated")
        }



        for (const form of Array.from(forms)) {
            if (Object.keys(data).includes(form.name)) {

                const formInput = form;
                const message = formInput.nextElementSibling.nextElementSibling.innerHTML
                formInput.nextElementSibling.nextElementSibling.innerHTML = data[form.name]
                if (!formInput.classList.contains("is-invalid")) {
                    formInput.classList.add("is-invalid");
                }

                formInput.addEventListener("input", () => {
                    formInput.classList.remove("is-invalid");
                    formInput.nextElementSibling.nextElementSibling.innerHTML = message
                }, { once: true });

            }
        }


    }

    authError() {
        const ui = new UI();
        this.main.appendChild(ui.loginModal())
        const loginModalEvents = new LoginModalEvents();
        loginModalEvents.loginModalEvents();
    }
}