import axios from "axios";

interface Entity {
    id: number
}

const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

class ApiClient<T> {
    endpoint: string; 

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    getall = async () => {
        const res = await axiosInstance.get<T[]>(this.endpoint);
        return res.data;
    }


    post = async (data: T) => {
        const res = await axiosInstance.post<T>(this.endpoint, data);
        return res.data
    }

    delete = async <T extends Entity>(data: T) => {
        const res = await axiosInstance.delete<T>(this.endpoint + "/" + data.id);
        return res.data
    }

    update =  async <T extends Entity>(data: T) => {
        const res = await axiosInstance.patch<T>(this.endpoint + "/" + data.id, data);
        return res.data;
    }
}

export default ApiClient;