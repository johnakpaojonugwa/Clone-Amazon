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
  const [selectedProducts, setSelectedProducts] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Show modal and prefill data
  const openEditModal = (product) => {
    setSelectedProducts(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedProducts(null);
  };

  useEffect(() => {
    const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
    if (!merchantData) {
      toast.warning("Please login to access the admin page ");
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
        console.log(res.data);
      } catch (error) {
        toast.error("Error fetching products");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  //edit product
  const handleEditProduct = async (values) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${API_BASE_URL}/products/${selectedProducts._id}`,
        values
      );
      toast.success("products updated successfully!");

      // Refresh product list
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === selectedProducts._id ? { ...p, ...values } : p
        )
      );

      handleCancel();
      setSelectedProducts(null);
    } catch (error) {
      toast.error("Error updating products");
      console.log("Error updating products:", error);
    } finally {
      setLoading(false);
    }
  };

  //delete product
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
          await axios.delete(`${API_BASE_URL}/products/${product._id}`);
          setProducts((prev) => prev.filter((u) => u._id !== product._id));
        } catch (error) {
          toast.error("Error deleting product");
          console.error("Delete error:", error.response?.data || error.message);
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
      render: (image) =>
        image ? (
          <Image
            src={Array.isArray(image) ? image[0] : image}
            alt="product"
            width={100}
            height={100}
            style={{ objectFit: "contain", borderRadius: 4 }}
          />
        ) : (
          "No image"
        ),
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
        products
      </header>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        size="small"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Edit product"
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
            rules={[{ required: true, message: "Please enter Image URL" }]}
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