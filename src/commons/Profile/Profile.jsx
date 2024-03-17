import { Menu } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import ChangePassword from "./Component/ChangePassword/ChangePassword";
import LikePost from "./Component/LikePost/LikePost";
import Posts from "./Component/Posts/Posts";
import Information from "./Component/Profile/Information";
import "./style/profile.scss";

function Profile({ user, firebase, storage }) {
	return (
		<Layout className="profile">
			<Sider
				className="profile__sider"
				width={320}
				breakpoint="lg"
				collapsedWidth="0"
			>
				<Menu
					className="profile__menu"
					mode="inline"
					theme="dark"
					defaultSelectedKeys={["1"]}
				>
					<Menu.Item key="1">
						<Link to="/me/information">Profile</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/me/forgot">Đổi mật khẩu</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/me/like-post">Các bài viết đã thích</Link>
					</Menu.Item>{" "}
					<Menu.Item key="4">
						<Link to="/me/posts">Các bài viết đã đăng</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="profile__layout">
				<Content className="profile__content">
					<Switch>
						<Route path="/me/information">
							<Information user={user} firebase={firebase} storage={storage} />
						</Route>
						<Route path="/me/forgot">
							<ChangePassword user={user} firebase={firebase} />
						</Route>
						<Route path="/me/like-post">
							<LikePost user={user} firebase={firebase} />
						</Route>
						<Route path="/me/posts">
							<Posts user={user} firebase={firebase} />
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}

export default Profile;
