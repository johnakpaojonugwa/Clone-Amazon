import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import axios from "axios"
import { Button, Modal, Input, Form, Table, Image } from "antd";
import { ToastContainer, toast } from "react-toastify";


const ProductDetails = (product_detail) => {
    // const { API_BASE_URL, loading, setLoading } = useApp();
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
    //     const getProducts = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await axios.get(
    //                 `${API_BASE_URL}/products?merchant_id=${merchantData.id}`
    //             );
    //             setProducts(res?.data?.data || []);
    //             console.log(res.data);
    //         } catch (error) {
    //             toast.error("Error fetching products");
    //             console.log(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     getProducts();
    // }, []);

    // const columns = [
    //     {dataIndex: "title",},
    //     {
    //         dataIndex: "image",
    //         render: (image) =>
    //             image ? (
    //                 <Image
    //                     src={Array.isArray(image) ? image[0] : image}
    //                     alt="product"
    //                     style={{ objectFit:]]  "cover" }}
    //                 />
    //             ) : (
    //                 "Image lost"
    //             ),
    //     },
    // ];
    return (
        <>
    {/* //         <div>
    //             <Table
    //                 dataSource={products}
    //                 columns={columns}
    //                 rowKey="id"
    //                 size="small"
    //             />
    //             <Form.Item/>
    //             <Form.Item/>
    //         </div> */}

            <Link to={`./product/${product_detail.id}`} className="block" >
                <div className="book shadow-lg p-2 rounded-sm">
                    <img src={product_detail.images} alt="Image not Found" className="w-full h-[450px] object-cover rounded-sm" />
                    <p className="text-red-500 text-xs">Limited time deal</p>
                    <h3 className="font-medium hover:text-orange-500">{product_detail.title}</h3>
                </div>
            </Link>
        </>
    )
}
export default ProductDetails;