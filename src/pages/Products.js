import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import Sweetalert2 from "react-sweetalert2";
import "./Products.css";
import ModalAddProduct from "../components/ModalAddProducts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalEdit from "../components/ModalEdit";

import { db } from "../firebase-config";
import { collection, deleteDoc, getDocs ,doc} from "firebase/firestore";

function Products() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [swalProps, setSwalProps] = useState({ show: false });
  const productsCollectionRef = collection(db, "products");
  // const url = "http://localhost:3001/products";
  useEffect(() => {
    // axios.get(url).then((response) => setProducts(response.data));
    const fetchProducts = async () => {
      try {
        const data = await getDocs(productsCollectionRef);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const deleteProduct = (product) => {
    setSwalProps({
      show: true,
      title: `Are You Sure To Delete ${product.title} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      product: product,
    });
  };
    const handleDeleteConfirm = async () => {
      const product = swalProps.product;
      try {
        const productDocRef = doc(db, "products", product.id);
        await deleteDoc(productDocRef);
        setProducts(products.filter((p) => p.id !== product.id)); // Update state after deletion
        setSwalProps({ show: false }); // Close the SweetAlert2
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="productContainer">
      {/* <h2 className="product-header text-center m-2">Products page</h2> */}
      <button className="btn btn-success mt-3" onClick={() => setShow(true)}>
        Add new product
      </button>
      <ModalAddProduct show={show} onClose={() => setShow(false)} />

      <table className="table table-striped mt-2">
        <thead>
          <tr>
            <td>ID</td>
            <td>Product</td>
            <td>Category</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td className="Action">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-primary btn-sm me-1 mb-2"
                  >
                    <FontAwesomeIcon icon={faEye} /> View
                  </Link>
                  <button
                    className="btn btn-warning btn-sm me-1 mb-2"
                    onClick={() => {
                      setShowEdit(true);
                      setProductToEdit({
                        id: product.id,
                        title: product.title,
                        category: product.category,
                        price: product.price,
                        image: product.image,
                        description: product.description,
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <ModalEdit
                    showEdit={showEdit}
                    onCloseEdit={() => setShowEdit(false)}
                    productToEdit={productToEdit}
                  />
                  <button
                    className="btn btn-danger btn-sm mb-2"
                    onClick={() => deleteProduct(product)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </td>
              </tr>
            );
          })}

          <Sweetalert2
            {...swalProps}
            // Spread swalProps for SweetAlert2 rendering
            didClose={() => {
              setSwalProps({ show: false });
            }}
            onConfirm={() => {
              // const product = swalProps.product;
              handleDeleteConfirm();
              // axios
              //   .delete(`${url}/${product.id}`)
              //   .then((response) => {
              //     getProducts(); // Refresh products
              //   })
              //   .catch((error) => console.error(error));
            }}
          />
        </tbody>
      </table>
    </div>
  );
}
export default Products;
