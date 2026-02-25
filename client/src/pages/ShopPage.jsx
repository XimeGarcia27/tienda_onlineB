import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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

    const filteredProducts = categoryParam
        ? products.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase())
        : products;

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight">
                        {categoryParam ? categoryParam : 'Toda la Colección'}
                    </h1>
                    <p className="text-slate-500 mt-2">{filteredProducts.length} Productos encontrados</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors font-bold text-sm uppercase">
                    <Filter size={18} /> Filtrar
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="group flex flex-col gap-4">
                        <div className="relative aspect-[4/5] bg-white rounded-lg overflow-hidden">
                            <img
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src={product.image}
                            />
                            <button
                                onClick={() => addItem(product, 1, 'M')}
                                className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                            >
                                <ShoppingCart className="text-primary w-5 h-5" />
                            </button>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{product.category}</p>
                            <h4 className="font-bold text-slate-800">{product.name}</h4>
                            <p className="text-primary font-black mt-1">${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
