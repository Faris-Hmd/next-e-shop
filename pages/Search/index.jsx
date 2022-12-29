/** @format */

import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { baseUrl } from "..";
import styles from "../../styles/List.module.css";

const Search = () => {
  const [terms, setTerms] = useState("");
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = await fetch(`${baseUrl}/api/getSearchRes?terms=${terms}`);
    const res = await data.json().then(setIsLoading(false));
    setProducts(res);
  };

  return (
    <div className={styles.cart}>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          autoFocus
          type="text"
          placeholder="Type what you are search for"
          onChange={(e) => {
            setTerms(e.target.value);
          }}
          value={terms}
          //   className={styles.input}
        />
        <button
          type="submit"
          value={""}
          className={styles.submitBtn}
          onClick={(e) => handleSearch(e)}
        >
          <FaSearch />
        </button>
      </form>
      <div className={styles.searchFor}>
        <small>Search result for {terms}</small>
      </div>
      {isLoading && <h2>Loading...</h2>}
      {products &&
        products.map((product) => {
          return (
            <Link
              href={"/ProductDetails/" + product.id}
              className={styles.cartItem}
              key={product.id}
            >
              <img src={product.productImgs[0].url} alt={product.productName} />
              <div className={styles.itemDesc}>
                <div className={styles.itemName}>{product.productName}</div>
                <div className={styles.itemPrice}>${product.productPrice}</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Search;
