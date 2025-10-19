import { useState, useEffect } from "react";
import { Button, Modal, Input, Form, Table, Image } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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

  // Show modal and prefill form fields
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setTimeout(() => {
      form.setFieldsValue(product);
    }, 0);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedProduct(null);
  };

  // Fetch products on mount
  useEffect(() => {
    const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
    if (!merchantData) {
      toast.warning("Merchnat not found. Please log in.");
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
        console.log(res)
      } catch (error) {
        toast.error("Error fetching products");
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [API_BASE_URL, navigate, setLoading]);

  // Update a product
  const handleEditProduct = async (values) => {
    // if (!selectedProduct?._id) return;
    try {
      setLoading(true);
      const res = await axios.put(`${API_BASE_URL}/products/${selectedProduct.id}`, values);

      toast.success("Product updated successfully!");

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...values } : p
        )
      );

      setIsModalOpen(false);
      form.resetFields();
      setSelectedProduct(null);
    } catch (error) {
      toast.error("Error updating product");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const handleDeleteProduct = (product) => {
    confirm({
      title: `Are you sure you want to delete ${product.title}?`,
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

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        const imgSrc = Array.isArray(image)
          ? image[0]
          : typeof image === "string"
            ? image
            : image?.url || null;
        return imgSrc ? (
          <Image
            src={imgSrc}
            alt="product"
            width={100}
            height={100}
            style={{ objectFit: "contain", borderRadius: 4 }}
          />
        ) : (
          "No image"
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
          <Button
            size="small"
            danger
            onClick={() => handleDeleteProduct(record)}
          >
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

      <Modal
        title="Edit Product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditProduct}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter product title" }]}
          >
            <Input placeholder="Product title" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input placeholder="Image URL" />
          </Form.Item>

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

