import config from "../../../../../../config.js";

const cardOrder = async (cardId, destinationColumnId, position, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/Column/Card/Order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify({
            cardId,
            destinationColumnId,
            position
        })
    });
    return !!(response.ok);
}

export default cardOrder;