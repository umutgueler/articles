export class AddArticlePageUI {




    renderAddArticlePageUI() {


        const addArticlePage = document.createElement("div");
        addArticlePage.classList = "container px-2";
        addArticlePage.innerHTML = `
        <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
            <div class="text-center mb-5">
        
                <h1 class="fw-bolder">Add New Article</h1>
        
            </div>
        
            <div class="text-center mb-5">
                <img class="img-thumbnail w-75" style="max-height: 30rem;" id="articleImage"
                    src="http://res.cloudinary.com/dvdf3jgf9/image/upload/v1672581138/articles/ArticleImages/default_article_xvj1cx.png"
                    alt="">
            </div>
            <div class="row gx-5 justify-content-center">
                <div class="col">
                    <div class="mb-3">
                    
                        <form id="addArticleImageForm" class="needs-validation" novalidate>
                            <div class="mb-3" id="addArticleImageAlertDiv" style="min-height: 2rem;">
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <label for="image">Article İmage</label>
                                </div>
                                <div class="col-lg-10">
                                    <input class="form-control form-control-sm " id="imageInput" name="image" type="file"
                                        placeholder="Article İmage" accept="image/png, image/gif, image/jpeg, image/jpg" />
            
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please upload from allowed file types (.png .gif .jpeg .jpg)</div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <form id="addArticleForm" class="needs-validation" novalidate>
        
                        
                        <div class="form-floating mb-3">
                            
                            <input class="form-control form-input" id="nameInput" name="name" type="text"
                                placeholder="Article Name" required minlength="6" maxlength="100" />
                            
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">A name is required. (min minlength 6)</div>
                            <label for="name">Article Name*</label>
                        </div>
                        <div class="form-floating mb-3">
                            
                            <input class="form-control form-input" id="titleInput" name="title" type="text" maxlength="100" minlength="10"
                                placeholder="Article Title" required />
        
                            
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">A title is required. (min minlength 10 maxlength 50)</div>
                            <label for="title">Article Title*</label>
                        </div>
                        <div class="form-floating mb-3">
                            <div>Category*</div>
                            <br>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="category" id="scienceRadio" value="Science" checked>
                                <label class="form-check-label" for="scienceRadio">
                                Science
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="category" id="historyRadio" value="History">
                                <label class="form-check-label" for="historyRadio">
                                History
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="category" id="technologyRadio" value="Technology">
                                <label class="form-check-label" for="technologyRadio">
                                Technology
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="category" id="literatureRadio" value="Literature">
                                <label class="form-check-label" for="literatureRadio">
                                Literature
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="category" id="psychologyRadio" value="Psychology">
                                <label class="form-check-label" for="psychologyRadio">
                                Psychology
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="category" id="philosophyRadio" value="Philosophy">
                                <label class="form-check-label" for="philosophyRadio">
                                Philosophy
                                </label>
                            </div>
                        </div>
        
                        <div class="form-floating mb-3 ">
                            
                            <textarea class="form-control form-input" style="resize:none;min-height:30rem" id="contentTextArea"
                                name="content" type="text" placeholder="Enter content here..." required
                                minlength="12"></textarea>
        
                            
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
                                    <input class="form-control form-control-sm" id="filesInput" name="files"
                                        type="file" multiple />
        
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please upload from allowed file types</div>
                                </div>
                                <div class="mb-1" id="filesNameDiv" style="min-height: 4rem;">
        
                                </div>
                            </div>
                        </div>
                            <div class="mb-3" id="addArticleAlertDiv" style="min-height: 4rem;">
        
                            </div>
                            <div class="d-grid"><button class="btn btn-primary btn-lg" id="addArticleButton" type="submit">Add
                                    Article</button></div>
                    </form>
                </div>
            </div>
        </div>
        `;
        return addArticlePage;
    }
}