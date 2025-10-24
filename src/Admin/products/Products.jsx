// import { useState, useEffect } from "react";
// import { Button, Modal, Input, Form, Table, Image } from "antd";
// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { useApp } from "../../context/AppContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { FaUserEdit } from "react-icons/fa";
// import { MdDeleteSweep } from "react-icons/md";

// const Products = () => {
//   const { confirm } = Modal;
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { API_BASE_URL, loading, setLoading } = useApp();
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const navigate = useNavigate();
//   const [form] = Form.useForm();

//   // Show modal and prefill form fields
//   const openEditModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//     setTimeout(() => {
//       form.setFieldsValue(product);
//     }, 0);
//   };


//   const handleCancel = () => {
//     setIsModalOpen(false);
//     form.resetFields();
//     setSelectedProduct(null);
//   };

//   // Fetch products on mount
//   useEffect(() => {
//     const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
//     if (!merchantData) {
//       toast.warning("Merchant not found. Please log in.");
//       navigate("/");
//       return;
//     }

//     const getProducts = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${API_BASE_URL}/products?merchant_id=${merchantData.id}`
//         );
//         setProducts(res?.data?.data || []);
//         console.log(res)
//       } catch (error) {
//         toast.error("Error fetching products");
//         console.log("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProducts();
//   }, [API_BASE_URL, navigate, setLoading]);

//   // Update a product
//   const handleEditProduct = async (values) => {
//     // if (!selectedProduct?._id) return;
//     try {
//       setLoading(true);
//       const res = await axios.put(`${API_BASE_URL}/products/${selectedProduct.id}`, values);

//       toast.success("Product updated successfully!");

//       setProducts((prevProducts) =>
//         prevProducts.map((p) =>
//           p.id === selectedProduct.id ? { ...p, ...values } : p
//         )
//       );

//       setIsModalOpen(false);
//       form.resetFields();
//       setSelectedProduct(null);
//     } catch (error) {
//       toast.error("Error updating product");
//       console.log("Update error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a product
//   const handleDeleteProduct = (product) => {
//     confirm({
//       title: `Are you sure you want to delete ${product.title}?`,
//       icon: <ExclamationCircleOutlined />,
//       okText: "Yes, Delete",
//       okType: "danger",
//       cancelText: "Cancel",
//       async onOk() {
//         try {
//           setLoading(true);
//           await axios.delete(`${API_BASE_URL}/products/${product.id}`);

//           toast.success("Product deleted successfully!");
//           setProducts((prev) => prev.filter((p) => p.id !== product.id));
//         } catch (error) {
//           toast.error("Error deleting product");
//           console.log("Delete error:", error.response?.data || error.message);
//         } finally {
//           setLoading(false);
//         }
//       },
//     });
//   };

//   const columns = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Image",
//       dataIndex: "image",
//       key: "image",
//       render: (image) => {
//         const imgSrc = Array.isArray(image)
//           ? image[0]
//           : typeof image === "string"
//             ? image
//             : image?.url || null;
//         return imgSrc ? (
//           <Image
//             src={imgSrc}
//             alt="product"
//             width={100}
//             height={100}
//             style={{ objectFit: "contain", borderRadius: 4 }}
//           />
//         ) : (
//           "No image"
//         );
//       },
//     },
//     {
//       title: "Price (₦)",
//       dataIndex: "price",
//       key: "price",
//     },
//     {
//       title: "Brand",
//       dataIndex: "brand",
//       key: "brand",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <div style={{ display: "flex", gap: "8px" }}>
//           <Button size="small" onClick={() => openEditModal(record)}>
//             <FaUserEdit />
//           </Button>
//           <Button
//             size="small"
//             danger
//             onClick={() => handleDeleteProduct(record)}
//           >
//             <MdDeleteSweep />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <header className="text-center mx-auto text-2xl py-2 font-semibold shadow-md bg-white my-3">
//         Products
//       </header>

//       <Table
//         dataSource={products}
//         columns={columns}
//         rowKey="id"
//         size="small"
//         pagination={{ pageSize: 5, showSizeChanger: true }}
//       />

//       <Modal
//         title="Edit Product"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//         destroyOnHidden
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleEditProduct}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Title"
//             name="title"
//             rules={[{ required: true, message: "Please enter product title" }]}
//           >
//             <Input placeholder="Product title" />
//           </Form.Item>

//           <Form.Item
//             label="Image"
//             name="image"
//             rules={[{ required: true, message: "Please enter image URL" }]}
//           >
//             <Input placeholder="Image URL" />
//           </Form.Item>

//           <Form.Item
//             label="Price"
//             name="price"
//             rules={[{ required: true, message: "Please enter product price" }]}
//           >
//             <Input placeholder="Product price" />
//           </Form.Item>

//           <Form.Item
//             label="Brand"
//             name="brand"
//             rules={[{ required: true, message: "Please enter product brand" }]}
//           >
//             <Input placeholder="Product brand" />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block loading={loading}>
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>


//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Products;

import { useState, useEffect } from "react";
import { Button, Modal, Input, Form, Table, Image, Space } from "antd";
import { ExclamationCircleOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useApp } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const Products = () => {
  const { confirm } = Modal;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { API_BASE_URL, loading, setLoading } = useApp();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Extra local states for editing multiple image URLs
  const [images, setImages] = useState([]);
  const [tempImage, setTempImage] = useState("");

  // Fetch products
  useEffect(() => {
    const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
    if (!merchantData) {
      toast.warning("Merchant not found. Please log in.");
      navigate("/");
      return;
    }

    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE_URL}/products?merchant_id=${merchantData.id}`
        );
        setProducts(res?.data?.data || []);
      } catch (error) {
        toast.error("Error fetching products");
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [API_BASE_URL, navigate, setLoading]);

  // Open modal and preload values
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    form.setFieldsValue(product);

    // Support both single & multiple image formats
    const existingImages = Array.isArray(product.images)
      ? product.images
      : product.image
      ? [product.image]
      : [];
    setImages(existingImages);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedProduct(null);
    setImages([]);
    setTempImage("");
  };

  // Add new image URL
  const handleAddImage = () => {
    if (!tempImage.trim()) return toast.warning("Enter image URL first");
    setImages((prev) => [...prev, tempImage]);
    setTempImage("");
  };

  // Remove image by index
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Update a product
  const handleEditProduct = async (values) => {
    try {
      setLoading(true);
      const payload = { ...values, images };

      await axios.put(`${API_BASE_URL}/products/${selectedProduct.id}`, payload);

      toast.success("Product updated successfully!");

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...payload } : p
        )
      );

      handleCancel();
    } catch (error) {
      toast.error("Error updating product");
      console.log("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const handleDeleteProduct = (product) => {
    confirm({
      title: `Are you sure you want to delete "${product.title}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          setLoading(true);
          await axios.delete(`${API_BASE_URL}/products/${product.id}`);
          toast.success("Product deleted successfully!");
          setProducts((prev) => prev.filter((p) => p.id !== product.id));
        } catch (error) {
          toast.error("Error deleting product");
          console.log("Delete error:", error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Table Columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (imgs) => {
        const imagesArray = Array.isArray(imgs)
          ? imgs
          : typeof imgs === "string"
          ? [imgs]
          : imgs?.url
          ? [imgs.url]
          : [];

        return imagesArray.length > 0 ? (
          <Space wrap>
            {imagesArray.map((img, i) => (
              <Image
                key={i}
                src={img}
                width={60}
                height={60}
                alt="product"
                style={{ objectFit: "cover", borderRadius: 4 }}
              />
            ))}
          </Space>
        ) : (
          "No images"
        );
      },
    },
    {
      title: "Price (₦)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button size="small" onClick={() => openEditModal(record)}>
            <FaUserEdit />
          </Button>
          <Button size="small" danger onClick={() => handleDeleteProduct(record)}>
            <MdDeleteSweep />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="text-center mx-auto text-2xl py-2 font-semibold shadow-md bg-white my-3">
        Products
      </header>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        size="small"
        pagination={{ pageSize: 5, showSizeChanger: true }}
      />

      {/* EDIT MODAL */}
      <Modal
        title="Edit Product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleEditProduct} autoComplete="off">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter product title" }]}
          >
            <Input placeholder="Product title" />
          </Form.Item>

          {/* Multiple Images */}
          <div style={{ marginBottom: "16px" }}>
            <label className="block text-sm font-medium mb-1">Product Images</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Enter image URL"
                value={tempImage}
                onChange={(e) => setTempImage(e.target.value)}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddImage}>
                Add
              </Button>
            </div>

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`img-${index}`}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter product price" }]}
          >
            <Input placeholder="Product price" />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please enter product brand" }]}
          >
            <Input placeholder="Product brand" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Products;
