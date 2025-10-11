import { AiOutlineLoading } from "react-icons/ai";
const Loader = () => {
    return (
        <div className="flex items-center justify-center gap-1">
            <AiOutlineLoading className="text-5xl animate-spin"/>
            <span>Loading...</span>
        </div>
    )
} 
export default Loader;