import { connect } from "react-redux";
import App from "./App";
import {setAccountInfo} from "./Store/actions";

const mapStateToProps = (state) => {
    return state
};

const actions = {
    setAccountInfo
}

export default connect (mapStateToProps, actions)(App)