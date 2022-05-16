import axios from "axios";
import {GET_ALL, GET_BY_PARAMS_BUY, GET_BY_PARAMS_RENT} from "../routes";

export const getRealEstatesByParamsBuy = async (requestBody) => {
    // const btnToSendRequest =  document.querySelector('button[type=submit]');
    try {
        // btnToSendRequest.disabled = true;
        const response = await axios.post(GET_BY_PARAMS_BUY, requestBody);
        return response.data;
    }
   catch (err) {
       // btnToSendRequest.disabled = false;
       console.warn(err);
       console.log('Incorrect params in form.');

   }
}

export const getRealEstatesByParamsRent = async (requestBody) => {
    // const btnToSendRequest =  document.querySelector('button[type=submit]');
    try {
        // btnToSendRequest.disabled = true;
        const response = await axios.post(GET_BY_PARAMS_RENT, requestBody);
        return response.data;
    }
    catch (err) {
        // btnToSendRequest.disabled = false;
        console.warn(err);
        console.log('Incorrect params in form.');

    }
}
export const getAllEntities = async () => {
    const realEstates = await axios.get(GET_ALL).then(res => res);
    return realEstates.data.entities;
}