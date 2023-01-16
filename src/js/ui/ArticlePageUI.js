import { Storage } from "../storage/Storage";







export class ArticlePageUI {



    constructor() {
        this.storage = new Storage()

    }



    renderArticlePageUI() {

        const articlePageDiv = document.createElement("div");
        articlePageDiv.className = "container-fluid";

        articlePageDiv.innerHTML = `
        <div class="row">
            ${this.renderArticleOffcanvas().outerHTML}
            <div class="col-lg-9 pt-5 border-start">
                
                <header class="py-5 bg-light border-bottom mb-4">
                    <div class="container">
                        <div class="text-center my-5">
                            <h1 class="fw-bolder">Welcome to Blog Home!</h1>
                            <p class="lead mb-0">A Bootstrap 5 starter layout for your next blog homepage</p>
                        </div>
                    </div>
                </header>
                <div id="articlesDiv">
                                      
                </div>
                <div id="articlesPaginationDiv">
                    
                </div>
                
                
            </div>
        </div>
        <div class="modal fade" id="editArticleModal" tabindex="-1" aria-labelledby="editAricleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl ">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-light">
                        <h1 class="modal-title fs-5">Articles</h1>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div> 
                    <form id="editArticleForm" class="needs-validation" novalidate="">
                        <div class="modal-body">
                            <div class="container px-2">
                                <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                                    <div class="text-center mb-5">
        
                                        <h1 class="fw-bolder">Edit Article</h1>
        
                                    </div>
        
                                    <div class="text-center mb-5">
                                        <img class="img-thumbnail w-75" style="max-height: 30rem;" id="articleImageModal"
                                            src="http://res.cloudinary.com/dvdf3jgf9/image/upload/v1672581138/articles/ArticleImages/default_article_xvj1cx.png"
                                            alt="">
                                    </div>
                                    <div class="row gx-5 justify-content-center">
                                        <div class="col">
                                            <div class="mb-3">
        
                                                
                                                    <div class="mb-3" id="editArticleImageAlertDivModal"
                                                        style="min-height: 2rem;">
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <label for="image">Article İmage</label>
                                                        </div>
                                                        <div class="col-lg-10">
                                                            <input class="form-control form-control-sm " id="imageInputModal"
                                                                name="image" type="file" placeholder="Article İmage"
                                                                accept="image/png, image/gif, image/jpeg, image/jpg">
        
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please upload from allowed file types
                                                                (.png .gif .jpeg .jpg)</div>
                                                        </div>
                                                    </div>
                                                
                                            </div>
        
        
        
                                            <div class="form-floating mb-3">
        
                                                <input class="form-control form-input" id="nameInputModal" name="name"
                                                    type="text" placeholder="Article Name" required="" minlength="6" maxlength="100">
        
                                                <div class="valid-feedback">Looks good!</div>
                                                <div class="invalid-feedback">A name is required. (min minlength 6 )</div>
                                                <label for="name">Article Name*</label>
                                            </div>
                                            <div class="form-floating mb-3">
        
                                                <input class="form-control form-input" id="titleInputModal" name="title" maxlength="100"
                                                    type="text" placeholder="Article Title" required="">
        
        
                                                <div class="valid-feedback">Looks good!</div>
                                                <div class="invalid-feedback">A title is required. (min minlength 10)</div>
                                                <label for="title">Article Title*</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                            <div>Category*</div>
                                                <br>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input modalRadios" type="radio" name="category" id="scienceRadioModal" value="Science">
                                                    <label class="form-check-label" for="scienceRadioModal">
                                                    Science
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input modalRadios" type="radio" name="category" id="historyRadioModal" value="History">
                                                    <label class="form-check-label" for="historyRadioModal">
                                                    History
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input modalRadios" type="radio" name="category" id="technologyRadioModal" value="Technology">
                                                    <label class="form-check-label" for="technologyRadioModal">
                                                    Technology
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input modalRadios" type="radio" name="category" id="literatureRadioModal" value="Literature">
                                                    <label class="form-check-label" for="literatureRadioModal">
                                                    Literature
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input modalRadios" type="radio" name="category" id="psychologyRadioModal" value="Psychology">
                                                    <label class="form-check-label" for="psychologyRadioModal">
                                                    Psychology
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input modalRadios" type="radio" name="category" id="philosophyRadioModal" value="Philosophy">
                                                    <label class="form-check-label" for="philosophyRadioModal">
                                                    Philosophy
                                                    </label>
                                                </div>
                                            </div>
        
                                            <div class="form-floating mb-3 ">
        
                                                <textarea class="form-control form-input" style="resize:none;min-height:30rem"
                                                    id="contentTextAreaModal" name="content" type="text"
                                                    placeholder="Enter content here..." required="" minlength="12"></textarea>
        
        
                                                <div class="valid-feedback">Looks good!</div>
                                                <div class="invalid-feedback">A content is required. (min length 12)</div>
                                                <label for="content">Article Content*</label>
                                            </div>
                                            <div class="form mb-3">
                                                <div class="row mb-3">
                                                    <div class="col-lg-2">
                                                        <label for="files">Article Source Files</label>
                                                    </div>
                                                    <div class="col-lg-10">
                                                        <input class="form-control form-control-sm" id="filesInputModal" name="files"
                                                            type="file" multiple />
                            
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please upload from allowed file types</div>
                                                    </div>
                                                    <div class="mb-1" id="filesNameDivModal" style="min-height: 4rem;">
                            
                                                    </div>
                                                </div>
                                                
                                                
        
                                            </div>
                                            <div class="mb-3" id="editArticleAlertDivModal" style="min-height: 4rem;">
        
                                            </div>
        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button class="btn btn-primary" id="editArticleButton" type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="deleteArticleModal" tabindex="-1" aria-labelledby="deleteArticleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-light">
                    <h1 class="modal-title fs-5">Articles</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure that detele the article?
                    <div class="mb-3" id="deleteArticleAlertDivModal" style="min-height: 4rem;">
        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" id="deleteArticleButtonModal">Delete Article</button>
                </div>
                </div>
            </div>
        </div>                
        `;

        return articlePageDiv;

    }


    articlesDiv(articles, userData) {

        const dateOptions = {
            dateStyle: "long",

        }
        const timeOptions = {

            timeStyle: "medium",
            hour12: false
        }
        const articlesDiv = document.createElement("div");

        articles.data.forEach(article => {
            const articleUser = article?.user;

            const articleComments = this.commentsDiv(article?.comments, 3, userData);

            const articleDiv = document.createElement("div");
            console.log(article)
            articleDiv.classList = "card mb-4";
            articleDiv.id = article?._id
            articleDiv.setAttribute("name", article?.name)
            articleDiv.innerHTML = `
                
            <a href="/article/${article._id}" data-navigo><img  class="card-img-top" src="${article?.images}" alt="..." /></a>
            <div class="card-body">
            <div class="badge bg-primary bg-gradient rounded-pill mb-2">${article?.category}</div>
                <div class="row">
                    <div class="col">
                        <div class="small text-muted">Last Update: <br>${new Date(article?.lastUpdate).toLocaleString("en-US",
                dateOptions)}<br>${new Date(article?.lastUpdate).toLocaleString("en-US", timeOptions)}</div>
                    </div>
                    <div class="col">
                        <div class="d-flex flex-row-reverse align-items-end">
                            <div class="d-flex align-items-center">
                                <div class="small p-2">
                                    <div class="fw-bold">${articleUser?.username}</div>
                                </div>
                                <img style="width:3rem" class="rounded-circle img-thumbnail me-3"
                                    src="${articleUser?.profile_image}"
                                    alt="${articleUser?.username}">
        
        
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
        
                <h2 class="card-title">${article?.title}</h2>
                <p class="card-text">${article?.content?.length < 3000 ? article?.content : article?.content.substr(0, 3000) + '<span class="card-text" style="display:none">' + article?.content.substr(3000) + '</span><button class="btn btn-link btn-sm text-wrap text-muted readMoreButtons" >Read more →</button>'}</p>
                <a href="/article/${article?._id}" class="btn btn-dark btn-sm" data-navigo>Go the Article →</a>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-success" disabled>Likes Count <span>${article?.likesCount}</span></button>
                    <button style="display:${userData ? "inline-flex" : "none"}"" class="btn btn-outline-success btn-sm likeArticle ${article?.likes.includes(userData?._id) ? "active" : ""}" role="button"><svg  style="pointer-events:none;"xmlns="http://www.w3.org/2000/svg" width="1.2rem" fill="currentColor" viewBox="0 0 512 512"><path  style="pointer-events:none;" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg></button>
                    <div class="likeAlertDiv" style="display:inline-block"></div>
                </div>
                
                <div class="mt-2" style="display:${userData?._id === articleUser?._id ? "block" : "none"}">
                    <button class="btn btn-dark btn-sm editArticleButton" data-bs-toggle="modal" data-bs-target="#editArticleModal">Edit Article</button>
                    <button class="btn btn-danger btn-sm deleteArticleButton" data-bs-toggle="modal" data-bs-target="#deleteArticleModal">Delete Article</button>
                    

                
                </div>
                
                <div class = "mt-2" style="display:${article?.files.length > 0 ? "block" : "none"}">
                    <div>
                        <button  class="btn btn-sm btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Source
                        </button>
                        
                        <div class="collapse" id="collapseExample">
                            <div class="card card-body">
                                ${article?.files.length > 0 ? this.sourceDiv(article, userData) : ""}  
                            </div>
                        </div>
                    </div>               
                        
                    
                </div>
                
            </div>
            <div class="card-footer px-0 pb-0 bg-transparent border-top-0">
                <div class="card bg-light">
                    <div class="card-body">
                        
                        <form class="mb-4"><textarea class="form-control" style="resize:none;height:5rem"
                                placeholder="Join the discussion and leave a comment!"></textarea>
                                <div class="mt-2 mx-auto w-100 alertDivv" style="min-height:3rem">
                                    
                                </div>
                            <div class="d-flex flex-row-reverse mt-3">
                                
                                <button class="btn btn-info btn-sm text-white h-25 addCommentButton" type="button">Add Comment</button>
                                
                            </div>
                        </form>
                                
                        
                        <div id="comments" class="mt-5">
                            ${articleComments}
                        </div>
                        
                    </div>
                                        
                </div>
            </div>
                
        `;
            articlesDiv.appendChild(articleDiv)
        });

        return articlesDiv;


    };

    sourceDiv(article, userData) {
        if (article.files < 1) return ""
        let listGroup = "";
        article?.files.forEach(file => {
            const fileListItem = `                        
            <li class="list-group-item d-flex mt-2">
                <button type="button" class="btn btn-link me-auto fileDownloadLink" articleId = "${article?._id}" name="${file}">${file.split("-")[1]}</button>
                <button style="display:${article?.user?._id === userData?._id ? "inline-block" : "none"}" type="button" class="btn btn-sm btn-danger deleteFileButton" articleId = "${article?._id}" name="${file}">Delete File</button>
            </li>`;
            listGroup += fileListItem;

        });
        const listGroupUl = `<ul class="list-group">${listGroup}</ul>`
        console.log(listGroupUl)
        return listGroupUl;
    }

    articlePagination(pagination, params) {
        const page = Number(params.page)
        let queryString = "";
        Object.keys(params).forEach(key => {
            if (key != "page") {
                queryString += `&${key}=${params[key]}`;
            }

        });

        if (!pagination) {
            return null
        }
        const lastPage = pagination.lastPage;
        const paginationDropDown = document.createElement("ul");
        paginationDropDown.classList = "dropdown-menu";
        const dropDownItemFirstPage = document.createElement("li");
        dropDownItemFirstPage.innerHTML = `
            <a class="dropdown-item" href="/article?page=1${queryString}" data-navigo>First Page</a>
            `;
        paginationDropDown.appendChild(dropDownItemFirstPage);
        const dropDownFirstPage = page - 5 < 2 ? 2 : page - 5;
        const dropDownLastPage = page + 5 < lastPage ? page + 5 : lastPage;

        for (let i = dropDownFirstPage; dropDownLastPage > i; i++) {
            const dropDownItem = document.createElement("li");
            dropDownItem.innerHTML = `
            <a class="dropdown-item" href="/article?page=${+i}${queryString}" data-navigo>${i}</a>
            `;
            paginationDropDown.appendChild(dropDownItem);

        };
        const dropDownItemLastPage = document.createElement("li");
        dropDownItemLastPage.innerHTML = `
            <a class="dropdown-item" href="/article?page=${lastPage}${queryString}" data-navigo>Last Page</a>
            `;
        paginationDropDown.appendChild(dropDownItemLastPage);


        let nextpage = ""
        if (pagination?.next) {
            nextpage = `<li class="page-item"><a class="page-link" href="/article?page=${pagination?.next?.page}${queryString}" data-navigo>></a></li>`
        }
        else {
            nextpage = `<li class="page-item disabled" ><a class="page-link" href="#" >></a></li>`
        }
        let previouspage = ""
        if (pagination?.previous) {
            previouspage = `<li class="page-item"><a class="page-link" href="/article?page=${pagination?.previous?.page}${queryString}" data-navigo><</a></li>`
        }
        else {
            previouspage = `<li class="page-item disabled"><a class="page-link" href="#" ><</a></li>`
        }

        const paginationNav = document.createElement("nav");
        paginationNav.setAttribute("aria-label", "Pagination");
        paginationNav.innerHTML = `
        
        <hr class="my-0" />
        <ul class="pagination justify-content-center my-4">
            
            ${previouspage}
            <li class="page-item active" aria-current="page"><a class="page-link" disable>${pagination.page}</a></li>
            ${nextpage}
            <li class="page-item dropdown">
                <a class="page-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    
                </a>
                ${paginationDropDown.outerHTML}
            </li>
            
        </ul>
        `;
        return paginationNav;
    }

    commentsDiv(comments, max, userData) {


        const commentsDiv = document.createElement("div");
        commentsDiv.className = "commentsDiv";
        if (comments.length < 1) {
            commentsDiv.innerHTML = "Enter a first comment ...";
            return commentsDiv.outerHTML;
        }
        let i = 0;
        for (let comment of comments) {
            const commentUser = comment?.user;

            const commentDiv = document.createElement("div");
            commentDiv.classList = "mb-4"
            commentDiv.id = comment._id
            commentDiv.innerHTML = `
                
                <div class = "d-flex mb-3">   
                    <div class="flex-shrink-0 style="width:50px;height:50px;">
                        <img class="rounded-circle" style="width:50px;height:50px"
                            src="${commentUser?.profile_image}" alt="${commentUser?.username}" />
                    </div>
                    <div class="ms-3 me-auto">
                        <div class="fw-bold">${commentUser?.username}</div>
                        ${comment?.content}
                    </div>
                    
                    
                    
                </div>
                <div style="display:${userData?._id === commentUser?._id ? "block" : "none"}">
                    
                    <button type="button" class="btn btn-sm btn-danger deleteCommentButton">Delete</button>
                </div>
                <div style="display:${userData?._id === commentUser?._id ? "block" : "none"}">
                    
                </div>         
                `;
            if (i && i === max) break

            i++;
            commentsDiv.appendChild(commentDiv)
        }

        return commentsDiv.outerHTML;

    }


    renderArticleOffcanvas() {
        const userData = this.storage.getUserDataStorage()?.userdata;
        const offCanvas = document.createElement("aside");
        offCanvas.classList = "col-3 text-bg-dark"
        offCanvas.innerHTML = `
        <div class="offcanvas-lg offcanvas-start text-bg-dark " tabindex="-1" id="offcanvas"
        data-bs-scroll="true" data-bs-backdrop="false"
        aria-labelledby="offcanvasLabel">
            <div class="offcanvas-header d-lg-none">
                <h5 class="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"
                aria-controls="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-block mt-1 small">
                <div class="card text-bg-dark mt-1">
                    <div class="card-header">Search</div>
                    <div class="card-body p-1">
                        <div class="input-group">
                            <input id="searchInput" class="form-control" type="text" placeholder="Enter search term..."
                                aria-label="Enter search term..." aria-describedby="button-search" />
                            
                        </div>
                        <div class="m-1">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" name="searchTitle" id="searchTitleRadio" value="searchTitle" checked>
                                <label class="form-check-label" for="searchTitleRadio">
                                In title
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" name="searchContent" id="searchContentRadio" value="searchContent">
                                <label class="form-check-label" for="searchContentRadio">
                                In content
                                </label>
                            </div>
                        </div>
                            
                    </div>
                </div>
                <!-- Categories widget-->
                <div class="card text-bg-dark mt-1">
                    <div class="card-header">Categories</div>
                    <div class="card-body p-1">
                        <div class="row">
                            <div class="col-sm-6">
                                <ul class="list-unstyled mb-1">
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="category" id="scienceRadio" value="Science">
                                            <label class="form-check-label" for="scienceRadio">
                                            Science
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="category" id="historyRadio" value="History" >
                                            <label class="form-check-label" for="historyRadio">
                                            History
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="category" id="technologyRadio" value="Technology" >
                                            <label class="form-check-label" for="technologyRadio">
                                            Technology
                                            </label>
                                        </div>
                                    </li>                                   
                                                                      
                                </ul>
                            </div>
                            <div class="col-sm-6">
                                <ul class="list-unstyled mb-1">
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="category" id="literatureRadio" value="Literature" >
                                            <label class="form-check-label" for="literatureRadio">
                                            Literature
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="category" id="psychologyeRadio" value="Psychology" >
                                            <label class="form-check-label" for="psychologyeRadio">
                                            Psychology
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="category" id="philosophyRadio" value="Philosophy" >
                                            <label class="form-check-label" for="philosophyRadio">
                                            Philosophy
                                            </label>
                                        </div>
                                    </li>                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card text-bg-dark mt-1">
                    <div class="card-header">Sort By</div>
                    <div class="card-body p-1">
                        <div class="row">
                            <div class="col-sm-12">
                                <ul class="list-unstyled mb-1">
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="sortby" id="defaultRadio" value="" checked>
                                            <label class="form-check-label" for="defaultRadio">
                                            Default
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="sortby" id="mostLikedRadio" value="most-liked" >
                                            <label class="form-check-label" for="mostLikedRadio">
                                            Most Liked
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="sortby" id="mostCommentRadio" value="most-comment" >
                                            <label class="form-check-label" for="mostCommentRadio">
                                            Most Comment
                                            </label>
                                        </div>
                                    </li>        
                                                                        
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card text-bg-dark mt-1" style="display:${userData ? "flex":"none"}">
                    <div class="card-header">My Articles and Likes</div>
                    <div class="card-body p-1">
                        <div class="row">
                            <div class="col-sm-12">
                                <ul class="list-unstyled d-flex mb-1">
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="myarticles" id="noneCheckBox" value="" checked>
                                            <label class="form-check-label" for="noneCheckBox">
                                            None
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="myarticles" id="myArticlesCheckBox" value="myarticle">
                                            <label class="form-check-label" for="myArticlesCheckBox">
                                            My Articles
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="myarticles" id="myLikesCheckBox" value="mycomment">
                                            <label class="form-check-label" for="myLikesCheckBox">
                                            My Likes
                                            </label>
                                        </div>
                                    </li>
                                            
                                                                        
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-grid mt-1"><button class="btn btn-primary" id="filterArticlesButton" type="button">Go!</button></div>
            </div>
        </div>
        `;
        return offCanvas;

    };

    singleArticleDiv(article, userData) {

        const dateOptions = {
            dateStyle: "long",

        }
        const timeOptions = {

            timeStyle: "medium",
            hour12: false
        }



        const articleUser = article?.user;

        const articleComments = this.commentsDiv(article?.comments, null, userData);

        const articleDiv = document.createElement("div");
        articleDiv.classList = "card mb-4";
        articleDiv.id = article?._id
        articleDiv.setAttribute("name", article?.name)
        articleDiv.innerHTML = `
                
            <a href="/article/${article._id}" data-navigo><img  class="card-img-top" src="${article?.images}" alt="..." /></a>
            <div class="card-body">
            <div class="badge bg-primary bg-gradient rounded-pill mb-2">${article?.category}</div>
                <div class="row">
                    <div class="col">
                        <div class="small text-muted">Last Update: <br>${new Date(article?.lastUpdate).toLocaleString("en-US",
            dateOptions)}<br>${new Date(article?.lastUpdate).toLocaleString("en-US", timeOptions)}</div>
                    </div>
                    <div class="col">
                        <div class="d-flex flex-row-reverse align-items-end">
                            <div class="d-flex align-items-center">
                                <div class="small p-2">
                                    <div class="fw-bold">${articleUser?.username}</div>
                                </div>
                                <img style="width:3rem" class="rounded-circle img-thumbnail me-3"
                                    src="${articleUser?.profile_image}"
                                    alt="${articleUser?.username}">
        
        
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
        
                <h2 class="card-title">${article?.title}</h2>
                <p class="card-text">${article?.content?.length < 3000 ? article?.content : article?.content.substr(0, 3000) + '<span class="card-text" style="display:none">' + article?.content?.substr(3000) + '</span><button class="btn btn-link btn-sm text-wrap text-muted readMoreButtons" >Read more →</button>'}</p>
                <a onclick="javascript:window.history.back();" class="btn btn-dark btn-sm" data-navigo>Go Back</a>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-success" disabled>Likes Count <span>${article?.likesCount}</span></button>
                    <button style="display:${userData ? "inline-flex" : "none"}"" class="btn btn-outline-success btn-sm likeArticle ${article?.likes.includes(userData?._id) ? "active" : ""}" role="button"><svg  style="pointer-events:none;"xmlns="http://www.w3.org/2000/svg" width="1.2rem" fill="currentColor" viewBox="0 0 512 512"><path  style="pointer-events:none;" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg></button>
                    <div class="likeAlertDiv" style="display:inline-block"></div>
                </div>
                <div class="mt-2" style="display:${userData?._id === articleUser?._id ? "block" : "none"}">
                    <button class="btn btn-dark btn-sm editArticleButton" data-bs-toggle="modal" data-bs-target="#editArticleModal">Edit Article</button>
                    <button class="btn btn-danger btn-sm deleteArticleButton" data-bs-toggle="modal" data-bs-target="#deleteArticleModal">Delete Article</button>
                    

                </div>
                <div class = "mt-2" style="display:${article?.files.length > 0 ? "block" : "none"}">
                    <div>
                        <button  class="btn btn-sm btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Source
                        </button>
                        
                        <div class="collapse" id="collapseExample">
                            <div class="card card-body">
                                ${article?.files.length > 0 ? this.sourceDiv(article, userData) : ""}  
                            </div>
                        </div>
                    </div>               
                        
                    
                </div>
                
            </div>
            <div class="card-footer px-0 pb-0 bg-transparent border-top-0">
                <div class="card bg-light">
                    <div class="card-body">
                        
                        <form class="mb-4"><textarea class="form-control" style="resize:none;height:5rem"
                                placeholder="Join the discussion and leave a comment!"></textarea>
                                <div class="mt-2 mx-auto w-100 alertDivv" style="min-height:3rem">
                                    
                                </div>
                            <div class="d-flex flex-row-reverse mt-3">
                                
                                <button class="btn btn-info btn-sm text-white h-25 addCommentButton" type="button">Add Comment</button>
                                
                            </div>
                        </form>
                                
                        
                        <div id="comments" class="mt-5">
                            ${articleComments}
                        </div>
                        
                    </div>
                                        
                </div>
            </div>
                
        `;


        return articleDiv;

    };


}