import config from "../../../config.js";

const FetchBoardList = async (jwtToken) => {
    return await fetch(`${config.backendUrl}/api/Board`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    });
}

export default FetchBoardList;