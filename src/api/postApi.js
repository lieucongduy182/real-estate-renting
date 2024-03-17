import AxiosClientPost from "./AxiosClientPost";

const postApi = {
	createPost(params) {
		console.log(params);
		let url = "/post/create";
		return AxiosClientPost.post(url, params);
	},
	getPostByEmail(params) {
		console.log(params);
		let url = `/post/username/${params.email}`;
		return AxiosClientPost.get(url);
	},
	updatePost(params) {
		const url = `/post/update/${params.postId}`;

		return AxiosClientPost.put(url, params);
	},
	deletePost(params) {
		const url = `/post/delete/${params.postId}`;
		return AxiosClientPost.delete(url);
	},
};

export default postApi;
