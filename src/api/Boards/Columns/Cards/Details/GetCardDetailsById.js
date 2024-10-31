import config from "../../../../../../config.js";

const GetCardDetailsById = async (cardId, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/Column/Card/Details/GetById/${cardId}`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch protected data');
    }
    const data = await response.json();
    return data;
};

export default GetCardDetailsById;