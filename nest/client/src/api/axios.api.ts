import axios from "axios";
import {getTokenLocalStorage} from "../halper/localstorage.helper";

export const instance = axios.create({
baseURL: 'http://localhost:3000/api',
    headers:{
    Authorization: 'Bearer ' + getTokenLocalStorage()
    },
})