import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, Package, DollarSign, Image as ImageIcon } from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
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

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [userInfo, navigate]);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products', error);
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setPrice(0);
        setImage('');
        setCategory('');
        setDescription('');
        setEditingProduct(null);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
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
        const productData = { name, price, image, category, description };

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
                    <h1 className="text-4xl font-black uppercase tracking-tight">Panel Admin</h1>
                    <p className="text-slate-500 mt-2 font-medium">Gestiona tu catálogo de productos</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="bg-primary text-white font-bold px-8 py-4 rounded-2xl hover:scale-[1.02] transition-all flex items-center gap-3 uppercase tracking-widest shadow-xl"
                >
                    <Plus size={20} /> Nuevo Producto
                </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Producto</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Categoría</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Precio</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Estado</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="px-8 py-12 text-center text-slate-400 font-medium">Cargando catálogo...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan="5" className="px-8 py-12 text-center text-slate-400 font-medium">No hay productos en el catálogo</td></tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-bold text-slate-800">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">{product.category}</span>
                                    </td>
                                    <td className="px-8 py-4 font-black text-slate-900">${product.price.toFixed(2)}</td>
                                    <td className="px-8 py-4">
                                        <button
                                            onClick={() => handleToggleActive(product)}
                                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${product.active
                                                    ? 'bg-green-50 text-green-600 border-green-100'
                                                    : 'bg-slate-100 text-slate-400 border-slate-200'
                                                }`}
                                        >
                                            {product.active ? <Eye size={12} /> : <EyeOff size={12} />}
                                            {product.active ? 'Activo' : 'Inactivo'}
                                        </button>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm"
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

            {/* Modal for Add/Edit */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
                    <div className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
                        <div className="px-10 py-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-2xl font-black uppercase tracking-tight">
                                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-slate-900 transition-colors font-black text-xl"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nombre</label>
                                    <div className="relative">
                                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl pl-12 pr-4 py-4 font-medium transition-all"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Precio</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl pl-12 pr-4 py-4 font-medium transition-all"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">URL de Imagen</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl pl-12 pr-4 py-4 font-medium transition-all"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Categoría</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-4 font-medium transition-all"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Descripción</label>
                                    <textarea
                                        rows="3"
                                        className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-4 font-medium transition-all resize-none"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all uppercase tracking-widest"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-primary transition-all uppercase tracking-widest shadow-lg"
                                >
                                    {editingProduct ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
