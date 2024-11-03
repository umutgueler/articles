import { ErrorHandling } from "../helpers/error/ErrorHandling"

export class Request {
    constructor() {
        this.url = "https://national-marigold-umutguler-30d1e1ef.koyeb.app/api"
        this.errorHandling = new ErrorHandling();


    }

    async getReq(url, headers) {
        const init = {
            method: "GET",
            headers: headers
        }

        const request = () => fetch(url, init);
        const response = await this.errorHandling.asyncErrorHandling(request());
        return await response.json();

    }

    async postReq(url, body, headers) {
        
        const init = {
            method: "POST",
            body: body,
            headers: headers

        };
        

        const request = () => fetch(url, init);
        const response = await this.errorHandling.asyncErrorHandling(request());
        return await response.json();

    }

    async putReq(url, body, headers) {
        const init = {
            method: "PUT",
            body: body,
            headers: headers

        }

        const request = () => fetch(url, init);
        const response = await this.errorHandling.asyncErrorHandling(request());
        return await response.json();

    }

    async deleteReq(url,headers) {
        const init = {
            method: "DELETE",
            headers: headers

        }

        const request = () => fetch(url, init);
        const response = await this.errorHandling.asyncErrorHandling(request());
        return await response.json();

    }

}
