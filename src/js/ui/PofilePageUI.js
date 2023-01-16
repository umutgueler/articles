export class ProfilePageUI {

    constructor(userData) {
        this.userData = userData;
    }





    renderProfilePageUI() {
        const user = this.userData;


        const profilPageSection = document.createElement("section");
        profilPageSection.innerHTML = `
        <div class="container py-5">
        <section class="row">
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body text-center">
                        <img src=${user.profile_image}
                            alt="${user.username}" class="rounded-circle img-fluid" style="width: 150px; height:150px;">
                        <h5 class="my-3">${user.name}</h5>                        
                        <div class="d-flex justify-content-center mb-2">
                        <button id="editProfileButton" type="button" class="btn btn-dark m-1">Edit Profile</button>
                        <button id="imageUploadModalButton" type="button" class="btn btn-dark m-1" data-bs-toggle="modal" data-bs-target="#imageUploadModal">Image Update</button>
                        
                        </div>
                        <div class="d-flex justify-content-center mb-2">
                            <button id="changePasswordModalButton" type="button" class="btn btn-dark m-1" data-bs-toggle="modal" data-bs-target="#changePasswordModal">Change Password</button>
                                                
                        </div>
                        <div class="d-flex justify-content-center mb-2">
                            <button id="deleteUserButton" type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#deleteUserModal">Delete User</button>                    
                        </div>
                    </div>
                </div>
            </div>
            <section class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-body">
                        <form id="editUserProfileForm" class="needs-validation" novalidate>
                            <div class="row">
                                <div class="col-sm-3">
                                    <label for="name" class="form-label">Name *</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control user-form" name="name" id="name" minlength="4" value="${user.name}" disabled required>
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please enter a correct name (min 4 characters)!</div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <label for="username" class="form-label">Username *</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control user-form" name="username" id="username" minlength="4" value="${user.username}" disabled required>
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please enter a correct username (min 4 characters)!</div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <label for="email" class="form-label">Email *</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="email" class="form-control user-form" name="email" id="email" value="${user?.email}" pattern='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$' disabled required>
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please enter a correct email !</div>                                       
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <label for="title" class="form-label">Title</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control user-form" name="title" id="title" value="${user.title ? user.title : ""}" disabled>                               
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <label for="place" class="form-label ">Place</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control user-form" name="place" id="place" value="${user.place ? user.place : ""}" disabled>
                                </div>
                            </div>
                            <hr>
                            <div class="row">

                                <div class="col-sm-3">
                                    <label for="about" class="form-label ">About</label>
                                </div>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control user-form" name="about" id="about" value="${user.about ? user.about : ""}" disabled>
                                </div>
                            </div>
                            <div class="row">
                                <div id="editUserAlert" class="col-sm-9 mt-1" style="min-height:4rem">
                                    
                                </div>
                                <div class="col-sm-3 mt-3">
                                    <button id="editUserProfileUpdateButton" type="submit" class="btn btn-dark" style="display:none" >Update</button>
                                    <button id="editUserProfileCancelButton" type="button" class="btn btn-secondary" style="display:none">Cancel</button>    
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </section>
        
    </div>
    <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-light">
                    <h1 class="modal-title fs-5">Articles</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure that delete yourself?<br> But, we loved you ...
                    <div class="mb-3" id="deleteUserAlertDivModal" style="min-height: 4rem;">
        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" id="deleteUserButtonModal">Delete</button>
                </div>
                </div>
            </div>
        </div>    
        `;
        profilPageSection.appendChild(this.imageUploadModal())
        profilPageSection.appendChild(this.changePasswordModal())
        return profilPageSection
    }

    imageUploadModal() {
        const user = this.userData
        const imageUploadModal = document.createElement("div")
        imageUploadModal.classList = "modal fade";
        imageUploadModal.id = "imageUploadModal"
        imageUploadModal.setAttribute("tabindex", "-1");
        imageUploadModal.setAttribute("aria-labelledby", "imageUploadModal");
        imageUploadModal.setAttribute("aria-hidden", "true");
        
        imageUploadModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header bg-dark text-light">
                <h1 class="modal-title fs-5">Articles</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>            
            <form class="needs-validation" novalidate>
                <div class="modal-body">
                    <div class="text-center">
                        <img id="imageProfileModal" src="${user.profile_image}" alt="${user.username}" class="rounded-circle img-fluid" style="width: 150px; height:150px">
                        <h5 class="my-3">${user.name}</h5>
                    </div>
                    
                    <div>
                        <input id="imageInput" type="file" class="form-control" aria-label="file example" accept="image/png, image/gif, image/jpeg, image/jpg"  required>
                        <div class="text-center"><p class="text-muted">Allowed file types .jpg .jpeg .png .gif</p></div>
                        
                    </div>
                    <div id="imageModalAlert" class="fluid mx-auto mt-3" style="min-height:4rem">

                    </div>
                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button id="imageUploadButton" type="button" class="btn btn-primary" disabled>Image Upload</button>
                </div>
            </form>
            </div>
        </div>
        `;

        return imageUploadModal;
    }

    changePasswordModal() {
        const user = this.userData
        const changePasswordModal = document.createElement("div")
        changePasswordModal.classList = "modal fade";
        changePasswordModal.id = "changePasswordModal"
        changePasswordModal.setAttribute("tabindex", "-1");
        changePasswordModal.setAttribute("aria-labelledby", "changePasswordModal");
        changePasswordModal.setAttribute("aria-hidden", "true");

        changePasswordModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header bg-dark text-light">
                <h1 class="modal-title fs-5">Articles</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>            
            <form id="changePasswordForm" class="needs-validation" novalidate>
                <div class="modal-body">
                    <div class="text-center">                        
                        <h5 class="my-3">${user.name}</h5>
                        <h3 class="my-3">${user.username}</h3>
                    </div>
                    <div class="row p-2">
                        <div class="col-sm-3">
                            <label for="password" class="form-label">Password</label>
                        </div>
                        <div class="col-sm-9">
                            <input type="password" class="form-control" name="password" id="password" minlength="6" placeholder="Password" required>
                            
                        </div>
                    </div>
                    <div class="row p-2">
                        <div class="col-sm-3">
                            <label for="passwordControl" class="form-label">Password Again</label>
                        </div>
                        <div class="col-sm-9">
                            <input type="password" class="form-control" name="passwordControl" id="passwordControl" minlength="6" placeholder="Password Again" required>
                            
                        </div>
                    </div>                    
                    
                    <div id="changePasswordModalAlert" class="fluid mx-auto mt-3" style="min-height:4rem">

                    </div>
                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button id="changePasswordButton" type="button" class="btn btn-dark" disabled>Change Password</button>
                </div>
            </form>
            </div>
        </div>
        `;

        return changePasswordModal;
    }
}