import { createContext, useState, useEffect, useContext } from 'react'

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    const [API_BASE_URL] = useState("http://ecommerce.reworkstaging.name.ng/v2");
    const [merchantUser, setMerchantUser] = useState(null);
    const [loading, setLoading] = useState(false);


    //load saved theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const merchantUser = sessionStorage.getItem('merchantUser')

        setTheme(savedTheme);
        if (merchantUser) setMerchantUser(JSON.parse(merchantUser))

        document.documentElement.classList.remove('light', "dark");
        document.documentElement.classList.add(savedTheme);
    },[]);
    //Toggle and persists theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove('light', "dark");
        document.documentElement.classList.add(newTheme);
    }
    
    return (
        <AppContext.Provider value={{ theme, toggleTheme, API_BASE_URL, merchantUser, setMerchantUser, loading, setLoading }}>
            {children}
        </AppContext.Provider>
    );
};
export const useApp = () => useContext(AppContext);