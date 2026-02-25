import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import useCartStore from '../store/cartStore';
import api from '../api';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('M');
    const [qty, setQty] = useState(1);

    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        addItem(product, qty, selectedSize);
        navigate('/cart');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Producto no encontrado</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-bold text-sm uppercase"
            >
                <ChevronLeft size={18} /> Volver
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <p className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">{product.category}</p>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{product.name}</h1>
                    <p className="text-3xl font-black text-slate-900 mb-8">${product.price.toFixed(2)}</p>

                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Descripción</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Seleccionar Talla</h3>
                        <div className="flex gap-3">
                            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 rounded-lg border-2 font-bold transition-all ${selectedSize === size
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-slate-100 hover:border-slate-300'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex items-center border-2 border-slate-100 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="px-4 py-2 hover:bg-slate-50 transition-colors font-bold"
                            >
                                -
                            </button>
                            <span className="px-4 font-bold">{qty}</span>
                            <button
                                onClick={() => setQty(qty + 1)}
                                className="px-4 py-2 hover:bg-slate-50 transition-colors font-bold"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={addToCartHandler}
                            className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-primary transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-xl"
                        >
                            <ShoppingBag size={20} /> Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
