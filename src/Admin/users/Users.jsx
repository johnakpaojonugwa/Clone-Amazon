// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../../api";
// import Loader from "../../components/Loader";
// import { TiUserDelete } from "react-icons/ti";
// import { TbUserEdit } from "react-icons/tb";

// function Users() {
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [load, setLoad] = useState(true);

//     useEffect(() => {
//         const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
//         if (!merchantData) {
//             navigate("/login");
//             return;
//         }
//         const getUsers = async () => {
//             try {
//                 const resp = await api.get("/users");
//                 const data = await resp.data;
//                 setUsers(data);
//                 setLoad(false);
//             } catch (err) {
//                 console.log("Error fetching users:", err);
//             }
//         }
//         getUsers();
//     }, []);

//     if (load) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <Loader />
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gray-100 flex h-screen">
//             {/* Main Content */}
//             <div className="flex-1 overflow-y-auto">
//                 {/* Header */}
//                 <header className="flex justify-between items-center p-5 bg-white shadow">
//                     <h1 className="text-xl font-semibold text-gray-800">Users</h1>
//                 </header>
//                 <div className="min-h-dvh bg-[#f9f9f9] mt-10">
//                     <div className="overflow-x-auto bg-white shadow-md rounded-xl">
//                         <div className="text-center text-xl font-semibold text-gray-800 py-7">
//                             <h1>Users Table</h1>
//                         </div>
//                         <table className="min-w-full border-collapse border border-gray-200 text-left">
//                             <thead className="bg-[#022C22] text-white">
//                                 <tr>
//                                     <th className=" border-gray-200 p-3">S/N</th>
//                                     <th className=" border-gray-200 p-3">First Name</th>
//                                     <th className=" border-gray-200 p-3">Last Name</th>
//                                     <th className=" border-gray-200 p-3">Email</th>
//                                     <th className=" border-gray-200 p-3">Phone</th>
//                                     <th className=" border-gray-200 p-3">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((user, i) => (
//                                     <tr key={user._id}
//                                         className="odd:bg-white even:bg-gray-50">
//                                         <td className=" border-gray-200 p-4 text-gray-500">{i + 1}</td>
//                                         <td className=" border-gray-200 p-4 text-gray-500">{user.first_name}</td>
//                                         <td className=" border-gray-200 p-4 text-gray-500">{user.last_name}</td>
//                                         <td className=" border-gray-200 p-4 text-gray-500">{user.email}</td>
//                                         <td className=" border-gray-200 p-4 text-gray-500">{user.phone}</td>
//                                         <td className=" border-gray-200 p-4 space-x-8">
//                                             <button
//                                                 // onClick={() => handleEdit(user)}
//                                                 className="text-blue-600 hover:underline cursor-pointer"
//                                             >
//                                                 <TbUserEdit />
//                                             </button>
//                                             <button
//                                                 // onClick={() => handleDelete(user._id)}
//                                                 className="text-red-600 hover:underline cursor-pointer"
//                                             >
//                                                 <TiUserDelete />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }
// export default Users;

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
      console.error(error);
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
          console.error("Delete error:", error.response?.data || error.message);
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
