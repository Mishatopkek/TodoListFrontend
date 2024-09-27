import config from "../../../../config.js";

const columnCreate = async (title, boardId, jwtToken, shouldAddCardByDefault = false) => {
    const response = await fetch(`${config.backendUrl}/api/Board/Column/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify({
            boardId: boardId,
            title: title,
            shouldAddCardByDefault: shouldAddCardByDefault
        })
    });
    if (response.ok) {
        return await response.json();
    }
    return console.error(response);
}

export default columnCreate;