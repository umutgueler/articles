import { ErrorHandling } from "../helpers/error/ErrorHandling";
import { GetElementAsync } from "../helpers/getElement/GetElementAsync";
import { AuthRequest } from "../request/AuthRequest";
import { Storage } from "../storage/Storage";
import { UI } from "../ui/UI";
import * as bootstrap from 'bootstrap'




export class ProfilePageEventsListener {

    constructor() {
        this.getElementAsync = new GetElementAsync();
        this.ui = new UI();
        this.authRequest = new AuthRequest();

        this.errorHandling = new ErrorHandling();
        this.storage = new Storage();

    }


    async getElements() {


        this.editProfileButton = await this.getElementAsync.getElementByIDAsync("editProfileButton");
        this.imageUploadButton = await this.getElementAsync.getElementByIDAsync("imageUploadButton");
        this.imageInput = document.getElementById("imageInput");
        this.editUserProfileUpdateButton = document.getElementById("editUserProfileUpdateButton");
        this.editUserProfileForm = document.getElementById("editUserProfileForm");

        this.passwordInput = document.getElementById("password");
        this.passwordControlInput = document.getElementById("passwordControl");
        this.changePasswordModalAlert = document.getElementById("changePasswordModalAlert");
        this.changePasswordButton = document.getElementById("changePasswordButton");
        this.changePasswordForm = document.getElementById("changePasswordForm");

        this.imageModalAlert = document.getElementById("imageModalAlert");
        this.imageProfileModal = document.getElementById("imageProfileModal");
        this.editUserAlert = document.getElementById("editUserAlert");
        this.editUserProfileCancelButton = document.getElementById("editUserProfileCancelButton");

        this.editUsersInputs = document.querySelectorAll(".user-form");
        this.changePasswordModal = document.getElementById("changePasswordModal");

        this.deleteUserButtonModal = document.getElementById("deleteUserButtonModal");
        this.deleteUserAlertDivModal = document .getElementById("deleteUserAlertDivModal");
    }

    
    async profilePageEvents() {

        await this.getElements();

        this.editProfileButton.addEventListener("click", () => {

            this.activeEditProfile();
        });
        this.imageInput.addEventListener("change", () => {
            this.imageUploadValid()
        })
        this.imageUploadButton.addEventListener("click", () => {

            this.imageUpload()
        });

        this.editUserProfileForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.editUserValidate()) { this.editUser() };

        });

        this.editUserProfileCancelButton.addEventListener("click", () => {
            this.deactiveEditProfile();
        });


        this.changePasswordModal.addEventListener("hide.bs.modal", () => {
            this.passwordInput.value = "";
            this.passwordControlInput.value = "";
            this.changePasswordModalAlert.innerHTML = "";
            this.passwordInput.classList = "form-control";
            this.passwordControlInput.classList = "form-control";
        })

        this.changePasswordButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.changePassword();

        });

        this.deleteUserButtonModal.addEventListener("click",()=>{
            this.deleteUser()
        })



        this.passwordChangeValidateFunctions();

    }
    
    async deleteUser (){
        try{
            const loadingDiv = this.ui.alertDiv("primary","Loading ...");
            const lodaingSpinner = this.ui.loadingSpinner(4,2,2);
            loadingDiv.appendChild(lodaingSpinner);
            this.ui.addChildElement(this.deleteUserAlertDivModal,loadingDiv);
            const result = await this.authRequest.deleteUser();

            if (!result?.success){
                throw result.message
            }

            const successAlert = this.ui.alertDiv("light","Gooog bye, good to yourself...");
            this.ui.addChildElement(this.deleteUserAlertDivModal,successAlert);
            this.storage.deleteUserDataFromStorage();

            setTimeout(()=>{
                window.location.replace("/home");
            },2600);
        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.deleteUserAlertDivModal, alertDiv);
        }
    }
    async changePassword() {
        const password = this.passwordControlInput.value;
        const passwordControl = this.passwordControlInput.value;

        if (!password || password !== passwordControl) {
            passwordChangeValidate();
            return;
        }
        const userData = {
            password: password
        }
        const loadingDiv = this.ui.alertDiv("primary", "Loading ...!")
        const spinner = this.ui.loadingSpinner(2, 2, 0);
        loadingDiv.appendChild(spinner);
        this.ui.addChildElement(this.changePasswordModalAlert, loadingDiv);

        try {
            const result = await this.authRequest.editProfile(userData);

            if (!result.success) {
                throw result.message
            }

            const successDiv = this.ui.alertDiv("success", "Password change successful");
            this.ui.addChildElement(this.changePasswordModalAlert, successDiv);




            setTimeout(() => {
                bootstrap.Modal.getOrCreateInstance(this.changePasswordModal).hide();



            }, 2000);
        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.changePasswordModalAlert, alertDiv);
        }







    }

    passwordChangeValidateFunctions() {

        this.passwordInput.addEventListener("input", () => {
            if (this.passwordControlInput.value) {
                if (!this.changePasswordButton.hasAttribute("disabled")) {
                    this.changePasswordButton.setAttribute("disabled", "")
                }
                const spinner = this.ui.loadingSpinner(2, 2, 2);
                this.ui.addChildElement(this.changePasswordModalAlert, spinner)

                setTimeout(() => {
                    this.passwordChangeValidate();
                }, 2000)


            }

        }, { once: true });

        this.passwordControlInput.addEventListener("input", () => {
            if (this.passwordInput.value) {
                if (!this.changePasswordButton.hasAttribute("disabled")) {
                    this.changePasswordButton.setAttribute("disabled", "")
                }
                const spinner = this.ui.loadingSpinner(2, 2, 2);
                this.ui.addChildElement(this.changePasswordModalAlert, spinner)
                setTimeout(() => {
                    this.passwordChangeValidate();
                }, 2000);
            }


        }, { once: true });
    }

    passwordChangeValidate() {

        try {
            if (this.passwordInput.value.length < 6 || this.passwordControlInput.value.length < 6) {
                throw "Password min length 6 !"
            }
            if (this.passwordInput.value !== this.passwordControlInput.value) {
                throw "Password must be same !"
            }

            if (this.changePasswordButton.hasAttribute("disabled")) {
                this.changePasswordButton.removeAttribute("disabled");
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
            this.ui.addChildElement(this.changePasswordModalAlert, alertDiv);

        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.changePasswordModalAlert, alertDiv);

            if (!this.changePasswordButton.hasAttribute("disabled")) {
                this.changePasswordButton.setAttribute("disabled", "")
            }
            if (this.passwordInput.classList.contains("is-valid")) {
                this.passwordInput.classList.remove("is-valid");
                this.passwordControlInput.classList.remove("is-valid");
            }
            if (!this.passwordInput.classList.contains("is-invalid")) {
                this.passwordInput.classList.add("is-invalid");
                this.passwordControlInput.classList.add("is-invalid");
            }

        }

        this.passwordChangeValidateFunctions();
    }

    async imageUpload() {
        try {
            const imageFile = this.imageInput.files;
            if (!imageFile || imageFile.length < 1) {
                throw "An error occurred while uploading the file, please try again."
            }
            const spinner = this.ui.loadingSpinner(4, 2, 1);
            this.ui.addChildElement(this.imageModalAlert, spinner);
            const loadDiv = this.ui.alertDiv("primary", "Loading ...!");
            this.imageModalAlert.appendChild(loadDiv)
            const userdata = await this.errorHandling.asyncErrorHandling(this.authRequest.imageUpload(imageFile));

            if (!userdata.success) {
                throw userdata.message
            }

            const successDiv = this.ui.alertDiv("success", "Image Upload Success");
            this.ui.addChildElement(this.imageModalAlert, successDiv);
            this.storage.updateUserDataOnStroge(userdata.data);
            bootstrap.Modal.getOrCreateInstance(this.imageProfileModal).hide();
            setTimeout(() => {
                window.location.reload();

            }, 1000)


        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.imageModalAlert, alertDiv)
        }

    }

    imageUploadValid() {

        const imageFile = this.imageInput.files;
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if (!allowedExtensions.exec(this.imageInput.value)) {
            const alertDiv = this.ui.alertDiv("danger", "Please upload in the allowed file type!");
            this.ui.addChildElement(this.imageModalAlert, alertDiv)
            if (!this.imageUploadButton.hasAttribute("disabled")) {

                imageUploadButton.setAttribute("disabled", "")
            }

        }
        else {
            this.imageModalAlert.innerHTML = "";
            if (this.imageUploadButton.hasAttribute("disabled")) {
                imageUploadButton.removeAttribute("disabled")
            };

            if (imageFile && imageFile[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageProfileModal.setAttribute("src", e.target.result)

                };

                reader.readAsDataURL(this.imageInput.files[0]);
            }
        }
    }
    editUserValidate() {

        let validate = true;
        'use strict'
        Array.from(this.editUserProfileForm).forEach(form => {
            if (!form.checkValidity()) {
                this.editUserProfileForm.classList.add('was-validated');
                validate = false;
                const alertDiv = this.ui.alertDiv("danger", "Please enter all inputs correctly ! <br><span class='text-muted'>* required</span>");
                this.ui.addChildElement(this.editUserAlert, alertDiv, 3000);
            }
        });


        return validate;
    };
    async editUser() {
        const forms = Array.from(this.editUserProfileForm);
        const userData = new Object();
        forms.forEach((form) => {

            if (form.tagName === "INPUT" && form.value) {
                userData[form.name] = form.value.trim();
            }

        })


        const spinner = this.ui.loadingSpinner(2, 2, 0);
        const alertDiv = this.ui.alertDiv("primary", `Loading ....`);
        alertDiv.appendChild(spinner);

        this.ui.addChildElement(this.editUserAlert, alertDiv)

        try {
            const userDataResult = await this.errorHandling.asyncErrorHandling(this.authRequest.editProfile(userData));
            if (!userDataResult.success) {
                if (userDataResult.message === "Duplicate Key Found") {
                    this.errorHandling.duplicateErorHandling(this.editUserProfileForm, userDataResult.data[0])
                }
                else if (userDataResult.message === "Validation failed") {
                    this.errorHandling.validateErorHandling(this.editUserProfileForm, userDataResult.data)
                }
                throw userDataResult.message
            }


            this.storage.updateUserDataOnStroge(userDataResult.data)
            const successDiv = this.ui.alertDiv("success", "Edit profile is successful");
            this.ui.addChildElement(this.editUserAlert, successDiv);


            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
        catch (err) {

            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.editUserAlert, alertDiv, 6000)
        }


    }

    activeEditProfile() {
        this.editUsersInputs.forEach((element) => {

            element.removeAttribute("disabled")
        });

        this.editUserProfileUpdateButton.style.display = "inline-block";
        this.editUserProfileCancelButton.style.display = "inline-block";
    }

    deactiveEditProfile() {
        this.editUsersInputs.forEach((element) => {

            element.setAttribute("disabled", "")
        });

        this.editUserProfileUpdateButton.style.display = "none";
        this.editUserProfileCancelButton.style.display = "none";
    }

}