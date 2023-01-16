
export class HomePageUI {
    constructor(mostLikedArticle, mostCommentArticle) {

        this.header = document.createElement("header");
        this.theMost = document.createElement("section");
        this.mostLikedArticle = mostLikedArticle;
        this.mostCommentArticle = mostCommentArticle;
    }


    homeHeaderUI() {
        this.header.classList = "bg-secondary py-5";
        this.header.innerHTML = `
                <div class="container px-5">
                    <div class="row gx-5 align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div class="my-5 text-center text-xl-start">
                                <h1 class="display-5 fw-bolder text-white mb-2">Best way write and read Articles</h1>
                                <p class="lead fw-normal text-white-50 mb-4">Quickly search and write your first article
                                    with Articles,<br> or search and read!
                                </p>
                            </div>
                        </div>
                        <div class="col-xl-5 col-xxl-6 d-xl-block text-center"><img
                                class="img-fluid border rounded-3 my-5" src="https://res.cloudinary.com/dvdf3jgf9/image/upload/v1673886435/articles/PageImages/header_img_m7jmv2.png"
                                alt="..." /></div>
                    </div>
                </div>
        `;
        return this.header;
    }

    homeTheMostUI() {
        const mostLikedsData = this.mostLikedArticle.data;

        const mostCommentData = this.mostCommentArticle.data;
        console.log(mostCommentData)
        this.theMost.classList = "py-5";
        let mostLikedsDivs = "";



        let counter = 0;
        for (const e of mostLikedsData) {
            if (counter === 3) break
            let mostLikedsDiv = `
            <div class="card-group col-lg-4 mb-5">
                <div class="card h-100 shadow border-0">
                    <div class="text-center" style="height:250px">
                        <img class="card-img-top" src=${e.images} alt="..." />
                    </div>
            
                    <div class="card-body p-4 bg-white">
                        <div class="badge bg-primary bg-gradient rounded-pill mb-2">${e?.category}</div>
                        <a class="text-decoration-none link-dark stretched-link" href="/article/${e._id}" data-navigo>
                            <h5 class="card-title mb-3">${e.title}</h5>
                        </a>
                        <p class="card-text mb-0">${e.content.slice(0, 50)}</p>
                    </div>
                    <div class="card-footer p-4 pt-0 bg-white border-top-0">
                        <div class="d-flex align-items-end justify-content-between">
                            <div class="d-flex align-items-center">
                                <img class="rounded-circle img-thumbnail me-3" style="widht:50px;height:50px" src=${e.user.profile_image}
                                    alt=${e.user.username} />
                                <div class="small">
                                    <div class="fw-bold">${e.user.username}</div>
                                    <div class="text-muted">${e.createdAt}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            `;
            mostLikedsDivs += mostLikedsDiv
            counter += 1

        };
        let mostCommentDivs = "";
        counter = 0;
        for (const e of mostCommentData) {
            if (counter === 3) break
            let mostCommentDiv = `
            <div class="card-group col-lg-4 mb-5">
                <div class="card h-100 shadow border-0">
                    <div class="text-center" style="height:250px">
                        <img class="card-img-top" src=${e.images} alt="..." />
                    </div>
            
                    <div class="card-body p-4 bg-white">
                        <div class="badge bg-primary bg-gradient rounded-pill mb-2">${e?.category}</div>
                        <a class="text-decoration-none link-dark stretched-link" href="/article/${e._id}" data-navigo>
                            <h5 class="card-title mb-3">${e.title}</h5>
                        </a>
                        <p class="card-text mb-0">${e.content.slice(0, 50)}</p>
                    </div>
                    <div class="card-footer p-4 pt-0 bg-white border-top-0">
                        <div class="d-flex align-items-end justify-content-between">
                            <div class="d-flex align-items-center">
                                <img class="rounded-circle img-thumbnail me-3" style="widht:50px;height:50px" src=${e.user.profile_image}
                                    alt=${e.user.username} />
                                <div class="small">
                                    <div class="fw-bold">${e.user.username}</div>
                                    <div class="text-muted">${e.createdAt}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          
            
            `;
            mostCommentDivs += mostCommentDiv
            counter += 1

        };


        this.theMost.innerHTML = `
        
        <div class="container px-5 my-5">
                    <div class="row gx-5 justify-content-center">
                        <div class="col-lg-8 col-xl-6">
                            <div class="text-center">
                                <h2 class="fw-bolder">The Best Articles</h2>
                                <p class="lead fw-normal text-muted mb-5">Most liked articles</p>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-5">
                    ${mostLikedsDivs}
                    </div> 
                    
                    <div class="row gx-5 justify-content-center">
                        <div class="col-lg-8 col-xl-6">
                            <div class="text-center">
                                
                                <p class="lead fw-normal text-muted mb-5">Most commented articles</p>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-5">
                    ${mostCommentDivs}    
                    </div>
                </div>
        `;
        return this.theMost;
    }




    renderHomePage() {
        const homePage = document.createElement("div");

        homePage.appendChild(this.homeHeaderUI());

        homePage.appendChild(this.homeTheMostUI());


        return homePage;
    }
}

