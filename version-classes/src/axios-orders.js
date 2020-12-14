import axios from 'axios';
import { baseURL } from './redacted';

const instance = axios.create({
    baseURL,
});

export default instance;
