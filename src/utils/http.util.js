import axios from 'axios';
import { BASE_URL_SERVER } from './constants.util';

/**
 * Hook for make REST petitions
 * @param {String} pathUrl
 * @param {Option} options
 * @returns {Array} [Axios, CancelPetition]
 */
const Http = () => {
    const _axios = axios.create({
        baseURL: BASE_URL_SERVER,
        headers: {},
    });

    return _axios;
}

export default Http;
