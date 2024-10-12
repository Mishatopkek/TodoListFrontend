import config from "../../../../../config.js";

const cardCreate = async (title, columnId, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/Column/Card`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify({
            columnId,
            title
        })
    });
    if (response.ok) {
        return await response.json();
    }
    return console.error(response);
}

export default cardCreate;