/** @format */
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/categories.module.css";
export const Categoris = () => {
  const [category, setCategory] = useState();
  useEffect(() => {
    setCategory([
      { name: "pc", img: "/icons/desktop-min.png" },
      { name: "phones", img: "/icons/smartphone-min.png" },
      { name: "headphone", img: "/icons/headphones-min.png" },
      { name: "playstation", img: "/icons/joystick-min.png" },
      { name: "speakers", img: "/icons/loudspeaker-min.png" },
      { name: "hard drive", img: "/icons/external-hard-drive-min.png" },
      { name: "cases", img: "/icons/phone-case-min.png" },
      { name: "watch", img: "/icons/smart-watch-min.png" },
      { name: "storge", img: "/icons/usb-flash-drive-min.png" },
    ]);
  }, []);

  return (
    <>
      <div className="label" id="categories">
        Categories
      </div>
      <div className={styles.categoryContanier}>
        {category &&
          category.map((category) => {
            return (
              <Link href={`/Products/${category.name}`} key={category.name}>
                <a className={styles.category}>
                  <img src={category.img} alt={category.name} width="50px" />
                  <div>{category.name}</div>
                </a>
              </Link>
            );
          })}
      </div>
    </>
  );
};
