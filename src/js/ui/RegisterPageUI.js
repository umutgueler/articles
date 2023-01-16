export class RegisterPageUI{







    renderRegisterPage(){

        const registerSection=document.createElement("section");
        registerSection.classList="bg-image pt-5 pb-5";
        registerSection.style.backgroundImage="url(https://res.cloudinary.com/dvdf3jgf9/image/upload/v1673886437/articles/PageImages/register_bacground_image_ufdkbk.png)";

        registerSection.innerHTML=`
        <div class="mask d-flex align-items-center h-100 gradient-custom-3 opacity-90">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-6 col-xl-6">
                        <div class="card" style="border-radius: 15px;">
                            <div class="card-body py-5 px-4">
                                <h4  class="text-uppercase text-center mb-3">Create an account</h4>

                                <form id="registerUserForm" class="needs-validation" novalidate>
                                    <div class="row form-outline mb-3">
                                        <div class="col-sm-3 ">
                                            <label for="name" class="form-label">Name</label>
                                        </div>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control user-form" name="name" id="name" placeholder="Name" minlength="4" maxlength="20" required>
                                            <div class="valid-feedback">Looks good!</div>
                                            <div class="invalid-feedback">Please enter a correct name (min 4 characters)!</div>                               
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row form-outline mb-3">
                                        <div class="col-sm-3 ">
                                            <label for="username" class="form-label">Username</label>
                                        </div>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control user-form" name="username" id="username" placeholder="Username" minlength="4" maxlength="20"required>
                                            <div class="valid-feedback">Looks good!</div>
                                            <div class="invalid-feedback">Please enter a correct username (min 4 characters)!</div>                                
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row form-outline mb-3">
                                        <div class="col-sm-3 ">
                                            <label for="email" class="form-label">Email</label>
                                        </div>
                                        <div class="col-sm-9">
                                            <input type="email" class="form-control user-form" name="email" id="email" placeholder="example@example.com" pattern='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$' required>
                                            <div class="valid-feedback">Looks good!</div>
                                            <div class="invalid-feedback">Please enter a correct email !</div>                                
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row form-outline mb-3">
                                        <div class="col-sm-3 ">
                                            <label for="password" class="form-label">Password</label>
                                        </div>
                                        <div class="col-sm-9">
                                            <input type="password" class="form-control user-form" name="password" id="password" placeholder="Password" required>                               
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row form-outline mb-3">
                                        <div class="col-sm-3 ">
                                            <label for="passwordControl" class="form-label">Password</label>
                                        </div>
                                        <div class="col-sm-9">
                                            <input type="password" class="form-control user-form" name="passwordControl" id="passwordControl" placeholder="Password Confrim" required>                               
                                        </div>
                                    </div>                                   
                                    <hr>
                                    <div class="form-check d-flex justify-content-center mb-1">
                                        
                                        
                                        <input class="form-check-input me-2" type="checkbox"  id="checkbox" required/>
                                        <label class="form-check-label" for="checkbox">I agree all statements in <a href="" class="text-body"><u>Terms of service</u></a></label>
                                        
                                        
                                    </div>
                                    <div id="registerUserAlert" class="mb-1" style="min-height:4rem">
                                        
                                    </div>

                                    <div class="d-grid gap-2">
                                        <button id="registerButton" type="submit" class="btn btn-dark btn-lg bg-gradient">Register</button>
                                    </div>

                                    <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login" data-navigo class="fw-bold text-body"><u>Login here</u></a></p>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>            
        `;

        return registerSection;

    }
}
