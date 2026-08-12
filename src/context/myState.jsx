/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from 'react';
import MyContext from './myContext';
import { productService, orderService, userService } from '../services/api';
import toast from 'react-hot-toast';

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // Product State
    const [getAllProduct, setGetAllProduct] = useState([]);

    const getAllProductFunction = useCallback(async () => {
        setLoading(true);
        try {
            const data = await productService.getAll();
            setGetAllProduct(data.products || []);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    // Order State 
    const [getAllOrder, setGetAllOrder] = useState([]);

    const getAllOrderFunction = useCallback(async () => {
        setLoading(true);
        try {
            const data = await orderService.getAll();
            setGetAllOrder(data.orders || []);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    // Delete order Function
    const orderDelete = async (id) => {
        setLoading(true);
        try {
            await orderService.delete(id);
            toast.success('Order Deleted successfully');
            getAllOrderFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete order');
            setLoading(false);
        }
    };

    // User State 
    const [getAllUser, setGetAllUser] = useState([]);

    const getAllUserFunction = useCallback(async () => {
        setLoading(true);
        try {
            const data = await userService.getAll();
            setGetAllUser(data.users || []);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllProductFunction();
        // Only fetch orders and users if authenticated
        const token = localStorage.getItem('authToken');
        if (token) {
            getAllOrderFunction();
            getAllUserFunction();
        }
    }, [getAllProductFunction, getAllOrderFunction, getAllUserFunction]);

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrder,
            getAllOrderFunction,
            orderDelete,
            getAllUser,
            getAllUserFunction
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;
