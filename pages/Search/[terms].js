/** @format */

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { baseUrl } from "..";
import styles from "../../styles/List.module.css";

const Search = () => {
  const [terms, setTerms] = useState("");
  const [products, setProducts] = useState();

  const handleSearch = async () => {
    const querySnapShot = await fetch(
      `${baseUrl}/api/getSearchRes?terms=${terms}`
    );
    const res = await querySnapShot.json();
    setProducts(res);
  };
  return (
    <div className={styles.cart}>
      <form className="search-form w-90" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Type what you are search for"
          onChange={(e) => {
            setTerms(e.target.value);
          }}
          value={terms}
        />
        <button
          type="submit"
          value={""}
          className="submit-btn"
          onClick={(e) => handleSearch(e)}
        >
          <FaSearch />
        </button>
      </form>{" "}
      <div className="search-for">
        <small>Search result for {termWord}</small>
      </div>
      {products ? (
        products.map((product) => {
          return (
            <Link
              to={"/productDetail/" + product.id}
              className="cart-item Link"
              key={product.id}
            >
              <img src={product.productImgs[0].url} alt={product.productName} />
              <div className="item-desc">
                <div className="item-name">{product.productName}</div>
                <div className="item-price">${product.productPrice}</div>
              </div>
            </Link>
          );
        })
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Search;
