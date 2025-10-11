function Loader({ fullscreen = false, message = "Loading..." }) {
    return (
        <div
            className={`flex justify-center items-center ${fullscreen ? "min-h-screen bg-gray-100" : "py-10"
                }`}
        >
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm mt-3">{message}</p>
            </div>
        </div>
    );
}

export default Loader;