export class LoginPageUI {
    constructor() {

    }

    renderLoginPageUI() {

        const loginSection = document.createElement("section");
        loginSection.style.backgroundImage = "url(https://res.cloudinary.com/dvdf3jgf9/image/upload/v1673886437/articles/PageImages/login_background_image_g3u4fj.png)"
        loginSection.style.backgroundRepeat = "no-repeat";
        loginSection.style.backgroundPosition = "center";
        loginSection.style.backgroundSize = "cover";

        const loginDiv = document.createElement("div");

        loginDiv.className = "container text-center py-5 "

        loginDiv.innerHTML = `
        <form id="singInForm">
        <div class="col-sm-6 mb-3 mx-auto form-floating">
            
            <input type="username" class="form-control" id="usernameInput" placeholder="username" value="">
            <label for="usernameInput" class="form-label">Username</label>
        </div>
        <div class="col-sm-6 mb-3  mx-auto form-floating">
        <input type="password" class="form-control" id="passwordInput" placeholder="password">
            <label for="passwordInput" class="form-label">Password</label>
            
        </div>
        <div id="alert" class="col-sm-6 mx-auto m-2" style="min-height:4rem">
        </div>
        
            
                <div class="row-2 m-4">
                    <div class="col d-flex justify-content-center p-2">
                        
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="rememberMeCheckbox" checked />
                            <label class="form-check-label " for="checkbox"> Remember me </label>
                        </div>
                    </div>
            
                    <div class="col p-2">
                        <a href="#">Forgot password?</a>
                    </div>
                </div>            
            
            
        
            
            <div class="text-center">
                <button id="singInButton" type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
            </div>
            
        
            
            <div class="text-center">
                <p>Not a member? <a href="/register" data-navigo>Register</a></p>
                
                </button>
            </div>
        </form>        
        `;
        loginSection.appendChild(loginDiv)
        return loginSection;
    }


}
