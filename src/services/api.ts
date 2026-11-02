import axios from 'axios'

export const api = axios.create({
    baseURL: "https://raw.githubusercontent.com/DevNelson16/PetShop/main"
})