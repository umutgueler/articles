export class ContactPageUI {




    renderContactPageUI(user) {
                
        
        const contactSection = document.createElement("section");
        contactSection.classList = "py-5";

        contactSection.innerHTML = `
        <div class="container px-2">
                
            <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                <div class="text-center mb-5">
                    <div class="bg-primary bg-gradient text-white rounded-3 mb-3 mx-auto w-25"><i class="bi bi-envelope"></i></div>
                    <h1 class="fw-bolder">Get in touch</h1>
                    <p class="lead fw-normal text-muted mb-0">We'd love to hear from you</p>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-8 col-xl-6">
                        <form id="contactForm" class="needs-validation" novalidate>
                            
                            <div class="form-floating mb-3">
                                <input class="form-control form-input" value="${user?.name ? user?.name : ""}" id="name" type="text" placeholder="Enter your name..." required minlength="4"/>
                                <label for="name">Full name</label>
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">A name is required. (min minlength 4)</div>
                            </div>                                
                            <div class="form-floating mb-3">

                                <input class="form-control form-input" value="${user?.email ? user?.email : ""}" id="email" type="email" placeholder="example@example.com" required />

                                <label for="email">Email address</label>
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Email is not valid.</div>
                            </div>
                            
                            <div class="form-floating mb-3 ">
                                <textarea class="form-control form-input" style="resize:none;min-height:10rem" id="message" type="text" placeholder="Enter your message here..."  required minlength="10"></textarea>

                                <label for="message">Message</label>
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback" data-sb-feedback="message:required">A message is required. (min length 10)</div>
                            </div>

                            <div class="mb-3" id="contactAlertDiv" style="min-height: 4rem;">
                                
                            </div>
                            <div class="d-grid"><button class="btn btn-primary btn-lg" id="contactButton" type="submit">Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>

            
        </div>        
        `;
        contactSection.appendChild(this.contactSuccessModal())
        return contactSection;
    }

    contactSuccessModal() {
        
        const contactSuccessModal = document.createElement("div")
        contactSuccessModal.classList = "modal fade";
        contactSuccessModal.id = "contactSuccessModal"
        contactSuccessModal.setAttribute("tabindex", "-1");
        contactSuccessModal.setAttribute("aria-labelledby", "contactSuccessModal");
        contactSuccessModal.setAttribute("aria-hidden", "true");

        contactSuccessModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header bg-dark text-light">
                <h1 class="modal-title fs-5">Articles</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>            
            <form class="needs-validation" novalidate>
                <div class="modal-body">                   
                    
                    <div id="contactSuccessModalAlert" style="min-height: 4rem;">
                        
                        
                    </div>                    
                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>                    
                </div>
            </form>
            </div>
        </div>
        `;

        return contactSuccessModal;
    }
}

