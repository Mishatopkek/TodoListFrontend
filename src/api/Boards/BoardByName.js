import config from "../../../config.js";

const boardInitialize = async (boardName, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/GetByName/${boardName}`, {
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

export default boardInitialize;