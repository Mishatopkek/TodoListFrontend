import config from "../../../../../../config.js";

const commentCreate = async (text, cardId, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/Column/Card/Comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify({
            cardId,
            text
        })
    });
    if (response.ok) {
        return await response.json();
    }
    return console.error(response);
}

export default commentCreate;