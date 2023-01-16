import { Request } from "./Request";
import { Storage } from "../storage/Storage";
export class CommentRequest extends Request {
    constructor(url) {
        super(url)
        this.url = this.url + "/article";


        this.storage = new Storage();
    }

    addNewComment(articleId, data) {
        const url = this.url + "/" + String(articleId) + "/comment";
        const body = JSON.stringify({
            ...data
        });


        const access_token = this.storage.getUserDataStorage()?.access_token
        const headers = {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": `Bearer ${access_token}`
        }

        return this.postReq(url, body, headers)
    }

    deleteComment(articleId, commentId) {
        const url = this.url + "/" + String(articleId) + "/comment/" + String(commentId) + "/delete";
        const access_token = this.storage.getUserDataStorage()?.access_token
        const headers = {
            
            "Authorization": `Bearer ${access_token}`
        }
        return this.deleteReq(url,headers);
    }
}