import config from "../../../../../config.js";

const cardPatch = async (model, cardId, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/Column/Card`, {
        method: 'Patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify({
            ...model,
            cardId,
        })
    });
    if (response.ok) {
    }
    return console.error(response);
}

export default cardPatch;