import { Storage } from "../storage/Storage";

export class UI {





    constructor() {

        this.navbar = document.createElement("nav");
        this.footer = document.createElement("footer");
        this.navUserDropDownList = ["login", "register", "profile"];
        this.navArticleDropDownList = ["addarticle", "article"]
        this.storage = new Storage();
    }







    navbarUI(userData) {
       
        let userDropDownLink = '<a id="user" class="nav-link dropdown-toggle DeactivE" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">User</a>';
        let userDropDowns;
        let articlesDropDownLink = '<a id="article" class="nav-link dropdown-toggle DeactivE" id="navbarDropdownBlog" href="#"  role="button" data-bs-toggle="dropdown" aria-expanded="false" >Article</a>';
        let articleDropDowns = `
            <ul class="dropdown-menu dropdown-menu-end" data-bs-auto-close="true" aria-labelledby="navbarDropdownBlog">
                <li><a  class="dropdown-item" href="/article?page=1&population=comment" data-navigo>Articles</a></li>
                <li><a  class="dropdown-item" href="/addarticle" data-navigo>Add Article</a></li>
            </ul>
        `

        let navProfile;
        if (!userData) {
            userDropDowns = `
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                    <li><a id="navLoginPage" class="dropdown-item" href="/login" data-navigo>Login</a></li>
                    <li><a class="dropdown-item" href="/register" data-navigo>Register</a></li>
                </ul>
            `
        }
        else {
            const user = userData.userdata;

            userDropDowns = `
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                    <li><a id="navProfilePage" class="dropdown-item" href="/profile" data-navigo>Profile</a></li>
                    <li><a id="navLogout" class="dropdown-item" href="/logout" data-navigo>Logout</a></li>
                </ul>
            `
            navProfile = `<a class="navbar-brand" href="profile" data-navigo><img src=${user.profile_image} alt ="${user.username}" width ="40" height ="40" class="d-inline-block align-text-top rounded m-1" >${user.name}</a > `
        }




        let navbarlinks = ""


        const navbarLinksMap = new Map();

        navbarLinksMap.set("home", `<li class="nav-item"><a id="home" class="nav-link DeactivE" href="/home" data-navigo>Home</a></li>`);
        navbarLinksMap.set("about", `<li class="nav-item"><a id="about" class="nav-link DeactivE" href="/about" data-navigo>About</a></li>`);
        navbarLinksMap.set("contact", `<li class="nav-item"><a id="contact" class="nav-link DeactivE" href="/contact" data-navigo>Contact</a></li>`);
             


        navbarLinksMap.forEach((value, key) => {
            navbarlinks += value;
        })

        
        
        
        
        


        this.navbar.id = "topNavbar"
        this.navbar.classList = "navbar sticky-top navbar-expand-lg navbar-dark bg-dark";
        this.navbar.innerHTML = `
        
                <div class="container">
                    <div id ="offCanvasButtonDiv" style="display:none">
                        <button class="navbar-toggler bg-dark" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas" aria-controls="offcanvas" aria-label="Toggle docs navigation">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                        </button>
                    </div>
                    
                
                        
                    
                    <a class="navbar-brand" href="/home" data-navigo>Articles</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul id="navlinks" class="navbar-nav ms-auto mb-2 mb-lg-0">
                            ${navbarlinks}
                            <li class="nav-item dropdown">                                
                                ${articlesDropDownLink}
                                ${articleDropDowns}
                            </li>
                            <li class="nav-item dropdown">                                
                                ${userDropDownLink}
                                ${userDropDowns}
                            </li>
                            


                        </ul>
                        ${navProfile}
                    </div>
                </div>
            
        `;




        return this.navbar
    };

    offCanvasButtonDisplay(page,offCanvasButtonDiv){
        
        if(page === "article"){
            offCanvasButtonDiv.style.display="block"
        }
        else{
            offCanvasButtonDiv.style.display="none"
        }
    }

    navbarActiveLinkChange(page, navbarLinks) { 
        navbarLinks.forEach(e => {
            if (e.classList.contains("active")) {
                e.classList.remove("active")
                e.classList.add("DeactivE")
            }

            if (e.id === page) {
                e.classList.remove("Deactive")
                e.classList.add("active")
            }
            else if (this.navUserDropDownList.includes(page)) {

                if (e.id === "user") {

                    e.classList.remove("DeactivE")
                    e.classList.add("active")
                }
            }
            else if (this.navArticleDropDownList.includes(page)) {

                if (e.id === "article") {
                    e.classList.remove("DeactivE")
                    e.classList.add("active")
                }
            }

        })

    }


    footerUI() {
        this.footer.classList = "bg-dark py-4 mt-auto";
        this.footer.innerHTML = `
            <div class="container px-5">
                <div class="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div class="col-auto"><div class="small m-0 text-white">Copyright &copy; Umut GÜLER 2022</div></div>
                    <div class="col-auto">                        
                        <a class="link-light small" href="/about" data-navigo>About</a>
                        <span class="text-white mx-1">&middot;</span>
                        <a class="link-light small" href="/contact" data-navigo>Contact</a>
                    </div>
                </div>
            </div>
        `;

        return this.footer;
    };
    clearElementInnerHTML(element) {
        while (element.firstElementChild !== null) {
            element.firstElementChild.remove();
        }
    }

    loadingSpinner(height = 25, width = 6, margin = 5) {
        const spinnerDiv = document.createElement("div");
        spinnerDiv.classList = `text-center mt-${margin} pt-${margin}`;
        spinnerDiv.style = `height: ${height}rem;`
        spinnerDiv.innerHTML = `
        <div class="spinner-border" style="width: ${width}rem; height: ${width}rem;" role="status">
            
        </div>
        `;
        return spinnerDiv;

    }

    async renderPage(theRenderPage, theClearElement) {
        this.clearElementInnerHTML(theClearElement);
        theClearElement.appendChild(this.loadingSpinner());
        const result = await theRenderPage
        this.clearElementInnerHTML(theClearElement);
        theClearElement.appendChild(result);

    }

    alertDiv(type, message) {
        const alertDiv = document.createElement("div");
        alertDiv.classList = `alert alert-${type} m-1`;
        alertDiv.innerHTML = message;

        return alertDiv;
    }

    addChildElement(parentElement, childElement, time = null) {
        parentElement.innerHTML = "";
        parentElement.appendChild(childElement);

        if (time) {
            setTimeout(() => {
                childElement.remove()
            }, time)
        }
    };

    loginModal() {
        const loginSection = document.createElement("section");
        loginSection.style.backgroundImage = "url(https://res.cloudinary.com/dvdf3jgf9/image/upload/v1673886435/articles/PageImages/header_img_m7jmv2.png)"
        loginSection.style.backgroundRepeat = "no-repeat";
        loginSection.style.backgroundPosition = "center";
        loginSection.style.backgroundSize = "cover";
        loginSection.classList = "p-3"

        const loginDiv = document.createElement("div");

        loginDiv.classList = "container text-center  p-0"

        loginDiv.innerHTML = `           
            <form id="singInFormModal">
            <div class="col-sm-6 mx-auto mb-2 form-floating">
                
                <input type="username" class="form-control" id="usernameInputModal" placeholder="username">
                <label for="usernameInputModal" class="form-label">Username</label>
            </div>
            <div class="col-sm-6  mx-auto mb-2 form-floating">
                
                <input type="password" class="form-control" id="passwordInputModal" placeholder="password">
                <label for="passwordInput" class="form-label">Password</label>
            </div>
            <div id="loginModalAlertDiv" class="col-sm-6 mx-auto my-1" style="min-height:3rem">
                <div class="alert alert-danger" role="alert">
                    You must login first for this process !
                </div>
            </div>


            <div class="row-2 m-4">
                <div class="col d-flex justify-content-center p-2">

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="loginModalRememberMeCheckbox" checked />
                        <label class="form-check-label " for="checkbox"> Remember me </label>
                    </div>
                </div>

                <div class="col p-2">
                    <a href="#">Forgot password?</a>
                </div>
            </div>




            <div class="text-center">
                <button id="singInButton" type="submit" class="btn btn-primary mb-4">Sign in</button>
            </div>



            <div class="text-center">
                <p>Not a member? <a href="/register" data-navigo>Register</a></p>                
                <p><a href="/home" data-navigo>Home</a></p>                
            </div>    
            </form>   
            `;
        loginSection.appendChild(loginDiv)

        const loginModal = document.createElement("div")
        loginModal.classList = "modal fade";
        loginModal.id = "loginModal"
        loginModal.setAttribute("tabindex", "-1");
        loginModal.setAttribute("aria-labelledby", "loginModal");
        loginModal.setAttribute("aria-hidden", "true");
        loginModal.setAttribute("data-bs-backdrop", "static");
        loginModal.setAttribute("data-bs-keyboard", "false");
        loginModal.innerHTML = `
        <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-light ">
                        <h1 class="modal-title fs-5">Articles</h1>
                    </div>
                    <div class="modal-body p-0">
                        ${loginSection.outerHTML}
                    </div>                    
                </div>
            </div>
        `;
        return loginModal;




    }




}







