import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, LogOut, ChevronRight, Settings } from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../api';

const ProfilePage = () => {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const { userInfo, logout } = useAuthStore();
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders/myorders');
            setOrders(data);
            setLoadingOrders(false);
        } catch (error) {
            console.error('Error fetching orders', error);
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            fetchOrders();
        }
    }, [userInfo, navigate]);

    const cancelOrderHandler = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas cancelar este pedido? Las prendas regresarán al stock.')) {
            try {
                await api.put(`/orders/${id}/cancel`);
                fetchOrders();
            } catch (error) {
                alert(error.response?.data?.message || 'Error al cancelar el pedido');
            }
        }
    };

    const logoutHandler = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-50 p-8 rounded-3xl">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md mb-4 border border-slate-100">
                                <User size={32} className="text-primary" />
                            </div>
                            <h2 className="font-black text-xl text-slate-900 uppercase tracking-tighter">{userInfo?.name}</h2>
                            <p className="text-slate-400 text-sm font-medium">{userInfo?.email}</p>
                        </div>

                        <nav className="flex flex-col gap-2">
                            <button className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm text-sm font-bold uppercase tracking-widest text-primary border border-primary/10">
                                <span className="flex items-center gap-3"><ShoppingBag size={18} /> Mis Pedidos</span>
                                <ChevronRight size={16} />
                            </button>
                            {userInfo?.isAdmin && (
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white transition-all text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-primary"
                                >
                                    <span className="flex items-center gap-3"><Settings size={18} /> Panel Admin</span>
                                    <ChevronRight size={16} />
                                </button>
                            )}
                            <button
                                onClick={logoutHandler}
                                className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-red-50 transition-all text-sm font-bold uppercase tracking-widest text-red-500"
                            >
                                <span className="flex items-center gap-3"><LogOut size={18} /> Salir</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Orders Content */}
                <div className="lg:col-span-3">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Mis Pedidos</h2>

                    {loadingOrders ? (
                        <p className="text-slate-400 font-medium">Cargando pedidos...</p>
                    ) : orders.length === 0 ? (
                        <div className="bg-slate-50 p-12 rounded-3xl text-center">
                            <p className="text-slate-400 font-medium">Aún no tienes pedidos.</p>
                            <button
                                onClick={() => navigate('/shop')}
                                className="mt-6 text-primary font-black uppercase tracking-widest text-sm hover:underline"
                            >
                                Empezar a comprar
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">ID del Pedido</p>
                                            <p className="text-xs font-bold text-slate-900">#{order._id.substring(0, 10).toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Fecha</p>
                                            <p className="text-xs font-bold text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total</p>
                                            <p className="text-sm font-black text-primary">${order.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${order.status === 'Entregado' ? 'bg-green-50 text-green-600 border-green-100' : order.status === 'Cancelado' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                            {order.status || 'Pendiente'}
                                        </div>
                                        {order.status === 'Pendiente' && (
                                            <button
                                                onClick={() => cancelOrderHandler(order._id)}
                                                className="px-4 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100 transition-all ml-auto"
                                            >
                                                Cancelar Pedido
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-50">
                                                <img 
                                                    src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
