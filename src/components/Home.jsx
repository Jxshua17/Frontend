import React, { useContext, useEffect, useState } from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png"
import {toast, ToastContainer} from "react-toastify";
import LoginForm from "../Login.jsx";


console.log("did it get here? 101")
const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const navigate = useNavigate();
    console.log("did it get here? 102")



    console.log("did it get here? 103")

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {

      const token = localStorage.getItem("token");


      console.log(token)

      axios.get(
          "http://localhost:8080/api/products",
          {
              headers : { 'Authorization' : `Bearer ${token}`}
          }
      ).then(response => {
          console.log("successful!", response.data)
      }).catch( error => {
          console.log("there is an error", error)
      });

    if ((data && data.length > 0)) {

        toast.success("Login successful! 🎉",{
            toastId:"success1"
        })
      const fetchImagesAndUpdateProducts = async () => {

          console.log("did it get here? 104")
          const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                {
                    responseType: "blob",
                    headers : { 'Authorization' : `Bearer ${token}`}
                }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;


 /* useEffect( () => {
      if (isError){
          navigate("/login")
      }
  }, [isError, navigate])*/

  /*if (isError) {
      return (
          <div className="theme-btn" style={styles.container}>
              <h1>You do not have access to this resource.</h1>
              <button onClick={handleRedirect} style={styles.button}>Log in!</button>
          </div>
      );
  }*/

  return (
    <>
      <div
        className="grid"
        style={{
          marginTop: "64px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Products Available
          </h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl } =
              product;
            const cardStyle = {
              width: "18rem",
              height: "12rem",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
              backgroundColor: productAvailable ? "#fff" : "#ccc",
            };
            return (
              <div
                className="card mb-3"
                style={{
                  width: "250px",
                  height: "360px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden", 
                  backgroundColor: productAvailable ? "#fff" : "#ccc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent:'flex-start',
                  alignItems:'stretch'
                }}
                key={id}
              >
                <Link
                  to={`/product/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "150px", 
                      objectFit: "cover",  
                      padding: "5px",
                      margin: "0",
                      borderRadius: "10px 10px 10px 10px", 
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <h5
                        className="card-title"
                        style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
                      >
                        {name.toUpperCase()}
                      </h5>
                      <i
                        className="card-brand"
                        style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                      >
                        {"~ " + brand}
                      </i>
                    </div>
                    <hr className="hr-line" style={{ margin: "10px 0" }} />
                    <div className="home-cart-price">
                      <h5
                        className="card-text"
                        style={{ fontWeight: "600", fontSize: "1.1rem",marginBottom:'5px' }}
                      >
                          <i className="bi-currency-pound"></i>
                          {/*<FaNairaSign />*/}
                        {price}
                      </h5>
                    </div>
                    <button
                      className="btn-hover color-9"
                      style={{margin:'10px 25px 0px '  }}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      disabled={!productAvailable}
                    >
                      {productAvailable ? "Add to Cart" : "Out of Stock"}
                    </button> 
                  </div>
                </Link>
              </div>
            );
          })
        )}
          <ToastContainer />
      </div>
    </>
  );
};


const styles = {
    container:{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "60px",
        boxShadow: "0 0 10px #ccc",
        borderRadius: "8px",
    },
    button: {
        padding: "10px",
        fontSize: "20px",
        fontWeight:'600',
        background: "#51e008",
        color: "#ffffff",
        border: "none",
        cursor: "pointer"
    },
    align:{
        horizontalAlign:"200px",
        verticalAlign:"200px"
    }

}
export default Home;
