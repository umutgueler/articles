export class GetElementAsync {







    async getElementByIDAsync(id) {

        

        return await new Promise((res, rej) => {

            const interval = setInterval(function () {

                const element = document.getElementById(id);

                if (element) {
                    clearInterval(interval);
                    res(element)

                }
            }, 500);

        })
    }


    async querySelecetorAllAsync (className) {        

        return await new Promise((res, rej) => {

            const interval = setInterval(function () {

                const element = document.querySelectorAll(className);

                if (element) {
                    clearInterval(interval);
                    res(element)

                }
            }, 500);

        })
    }


}