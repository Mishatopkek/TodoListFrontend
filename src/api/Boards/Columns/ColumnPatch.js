import config from "../../../../config.js";

const columnPatch = async (columnId, title, jwtToken) => {
    const response = await fetch(`${config.backendUrl}/api/Board/Column/`, {
        method: 'PATCH',
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
        return;
    }
    console.error(response);
}

export default columnPatch;