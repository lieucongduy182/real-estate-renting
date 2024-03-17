import HouseTypes from "./house.types.js";

export const getHouseData = (payload) => ({
	type: HouseTypes.GET_HOUSE_DATA,
	payload,
});

export const getHouseDataSuccess = (payload) => ({
	type: HouseTypes.GET_HOUSE_DATA_SUCCESS,
	payload,
});

export const getHouseDataFailure = (payload) => ({
	type: HouseTypes.GET_HOUSE_DATA_FAILURE,
	payload,
});

// ======
export const paginationHouseData = (payload) => ({
	type: HouseTypes.PAGINATE_HOUSE_DATA,
	payload,
});

export const paginationHouseDataSuccess = (payload) => ({
	type: HouseTypes.PAGINATE_HOUSE_DATA_SUCCESS,
	payload,
});

export const paginationHouseDataFailure = (payload) => ({
	type: HouseTypes.PAGINATE_HOUSE_DATA_FAILURE,
	payload,
});
