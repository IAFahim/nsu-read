import type {NextPage} from 'next'
import Account from "./[username]";
import SRS from './srs';
import useProfile from "../store/UseProfile";


const Home: NextPage = () => {
    const isLoggedIn= useProfile(state => state.isLoggedIn);

    return (
        isLoggedIn ? <Account/> : <SRS/>
    )
}

export default Home
