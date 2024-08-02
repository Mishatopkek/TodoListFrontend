import {useParams} from "react-router-dom";

const UserDetail = () => {
    const {username} = useParams();
    return (
        username
    );
};
export default UserDetail;