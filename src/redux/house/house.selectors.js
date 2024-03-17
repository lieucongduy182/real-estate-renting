import { createSelector } from "reselect";

export const selectHouse = (state) => state.house;
export const selectHouseLoading = createSelector(
	[selectHouse],
	(house) => house.isLoading
);
export const selectDistrictLocation = createSelector(
	[selectHouse],
	(house) => house.districtLocation
);
export const selectHouseData = createSelector(
	[selectHouse],
	(house) => house.data.results
);
export const selectHouseNumResults = createSelector(
	[selectHouse],
	(house) => house.data.numResults
);
