import { AuthRequest } from "../request/AuthRequest"
import { Storage } from "../storage/Storage";
import { UI } from "../ui/UI"
import { ErrorHandling } from "../helpers/error/ErrorHandling";
import router from "./EventListener";
import { GetElementAsync } from "../helpers/getElement/GetElementAsync";


import { Modal } from 'bootstrap'

export class LoginModalEvents {

    constructor() {

        this.getElementAsync = new GetElementAsync();
        this.errorHandling = new ErrorHandling();
        this.authRequest = new AuthRequest();
        this.storage = new Storage();
        this.ui = new UI();

    }

    async getElements() {

        this.loginModal = await this.getElementAsync.getElementByIDAsync("loginModal");

        this.usernameInput = await this.getElementAsync.getElementByIDAsync("usernameInputModal");

        this.passwordInput = await this.getElementAsync.getElementByIDAsync("passwordInputModal");
        this.links = document.querySelectorAll("a");
        this.singInForm = document.getElementById("singInFormModal");
        this.loginModalAlertDiv = document.getElementById("loginModalAlertDiv");
        this.loginModalRememberMeCheckbox = document.getElementById("loginModalRememberMeCheckbox");


    }



    async loginModalEvents() {
        await this.getElements();
        Modal.getOrCreateInstance(this.loginModal).show();
        const loginremember = this.storage.getJsonDataFromStorage("loginremember");
        if (loginremember) {


            this.usernameInput.value = loginremember.username;

        }

        this.singInForm.addEventListener("submit", (e) => {
            e.preventDefault()
            this.login();
        });

        Array.from(this.links).forEach((link) => {
            link.addEventListener("click", () => {
                
                setTimeout(() => {
                    Modal.getOrCreateInstance(this.loginModal).hide();
                }, 1000);
            })
        })

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
            this.loginModalAlertDiv.innerHTML = "";
            this.loginModalAlertDiv.appendChild(this.ui.loadingSpinner(4, 2, 2))

            const userdata = await this.authRequest.login(data);



            if (userdata.success) {

                this.storage.addUserDataToStorage(userdata);

                this.loginModalAlertDiv.innerHTML = "";
                const alertDiv = this.ui.alertDiv("success", "Login Successful !");
                this.loginModalAlertDiv.appendChild(alertDiv);
                if (this.loginModalRememberMeCheckbox.checked) {
                    this.storage.addJsonDataToStorage("loginremember",
                        {
                            username: this.usernameInput.value.trim()
                        }
                    )
                }
                setTimeout(() => {
                    location.reload();
                }, 2000)
            }
            else {
                throw userdata.message
            }



        }
        catch (err) {
            console.log(err)

            this.loginModalAlertDiv.innerHTML = "";
            const alertDiv = this.ui.alertDiv("danger", err);
            this.loginModalAlertDiv.appendChild(alertDiv);
            setTimeout(() => {
                alertDiv.remove()
            }, 2000)




        }



    };




}