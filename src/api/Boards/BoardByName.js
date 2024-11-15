import config from "../../../config.js";

const boardInitialize = async (userName, name, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/GetByName/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify({
            userName,
            name
        })
    });
    if (response.status === 403) {
        throw new Error("Forbidden");
    }
    if (!response.ok) {
        throw new Error('Failed to fetch protected data');
    }
    const data = await response.json();
    return data;
};

export default boardInitialize;