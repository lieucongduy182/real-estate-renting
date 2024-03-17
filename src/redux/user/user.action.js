import UserTypes from "./user.types";


export const updateRoleUser = payload => ({
    type: UserTypes.UPDATE_ROLE,
    payload,
})

