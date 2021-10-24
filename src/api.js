import { create } from 'apisauce'

export class Api {

    apisauce;

    constructor() {

    }

    setup() {
        this.apisauce = create({
            baseURL: 'http://140.115.51.225:5000/',
            timeout: 100000
        })
    }

    async getFilelist() {
        const response = await this.apisauce.get('/file-path')
        return response.data;
    }

    async getPrediction(filepath) {
        console.log(filepath)
        const response = await this.apisauce.get('/predict',{
            filepath: filepath[0]
        })
        return response.data;
    }

}
