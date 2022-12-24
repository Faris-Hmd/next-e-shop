/** @format */
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../../styles/Welcome.module.css";
const Welcome = () => {
  // const nav = useNavigate();
  const [term, setTerm] = useState("");
  // const handleSearch = () => {
  //   nav("/search/" + term);
  // };
  return (
    <div className={styles.front}>
      <div className={styles.welcome}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio rem
        <br />
        <form className={styles.searchForm}>
          <input
            className={styles.formInput}
            type="text"
            onChange={(e) => {
              setTerm(e.target.value);
            }}
            value={term}
            placeholder="type what you are search for"
          />
          <button
            type="submit"
            className={styles.submitBtn}
            // onClick={() => handleSearch()}
          >
            <FaSearch color="#eee" />
          </button>
        </form>
        <a href="#categories">Order Now</a>
      </div>
    </div>
  );
};

export default Welcome;
