import { connect } from "react-redux";
import {
    setAccountInfo,
    connectWeb3
} from "./Store/actions";

export default function connectState (Component) {
    const mapStateToProps = (state) => {
        return state
    };
    
    const actions = {
        setAccountInfo,
        connectWeb3
    }

    return connect (mapStateToProps, actions)(Component)
}
