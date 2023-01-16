import { Request } from "./Request";

import { Storage } from "../storage/Storage";
export class AuthRequest extends Request {
    constructor(url, getReq, postReq, putReq, deleteReq) {
        super(url, getReq, postReq, putReq, deleteReq)


        this.url = this.url + "/auth"


        this.storage = new Storage();


    }


    registerUser(data) {
        const url = this.url + "/register"
        const body = JSON.stringify({
            ...data
        });

        const headers = {
            'Content-type': 'application/json; charset=UTF-8'
        };

        return this.postReq(url, body, headers)


    }

    login(data) {
        const url = this.url + "/login";
        const body = JSON.stringify({
            ...data
        });
        const headers = {
            'Content-type': 'application/json; charset=UTF-8'
        }
        return this.postReq(url, body, headers)



    }

    logout() {
        const url = this.url + "/logout";

        return this.getReq(url);
    }
  


    async imageUpload(imageFile) {
        const url = this.url + "/upload";

        const body = new FormData();
        body.append("image", imageFile[0]);


        const access_token = this.storage.getUserDataStorage()?.access_token
        const headers = {

            "Authorization": `Bearer ${access_token}`
        }



        return await this.postReq(url, body, headers)
    }



    async editProfile(userData) {

        const url = this.url + "/edit";
        const body = JSON.stringify(userData);

        const access_token = this.storage.getUserDataStorage().access_token

        const headers = {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': "Bearer " + access_token
        }
        return this.putReq(url,body,headers)
        
    };
    deleteUser (){
        const url = this.url + "/delete";
        const access_token = this.storage.getUserDataStorage().access_token

        const headers = {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': "Bearer " + access_token
        }

        return this.deleteReq(url,headers);
        
    }
}