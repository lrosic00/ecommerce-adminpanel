import { useState } from "react";
import "./newProduct.css";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";

export default function NewProduct() {
	const [inputs, setInputs] = useState({
		inStock: true,
	});
	const [file, setFile] = useState(null);
	const [cat, setCat] = useState([]);
	const [size, setSize] = useState([]);
	const [color, setColor] = useState([]);
	const dispatch = useDispatch();
	console.log(inputs);

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const handleCat = (e) => {
		setCat(e.target.value.split(","));
	};
	const handleColor = (e) => {
		setColor(e.target.value.split(","));
	};
	const handleSize = (e) => {
		setSize(e.target.value.split(","));
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
					const product = {
						...inputs,
						img: downloadURL,
						categories: cat,
						size: size,
						color,
					};

					addProduct(product, dispatch);
				});
			}
		);
	};
	return (
		<div className="newProduct">
			<h1 className="addProductTitle">New Product</h1>
			<form className="addProductForm">
				<div className="addProductItem">
					<label>Image</label>
					<input
						type="file"
						id="file"
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>
				<div className="addProductItem">
					<label>Title</label>
					<input
						type="text"
						placeholder="Apple Airpods"
						onChange={handleChange}
						name="title"
					/>
				</div>
				<div className="addProductItem">
					<label>Description</label>
					<input
						type="text"
						placeholder="Description"
						onChange={handleChange}
						name="desc"
					/>
				</div>
				<div className="addProductItem">
					<label>Price</label>
					<input
						type="number"
						placeholder="100"
						onChange={handleChange}
						name="price"
					/>
				</div>
				<div className="addProductItem">
					<label>Categories</label>
					<input
						type="text"
						placeholder="hoodies, jeans"
						onChange={handleCat}
					/>
				</div>
				<div className="addProductItem">
					<label>Colors</label>
					<input type="text" placeholder="red, blue" onChange={handleColor} />
				</div>
				<div className="addProductItem">
					<label>Stock</label>
					<select onChange={handleChange} name="inStock">
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
				</div>
				<div className="addProductItem">
					<label>Size</label>
					<input type="text" placeholder="S,M,L,XL..." onChange={handleSize} />
				</div>

				<button className="addProductButton" onClick={handleClick}>
					Create
				</button>
			</form>
		</div>
	);
}
