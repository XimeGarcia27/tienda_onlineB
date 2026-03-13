import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, Package, DollarSign, Image as ImageIcon } from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('products');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { userInfo } = useAuthStore();
    const navigate = useNavigate();

    // Form states
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [sizes, setSizes] = useState([
        { size: 'XS', stock: 0 },
        { size: 'S', stock: 0 },
        { size: 'M', stock: 0 },
        { size: 'L', stock: 0 },
        { size: 'XL', stock: 0 },
    ]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            if (activeTab === 'products') {
                fetchProducts();
            } else {
                fetchOrders();
            }
        }
    }, [userInfo, navigate, activeTab]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/products');
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products', error);
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders', error);
            setLoading(false);
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await api.post('/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            fetchOrders();
        } catch (error) {
            alert('Error al actualizar estado del pedido');
        }
    };

    const resetForm = () => {
        setName('');
        setPrice(0);
        setImage('');
        setCategory('');
        setDescription('');
        setSizes([
            { size: 'XS', stock: 0 },
            { size: 'S', stock: 0 },
            { size: 'M', stock: 0 },
            { size: 'L', stock: 0 },
            { size: 'XL', stock: 0 },
        ]);
        setEditingProduct(null);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        if (product.sizes && product.sizes.length > 0) {
            setSizes(product.sizes);
        } else {
            setSizes([
                { size: 'XS', stock: 0 },
                { size: 'S', stock: 0 },
                { size: 'M', stock: 0 },
                { size: 'L', stock: 0 },
                { size: 'XL', stock: 0 },
            ]);
        }
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                alert('Error al eliminar producto');
            }
        }
    };

    const handleToggleActive = async (product) => {
        try {
            await api.put(`/products/${product._id}`, { ...product, active: !product.active });
            fetchProducts();
        } catch (error) {
            alert('Error al actualizar estado');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { name, price, image, category, description, sizes };

        try {
            if (editingProduct) {
                await api.put(`/products/${editingProduct._id}`, productData);
            } else {
                await api.post('/products', productData);
            }
            setShowModal(false);
            resetForm();
            fetchProducts();
        } catch (error) {
            alert('Error al guardar producto');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900">Panel de Control</h1>
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-6 py-2 rounded-xl font-bold transition-all uppercase tracking-widest text-xs ${activeTab === 'products' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                            Catálogo
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-6 py-2 rounded-xl font-bold transition-all uppercase tracking-widest text-xs ${activeTab === 'orders' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                            Pedidos
                        </button>
                    </div>
                </div>
                {activeTab === 'products' && (
                    <button
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="bg-primary text-white font-bold px-8 py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 uppercase tracking-widest text-sm shadow-xl shadow-primary/20"
                    >
                        <Plus size={20} /> Nuevo Item
                    </button>
                )}
            </div>

            {activeTab === 'products' ? (
                <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Producto</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Categoría</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Precio</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Stock</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Estado</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando catálogo...</td></tr>
                                ) : products.length === 0 ? (
                                    <tr><td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No hay productos registrados</td></tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product._id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
                                                        <img src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="font-bold text-slate-800">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">{product.category}</span>
                                            </td>
                                            <td className="px-8 py-5 font-black text-slate-900">${product.price.toFixed(2)}</td>
                                            <td className="px-8 py-5">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${product.sizes?.reduce((acc, s) => acc + s.stock, 0) > 0 ? 'text-slate-400' : 'text-red-500'}`}>
                                                {product.sizes?.reduce((acc, s) => acc + s.stock, 0) || 0} uds.
                                            </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <button
                                                    onClick={() => handleToggleActive(product)}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${product.active
                                                            ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'
                                                            : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'
                                                        }`}
                                                >
                                                    {product.active ? <Eye size={12} /> : <EyeOff size={12} />}
                                                    {product.active ? 'Activo' : 'Oculto'}
                                                </button>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pedido</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Fecha</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando pedidos...</td></tr>
                                ) : orders.length === 0 ? (
                                    <tr><td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No hay pedidos registrados</td></tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order._id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-900 text-xs">#{order._id.slice(-6).toUpperCase()}</span>
                                                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{order.user ? order.user.name : 'Usuario externo'}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-xs font-bold text-slate-500 uppercase">
                                                {new Date(order.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                            </td>
                                            <td className="px-8 py-5 font-black text-slate-900 text-lg">${order.totalPrice.toFixed(2)}</td>
                                            <td className="px-8 py-5 text-right">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer outline-none ${order.status === 'Entregado' ? 'bg-green-50 text-green-600 border-green-200' : order.status === 'Cancelado' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}
                                                >
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="Pagado">Pagado</option>
                                                    <option value="Enviado">Enviado</option>
                                                    <option value="Entregado">Entregado</option>
                                                    <option value="Cancelado">Cancelado</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Premium Modal for Add/Edit */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md">
                    <div className="max-w-2xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="px-10 py-8 bg-white border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                                    {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                                </h2>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Completa los detalles del item</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="overflow-y-auto p-10 custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nombre del Item</label>
                                        <div className="relative">
                                            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-2xl pl-12 pr-4 py-4 font-bold text-slate-800 transition-all placeholder:text-slate-300"
                                                placeholder="Ej: Camisa Pro"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Precio Unitario</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-2xl pl-12 pr-4 py-4 font-bold text-slate-800 transition-all"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Stock por Talla</label>
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                            {sizes.map((s, index) => (
                                                <div key={s.size} className="flex flex-col gap-2">
                                                    <label className="text-[10px] font-bold text-center text-slate-500">{s.size}</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl px-2 py-3 font-bold text-center text-slate-800 transition-all"
                                                        value={s.stock}
                                                        onChange={(e) => {
                                                            const newSizes = [...sizes];
                                                            newSizes[index].stock = parseInt(e.target.value) || 0;
                                                            setSizes(newSizes);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Categoría</label>
                                        <select
                                            className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-2xl px-6 py-4 font-bold text-slate-800 transition-all cursor-pointer appearance-none"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccionar...</option>
                                            <option value="Hombre">Hombre</option>
                                            <option value="Mujer">Mujer</option>
                                            <option value="Accesorios">Accesorios</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Imagen del Producto</label>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="URL de imagen externa"
                                                className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-2xl px-6 py-4 font-bold text-slate-800 transition-all placeholder:text-slate-300"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                            />
                                            <div className="flex items-center gap-4">
                                                <label className="flex-1 cursor-pointer bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-100 transition-all">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                        {uploading ? 'Subiendo...' : 'O subir archivo local'}
                                                    </span>
                                                    <input type="file" className="hidden" onChange={uploadFileHandler} />
                                                </label>
                                                {image && (
                                                    <div className="w-20 h-24 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 shadow-sm">
                                                        <img src={image.startsWith('http') ? image : `http://localhost:5000${image}`} alt="Preview" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Descripción</label>
                                        <textarea
                                            rows="4"
                                            className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-2xl px-6 py-4 font-bold text-slate-800 transition-all resize-none placeholder:text-slate-300"
                                            placeholder="Detalles sobre el material, corte, etc..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-slate-100 text-slate-500 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-primary transition-all uppercase tracking-widest text-xs shadow-xl shadow-slate-900/10"
                                    >
                                        {editingProduct ? 'Guardar Cambios' : 'Lanzar Producto'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
