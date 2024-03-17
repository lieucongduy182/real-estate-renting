export const getDateFromTimestamp = (value) => {
	return new Date(value * 1000).toLocaleString();
};

export const formatPrice = (value) => {
	if (!value) {
		return "0";
	}
	let rs = (parseInt(value) * 1000)
		.toFixed(1)
		.replace(/\d(?=(\d{3})+\.)/g, "$&.");
	rs = `${rs}`.substr(0, rs.length - 6);
	return `${rs}đ`;
};

export const secondsToDhms = (seconds) => {
	var curdate = new Date(null);
	curdate.setTime(seconds * 1000);
	return curdate.toLocaleString();
};

export const formatTime = (time) => {
	let date_ob = new Date(time);

	let date = ("0" + date_ob.getDate()).slice(-2);

	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

	let year = date_ob.getFullYear();

	let hours = date_ob.getHours();

	let minutes = date_ob.getMinutes();

	let seconds = date_ob.getSeconds();

	return (
		year +
		"-" +
		month +
		"-" +
		date +
		" " +
		hours +
		":" +
		minutes +
		":" +
		seconds
	);
};
