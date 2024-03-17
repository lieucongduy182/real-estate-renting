var keyMirror = require('key-mirror');

const HouseTypes = keyMirror({
    GET_HOUSE_DATA: null,
    GET_HOUSE_DATA_SUCCESS: null,
    GET_HOUSE_DATA_FAILURE: null,

    PAGINATE_HOUSE_DATA: null,
    PAGINATE_HOUSE_DATA_SUCCESS: null,
    PAGINATE_HOUSE_DATA_FAILURE: null,

    FILTER_HOUSE_DATA: null,
    FILTER_HOUSE_DATA_SUCCESS: null,
    FILTER_HOUSE_DATA_FAILURE: null,
})

export default HouseTypes