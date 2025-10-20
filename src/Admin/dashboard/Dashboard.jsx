import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Table, Card, Spin, Image } from "antd";

function Dashboard() {
  const navigate = useNavigate();
  const { API_BASE_URL, loading, setLoading } = useApp();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCartProducts, setTotalCartProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [merchant, setMerchant] = useState(null);

  useEffect(() => {
    const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
    if (!merchantData) {
      toast.warning("Please login to access the admin page");
      navigate("/");
      return;
    }
    setMerchant(merchantData);
    const userData = JSON.parse(localStorage.getItem("Account_login")) || {};

    const fetchTotalProducts = async () => {
      try {
        setLoading(true);
        
        const res = await axios.get(
          `${ API_BASE_URL }/products?merchant_id=${ merchantData.id }`
        );
        const data = res.data;
        const count = data.total ?? (Array.isArray(data) ? data.length : 0);
        setTotalProducts(count);
      } catch (err) {
        console.log("Error fetching total products:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${ API_BASE_URL }/users`);
        setTotalUsers(res.data.length);
      } catch (err) {
        console.log("Error fetching total users:", err);
      } finally {
        setLoading(false)
      }

    };

    const fetchTotalCartProducts = async () => {
  const userId = userData?.id;
  if (!userId) {
    setTotalCartProducts(0);
    return;
  }

  try {
    setLoading(true);
    const res = await axios.get(`${API_BASE_URL}/carts?user_id=${userId}`);
    
    // Normalize response
    let cartItems = [];
    if (Array.isArray(res.data)) {
      cartItems = res.data;
    } else if (res.data?.data && Array.isArray(res.data.data)) {
      cartItems = res.data.data;
    } else {
      cartItems = [];
    }

    // Sum quantities safely
    const totalQuantity = cartItems.reduce((sum, item) => {
      // item.quantity might be nested or missing, default to 1
      const qty = item.quantity ?? (item.products?.reduce((a, p) => a + (p.quantity ?? 1), 0) ?? 0);
      return sum + qty;
    }, 0);

    setTotalCartProducts(totalQuantity);
  } catch (err) {
    console.log("Error fetching cart count:", err);
    setTotalCartProducts(0);
  } finally {
    setLoading(false);
  }
};


    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${ API_BASE_URL }/products?merchant_id=${ merchantData.id }`
        );
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setProducts(data);
      } catch (err) {
        console.log("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalProducts();
    fetchTotalUsers();
    fetchTotalCartProducts();
    fetchProducts();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
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
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card variant className="shadow-md text-center">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-2xl font-bold">{totalProducts}</h2>
        </Card>
        <Card variant className="shadow-md text-center">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold">{totalUsers}</h2>
        </Card>
        <Card variant className="shadow-md text-center">
          <p className="text-gray-500">Total Products in Carts</p>
          <h2 className="text-2xl font-bold">{totalCartProducts}</h2>
        </Card>
      </div>

      <Card title="Products" variant className="shadow-lg">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            datasource={products}
            columns={columns}
            dataSource={products.map((p, index) => ({ ...p, key: index }))}
            pagination={{ pageSize: 5 }}
            size="small"
            rowKey="id"
          />
        )}
      </Card>
    </div>
  );

  // return (
  //   <div className="bg-gray-100 flex h-screen">
  //     {/* Main Content */}
  //     <div className="flex-1 flex flex-col">
  //       {/* Summary Cards */}
  //       <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
  //         <div className="bg-white p-6 rounded-xl shadow">
  //           <h2 className="text-sm text-gray-500">Total Products</h2>
  //           <p className="text-2xl font-bold mt-2">{totalProducts}</p>
  //         </div>
  //         <div className="bg-white p-6 rounded-xl shadow">
  //           <h2 className="text-sm text-gray-500">Total Users</h2>
  //           <p className="text-2xl font-bold mt-2">{totalUsers}</p>
  //         </div>
  //         <div className="bg-white p-6 rounded-xl shadow">
  //           <h2 className="text-sm text-gray-500">Total Products in Carts</h2>
  //           <p className="text-2xl font-bold mt-2">{totalCartProducts}</p>
  //         </div>
  //       </section>

  //       {/* Product Table */}
  //       <header>
  //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b border-gray-200 pb-3">
  //           Products
  //         </h2>
  //       </header>
  //       {loading ? (
  //         <p className="text-center text-gray-500">Loading products...</p>
  //       ) : products.length ? (
  //         <div className="overflow-x-auto px-6 sticky md:top-10 self-start">
  //           <table className="w-full border-collapse border border-gray-200 text-left">
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
  //                   <td className="border border-gray-200 p-3">
  //                     {product.title}
  //                   </td>
  //                   <td className="border border-gray-200 p-3">
  //                     <img
  //                       src={product.image}
  //                       alt={product.title}
  //                       className="w-24 h-24 object-contain mx-auto rounded-sm"
  //                     />
  //                   </td>
  //                   <td className="border border-gray-200 p-3">
  //                     {product.price}
  //                   </td>
  //                   <td className="border border-gray-200 p-3">
  //                     {product.brand}
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       ) : (
  //         <p className="text-center text-gray-500">No products found</p>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default Dashboard;