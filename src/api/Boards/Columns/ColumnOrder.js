import config from "../../../../config.js";

const columnOrder = async (columnId, position, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/Column/Order/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify({
            columnId,
            position
        })
    });
    return !!(response.ok);
}

export default columnOrder;