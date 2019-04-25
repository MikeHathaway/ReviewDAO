import { connect } from "react-redux";
import {setAccountInfo} from "./Store/actions";

export default function connectState (Component) {
    const mapStateToProps = (state) => {
        return state
    };
    
    const actions = {
        setAccountInfo
    }
    return connect (mapStateToProps, actions)(Component)
}
