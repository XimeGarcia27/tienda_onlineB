import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingCart, Filter } from 'lucide-react';
import useCartStore from '../store/cartStore';
import api from '../api';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
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
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => p.active !== false).filter(p => {
        if (!categoryParam) return true;
        return p.category && p.category.trim().toLowerCase() === categoryParam.trim().toLowerCase();
    });

    const handleAddToCart = (product) => {
        const availableSize = product.sizes && product.sizes.find(s => s.stock > 0);
        if (availableSize) {
            addItem(product, 1, availableSize.size);
        } else {
            alert('Producto agotado');
        }
    };

    const getImageUrl = (img) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `http://localhost:5000${img}`;
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Ximand Store Collective</h2>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                        {categoryParam ? categoryParam : 'Toda la Colección'}
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">{filteredProducts.length} Productos encontrados</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm uppercase tracking-widest">
                        <Filter size={18} /> Filtrar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl">
                        <p className="text-slate-400 font-bold uppercase tracking-widest">No hay productos en esta categoría</p>
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <div key={product._id} className="group relative">
                            <Link to={`/product/${product._id}`}>
                                <div className="relative aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                    <img
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        src={getImageUrl(product.image)}
                                    />
                                    {(!product.sizes || product.sizes.reduce((acc, s) => acc + s.stock, 0) === 0) && (
                                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                                            <span className="bg-white text-slate-900 px-4 py-2 rounded-lg font-black uppercase tracking-widest text-xs">Agotado</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                            
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{product.category}</p>
                                <div className="flex justify-between items-start">
                                    <Link to={`/product/${product._id}`}>
                                        <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{product.name}</h4>
                                    </Link>
                                    <p className="font-black text-slate-900">${product.price.toFixed(2)}</p>
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(product);
                                }}
                                disabled={!product.sizes || product.sizes.reduce((acc, s) => acc + s.stock, 0) === 0}
                                className={`absolute top-4 right-4 bg-white p-3 rounded-xl shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white ${(!product.sizes || product.sizes.reduce((acc, s) => acc + s.stock, 0) === 0) ? 'hidden' : ''}`}
                            >
                                <ShoppingCart size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShopPage;
