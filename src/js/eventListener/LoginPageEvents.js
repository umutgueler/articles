import { AuthRequest } from "../request/AuthRequest"
import { Storage } from "../storage/Storage";
import { UI } from "../ui/UI"
import { ErrorHandling } from "../helpers/error/ErrorHandling";
import Navigo from "navigo";
import { GetElementAsync } from "../helpers/getElement/GetElementAsync";

import router from "./EventListener";

export class LoginPageEventsListener {

    constructor() {

        this.getElementAsync = new GetElementAsync();
        this.errorHandling = new ErrorHandling();
        this.authRequest = new AuthRequest();
        this.storage = new Storage();
        this.ui = new UI();
        this.router = new Navigo("/");
    }

    async getElements() {
        
        this.usernameInput = await this.getElementAsync.getElementByIDAsync("usernameInput")
        this.passwordInput = await this.getElementAsync.getElementByIDAsync("passwordInput")
        this.singInForm = document.getElementById("singInForm");
        this.alert = document.getElementById("alert");
        this.rememberMeCheckbox = document.getElementById("rememberMeCheckbox");
        

    }

    async loginPageEvents() {
        await this.getElements();
        const loginremember = this.storage.getJsonDataFromStorage("loginremember");
        if (loginremember) {
            

            this.usernameInput.value = loginremember.username;
            
        }

        this.singInForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.login();
            
        });
        router.updatePageLinks();


    }
    async login() {

        try {

            if (!this.usernameInput.value || this.usernameInput.value.length < 4) {
                throw "Please a provide username"
            }
            if (!this.passwordInput.value || this.passwordInput.value.length < 6) {
                throw "Please a provide password";
            }
            const data = {
                username: this.usernameInput.value.trim(),
                password: this.passwordInput.value
            }
            this.alert.innerHTML = "";
            this.alert.appendChild(this.ui.loadingSpinner(4, 2, 2))

            const userdata = await this.errorHandling.asyncErrorHandling(this.authRequest.login(data));



            if (userdata.success) {
                this.storage.addUserDataToStorage(userdata);

                this.alert.innerHTML = "";
                const alertDiv = this.ui.alertDiv("success", "Login Successful !");
                this.alert.appendChild(alertDiv);
                if (this.rememberMeCheckbox.checked) {
                    this.storage.addJsonDataToStorage("loginremember",
                        {
                            username: this.usernameInput.value.trim()
                        }
                    )
                }
                setTimeout(() => {
                    window.location.replace("/home");
                    
                }, 1000)
            }
            else {
                throw userdata.message
            }



        }
        catch (err) {
            if (err) {
                this.alert.innerHTML = "";
                const alertDiv = this.ui.alertDiv("danger", err);
                this.alert.appendChild(alertDiv);
                setTimeout(() => {
                    alertDiv.remove()
                }, 2000)
            }
            else {
                this.alert.innerHTML = "";
                const alertDiv = this.ui.alertDiv("danger", "An error occurred while connecting");
                this.alert.appendChild(alertDiv);
                setTimeout(() => {
                    alertDiv.remove()
                }, 2000)
            }


        }

        



    };




}