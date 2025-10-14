import { useEffect, useState } from "react";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

function Dashboard() {
    const navigate = useNavigate();
    const [MerchantUser, setMerchant] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCartProducts, setTotalCartProducts] = useState(0);
    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
        if (!merchantData) {
            alert("Merchant not found. Please log in.");
            navigate("/login");
            return;
        }
        setMerchant(merchantData);
        const userData = JSON.parse(localStorage.getItem("Account_login")) || {};

        const fetchTotalProducts = async () => {
            try {
                const res = await api.get(`/products?merchant_id=${merchantData.id}`);
                const data = await res.data;
                const count = data.total ?? (Array.isArray(data) ? data.length : 0);
                setLoad(false);
                setTotalProducts(count);
            } catch (err) {
                console.error("Error fetching total products:", err);
            }
        };

        const fetchTotalUsers = async () => {
            try {
                const res = await api.get(`/users`);
                setLoad(false);
                setTotalUsers(res.data.length);
            } catch (err) {
                console.error("Error fetching total users:", err);
            }
        };

        const fetchTotalCartProducts = async () => {
            const user_id = userData?.id;
            if (!user_id) {
                // console.log("No user logged in");
                setTotalCartProducts(0);
                return;
            }

            try {
                const res = await api.get(`/carts?user_id=${user_id}`);
                const cartItems = res.data.data || res.data || [];
                const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
                setLoad(false);
                setTotalCartProducts(totalQuantity);
            } catch (err) {
                console.error("Error fetching cart count:", err);
                setTotalCartProducts(0);
            }
        };

        const fetchProducts = async () => {
            try {
                const res = await api.get(`/products?merchant_id=${merchantData.id}`);
                const data = Array.isArray(res.data) ? res.data : res.data.data || [];
                setLoad(false);
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchTotalProducts();
        fetchTotalUsers();
        fetchTotalCartProducts();
        fetchProducts();
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
            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                {/* Summary Cards */}
                <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-sm text-gray-500">Total Products</h2>
                        <p className="text-2xl font-bold mt-2">{totalProducts}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-sm text-gray-500">Total Users</h2>
                        <p className="text-2xl font-bold mt-2">{totalUsers}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-sm text-gray-500">Total Products in Carts</h2>
                        <p className="text-2xl font-bold mt-2">{totalCartProducts}</p>
                    </div>
                </section>

                {/* Product Table */}
                <header>
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b border-gray-200 pb-3">
                        Products
                    </h2>
                </header>
                {load ? (
                    <Loader message="Loading products..." />
                ) : products.length ? (
                    <div className="overflow-x-auto px-6 sticky md:top-10 self-start">
                    <table className="min-w-full border-collapse border border-gray-200 text-left">
                        <thead className="bg-teal-800 text-white">
                            <tr>
                                <th className="border border-gray-200 p-3">Title</th>
                                <th className="border border-gray-200 p-3">Image</th>
                                <th className="border border-gray-200 p-3">Price</th>
                                <th className="border border-gray-200 p-3">Brand</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, i) => (
                                <tr key={i}>
                                    <td className="border border-gray-200 p-3">{product.title}</td>
                                    <td className="border border-gray-200 p-3">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-24 h-24 object-contain mx-auto rounded-sm"
                                        />
                                    </td>
                                    <td className="border border-gray-200 p-3">{product.price}</td>
                                    <td className="border border-gray-200 p-3">{product.brand}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ) : (
                    <p className="text-center text-gray-500">No products found</p>
                )}
                
            </div>
        </div>
    );
}

export default Dashboard;


// import { useEffect, useState } from "react";
// import api from "../api";
// import Loader from "../components/Loader";

// function Dashboard() {
//   const [merchant, setMerchant] = useState(null);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalCartProducts, setTotalCartProducts] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [load, setLoad] = useState(true);

//   useEffect(() => {
//     const merchantData = JSON.parse(localStorage.getItem("MerchantUser"));
//     if (!merchantData) return;

//     setMerchant(merchantData);
//     const userData = JSON.parse(localStorage.getItem("Account_login")) || {};

//     const fetchTotalProducts = async () => {
//       try {
//         const res = await api.get(`/products?merchant_id=${merchantData.id}`);
//         const data = res.data;
//         const count = data.total ?? (Array.isArray(data) ? data.length : 0);
//         setTotalProducts(count);
//       } catch (err) {
//         console.error("Error fetching total products:", err);
//       }
//     };

//     const fetchTotalUsers = async () => {
//       try {
//         const res = await api.get(`/users`);
//         setTotalUsers(res.data.length);
//       } catch (err) {
//         console.error("Error fetching total users:", err);
//       }
//     };

//     const fetchTotalCartProducts = async () => {
//       const user_id = userData?.id;
//       if (!user_id) return;
//       try {
//         const res = await api.get(`/carts?user_id=${user_id}`);
//         const cartItems = res.data.data || res.data || [];
//         const totalQuantity = cartItems.reduce(
//           (sum, item) => sum + (item.quantity || 0),
//           0
//         );
//         setTotalCartProducts(totalQuantity);
//       } catch (err) {
//         console.error("Error fetching cart count:", err);
//       }
//     };

//     const fetchProducts = async () => {
//       try {
//         const res = await api.get(`/products?merchant_id=${merchantData.id}`);
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.data || [];
//         setProducts(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     Promise.all([
//       fetchTotalProducts(),
//       fetchTotalUsers(),
//       fetchTotalCartProducts(),
//       fetchProducts(),
//     ]).finally(() => setLoad(false));
//   }, []);

//   if (load) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 flex-1 overflow-y-auto">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-white shadow p-5 mb-6 rounded-lg">
//         <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
//         <div>
//           <h4 className="text-sm font-light">
//             Hi,{" "}
//             <span className="font-semibold text-gray-700">
//               {merchant?.first_name}
//             </span>
//           </h4>
//         </div>
//       </header>

//       {/* Summary Cards */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-sm text-gray-500">Total Products</h2>
//           <p className="text-2xl font-bold mt-2">{totalProducts}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-sm text-gray-500">Total Users</h2>
//           <p className="text-2xl font-bold mt-2">{totalUsers}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-sm text-gray-500">Products in Carts</h2>
//           <p className="text-2xl font-bold mt-2">{totalCartProducts}</p>
//         </div>
//       </section>

//       {/* Product Table */}
//       <header>
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b border-gray-200 pb-3">
//           Products
//         </h2>
//       </header>

//       {products.length ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-200 text-left">
//             <thead className="bg-teal-800 text-white">
//               <tr>
//                 <th className="border border-gray-200 p-3">Title</th>
//                 <th className="border border-gray-200 p-3">Image</th>
//                 <th className="border border-gray-200 p-3">Price</th>
//                 <th className="border border-gray-200 p-3">Brand</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product, i) => (
//                 <tr key={i}>
//                   <td className="border border-gray-200 p-3">{product.title}</td>
//                   <td className="border border-gray-200 p-3">
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="w-24 h-24 object-contain mx-auto rounded-sm"
//                     />
//                   </td>
//                   <td className="border border-gray-200 p-3">{product.price}</td>
//                   <td className="border border-gray-200 p-3">{product.brand}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-6">No products found</p>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
