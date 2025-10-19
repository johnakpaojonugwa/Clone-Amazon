import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import axios from "axios"
import { Link } from "react-router-dom"
import ProductDetails from "./ProductDetails"
import { Button, Modal, Input, Form, Table, Image } from "antd";
import { ToastContainer, toast } from "react-toastify";

function Appliances() {
    const { API_BASE_URL, loading, setLoading } = useApp();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const merchantData = JSON.parse(sessionStorage.getItem("merchantUser"));
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
                        style={{ objectFit: "contain" }}
                    />
                ) : (
                    "Image lost"
                ),
        },
    ];

    return (
        <>
            <div>
                <nav className="bg-gray-100 gap-2 pl-7 flex border-b border-gray-400 mb-2 h-8.5 items-center">
                    <p className="font-bold text-sm cursor-pointer border-b border-transparent hover:border-blue-900 hover:text-blue-900 p-1.5">Today's Deals</p>
                    <p className="color-gray-700 text-sm cursor-pointer border-b border-transparent hover:border-blue-900 hover:text-blue-900 p-1.5">Coupons</p>
                    <p className="color-gray-700 text-sm cursor-pointer border-b border-transparent hover:border-blue-900 hover:text-blue-900 p-1.5">Renewed Deals</p>
                    <p className="color-gray-700 text-sm cursor-pointer border-b border-transparent hover:border-blue-900 hover:text-blue-900 p-1.5">Outlet</p>
                    <p className="color-gray-700 text-sm cursor-pointer border-b border-transparent hover:border-blue-900 hover:text-blue-900 p-1.5">Amazon Resale</p>
                    <p className="color-gray-700 text-sm cursor-pointer border-b border-transparent hover:border-blue-900 hover:text-blue-900 p-1.5">Grocery Deals</p>
                </nav>
                <div className="flex flex-wrap gap-2 justify-center h-30 items-center">
                    <Link to="/shop/cellphones">
                        <p className="py-3 px-3 m-3 border border-gray-500 text-sm cursor-pointer rounded-[10px]">Cellphones & Accessories</p>
                    </Link>
                    <Link to="/shop/appliances">
                        <p className="py-3 px-3 m-3 border border-gray-500 text-sm cursor-pointer rounded-[10px] bg-gray-200">Appliances</p>
                    </Link>
                    <Link to="/shop/automotive">
                        <p className="py-3 px-3 m-3 border border-gray-500 text-sm cursor-pointer rounded-[10px]">Automotive</p>
                    </Link>
                </div>
            </div>
            <div className="min-h-screen flex">
                <aside className="min-w-45 p-5 border-r ">
                    <div>
                        <h6 className="font-bold">Department</h6>

                        <Link to="/shop">
                            <input type="radio" />
                            <span className="text-sm">All</span>
                        </Link>
                        <br />
                        <Link to="/shop/cellphones">
                            <input type="radio" />
                            <span className="text-sm">Cellphones & Accessories</span>
                        </Link>
                        <br />
                        <Link to="/shop/appliances">
                            <input type="radio" checked/>
                            <span className="text-sm">Appliances</span>
                        </Link>
                        <br />
                        <Link to="/shop/automotive">
                            <input type="radio" />
                            <span className="text-sm">Automotive</span>
                        </Link>
                        <br />
                        <input type="radio" />
                        <span className="text-sm">Baby Products</span>
                        <p className="text-sm text-blue-500 cursor-pointer">See more</p>

                    </div>
                    <div>
                        <h6 className="font-bold">Brands</h6>
                        <input type="checkbox" />
                        <span className="text-sm">Bissell</span>
                        <br />
                        <input type="checkbox" />
                        <span className="text-sm">Coop Home Goods</span>
                        <br />
                        <input type="checkbox" />
                        <span className="text-sm">Amazon</span>
                        <br />
                        <input type="checkbox" />
                        <span className="text-sm">ROVE</span>

                    </div>
                </aside>
                <div className="grid grid-cols-6">
                    {/* <ProductDetails /> */}
                    {
                        products.length ?
                            <div className="grid gap-5 mx-auto">
                                {products.map((product) => {
                                    <ProductDetails product_detail={product} key={product.id} />
                                })}
                            </div>
                            :
                            <div className="py-10 text-center w-full">
                                <h3>No products found</h3>
                            </div>
                    }

                    {/* </div>
                    <div> */}
                    <ProductDetails
                        dataSource={products}
                        columns={columns}
                        rowKey="id"
                        size="small"
                    />
                    <Form.Item
                        label="Title"
                        // name="title"
                        rules={[{ required: true, message: "Please enter product title" }]}
                    />

                    <Form.Item
                        label="Image"
                        // name="image"
                        rules={[{ required: true, message: "Please enter Image URL" }]}
                    />
                </div>
            </div>

            <footer className="text-center border-y border-gray-300 pt-10 pb-5">
                <h2 className="font-bold text-2xl m-1">See personalized recommendations</h2>
                <Link to="/login">
                    <button className="bg-yellow-400 px-15 py-1.5 text-sm hover:bg-yellow-500 cursor-pointer m-1 rounded-[50px]">Sign in</button>
                </Link>
                <p className="text-xs">New customer? <Link to="/register" className="text-blue-500 text-xs underline hover:text-blue-900">Start here</Link></p>
            </footer>
        </>
    )
}
export default Appliances;