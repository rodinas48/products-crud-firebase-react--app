import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import "./ProductDetails.css";
import { useEffect, useState } from "react";

import { db } from "../firebase-config";
import {  getDoc,doc} from "firebase/firestore";
function ProductDetails() {
  let { productId } = useParams();
  const [product, setProduct] = useState({});
  // let url = `http://localhost:3001/products/${productId}`;
   const getProduct = async () => {
     try {
       const docRef = doc(db, "products", productId);
       const data = await getDoc(docRef,productId);
       setProduct(data.data());
     } catch (error) {
       console.log(error);
     }
  };
  useEffect(() => {
    getProduct();
    // axios.get(url).then((response) => setProduct(response.data));
  });
  return (
    <>
      <Link to={`/products`} className="back btn btn-success">
        <FontAwesomeIcon icon={faReply} />
      </Link>

      <div className="product">
        <h2 className="text-center product-title">Product {productId} Details</h2>
        <img src={product.image} alt={product.title} />
        <div className="productDetails">
          <h4 className="text">{product.title}</h4>
          <span className="text">Category : {product.category}</span>|
          <span className="text">${product.price}</span>
          <p className="text">{product.description}</p>
        </div>
      </div>
    </>
  );
}
export default ProductDetails;
