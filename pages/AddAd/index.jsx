/** @format */
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Slider from "../../comps/ImagesSlider/Slider";
import { app, db } from "../../Firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../Context/UserProvider";
import { SwiperSlide } from "swiper/react";
import styles from "../../styles/AddAdForm.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const AddAdForm = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [images, setImgs] = useState([]);
  const [productImgs, setProductImgs] = useState([]);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    productName: "",
    productCate: "pc",
    productDesc: "",
    productPrice: 1,
    ownerPhone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const handleImgChange = (e) => {
    const { files } = e.target;
    console.log(files.length);
    for (let index = 0; index < files.length; index++) {
      setImgs((prevImg) => [
        ...prevImg,
        {
          url: URL.createObjectURL(files[index]),
          productImgFile: files[index],
        },
      ]);
    }
  };

  const removeImage = (url) => {
    const newImg = [];
    images.forEach((img) => {
      // console.log(img);
      if (img.url !== url) newImg.push(img);
    });
    setImgs(newImg);
  };

  const handleUploadProductImg = async (e) => {
    const { getStorage } = await import("firebase/storage");
    const storage = getStorage(app);
    e.preventDefault();
    setIsUpload(true);

    images.forEach((img) => {
      const imgRef = ref(storage, img.productImgFile.name);
      const uploadTask = uploadBytesResumable(imgRef, img.productImgFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          setIsUpload(false);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setProductImgs((prevImgs) => [...prevImgs, { url: downloadURL }]);
          });
        }
      );
    });
  };

  useEffect(() => {
    if (productImgs.length === 0) return;

    if (productImgs.length === images.length) {
      const addProductDetail = async () => {
        try {
          const docRef = await addDoc(collection(db, "products"), {
            ...formData,
            comments: [],
            rating: 0,
            productImgs: productImgs,
            ownerId: user.id,
            ownerPhone: formData.ownerPhone,
            isOffer: false,
            date: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
          setIsUpload(false);
        } catch (e) {
          setIsUpload(false);
          console.error("Error adding document: ", e);
        }
      };
      addProductDetail();
      nav("/");
    }
  }, [productImgs]); // eslint-disable-line

  return (
    <>
      {/* <div className="label">Add your Advertise</div> */}
      <form
        onSubmit={(e) => handleUploadProductImg(e)}
        className={styles.addAdForm}
      >
        <div className={styles.side}>
          <div className={styles.inputContainer}>
            {images.length > 0 && (
              <Slider preView={2} >
                {images.map((img, index) => {
                  return (
                    <SwiperSlide
                      key={index}
                      onDoubleClick={() => removeImage(img.url)}
                    >
                      <div className={styles.imgCon}>
                        <img
                          src={img.url}
                          alt={img.url}
                          className={styles.productImg}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Slider>
            )}
            <label htmlFor="productImg" className={styles.proImgInputLabal}>
              Add Product Images
            </label>
            <input
              accept="image/*"
              multiple
              id="productImg"
              type="file"
              onChange={handleImgChange}
              className={styles.proImgInput}
            />
            <div className={styles.help}>
              * to remove any image double click on it
            </div>
          </div>
        </div>
        <div className={styles.side}>
          <div className={styles.inputContainer}>
            <label htmlFor="productName" className={styles.label}>
              Product Name
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="productName" className={styles.label}>
              Product Category
            </label>
            <select
              className={styles.select}
              required
              placeholder="Product Category"
              name="productCate"
              value={formData.productCate}
              onChange={handleChange}
            >
              <option value="pc">personal computer</option>
              <option value="phones">phones</option>
              <option value="headphone">headphonee</option>
              <option value="playstation">playstation</option>
              <option value="speakers">speakers</option>
              <option value="hard-drive">hard drive</option>
              <option value="cases">cases</option>
              <option value="watch">smart watch</option>
              <option value="coffee">coffee</option>
              <option value="storge">Storge device</option>
            </select>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="productName">Product Price</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Product Price"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="productName" className={styles.label}>
              Product Description
            </label>
            <textarea
              className={styles.input}
              placeholder="Product Description"
              name="productDesc"
              value={formData.productDesc}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="owner-phone" className={styles.label}>
              Phone number
            </label>
            <input
              className={styles.input}
              type="number"
              placeholder="example (249123456789)"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
            />
          </div>
          <input
            required={true}
            type="submit"
            value={isUpload ? "Uploading...." : "Done"}
            disabled={isUpload}
            className={styles.submitBtn}
          />
        </div>
      </form>
    </>
  );
};

export default AddAdForm;
// imgs.forEach((img) => {
// const imgRef = ref(storage, img.url.name);
// uploadBytes(imgRef, img.url).then((snapshot) => {
//   console.log("Uploaded a blob or file!");
//   });
// });
//------------ for future project (^ _ ^) -------//
// const arr = e.target;
// for (let i = 0; i < arr.length - 1; i++) {
//   const element = arr[i];
//   setFormData((prevData) => {
//     return [...prevData, { qname: element.name, qanswer: element.value }];
//   });
// }
