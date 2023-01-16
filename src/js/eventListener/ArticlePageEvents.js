import { GetElementAsync } from "../helpers/getElement/GetElementAsync";
import { UI } from "../ui/UI";
import { ErrorHandling } from "../helpers/error/ErrorHandling";
import { ArticleRequest } from "../request/ArticleRequest";
import router from "./EventListener";
import { ArticlePageUI } from "../ui/ArticlePageUI";

import { Storage } from "../storage/Storage";
import { CommentRequest } from "../request/CommentRequest";
import { Collapse } from "bootstrap";
export class ArticlePageEvents {

    constructor() {

        this.getElementAsync = new GetElementAsync();
        this.ui = new UI();
        this.errorHandling = new ErrorHandling();
        this.articleRequest = new ArticleRequest();
        this.router = router
        this.articlePageUI = new ArticlePageUI();
        this.commentRequest = new CommentRequest();
        this.storage = new Storage();


    }

    async getElement() {
        this.articlesDiv = await this.getElementAsync.getElementByIDAsync("articlesDiv");
        this.articlesPaginationDiv = await this.getElementAsync.getElementByIDAsync("articlesPaginationDiv");

        this.editArticleButton = document.getElementById("editArticleButton");
        this.editArticleForm = document.getElementById("editArticleForm");
        this.editArticleImageAlertDivModal = document.getElementById("editArticleImageAlertDivModal")
        this.editArticleAlertDivModal = document.getElementById("editArticleAlertDivModal");

        this.articleImageModal = document.getElementById("articleImageModal");
        this.imageInputModal = document.getElementById("imageInputModal")
        this.nameInputModal = document.getElementById("nameInputModal");
        this.titleInputModal = document.getElementById("titleInputModal");
        this.contentTextAreaModal = document.getElementById("contentTextAreaModal");
        this.categoryRadiosModal = document.querySelectorAll('.modalRadios[name="category"]');
        this.deleteArticleButtonModal = document.getElementById("deleteArticleButtonModal");
        this.deleteArticleAlertDivModal = document.getElementById("deleteArticleAlertDivModal");
        this.filesNameDivModal = document.getElementById("filesNameDivModal")
        this.filesInputModal = document.getElementById("filesInputModal")

        this.searchContentRadio = document.getElementById("searchContentRadio");
        this.searchTitleRadio = document.getElementById("searchTitleRadio");
        this.categoryRadios = document.querySelectorAll("input[name='category']");
        this.filterArticlesButton = document.getElementById("filterArticlesButton");
        this.searchInput = document.getElementById("searchInput");
        this.myArticlesCheckBox = document.getElementById("myArticlesCheckBox");
        this.myLikesCheckBox = document.getElementById("myLikesCheckBox");

        this.offcanvasCollapse = document.getElementById("offcanvas")
        
    };


    async articlePageEvents() {

        await this.getElement();



        this.router.off("/article")
        this.router.off("/article/:articleId")
        this.router
            .on("/article", ({ params }) => {

                this.renderArticlesDiv(params)
            })
            .on("/article/:articleId", ({ data }) => {

                this.renderSingleArticleDiv(data);
            })
            .resolve();



        this.articlesDiv.addEventListener("click", (e) => {
            this.readMore(e);
            this.addComment(e);
            this.editArticleModalToggle(e);
            this.deleteArticleModalToggle(e);
            this.deleteComment(e);
            this.LikeUnlikeArticle(e);
            this.fileDownload(e);
            this.deleteFile(e);
        });



        this.editArticleForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.editArticleFormValidate() && this.editArticleImageValidation()) {
                this.editArticle();
            }

        });
        this.filterArticlesButton.addEventListener("click", () => {
            this.filterArticle();
            
        })




        this.imageInputModal.addEventListener("change", () => {
            console.log("denemeimageınputmodal")
            this.editArticleImageValidation();
        });

        this.deleteArticleButtonModal.addEventListener("click", () => {
            this.deleteArticle()
        })

        this.filesInputModal.addEventListener("change", () => {
            this.fileUploadControl();
        })



    };
    
    fileUploadControl() {


        this.filesNameDivModal.innerHTML = ""
        const files = this.filesInputModal.files;

        if (files) {
            Array.from(files).forEach(e => {
                const fileNameDiv = document.createElement("div");

                const filename = e.name.substr(0, e.name.lastIndexOf('.'));
                fileNameDiv.classList = "form-floating mb-3";
                fileNameDiv.innerHTML = `
                        <div class="form-floating mb-3">
    
                            <input class="form-control filesname-input-modal" type="text"  value="${filename}" pattern='[a-zA-Z0-9-]+'  required/>
    
                            <label>For ${e.name} file name</label>
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">A file name is required. (Only numbers letter and "-")</div>
                        </div>
                        `;
                this.filesNameDivModal.appendChild(fileNameDiv);

            });

        }




    }
    async deleteFile(e) {
        if (!e.target.classList.contains("deleteFileButton")) return;
        const filesDeleteAlertDiv = document.createElement("div");

        const articleId = e.target.getAttribute("articleid");
        const filename = e.target.getAttribute("name");
        e.target.parentElement.parentNode.insertBefore(filesDeleteAlertDiv, e.target.parentElement.nextSibling);
        try {
            const loadingDiv = this.ui.loadingSpinner(2, 2, 1);
            this.ui.addChildElement(filesDeleteAlertDiv, loadingDiv)

            const result = await this.articleRequest.deleteFile(articleId, filename);

            if (!result.success) {
                throw result.message
            };

            const successDiv = this.ui.alertDiv("success", "Delete file operation is successful");
            this.ui.addChildElement(filesDeleteAlertDiv, successDiv);

            setTimeout(() => {
                e.target.parentElement.remove();
                filesDeleteAlertDiv.remove()
            }, 2600)

        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(filesDeleteAlertDiv, alertDiv, 6000);
            setTimeout(() => {
                filesDeleteAlertDiv.remove()
            }, 6600)
        }
    }
    async fileDownload(e) {
        if (!e.target.classList.contains("fileDownloadLink")) return;

        const filesDownloadAlertDiv = document.createElement("div");

        const articleId = e.target.getAttribute("articleid");
        const filename = e.target.getAttribute("name");
        e.target.parentElement.parentNode.insertBefore(filesDownloadAlertDiv, e.target.parentElement.nextSibling);
        try {
            const loadingDiv = this.ui.loadingSpinner(2, 2, 1);
            this.ui.addChildElement(filesDownloadAlertDiv, loadingDiv)
            const result = await this.articleRequest.downloadFile(articleId, filename);

            if (result?.status != 200 && result?.message) {

                throw result?.message
            };

            filesDownloadAlertDiv.remove()

        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(filesDownloadAlertDiv, alertDiv, 6000);
            setTimeout(() => {
                filesDownloadAlertDiv.remove()
            }, 6600)

        }
    }

    async LikeUnlikeArticle(e) {

        if (!e.target.classList.contains("likeArticle")) return;
        const likeAlertDiv = e.target.nextElementSibling;
        const likesCountDiv = e.target.previousElementSibling.firstElementChild;
        try {

            const articleId = e.target.parentElement.parentElement.parentElement.id;
            e.target.setAttribute("disabled", "");
            const spinner = this.ui.loadingSpinner(1, 1, 0);
            this.ui.addChildElement(likeAlertDiv, spinner);

            const result = await this.articleRequest.likeUnlikeArticle(articleId);

            if (!result?.success) {
                throw result?.message
            }

            if (e.target.classList.contains("active")) {
                e.target.classList.remove("active");
                likesCountDiv.innerHTML = String(Number(likesCountDiv.innerHTML) - 1)
            }
            else {
                e.target.classList.add("active");
                likesCountDiv.innerHTML = String(Number(likesCountDiv.innerHTML) + 1)
            }
            e.target.removeAttribute("disabled");
            spinner.remove();
        }
        catch (err) {

            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(likeAlertDiv, alertDiv);
            e.target.removeAttribute("disabled");


        }





    }

    async filterArticle() {
        const params = {};
        params.category = "";
        if (this.searchTitleRadio.checked) {
            params.searchTitle = this.searchInput.value;
        }
        if (this.searchContentRadio.checked) {
            params.searchContent = this.searchInput.value;
        }
        if (this.myArticlesCheckBox.checked) {
            params.myarticles = true;
        }
        if (this.myLikesCheckBox.checked) {

            params.mylikes = true;
        }
        Array.from(this.categoryRadios).forEach(categoryRadio => {
            if (categoryRadio.checked) {
                params.category += String(categoryRadio.value) + "+";
            }
        });
        params.sortBy = document.querySelector("input[name='sortby']:checked").value;
        params.population = "comment";
        let queryString = "";
        Object.keys(params).forEach(key => {
            if (key != "page") {
                queryString += `&${key}=${params[key]}`;
            }

        });
        queryString = "/article?page=1" + queryString;



        this.router.navigate(queryString)


    }

    async deleteComment(e) {
        if (!e.target.classList.contains("deleteCommentButton")) return
        const commentsDiv = e.target.parentElement.parentElement.parentElement;

        const commentDiv = e.target.parentElement.parentElement;
        const commentId = e.target.parentElement.parentElement.id;
        const articleId = (e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id);
        const commentAlertDiv = e.target.parentElement.nextElementSibling

        const spinner = this.ui.loadingSpinner(2, 2, 0);
        const loadingDiv = this.ui.alertDiv("primary", `Loading ....`);
        loadingDiv.appendChild(spinner);
        this.ui.addChildElement(commentAlertDiv, loadingDiv);

        try {
            const result = await this.commentRequest.deleteComment(articleId, commentId);

            if (!result?.success) {
                throw result.message
            }

            const successDiv = this.ui.alertDiv("success", "Delete comment is successful");
            this.ui.addChildElement(commentAlertDiv, successDiv);

            setTimeout(() => {
                commentDiv.remove();
                if (!commentsDiv.firstElementChild) {
                    commentsDiv.innerHTML = "Enter a first comment ..."
                }
            }, 2600)


        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(commentAlertDiv, alertDiv)
        }

    }

    async deleteArticle() {

        try {
            const articleId = this.deleteArticleId;
            if (!articleId) {
                throw "There is an error, please try again";
            }
            const spinner = this.ui.loadingSpinner(2, 2, 0);
            const loadingDiv = this.ui.alertDiv("primary", `Loading ....`);
            loadingDiv.appendChild(spinner);
            this.ui.addChildElement(this.deleteArticleAlertDivModal, loadingDiv);

            const result = await this.articleRequest.deleteArticle(articleId);

            if (result && !result.success) {
                throw result.message
            };

            const successDiv = this.ui.alertDiv("success", "Delete article is successful");
            this.ui.addChildElement(this.deleteArticleAlertDivModal, successDiv);
            setTimeout(() => {
                location.reload();
            }, 2600)


        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.deleteArticleAlertDivModal, alertDiv)
        }


    }
    deleteArticleModalToggle(e) {
        if (!e.target.classList.contains("deleteArticleButton")) return

        this.deleteArticleId = e.target.parentElement.parentElement.parentElement.id


    }

    async editArticle() {
        try {
            const articleId = this.editArticleId;
            const articleData = new Object();
            const imageFile = this.imageInputModal?.files;

            if (imageFile && imageFile.length > 0) {

                articleData.image = imageFile;
            }

            const files = this.filesInputModal?.files;
            console.log(files)
            if (files && files.length > 0) {
                articleData.files = files;
                const filenames = [];
                const filesNamesInputs = document.querySelectorAll(".filesname-input-modal");
                Array.from(filesNamesInputs).forEach((fileNameInput) => {
                    filenames.push(fileNameInput.value)
                });
                console.log(filenames)
                filenames.every((e, index, arr) => {
                    if (arr.indexOf(e) != index) {
                        throw "Filenames Duplicate Error"
                    }
                });


                articleData.filenames = filenames

            }

            const forms = Array.from(this.editArticleForm);
            const data = new Object();
            forms.forEach((form) => {

                if (form.classList.contains("form-input") && form.value) {
                    data[form.name] = form.value.trim();
                }

            });
            const category = document.querySelector('.form-check-input.modalRadios:checked').value;


            articleData.data = data;
            articleData.data.category = category;

            const spinner = this.ui.loadingSpinner(2, 2, 0);
            const alertDiv = this.ui.alertDiv("primary", `Loading ....`);
            alertDiv.appendChild(spinner);

            this.ui.addChildElement(this.editArticleAlertDivModal, alertDiv);
            console.log(articleData)
            const result = await this.articleRequest.editArticle(articleData, articleId);

            if (!result.success) {
                if (result.message === "Duplicate Key Found") {
                    this.errorHandling.duplicateErorHandling(this.editArticleForm, result.data[0]);
                    throw result.message
                }



            }

            const successDiv = this.ui.alertDiv("success", "Edit article is successful");
            this.ui.addChildElement(this.editArticleAlertDivModal, successDiv);
            setTimeout(() => {
                location.reload();
            }, 2600)


        }
        catch (err) {
            console.log(err)
            const alertDiv = this.ui.alertDiv("danger", err)
            this.ui.addChildElement(this.editArticleAlertDivModal, alertDiv)
        }
    }
    editArticleModalToggle(e) {

        const article = {}
        if (e.target.classList.contains("editArticleButton")) {
            console.log("first")
            article.image = e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.src;
            article._id = e.target.parentElement.parentElement.parentElement.id;
            article.name = e.target.parentElement.parentElement.parentElement.getAttribute("name");
            article.category = e.target.parentElement.parentElement.firstElementChild.innerHTML;
            article.title = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
            article.content = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
                .replace('<span class="card-text" style="display:none">', "")
                .replace('</span><button class="btn btn-link btn-sm text-wrap text-muted readMoreButtons">Read more →</button>', "")
                .replace('<span class="card-text" style="display: inline;">', "")
                .replace('</span><button class="btn btn-link btn-sm text-wrap text-muted readMoreButtons">Close</button>', "");

        }

        this.editArticleImageDefaulft = article.image;
        this.editArticleId = article._id;
        this.articleImageModal.src = article.image;
        this.nameInputModal.value = article.name;
        this.titleInputModal.value = article.title;
        this.contentTextAreaModal.value = article.content;


        Array.from(this.categoryRadiosModal).forEach(form => {
            form.classList = "form-check-input modalRadios"
            form.removeAttribute("checked");
            if (form.value === article.category) {
                form.setAttribute("checked", "");

            }
        })
    }
    editArticleFormValidate() {
        let validate = true;
        'use strict'
        Array.from(this.editArticleForm).forEach(form => {
            if (!form.checkValidity()) {
                this.editArticleForm.classList.add('was-validated');
                validate = false;
                const alertDiv = this.ui.alertDiv("danger", "Please enter all inputs correctly ! * required");
                this.ui.addChildElement(this.editArticleAlertDivModal, alertDiv, 3000);
            }
        });

        return validate;
    }

    editArticleImageValidation() {



        const imageFile = this.imageInputModal?.files;

        if (imageFile.length < 1) {
            this.editArticleImageAlertDivModal.innerHTML = ""
            this.articleImageModal.src = this.editArticleImageDefaulft;
            this.imageInputModal.classList = "form-control form-control-sm form-input"
            return true;
        };

        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;


        try {
            if (!allowedExtensions.exec(this.imageInputModal.value)) {
                throw "Please upload in the allowed file type!"
            }

            this.editArticleImageAlertDivModal.innerHTML = "";

            if (this.imageInputModal.classList.contains("is-invalid")) {
                this.imageInputModal.classList.remove("is-invalid")
            }
            if (!this.imageInputModal.classList.contains("is-valid")) {
                this.imageInputModal.classList.add("is-valid")
            }
            if (imageFile && imageFile[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.articleImageModal.setAttribute("src", e.target.result)

                };

                reader.readAsDataURL(this.imageInputModal.files[0]);
            }
            return true;

        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(this.editArticleImageAlertDivModal, alertDiv);
            if (!this.imageInputModal.classList.contains("is-invalid")) {
                this.imageInputModal.classList.add("is-invalid")
            }
            if (this.imageInputModal.classList.contains("is-valid")) {
                this.imageInputModal.classList.remove("is-valid");

            }
            return false;


        }


    }





    async addComment(e) {
        if (!e.target.classList.contains("addCommentButton")) return
        const articlePageAlertDiv = e.target.parentElement.previousElementSibling;
        const commentTextarea = e.target.parentElement.previousElementSibling.previousElementSibling;

        const commentsDiv = e.target.parentElement.parentElement.nextElementSibling.firstElementChild;
        const articleId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        try {
            const userData = this.storage.getUserDataStorage()?.userdata;
            if (!userData) {
                throw "You must login first for this process !";

            }
            if (commentTextarea.value.trim() < 10) {
                throw "Please provide a content (minlenght 10)"
            }

            const data = {
                content: String(commentTextarea.value).trim()
            }

            const spinner = this.ui.loadingSpinner(4, 2, 2)
            this.ui.addChildElement(articlePageAlertDiv, spinner);

            const result = await this.commentRequest.addNewComment(articleId, data);
            if (!result.success) {
                throw result.message
            }


            const commentDiv = document.createElement("div")
            commentDiv.classList = "mb-4";
            commentDiv.id = result?.data?._id;
            commentDiv.innerHTML = `
                <div class = "d-flex mb-3">
                    <div class="flex-shrink-0 style=" width:50px;height:50px;"="">
                        <img class="rounded-circle" style="width:50px;height:50px" src="${userData?.profile_image}" alt="${userData?.username}">
                    </div>
                    <div class="ms-3">
                        <div class="fw-bold">${userData?.username}</div>
                        ${result?.data?.content}
                    </div>
                </div>
                <div>
                    <button type="button" class="btn btn-sm btn-secondary editCommentButton">Edit</button>
                    <button type="button" class="btn btn-sm btn-danger deleteCommentButton">Delete</button>
                </div>
                <div>
                    
                </div> 
            `;

            if (commentsDiv.innerHTML === "Enter a first comment ...") {
                commentsDiv.innerHTML = "";
            }
            commentsDiv.prepend(commentDiv);
            commentTextarea.value = "";
            const successDiv = this.ui.alertDiv("success", "Add comment is successful");
            this.ui.addChildElement(articlePageAlertDiv, successDiv, 3600)


        }
        catch (err) {
            console.log(err)
            const alert = this.ui.alertDiv("danger", err);
            this.ui.addChildElement(articlePageAlertDiv, alert)
        }


    }



    async renderSingleArticleDiv(data) {
        const userData = this.storage.getUserDataStorage()?.userdata
        const articleId = data.articleId;
        try {
            const spinner = this.ui.loadingSpinner(6, 6, 4);
            this.ui.clearElementInnerHTML(this.articlesDiv);
            this.ui.clearElementInnerHTML(this.articlesPaginationDiv);
            this.articlesDiv.appendChild(spinner)
            const result = await this.articleRequest.getSingleArticle(articleId);


            if (!result.success) {
                throw result.message
            }
            const article = result.data

            this.ui.clearElementInnerHTML(this.articlesDiv);
            await this.articlesDiv.appendChild(this.articlePageUI.singleArticleDiv(article, userData));

            this.router.updatePageLinks();
        }
        catch (err) {
            const alertDiv = this.ui.alertDiv("danger", err);
            this.ui.renderPage(alertDiv, this.articlesDiv)
        }
    }

    async renderArticlesDiv(params) {
        const userData = this.storage.getUserDataStorage()?.userdata;

        const spinner = this.ui.loadingSpinner(6, 6, 4);
        this.ui.clearElementInnerHTML(this.articlesDiv);
        this.ui.clearElementInnerHTML(this.articlesPaginationDiv);
        this.articlesDiv.appendChild(spinner);

        const articles = await this.articleRequest.getArticles(params);
        console.log(articles)
        this.ui.clearElementInnerHTML(this.articlesDiv);

        await this.articlesDiv.appendChild(this.articlePageUI.articlesDiv(articles, userData));

        await this.articlesPaginationDiv.appendChild(this.articlePageUI.articlePagination(articles.pagination, params));

        this.router.updatePageLinks();
    };

    readMore(e) {
        if (e.target.classList.contains("readMoreButtons")) {

            if (e.target.previousElementSibling.style.display === "none") {
                e.target.innerHTML = "Close"
                e.target.previousElementSibling.style.display = "inline"
            }
            else {
                e.target.innerHTML = "Read more →"
                e.target.previousElementSibling.style.display = "none";
            }


        }
    }






}