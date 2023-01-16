import { Request } from "./Request";

export class ContactRequest extends Request {
    constructor(url) {
        super(url)
        this.url = this.url + "/publicreq";

        
    }


    async contactUpload(data) {
        const url = this.url 
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                ...data
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        return await response.json();
    }
}