import {
	LocationSearching,
	MailOutline,
	PermIdentity,
	Publish,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateUser } from "../../redux/apiCalls";

export default function User() {
	const dispatch = useDispatch();
	const location = useLocation();
	const userId = location.pathname.split("/")[2];
	const user = useSelector((state) =>
		state.users.users.find((user) => user._id === userId)
	);
	const [file, setFile] = useState(null);
	const [inputs, setInputs] = useState(user);
	console.log(inputs);

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleClick = (e) => {
		e.preventDefault();
		const fileName = new Date().getTime() + file.name;
		const storage = getStorage(app);
		const StorageRef = ref(storage, fileName);

		const uploadTask = uploadBytesResumable(StorageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
						break;
				}
			},
			(error) => {
				// Handle unsuccessful uploads
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const user = { ...inputs, img: downloadURL, _id: userId };
					console.log("updated user=", user);
					updateUser(dispatch, user);
					console.log("after dispatch");
					// addProduct(user, dispatch);
				});
			}
		);
	};
	return (
		<div className="user">
			<div className="userTitleContainer">
				<h1 className="userTitle">Edit User</h1>
				<Link to="/newUser">
					<button className="userAddButton">Create</button>
				</Link>
			</div>
			<div className="userContainer">
				<div className="userShow">
					<div className="userShowTop">
						<img src={user.img} alt="" className="userShowImg" />
						<div className="userShowTopTitle">
							<span className="userShowUsername">{user.username}</span>
						</div>
					</div>
					<div className="userShowBottom">
						<span className="userShowTitle">Account Details</span>
						<div className="userShowInfo">
							<PermIdentity className="userShowIcon" />
							<span className="userShowInfoTitle">{user.username}</span>
						</div>

						<div className="userShowInfo">
							<MailOutline className="userShowIcon" />
							<span className="userShowInfoTitle">{user.email}</span>
						</div>
						<div className="userShowInfo">
							<LocationSearching className="userShowIcon" />
							<span className="userShowInfoTitle">
								{user.isAdmin ? "Admin" : "Regular user"}
							</span>
						</div>
					</div>
				</div>
				<div className="userUpdate">
					<span className="userUpdateTitle">Edit</span>
					<form className="userUpdateForm">
						<div className="userUpdateLeft">
							<div className="userUpdateItem">
								<label>Username</label>
								<input
									type="text"
									placeholder={user.username}
									className="userUpdateInput"
									onChange={handleChange}
									name="username"
								/>
							</div>

							<div className="userUpdateItem">
								<label>Email</label>
								<input
									type="text"
									placeholder={user.email}
									className="userUpdateInput"
									onChange={handleChange}
									name="email"
								/>
							</div>
							<div className="userUpdateItem">
								<label>Password</label>
								<input
									type="text"
									placeholder="new password"
									className="userUpdateInput"
									onChange={handleChange}
									name="password"
								/>
							</div>
						</div>
						<div className="userUpdateRight">
							<div className="userUpdateUpload">
								<img className="userUpdateImg" src={user.img} alt="" />
								<label htmlFor="file">
									<Publish className="userUpdateIcon" />
								</label>
								<input
									type="file"
									id="file"
									style={{ display: "none" }}
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</div>
							<button className="userUpdateButton" onClick={handleClick}>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
