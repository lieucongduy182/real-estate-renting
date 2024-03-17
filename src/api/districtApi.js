import AxiosClientLocation from "./AxiosClientLocation";

const districtApi = {
	getDistrict(params) {
		console.log(params);
		let url = "/master-data/district";
		return AxiosClientLocation.get(url, { params });
	},
};

export default districtApi;
