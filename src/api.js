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

    async sendVideo(video) {
        console.log(video)

        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        const formData = new FormData();
        formData.append('video', video)
        const response = await this.apisauce.post('/send-video', formData, { headers })
        return response.data;
    }

    async uploadVideo(video, label, subject) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        const formData = new FormData();
        formData.append('video', video)
        formData.append('label', label)
        formData.append('subject', subject)

        const response = await this.apisauce.post('/upload-video', formData, { headers })
        return response.data;
    }

    async fixLabel(label, filename) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        const formData = new FormData();
        formData.append('fixedLabel', label)
        formData.append('fileName', filename)

        const response = await this.apisauce.post('/fix-label', formData, { headers })
        return response.data;
    }

}
