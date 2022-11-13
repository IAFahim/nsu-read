import type {NextPage} from 'next'
import Account from "./[username]";
import SRS from './srs';
import useLoginState from "../store/UseLoginState";


const Home: NextPage = () => {
    const isLoggedIn= useLoginState(state => state.isLoggedIn);

    return (
        isLoggedIn ? <Account/> : <SRS/>
    )
}

export default Home
