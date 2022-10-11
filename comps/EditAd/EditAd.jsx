/** @format */
import { serverTimestamp, updateDoc, getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Slider from "../../comps/ImagesSlider/Slider";
import { app, db } from "../../Firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import "./AddAdForm.css";
import { useNavigate, useParams } from "react-router-dom";
// import { UserContext } from "../../Context/UserProvider";
import { SwiperSlide } from "swiper/react";

const EditAdForm = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [product, setProduct] = useState();
  const [images, setImgs] = useState();
  const [productImgs, setProductImgs] = useState([]);
  //   const { user } = useContext(UserContext);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    productName: product?.productName,
    productCate: product?.productCate,
    productDesc: product?.productDesc,
    productPrice: product?.productPrice,
    ownerPhone: product?.ownerPhone,
  });
  const getProduct = async () => {
    const q = await getDoc(doc(db, "products", id));
    console.log(q.data());
    setProduct(q.data());
    setFormData({
      productName: q.data().productName,
      productCate: q.data().productCate,
      productDesc: q.data().productDesc,
      productPrice: q.data().productPrice,
      ownerPhone: q.data().ownerPhone,
    });
    setImgs(q.data().productImgs);
  };
  const nav = useNavigate();

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
  // console.log(images);

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
      //if the imgs does not change don't upload it.
      if (!img.productImgFile) {
        setProductImgs((prevImgs) => [...prevImgs, { url: img.url }]);
        return;
      }
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
    !product && getProduct();
  }, []); //eslint-disable-line
  useEffect(() => {
    if (productImgs.length === 0) return;

    if (productImgs.length === images.length) {
      const editProductDetail = async () => {
        try {
          updateDoc(doc(db, "products", id), {
            ...formData,
            productImgs: productImgs,
            ownerPhone: formData.ownerPhone,
            EditedAt: serverTimestamp(),
          });
          setIsUpload(false);
          nav("/");
        } catch (e) {
          setIsUpload(false);
          console.error("Error adding document: ", e);
        }
      };
      editProductDetail();
    }
  }, [productImgs]); // eslint-disable-line

  return product ? (
    <>
      <div className="label">Add your Advertise</div>
      <form onSubmit={(e) => handleUploadProductImg(e)} className="add-ad-form">
        <div className="side">
          <div className="input-container">
            {images && (
              <Slider preView={1}>
                {images.map((img, index) => {
                  return (
                    <SwiperSlide
                      key={index}
                      onDoubleClick={() => removeImage(img.url)}
                    >
                      <div className="img-con">
                        <img
                          src={img.url}
                          alt={img.url}
                          className="slider-img"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Slider>
            )}
            <label htmlFor="productImg" className="pro-img-input-labal">
              Add Product Images
            </label>
            <input
              accept="image/*"
              multiple
              id="productImg"
              type="file"
              onChange={handleImgChange}
              className="pro-img-input"
            />
            <div className="help">* to remove any image double click on it</div>
          </div>
        </div>
        <div className="side">
          <div className="input-container">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="productName">Product Category</label>
            <select
              required
              placeholder="Product Category"
              name="productCate"
              value={formData.productCate}
              onChange={handleChange}
            >
              <option value="phones">phones</option>
              <option value="pc">personal computer</option>
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
          <div className="input-container">
            <label htmlFor="productName">Product Price</label>
            <input
              type="number"
              placeholder="Product Price"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="productName">Product Description</label>
            <textarea
              placeholder="Product Description"
              name="productDesc"
              value={formData.productDesc}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="owner-phone">Phone number</label>
            <input
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
            className="submit-btn"
          />
        </div>
      </form>
    </>
  ) : (
    <h2>Loading...</h2>
  );
};

export default EditAdForm;
