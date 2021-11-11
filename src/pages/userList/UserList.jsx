import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUsers } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);

	useEffect(() => {
		getUsers(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		// setData(data.filter((item) => item.id !== id));
	};

	const columns = [
		{ field: "_id", headerName: "ID", width: 200 },
		{
			field: "user",
			headerName: "User",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="userListUser">
						{/* <img className="userListImg" src={params.row.img} alt="" /> */}
						{params.row.username}
					</div>
				);
			},
		},
		{ field: "email", headerName: "Email", width: 200 },
		{
			field: "isAdmin",
			headerName: "Is admin?",
			width: 10,
		},
		// {
		// 	field: "transaction",
		// 	headerName: "Transaction Volume",
		// 	width: 160,
		// },
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/user/" + params.row._id}>
							<button className="userListEdit">Edit</button>
						</Link>
						<DeleteOutline
							className="userListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div style={{ flex: "4", display: "flex", flexDirection: "column" }}>
			<div className="userTitleContainer">
				<h1 className="userTitle">Edit User</h1>
				<Link to="/newUser">
					<button className="userAddButton">Create</button>
				</Link>
			</div>

			<div className="userList">
				<DataGrid
					rows={users}
					disableSelectionOnClick
					columns={columns}
					getRowId={(row) => row._id}
					pageSize={8}
					checkboxSelection
				/>
			</div>
		</div>
	);
}
