import { connect } from "react-redux";
import {
    setAccountInfo,
    connectContract
} from "./Store/actions";

export default function connectState (Component) {
    const mapStateToProps = (state) => {
        return state
    };
    
    const actions = {
        setAccountInfo,
        connectContract
    }
    return connect (mapStateToProps, actions)(Component)
}
