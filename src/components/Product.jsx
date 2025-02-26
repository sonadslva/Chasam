import React, { useState, useEffect } from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { dbRealtime, dbFirestore } from "../firebaseConfig";
import logo from "../assets/chasam.png";
import { IoMdLogOut } from "react-icons/io";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import pbg1 from "../assets/pbg1.jpeg";
import pbg2 from "../assets/pbg2.jpeg";
import { BiSolidFileImage } from "react-icons/bi";
import imgbbg from "../assets/imgbg.jpeg";

const ProductPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    purpose: "",
    description: "",
    usage: "",
    netQty: "",
    images: [],
    bgImage: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    const productsRef = ref(dbRealtime, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.entries(data).map(([id, product]) => ({
          id,
          ...product,
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });

    const categoriesRef = ref(dbRealtime, "categories");
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategories(Object.values(data));
      } else {
        setCategories([]);
      }
    });
  }, []);

  const handleLogout = () => navigate("/login");

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleSubmit = async () => {
    if (!productData.name || !productData.price) {
      alert("Please fill all required fields");
      return;
    }
  
    try {
      if (editMode && selectedProduct) {
        const productRef = ref(dbRealtime, `products/${selectedProduct.id}`);
        await update(productRef, productData);
  
        // Check if Firestore document exists before updating
        const firestoreDocRef = doc(dbFirestore, "productImages", selectedProduct.id);
        const docSnap = await getDoc(firestoreDocRef);
        
        if (docSnap.exists()) {
          await updateDoc(firestoreDocRef, {
            images: productData.images,
            bgImage: productData.bgImage,
          });
        } else {
          console.warn("No existing Firestore document found, skipping update.");
        }
  
        alert("Product updated successfully!");
      } else {
        // Add to Realtime Database
        const productsRef = ref(dbRealtime, "products");
        const newProductRef = await push(productsRef, productData);
  
        // Store images in Firestore only if images exist
        if (productData.images.length > 0) {
          await addDoc(collection(dbFirestore, "productImages"), {
            productId: newProductRef.key,
            images: productData.images,
            bgImage: productData.bgImage,
          });
        }
  
        alert("Product added successfully!");
      }
  
      resetForm();
      setShowForm(false);
      setEditMode(false);
      setSelectedImages(false);
      setImagePreview(false);
      setSelectedProduct(null);
      setProductData({
        name: "",
        category: "",
        price: "",
        purpose: "",
        description: "",
        netQty: "",
        images: [],
        bgImage: "",
      });
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const productRef = ref(dbRealtime, `products/${productId}`);
        await remove(productRef);

        // Delete images from Firestore if they exist
        const firestoreDocRef = doc(dbFirestore, "productImages", productId);
        await deleteDoc(firestoreDocRef);

        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product. Please try again.");
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductData(product);
    setEditMode(true);
    setShowForm(true);
    setShowProducts(false);
    
    // Set image previews for product images
    if (product.images && product.images.length > 0) {
      setSelectedImages(product.images);
      // Create dummy file names based on image count
      setFileNames(product.images.map((_, index) => `image-${index+1}.jpg`));
    }
    
    // Set background image preview
    if (product.bgImage) {
      setImagePreview(product.bgImage);
      setFileName("background-image.jpg");
    }
  };
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(previews);

    try {
      const base64Images = await Promise.all(
        files.map(async (file) => {
          // Add image compression here
          const compressedFile = await compressImage(file, 800); // Compress to max 800px width
          return await convertImageToBase64(compressedFile);
        })
      );
      setProductData({ ...productData, images: base64Images });
      setFileNames(files.map((file) => file.name));
    } catch (error) {
      console.error("Error processing images:", error);
      alert("Error processing images. Please try again with smaller files.");
    }
  };

  const handleBgImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Compress background image
        const compressedFile = await compressImage(file, 1200); // Larger width for background
        const base64Image = await convertImageToBase64(compressedFile);
        setProductData({ ...productData, bgImage: base64Image });
        setFileName(file.name);
        setImagePreview(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error processing background image:", error);
        alert(
          "Error processing background image. Please try again with a smaller file."
        );
      }
    }
  };
  const [fileNames, setFileNames] = useState([]);

  // const handleImageUpload = async (event) => {
  //   const files = Array.from(event.target.files);

  //   if (files.length > 6) {
  //     alert("You can only upload up to 6 images.");
  //     return;
  //   }

  //   setFileNames(files.map((file) => file.name)); // Store file names in state
  //   await handleImageUpload(event); // Call the original upload function
  // };

  const [fileName, setFileName] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name); // Set file name in state
      await handleBgImageUpload(event); // Call function to handle file upload
    } else {
      setFileName(""); // Reset if no file is selected
    }
  };

  const closeMenu = (e) => {
    if (!e.target.closest(".sidebar") && !e.target.closest(".menu-btn")) {
      setMenuOpen(false);
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };
  const compressImage = (file, maxWidth) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (maxWidth * height) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
              );
            },
            "image/jpeg",
            0.7
          ); // Compress with 70% quality
        };
      };
    });
  };
  const resetForm = () => {
    // Reset image previews and file names
    setSelectedImages([]);
    setFileNames([]);
    setImagePreview(null);
    setFileName("");
    
    // Reset all input fields
    setProductData({
      name: "",
      category: "",
      price: "",
      purpose: "",
      description: "",
      usage: "",
      netQty: "",
      images: [],
      bgImage: "",
    });
    
    // Reset edit mode and selected product
    setEditMode(false);
    setSelectedProduct(null);
  };
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${imgbbg})` }}
      />
      <div className="relative z-10">
        <div className="flex h-auto" onClick={closeMenu}>
          <div
            className={`sidebar fixed top-0 left-0 h-full z-[998] bg-[#00000007] backdrop-blur-sm shadow-lg w-14 transform transition-transform ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <AdminNav closeMenu={() => setMenuOpen(false)} />
          </div>

          <div className="flex flex-1 items-center w-full">
            <div className="flex items-center bg-[#00000000] py-4 px-0 z-[999] fixed top-0 w-full">
              <button
                className="menu-btn text-gray-700 text-2xl p-4 focus:outline-none ml-0"
                onClick={toggleMenu}
              >
                <FaEllipsisV className="text-white text-3xl" />
              </button>
              <div className="ml-[-5px] flex justify-center">
                <img src={logo} alt="Logo" className="w-14" />
              </div>
              <div
                className="flex justify-center ml-55 text-2xl cursor-pointer"
                onClick={handleLogout}
              >
                <IoMdLogOut className="text-white text-3xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col h-auto px-2 mt-[80px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center pt-5">
            MANAGE PRODUCTS
          </h2>

          <div className="flex gap-2 w-full">
            <div
              className="relative w-[50%] h-[180px] flex justify-center items-center rounded-3xl bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${pbg1})` }}
              onClick={() => {
                setShowForm(!showForm);
                setShowProducts(false);
                if (!showForm) {
                  resetForm();
                  setEditMode(false);
                  setSelectedProduct(null);
                  setProductData({
                    name: "",
                    category: "",
                    price: "",
                    purpose: "",
                    description: "",
                    netQty: "",
                    images: [],
                    bgImage: "",
                  });
                }
              }}
            >
              <div className="bg-[#000] absolute inset-0 w-full h-full -z-0 mix-blend-multiply opacity-30 rounded-3xl"></div>
              <button className="text-white relative px-6 py-3 rounded-lg text-2xl font-black">
                ADD PRODUCT
              </button>
            </div>

            <div
              className="relative w-[50%] h-[180px] flex justify-center items-center rounded-3xl bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${pbg2})` }}
              onClick={() => {
                setShowProducts(!showProducts);
                setShowForm(false);
                setSelectedImages(false);
                resetForm();
              }}
            >
              <div className="bg-[#000] absolute inset-0 w-full h-full -z-0 mix-blend-multiply opacity-30 rounded-3xl"></div>
              <button className="text-white relative px-6 py-3 rounded-lg text-2xl font-black">
                VIEW PRODUCTS
              </button>
            </div>
          </div>

          {showForm && (
            <div className="w-full max-w-md bg-[#CBBA9E] p-6 mt-6 rounded-lg shadow-lg mb-3">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                {editMode ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
              </h3>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg mb-2 bg-white"
              />
              <div className="relative w-full">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  id="productImageUpload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="border p-2 rounded-lg mb-2 bg-white flex items-center justify-between cursor-pointer">
                  <span
                    className={
                      fileNames.length ? "text-black" : "text-gray-500"
                    }
                  >
                    {fileNames.length ? fileNames.join(", ") : "Product Images"}
                  </span>
                  <BiSolidFileImage className="text-gray-500" />
                </div>
              </div>
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-2">
                    
                  {selectedImages.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              <div className="relative w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="bgImageUpload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="border p-2 rounded-lg mb-2 bg-white flex items-center justify-between cursor-pointer">
                  <span className={fileName ? "text-black" : "text-gray-500"}>
                    {fileName || "Background Image"}
                  </span>
                  <BiSolidFileImage className="text-gray-500" />
                </div>
              </div>
              {imagePreview && (
                <div className="mb-2">
                  <p className="text-sm text-white mb-1">
                    Background Image Preview:
                  </p>
                  <img
                    src={imagePreview}
                    alt="Background Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg mb-2 bg-white"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={productData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg mb-2 bg-white"
              />
              <textarea
                name="description"
                placeholder="Enter description"
                value={productData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg mb-2 bg-white"
              />
              <textarea
                name="usage"
                placeholder="Product Usage Instructions"
                value={productData.usage}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg mb-2 bg-white"
              />
              <input
                type="text"
                name="purpose"
                placeholder="Purpose"
                value={productData.purpose}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg mb-2 bg-white"
              />
              <input
                type="text"
                name="netQty"
                placeholder="Net Qty"
                value={productData.netQty}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg mb-2 bg-white"
              />
              <div className="mt-4 flex justify-center gap-2 w-full">
                <button
                  className="px-4 py-2 bg-[#8B6254] text-white rounded-lg w-full"
                  onClick={() => {
                    setShowForm(false);
                    setEditMode(false);
                    setSelectedProduct(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#435933] hover:bg-[#304421] text-white rounded-lg w-full"
                  onClick={handleSubmit}
                >
                  {editMode ? "Update" : "Submit"}
                </button>
              </div>
              

              
            </div>
          )}

          {showProducts && (
            <div className="mt-8 w-full backdrop-blur-xl p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-black mb-4 text-center">
                PRODUCT LIST
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] bg-white border rounded-lg">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2">Images</th>
                      <th className="p-2">Background</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Purpose</th>
                      <th className="p-2">Usage</th>
                      <th className="p-2">Net Qty</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b text-center">
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {product.images?.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Product ${index + 1}`}
                                className="w-12 h-12 object-cover rounded cursor-pointer"
                                onClick={() => window.open(img, "_blank")}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="p-2">
                          {product.bgImage ? (
                            <img
                              src={product.bgImage}
                              alt="Background"
                              className="w-16 h-16 object-cover rounded cursor-pointer"
                              onClick={() =>
                                window.open(product.bgImage, "_blank")
                              }
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400">No bg</span>
                            </div>
                          )}
                        </td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.category}</td>
                        <td className="p-2">{product.price}</td>
                        <td className="p-2 max-w-[200px]">
                          <div className="truncate">
                            {product.description}
                          </div>
                        </td>
                        <td className="p-2">{product.purpose}</td>
                        <td className="p-2">{product.usage}</td>
                        <td className="p-2">{product.netQty}</td>

                        <td className="p-2">
                          <button
                            className={`px-3 py-1 rounded-full text-sm ${
                              product.status === "active"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                            onClick={() => {
                              // Toggle status in Firebase
                              const newStatus =
                                product.status === "active"
                                  ? "inactive"
                                  : "active";
                              const productRef = ref(
                                dbRealtime,
                                `products/${product.id}`
                              );
                              update(productRef, { status: newStatus });
                            }}
                          >
                            {product.status === "active"
                              ? "Active"
                              : "Inactive"}
                          </button>
                        </td>
                        <td className="p-2">
                          <div className="flex justify-center gap-2">
                            <button
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                              onClick={() => handleEdit(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProductPage;
