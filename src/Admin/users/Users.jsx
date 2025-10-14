import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Loader from "../../components/Loader";
import { TiUserDelete } from "react-icons/ti";
import { TbUserEdit } from "react-icons/tb";

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
        <div className="bg-gray-100 flex h-screen">
            <div>Users</div>
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 bg-gray-100 min-h-screen">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Users</h1>
                    <div>
                        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                            <table className="min-w-full border-collapse border border-gray-200 text-left">
                                <thead className="bg-[#022C22] text-white">
                                    <tr>
                                        <th className=" border-gray-200 p-3">S/N</th>
                                        <th className=" border-gray-200 p-3">First Name</th>
                                        <th className=" border-gray-200 p-3">Last Name</th>
                                        <th className=" border-gray-200 p-3">Email</th>
                                        <th className=" border-gray-200 p-3">Phone</th>
                                        <th className=" border-gray-200 p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, i) => (
                                        <tr key={user._id}
                                            className="odd:bg-white even:bg-gray-50">
                                            <td className=" border-gray-200 p-4 text-gray-500">{i + 1}</td>
                                            <td className=" border-gray-200 p-4 text-gray-500">{user.first_name}</td>
                                            <td className=" border-gray-200 p-4 text-gray-500">{user.last_name}</td>
                                            <td className=" border-gray-200 p-4 text-gray-500">{user.email}</td>
                                            <td className=" border-gray-200 p-4 text-gray-500">{user.phone}</td>
                                            <td className=" border-gray-200 p-4 space-x-8">
                                                <button
                                                    // onClick={() => handleEdit(user)}
                                                    className="text-blue-600 hover:underline cursor-pointer"
                                                >
                                                    <TbUserEdit />
                                                </button>
                                                <button
                                                    // onClick={() => handleDelete(user._id)}
                                                    className="text-red-600 hover:underline cursor-pointer"
                                                >
                                                    <TiUserDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default Users;

