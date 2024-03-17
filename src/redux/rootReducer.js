import { combineReducers } from "redux";
import houseReducer from "./house/house.reducer";
import notificationReducer from "./notification/notification.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
	house: houseReducer,
	user: userReducer,
	notification: notificationReducer,
});

export default rootReducer;
