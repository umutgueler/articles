import { ErrorHandling } from "../helpers/error/ErrorHandling";
import { GetElementAsync } from "../helpers/getElement/GetElementAsync";
import { ContactRequest } from "../request/ContactRequest";
import { UI } from "../ui/UI";
import * as bootstrap from 'bootstrap';



export class ContactPageEvents {

    constructor() {
        this.errorHandling = new ErrorHandling();
        this.getElementAsync = new GetElementAsync();
        this.ui = new UI();
        this.contactRequest = new ContactRequest();
    }

    async getElement() {
        this.contactForm = await this.getElementAsync.getElementByIDAsync("contactForm");
        this.contactAlertDiv = await this.getElementAsync.getElementByIDAsync("contactAlertDiv");
        this.contactSuccessModalAlert = document.getElementById("contactSuccessModalAlert");
        this.contactSuccessModal = document.getElementById("contactSuccessModal");
    }

    async contactPageEvents() {
        await this.getElement();

        this.contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.contactValidate()) {                
                this.contactUpload();
            }
        });

        this.contactSuccessModal.addEventListener("hide.bs.modal",()=>{
            location.reload();
        })

    }

    async contactUpload() {
        const forms = Array.from(this.contactForm);
        const contactData = new Object();
        forms.forEach((form) => {

            if (form.classList.contains("form-input") && form.value) {

                contactData[form.id] = form.value.trim();
            }

        });
        const spinner = this.ui.loadingSpinner(2, 2, 0);
        const alertDiv = this.ui.alertDiv("primary", `Loading ....`);
        alertDiv.appendChild(spinner);
        this.ui.addChildElement(this.contactAlertDiv, alertDiv);

        try {
            const result = await this.errorHandling.asyncErrorHandling(this.contactRequest.contactUpload(contactData));

            if (!result.success){
                throw result.message
            }
            this.contactAlertDiv.innerHTML=""
            const successDiv = this.ui.alertDiv("dark", `
            <h4>Dear ${contactData.name}</h4>
            <br>
            <hr>            
            <p>Your message has been sent successfully.<br> We will contact you as soon as possible.</p>`);
            this.ui.addChildElement(this.contactSuccessModalAlert,successDiv);
            bootstrap.Modal.getOrCreateInstance(this.contactSuccessModal).show();

        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.contactAlertDiv, alertDiv, 6000);

        }


    }

    contactValidate() {
        let validate = true;
        'use strict'
        Array.from(this.contactForm).forEach(form => {
            if (!form.checkValidity()) {
                this.contactForm.classList.add('was-validated');
                validate = false;
                const alertDiv = this.ui.alertDiv("danger", "Please enter all inputs correctly !");
                this.ui.addChildElement(this.contactAlertDiv, alertDiv, 3000);
            }
        });



        return validate;
    }







}