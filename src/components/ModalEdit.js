import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function ModalEdit(props) {
  const [productData, setProductData] = useState({
    title: "",
    category: "",
    price: 0,
    image: "",
    description: "",
  });
  // Retrieve initial product data if provided
  useEffect(() => {
    if (props.productToEdit) {
      setProductData(props.productToEdit);
    }
  }, [props.productToEdit]);

  const handleEdit = async () => {
    try {
      const docRef = doc(db, "products", props.productToEdit.id);
      await updateDoc(docRef, {
        ...productData,
      });
      props.onCloseEdit();
    } catch (error) {
      console.log(error);
    }

    // axios
    //   .put(`http://localhost:3001/products/${props.productToEdit.id}`, {
    //     ...productData,
    //   })
    //   .then((response) => setProductData(response.data));
  };
  if (!props.showEdit) {
    return null;
  }
  const handleInputChange = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="modalContainer2">
      <div className="modal-bg">
        <div className="modal-head">
          <h2 className="header">Edit Product</h2>
          <button className="close btn btn-danger" onClick={props.onCloseEdit}>
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
              value={productData.title}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="img">Product Image</label>
            <input
              type="text"
              id="img"
              name="image"
              value={productData.image}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="category" className="category">
              Product category
            </label>
            <select
              name="category"
              id="category"
              value={productData.category}
              onChange={handleInputChange}
            >
              <option disabled value>
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
              value={productData.price}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="desc">Product description</label>
            <input
              type="text"
              id="desc"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            />
          </form>
        </div>
        <hr />
        <div className="modal-foot">
          <button className="add btn btn-success" onClick={() => handleEdit()}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
