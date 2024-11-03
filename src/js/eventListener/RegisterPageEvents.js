import { ErrorHandling } from "../helpers/error/ErrorHandling";
import { GetElementAsync } from "../helpers/getElement/GetElementAsync";
import { AuthRequest } from "../request/AuthRequest";
import { Storage } from "../storage/Storage";
import { UI } from "../ui/UI";
import router from "./EventListener";


export class RegisterPageEvents {


    constructor() {
        this.getElementAsync = new GetElementAsync();
        this.ui = new UI();
        this.storage = new Storage();
        this.passwordValidateControl = false;
        this.errorHandling = new ErrorHandling();
        this.authRequest = new AuthRequest();
        
    }

    async getElements() {
        this.registerUserForm = await this.getElementAsync.getElementByIDAsync("registerUserForm");

        this.registerUserAlert = document.getElementById("registerUserAlert");

        this.passwordInput = document.getElementById("password");
        this.passwordControlInput = document.getElementById("passwordControl")
    }

    async registerPageEvents() {
        await this.getElements();

        this.registerUserForm.addEventListener("submit", (e) => {
            
            e.preventDefault();
            if (this.registerUserValidate() && this.passwordValidateControl) {
                if (this.passwordInput.value === this.passwordControlInput.value) {
                    this.registerUser()
                }
                else {

                    this.passwordValidate();
                }

            }
            else {
                this.passwordValidate();
            }
            



        });

        this.passwordValidateFunctions();
        router.updatePageLinks();
    }

    async registerUser() {

        const forms = Array.from(this.registerUserForm);
        const userData = new Object();
        forms.forEach((form) => {

            if (form.tagName === "INPUT" && form.value) {
                userData[form.name] = form.value.trim();
            }

        })


        const spinner = this.ui.loadingSpinner(2, 2, 0);
        const alertDiv = this.ui.alertDiv("primary", `Loading ....`);
        alertDiv.appendChild(spinner);

        this.ui.addChildElement(this.registerUserAlert, alertDiv)

        try {
            const userDataResult = await this.errorHandling.asyncErrorHandling(this.authRequest.registerUser(userData));
            if (!userDataResult.success) {
                if (userDataResult.message === "Duplicate Key Found") {
                    this.errorHandling.duplicateErorHandling(this.registerUserForm, userDataResult.data[0])
                }
                else if (userDataResult.message === "Validation failed"){
                    this.errorHandling.validateErorHandling(this.registerUserForm, userDataResult.data)
                }
                throw userDataResult.message
            }


            this.storage.addUserDataToStorage(userDataResult)
            const successDiv = this.ui.alertDiv("success", "Register User Successful");
            this.ui.addChildElement(this.registerUserAlert, successDiv);
            

            setTimeout(() => {
                window.location.replace("/profile");
                
            }, 2000)
        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.registerUserAlert, alertDiv, 6000)
        }
    }

    passwordValidate() {
        this.passwordValidateControl = false;
        try {
            if (this.passwordInput.value.length < 6 || this.passwordControlInput.value.length < 6) {
                throw "Password min length 6 !"
            }
            if (this.passwordInput.value !== this.passwordControlInput.value) {
                throw "Password must be same !"
            }
            if (this.passwordInput.classList.contains("is-invalid")) {
                this.passwordInput.classList.remove("is-invalid");
                this.passwordControlInput.classList.remove("is-invalid");
            }
            if (!this.passwordInput.classList.contains("is-valid")) {
                this.passwordInput.classList.add("is-valid");
                this.passwordControlInput.classList.add("is-valid");
            }
            const alertDiv = this.ui.alertDiv("success", "Password is valid");
            this.ui.addChildElement(this.registerUserAlert, alertDiv);
            this.passwordValidateControl = true;

        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.registerUserAlert, alertDiv);

            if (this.registerUserForm.classList.contains("was-validated")) {
                this.registerUserForm.classList.remove("was-validated")
            }

            if (this.passwordInput.classList.contains("is-valid")) {
                this.passwordInput.classList.remove("is-valid");
                this.passwordControlInput.classList.remove("is-valid");
            }
            if (!this.passwordInput.classList.contains("is-invalid")) {
                this.passwordInput.classList.add("is-invalid");
                this.passwordControlInput.classList.add("is-invalid");

            }
            this.passwordValidateControl = false;
        }

        this.passwordValidateFunctions();

    }

    passwordValidateFunctions() {

        this.passwordInput.addEventListener("input", () => {
            if (this.passwordControlInput.value) {

                const spinner = this.ui.loadingSpinner(2, 2, 2);
                this.ui.addChildElement(this.registerUserAlert, spinner)

                setTimeout(() => {
                    this.passwordValidate();
                }, 2000)


            }

        }, { once: true });

        this.passwordControlInput.addEventListener("input", () => {
            if (this.passwordInput.value) {
                const spinner = this.ui.loadingSpinner(2, 2, 2);
                this.ui.addChildElement(this.registerUserAlert, spinner)
                setTimeout(() => {
                    this.passwordValidate();
                }, 2000);
            }

            throw result.message
        }, { once: true });
    }

    registerUserValidate() {
        let validate = true;
        'use strict'
        Array.from(this.registerUserForm).forEach(form => {
            if (!form.checkValidity()) {
                this.registerUserForm.classList.add('was-validated');
                validate = false;
                const alertDiv = this.ui.alertDiv("danger", "Please enter all inputs correctly ! * required");
                this.ui.addChildElement(this.registerUserAlert, alertDiv, 3000);
            }
        });


        return validate;
    }
}