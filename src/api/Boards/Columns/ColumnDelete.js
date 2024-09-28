import config from "../../../../config.js";

const columnDelete = async (columnId, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/Column/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
        body: JSON.stringify({
            columnId
        })
    });
    if (response.ok) {
        return;
    }
    console.error(response);
}

export default columnDelete;