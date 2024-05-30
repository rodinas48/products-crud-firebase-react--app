import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { db } from "../firebase-config";
import { addDoc,collection } from "firebase/firestore";
function ModalAddProduct(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
    const productsCollectionRef = collection(db, "products");

  const handleAdd = async () => {
    // Validate form inputs
    if (!title || !category || !image || !description || !price) {
      console.log("All fields are required.");
      return;
    }

    // Convert price to a number
    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
      console.log("Price must be a number.");
      return;
    }

    try {
      await addDoc(productsCollectionRef, {
        title,
        category,
        image,
        description,
        price:priceNumber,
      });
      props.onClose();
    } catch (error) {
      console.log(error);
    }
    // axios
    //   .post(`http://localhost:3001/products`, { title, category, price ,image,description})
    //   .then((response) => response.data);
   
  };

  if (!props.show) {
    return null;
  }
  return (
    <div className="modalContainer">
      <div className="modal-bg">
        <div className="modal-head">
          <h2 className="header">Add New Product</h2>
          <button className="close btn btn-danger" onClick={props.onClose}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <hr />
        <div className="modalBody">
          <form>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label htmlFor="img">Product Image</label>
            <input
              type="text"
              id="img"
              name="image"
              onChange={(e) => setImage(e.target.value)}
            />
            <br />
            <label htmlFor="category" className="category">
              Product category
            </label>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled selected value>
                -- select category --
              </option>
              <option value="men's clothing">Men's clothing</option>
              <option value="women's clothing">Women's clothing</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
            </select>
            <br />
            <label htmlFor="price">Product Price</label>
            <input
              type="text"
              id="price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <label htmlFor="desc">Product description</label>
            <input
              type="text"
              id="desc"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
        </div>
        <hr />
        <div className="modal-foot">
          <button className="add btn btn-success" onClick={() => handleAdd()}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddProduct;
