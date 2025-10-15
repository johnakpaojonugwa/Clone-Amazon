import { useState, useEffect } from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import ProductDetails from "./ProductDetails"

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const resp = await axios.get("http://ecommerce.reworkstaging.name.ng/v2");
            const data = await resp.data;
            setProducts(data);
        }
        getProducts();
    }, [])
    return(
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
            <p className="py-3 px-3 m-3 border border-gray-500 text-sm cursor-pointer rounded-[10px]">Amazon Devices & Accessories</p>
            <p className="py-3 px-3 m-3 border border-gray-500 text-sm cursor-pointer rounded-[10px]">Arts, Crafts & Sewing</p>
        </div>
        </div>
            <div className="min-h-screen flex">
        <aside className="min-w-45 p-5 border-r">
            <div>
                <h6 className="font-bold">Department</h6>
            <input type="radio"/>
            <span className="text-sm">All</span>
            <br/>
            <input type="radio"/>
            <span className="text-sm">Amazon Devices & Accessories</span>
            <br/>
            <input type="radio"/>
            <span className="text-sm">Arts, Crafts & Sewing</span>

            </div>
        </aside>

        {
            products.length ? 
            <div className="grid gap-5 mx-auto">
                {products.map((product) => {
                    <ProductDetails product_detail={product} key={product.id}/>
                })}
                </div>
            :
            <div className="py-10 text-center w-full">
                <h3>No products found</h3>
            </div>
                }
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
export default Shop;