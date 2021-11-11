import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";
import { useState, useEffect } from "react";

export default function WidgetSm() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			const res = await userRequest.get("users/?new=true");
			setUsers(res.data);
		};
		getUsers();
	}, []);
	return (
		<div className="widgetSm">
			<span className="widgetSmTitle">New Join Members</span>
			<ul className="widgetSmList">
				{users.map((user) => (
					<li className="widgetSmListItem" key={user.id}>
						<img
							src={
								user.img ||
								"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
							}
							alt=""
							className="widgetSmImg"
						/>
						<div className="widgetSmUser">
							<span className="widgetSmUsername">{user.username}</span>
						</div>
						<button className="widgetSmButton">
							<Visibility className="widgetSmIcon" />
							Display
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
