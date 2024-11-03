import { GetElementAsync } from "../helpers/getElement/GetElementAsync";
import { UI } from "../ui/UI";
import { ErrorHandling } from "../helpers/error/ErrorHandling";
import { ArticleRequest } from "../request/ArticleRequest";




export class AddArticlePageEvents {

    constructor() {
        this.getElementAsync = new GetElementAsync();
        this.ui = new UI();
        this.errorHandling = new ErrorHandling();
        this.articleRequest = new ArticleRequest();

    }

    async getElements() {
        this.addArticleForm = await this.getElementAsync.getElementByIDAsync("addArticleForm");
        this.addArticleAlertDiv = await this.getElementAsync.getElementByIDAsync("addArticleAlertDiv");

        this.addArticleImageForm = document.getElementById("addArticleImageForm");
        this.imageInput = document.getElementById("imageInput");
        this.addArticleImageAlertDiv = document.getElementById("addArticleImageAlertDiv");
        this.articleImage = document.getElementById("articleImage");


        this.filesInput = document.getElementById("filesInput");
        this.filesNameDiv = document.getElementById("filesNameDiv");
    }

    async addArticlePageEvents() {
        await this.getElements();

        this.addArticleForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.addArticleFormValidate() && this.addArticleImageValidation()) {
                this.addNewArticle()
            }
        });

        this.imageInput.addEventListener("change", () => {
            this.addArticleImageValidation();
        });

        this.filesInput.addEventListener("change", () => {
            this.fileUploadControl();
        })
    }

    async addNewArticle() {
        try {
            const articleData = new Object();
            const imageFile = this.imageInput?.files;

            if (imageFile && imageFile.length > 0) {
                
                articleData.image = imageFile;
            }
            const files = this.filesInput?.files;
            if (files && files.length > 0) {
                articleData.files = files;
                const filenames = [];
                const filesNamesInputs = document.querySelectorAll(".filesname-input");
                Array.from(filesNamesInputs).forEach((fileNameInput) => {
                    filenames.push(fileNameInput.value)
                });
                filenames.every((e,index,arr) => {
                    if (arr.indexOf(e)!=index) {
                        throw "Filenames Duplicate Error"
                    }
                });

                
                articleData.filenames = filenames

            }

            const forms = Array.from(this.addArticleForm);
            const data = new Object();
            forms.forEach((form) => {

                if (form.classList.contains("form-input") && form.value) {
                    data[form.name] = form.value.trim();
                }

            });
            const category = document.querySelector('.form-check-input:checked').value;
            articleData.data = data
            articleData.data.category = category


            const spinner = this.ui.loadingSpinner(2, 2, 0);
            const alertDiv = this.ui.alertDiv("primary", `Loading ....`);
            alertDiv.appendChild(spinner);

            this.ui.addChildElement(this.addArticleAlertDiv, alertDiv);

            const result = await this.articleRequest.addNewArticle(articleData);
            if (!result.success) {
                if (result.message === "Duplicate Key Found") {
                    this.errorHandling.duplicateErorHandling(this.addArticleForm, result.data[0])
                }
                throw result.message
            }

            const successDiv = this.ui.alertDiv("success", "Add article is successful");
            this.ui.addChildElement(this.addArticleAlertDiv, successDiv);
            setTimeout(() => {
                window.location.replace("/article?page=1&population=comment")
            }, 2600);


        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err)
            this.ui.addChildElement(this.addArticleAlertDiv, alertDiv)
        }
    }

    fileUploadControl() {


        this.filesNameDiv.innerHTML = ""
        const files = this.filesInput.files;

        if (files) {
            Array.from(files).forEach(e => {
                const fileNameDiv = document.createElement("div");

                const filename = e.name.substr(0, e.name.lastIndexOf('.'));
                fileNameDiv.classList = "form-floating mb-3";
                fileNameDiv.innerHTML = `
                        <div class="form-floating mb-3">
    
                            <input class="form-control filesname-input" type="text"  value="${filename}" pattern='[a-zA-Z0-9-]+'  required/>
    
                            <label>For ${e.name} file name</label>
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">A file name is required. (Only numbers letter and "-")</div>
                        </div>
                        `;
                this.filesNameDiv.appendChild(fileNameDiv);

            });

        }




    }

    addArticleFormValidate() {
        let validate = true;
        'use strict'
        Array.from(this.addArticleForm).forEach(form => {
            if (!form.checkValidity()) {
                this.addArticleForm.classList.add('was-validated');
                validate = false;
                const alertDiv = this.ui.alertDiv("danger", "Please enter all inputs correctly ! * required");
                this.ui.addChildElement(this.addArticleAlertDiv, alertDiv, 3000);
            }
        });

        return validate;
    }


    addArticleImageValidation() {



        const imageFile = this.imageInput?.files;

        if (imageFile.length < 1) {
            this.addArticleImageAlertDiv.innerHTML = ""
            this.articleImage.src = "http://res.cloudinary.com/dvdf3jgf9/image/upload/v1672581138/articles/ArticleImages/default_article_xvj1cx.png";
            this.imageInput.classList = "form-control form-control-sm form-input"
            return true;
        };

        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;


        try {
            if (!allowedExtensions.exec(this.imageInput.value)) {
                throw "Please upload in the allowed file type!"
            }

            this.addArticleImageAlertDiv.innerHTML = "";

            if (this.imageInput.classList.contains("is-invalid")) {
                this.imageInput.classList.remove("is-invalid")
            }
            if (!this.imageInput.classList.contains("is-valid")) {
                this.imageInput.classList.add("is-valid")
            }
            if (imageFile && imageFile[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.articleImage.setAttribute("src", e.target.result)

                };

                reader.readAsDataURL(this.imageInput.files[0]);
            }
            return true;

        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.addArticleImageAlertDiv, alertDiv);
            if (!this.imageInput.classList.contains("is-invalid")) {
                this.imageInput.classList.add("is-invalid")
            }
            if (this.imageInput.classList.contains("is-valid")) {
                this.imageInput.classList.remove("is-valid");

            }
            return false;


        }


    }





}