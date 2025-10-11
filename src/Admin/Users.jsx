import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(true);


    useEffect(() => {
        const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
        if (!merchantData) {
            navigate("/login");
            return;
        }
        const getUsers = async () => {
            try {
                const resp = await api.get("/users");
                const data = await resp.data;
                setUsers(data);
                setLoad(false);
            } catch (err) {
                console.log("Error fetching users:", err);
            }
        }
        getUsers();
    }, []);


    if (load) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Users</h1>
            <div>
                <div className="overflow-x-auto bg-white shadow-md rounded-md">
                    <table className="min-w-full border-collapse border border-gray-200 text-left">
                        <thead className="bg-blue-950 text-white">
                            <tr>
                                <th className="border border-gray-200 p-3">First Name</th>
                                <th className="border border-gray-200 p-3">Last Name</th>
                                <th className="border border-gray-200 p-3">Email</th>
                                <th className="border border-gray-200 p-3">Phone</th>
                                <th className="border border-gray-200 p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="border border-gray-200 p-3">{user.first_name}</td>
                                    <td className="border border-gray-200 p-3">{user.last_name}</td>
                                    <td className="border border-gray-200 p-3">{user.email}</td>
                                    <td className="border border-gray-200 p-3">{user.phone}</td>
                                    {/* <td className="border border-gray-200 p-3 space-x-3">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        📝
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        ❌
                                    </button>
                                </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Users;

// import { useEffect, useState } from "react";
// import api from "../api"; // your axios instance
// import { useNavigate } from "react-router-dom";

// function Users() {
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [editingUser, setEditingUser] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [formData, setFormData] = useState({
//         first_name: "",
//         last_name: "",
//         email: "",
//         phone: "",
//     });

//     useEffect(() => {
//         const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
//         if (!merchantData) {
//             alert("Merchant not found. Please log in.");
//             navigate("/login");
//             return;
//         }

//         // Fetch users on load
//         const fetchUsers = async () => {
//             try {
//                 const res = await api.get("/users");
//                 setUsers(res.data || []);
//             } catch (err) {
//                 console.log("Error fetching users:", err);
//             }
//         };

//         fetchUsers();
//     }, [navigate]);

//     // Handle edit button click
//     const handleEdit = (user) => {
//         setEditingUser(user);
//         setFormData({
//             first_name: user.first_name,
//             last_name: user.last_name,
//             email: user.email,
//             phone: user.phone,
//         });
//         setShowModal(true);
//     };

//     // Handle delete button click
//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to remove this user?")) {
//             setUsers((prev) => prev.filter((u) => u._id !== id));
//             alert("User removed successfully");
//         }
//     };

//     // Handle form input change
//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     // Handle user update (PUT)
//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         if (!editingUser) return;

//         try {
//             const res = await api.put(`/users/${editingUser._id}`, formData);
//             alert("User updated successfully");
//             setUsers((prev) =>
//                 prev.map((u) => (u._id === editingUser._id ? res.data : u))
//             );
//             setShowModal(false);
//             setEditingUser(null);
//         } catch (err) {
//             console.error("Error updating user:", err);
//             alert("Failed to update user");
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-semibold mb-6">Users</h1>

//             {/* Users Table */}
//             <div className="overflow-x-auto bg-white shadow-md rounded-md">
//                 <table className="min-w-full border-collapse border border-gray-200 text-left">
//                     <thead className="bg-blue-950 text-white">
//                         <tr>
//                             <th className="border border-gray-200 p-3">First Name</th>
//                             <th className="border border-gray-200 p-3">Last Name</th>
//                             <th className="border border-gray-200 p-3">Email</th>
//                             <th className="border border-gray-200 p-3">Phone</th>
//                             <th className="border border-gray-200 p-3">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user._id}>
//                                 <td className="border border-gray-200 p-3">{user.first_name}</td>
//                                 <td className="border border-gray-200 p-3">{user.last_name}</td>
//                                 <td className="border border-gray-200 p-3">{user.email}</td>
//                                 <td className="border border-gray-200 p-3">{user.phone}</td>
//                                 <td className="border border-gray-200 p-3 space-x-3">
//                                     <button
//                                         onClick={() => handleEdit(user)}
//                                         className="text-blue-600 hover:underline"
//                                     >
//                                         📝
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(user._id)}
//                                         className="text-red-600 hover:underline"
//                                     >
//                                         ❌
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Edit User Modal */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-[90%] md:w-[40%] shadow-lg relative">
//                         <h2 className="text-lg font-semibold mb-4">Edit User</h2>

//                         <form onSubmit={handleUpdate}>
//                             <div className="space-y-4">
//                                 <input
//                                     id="first_name"
//                                     type="text"
//                                     value={formData.first_name}
//                                     onChange={handleChange}
//                                     placeholder="First Name"
//                                     className="w-full border p-2 rounded"
//                                     required
//                                 />
//                                 <input
//                                     id="last_name"
//                                     type="text"
//                                     value={formData.last_name}
//                                     onChange={handleChange}
//                                     placeholder="Last Name"
//                                     className="w-full border p-2 rounded"
//                                     required
//                                 />
//                                 <input
//                                     id="email"
//                                     type="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     placeholder="Email"
//                                     className="w-full border p-2 rounded"
//                                     required
//                                 />
//                                 <input
//                                     id="phone"
//                                     type="text"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     placeholder="Phone"
//                                     className="w-full border p-2 rounded"
//                                     required
//                                 />
//                             </div>

//                             <div className="flex justify-between mt-6">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowModal(false)}
//                                     className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900"
//                                 >
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Users;
