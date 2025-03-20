import { Link } from "react-router";


const Home = () => {
    return (
        <div>
            Welcome to the private plane <Link to='/scheduler'>scheduler</Link>.
        </div>
    )
};

export default Home;