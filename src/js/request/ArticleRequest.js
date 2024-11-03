import { Request } from "./Request";
import { ErrorHandling } from "../helpers/error/ErrorHandling";
import { Storage } from "../storage/Storage";





export class ArticleRequest extends Request {
    constructor(url, getReq, postReq, putReq, deleteReq) {
        super(url, getReq, postReq, putReq, deleteReq)
        this.url = this.url + "/article"


        this.errorHandling = new ErrorHandling();
        this.storage = new Storage();


    }

    addNewArticle(articleData) {

        const url = this.url + "/add";
        const body = new FormData();
        const access_token = this.storage.getUserDataStorage()?.access_token
        const headers = {
            "Authorization": `Bearer ${access_token}`
        }
        if (articleData?.image) {
            body.append("image", articleData.image[0]);

        }
        if (articleData?.files) {
            Array.from(articleData.files).forEach(file => {
                body.append("files", file);
            });

            body.append("filenames", JSON.stringify(articleData.filenames));

        }

        body.append("data", JSON.stringify(articleData.data));

        return this.postReq(url, body, headers);



    }

    getArticles(params) {

        const url = this.url + "?" + `${params.page ? "page=" + params.page : ""}${params.limit ? "&limit=" + params.limit : ""}${params.population ? "&population=" + params.population : ""}${params.sortBy ? "&sortBy=" + params.sortBy : ""}${params.searchContent ? "&searchContent=" + params.searchContent : ""}${params.searchTitle ? "&searchTitle=" + params.searchTitle : ""}${params.category ? "&category=" + params.category : ""}${params.myarticles ? "&myarticles=" + params.myarticles : ""}${params.mylikes ? "&mylikes=" + params.mylikes : ""}`;
        const userid = this.storage.getUserDataStorage()?.userdata?._id;
        
        const headers = { "userid": `${userid ? userid : null}` }


        return this.getReq(url, headers)
    };



    getSingleArticle(id) {
        const url = this.url + "/" + String(id);
        return this.getReq(url)
    };

    editArticle(articleData, articleId) {

        const url = this.url + "/" + String(articleId) + "/edit";

        const body = new FormData();
        const access_token = this.storage.getUserDataStorage()?.access_token
        const headers = {
            "Authorization": `Bearer ${access_token}`
        }
        if (articleData?.image) {
            body.append("image", articleData.image[0]);

        }
        if (articleData?.files) {
            Array.from(articleData.files).forEach(file => {
                body.append("files", file);
            });

            body.append("filenames", JSON.stringify(articleData.filenames));

        }



        body.append("data", JSON.stringify(articleData.data));

        return this.putReq(url, body, headers);

    }

    deleteArticle(articleId) {
        const url = this.url + "/" + articleId + "/delete"
        const access_token = this.storage.getUserDataStorage()?.access_token
        const headers = {
            "Authorization": `Bearer ${access_token}`
        };

        return this.deleteReq(url, headers);
    }

    likeUnlikeArticle(articleId) {
        const url = this.url + "/" + articleId + "/like"
        const access_token = this.storage.getUserDataStorage()?.access_token
        const headers = {
            "Authorization": `Bearer ${access_token}`
        };

        return this.getReq(url, headers);
    }


    async downloadFile(articleId, filename) {
        const url = this.url + "/" + articleId + "/downloadfile"
        const body = JSON.stringify({
            filename: filename
        });

        const headers = {
            'Content-Type': 'application/json'
        }
        let result = await fetch(url, {
            method: "POST",
            body: body,
            headers: headers
        })

        try {
            result = await result.json();
        }
        catch {

        }
        finally {
            return result;
        }
    };

    deleteFile(articleId, filename) {
        const files = []
        files.push(filename)
        const url = this.url + "/" + articleId + "/deletefile"
        const body = JSON.stringify({
            files: files
        });
        const access_token = this.storage.getUserDataStorage()?.access_token
        const headers = {
            "Authorization": `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        };
        return this.putReq(url, body, headers);
    }


}