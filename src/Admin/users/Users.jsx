import { useState, useEffect } from "react";
import { Button, Modal, Input, Form, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useApp } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { API_BASE_URL, loading, setLoading } = useApp();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Show modal and prefill data
  const openEditModal = (user) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedUser(null);
  };

  useEffect(() => {
    const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
    if (!merchantData) {
      toast.warning("Please login to access the admin page ");
      navigate("/");
      return;
    }
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/users`);
        setUsers(res?.data);
      } catch (error) {
        toast.error("Error fetching users");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  //edit user
  const handleEditUser = async (values) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${API_BASE_URL}/users/${selectedUser._id}`,
        values
      );
      toast.success("User updated successfully!");

      // Refresh user list
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedId ? { ...user, ...values } : user
        )
      );

      setIsModalOpen(false);
      form.resetFields();
      setSelectedUser(null);
    } catch (error) {
      toast.error("Error updating user");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //delete user
  const handleDeleteUser = (user) => {
    confirm({
      title: `Are you sure you want to delete ${user.first_name} ${user.last_name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          setLoading(true);
          await axios.delete(`${API_BASE_URL}/users/${user._id}`);
          toast.success("User deleted successfully!");
          setUsers((prev) => prev.filter((u) => u._id !== user._id));
        } catch (error) {
          toast.error("Error deleting user");
          console.log("Delete error:", error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
            onClick={() => handleDeleteUser(record)}
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
            Users
        </header>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        size="small"
        pagination={{ pageSize: 100 }}
      />

      <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={form} // link the form
          layout="vertical"
          onFinish={handleEditUser}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Enter phone" />
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

export default Users;
