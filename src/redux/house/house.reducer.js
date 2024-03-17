import { SampleData } from "../../components/HomeContent/SampleData";
import HouseTypes from "./house.types";

const INITIAL_STATE = {
    isLoading: true,
    data:  {
        numResults: 0,
        results: SampleData
    },
    currentPage: 0,
    minPrice: 0,
    maxPrice: 0,
    district: undefined
};

const houseReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case HouseTypes.GET_HOUSE_DATA:
            const {pageNum, district, minPrice, maxPrice} = payload
            return {
                ...state,
                isLoading: true,
                data: {
                    numResults: 0,
                    results:  []
                },
                currentPage: pageNum || 1,
                district,
                minPrice,
                maxPrice,
            }

        case HouseTypes.GET_HOUSE_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: {numResults: payload.count, results: payload.rows}
            }
        case HouseTypes.PAGINATE_HOUSE_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: { numResults: 0, results: [] }
            }

        default:
            return state;
    }
};

export default houseReducer;
