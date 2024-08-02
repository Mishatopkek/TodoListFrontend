import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <ul>
                <li><Link to="misha">Test Misha page</Link></li>
                <li><Link to="misha/testboard">Test Misha board</Link></li>
            </ul>
        </div>
    );
};
export default Home;