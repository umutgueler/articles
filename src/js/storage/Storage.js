export class Storage {
    addUserDataToStorage(userdata){
        localStorage.setItem("userdata",JSON.stringify(userdata.data));
        localStorage.setItem("access_token",userdata.access_token)
    }



    getUserDataStorage(){
        const access_token=localStorage.getItem("access_token");
        const userdata=JSON.parse(localStorage.getItem("userdata"));
        if(!access_token || !userdata) return null;
        const data={
            access_token:access_token,
            userdata:userdata
        }
        
        return data;
    }

    deleteUserDataFromStorage(){
        localStorage.removeItem("userdata");
        localStorage.removeItem("access_token");
    }

    updateUserDataOnStroge(information){
        let userdata=JSON.parse(localStorage.getItem("userdata"));
        console.log((information))
        userdata={
            ...userdata,
            ...information
        };
        console.log(userdata)

        localStorage.setItem("userdata",JSON.stringify(userdata))
        
    }

    addJsonDataToStorage(key,value){
        value=JSON.stringify(value);
        localStorage.setItem(key,value);
    }

    getJsonDataFromStorage(key){
        const result = localStorage.getItem(key);
        if (!result) return null
        return JSON.parse(result);
    }

    deleteJsonDataFromStorage(key){
        localStorage.removeItem(key)
    }

    
}