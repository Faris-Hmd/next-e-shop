/** @format */

import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Firebase/firebase";

const Search = () => {
  const { terms } = useParams();
  const [term, setTerm] = useState(terms);
  const [termWord, setTermWord] = useState(terms);

  const [products, setProducts] = useState();
  const handleSearch = async (e) => {
    setProducts();
    setTermWord(term);
    e.preventDefault();
    const arr = [];
    const querySnapshot = await getDocs(
      query(collection(db, "products"), where("productName", ">=", term))
    );

    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setProducts(arr);
  };

  const searchByParam = async () => {
    const arr = [];
    const querySnapshot = await getDocs(
      query(collection(db, "products"), where("productName", ">=", terms))
    );

    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setProducts(arr);
  };

  useEffect(() => {
    searchByParam();
  }, []); //eslint-disable-line
  return (
    <div className="cart">
      <form className="search-form w-90">
        <input
          type="text"
          placeholder="type what you are search for"
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          value={term}
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
