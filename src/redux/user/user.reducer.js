import { ROLE_USER } from "../../utils/constant";
import UserTypes from "./user.types";

const INITIAL_STATE = {
    role: ROLE_USER.RENTER
};

const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case UserTypes.UPDATE_ROLE:
            return {
                ...state,
                role: payload
            }

        default:
            return state;
    }
};

export default userReducer;
