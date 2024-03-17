import { Avatar, Comment } from "antd";
import PropTypes from "prop-types";
import React from "react";
import "./CommentItem.scss";

const CommentItem = ({ displayName, avatar, message, createAt, children }) => {
	return (
		<Comment
			author={
				<div className="comment-item">
					<span className="username">{displayName}</span>
					<span className="time">
						{/* {secondsToDhms(createAt.seconds || 10000000)} */}
					</span>
				</div>
			}
			avatar={<Avatar src={avatar} alt={displayName} />}
			content={
				<div className="comment-item-content">
					{message ? <div className="content">{message}</div> : <></>}
				</div>
			}
		>
			{children}
		</Comment>
	);
};

CommentItem.propTypes = {
	author: PropTypes.string,
	avatar: PropTypes.string,
	content: PropTypes.string,
	children: PropTypes.array,
};

export default CommentItem;
