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
    const [selectedSize, setSelectedSize] = useState('');
    const [qty, setQty] = useState(1);

    // Helper for images
    const getImageUrl = (img) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `http://localhost:5000${img}`;
    };

    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                // Select first available size by default
                if (data.sizes && data.sizes.length > 0) {
                    const availableSize = data.sizes.find(s => s.stock > 0);
                    setSelectedSize(availableSize ? availableSize.size : data.sizes[0].size);
                }
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

    const currentSizeData = product?.sizes?.find(s => s.size === selectedSize);
    const stockForSelectedSize = currentSizeData ? currentSizeData.stock : 0;

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
                        src={getImageUrl(product.image)}
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
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Disponibilidad</h3>
                        <p className={`font-black uppercase tracking-widest text-sm ${stockForSelectedSize > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {stockForSelectedSize > 0 ? `${stockForSelectedSize} unidades en existencia de talla ${selectedSize}` : `Talla ${selectedSize} Agotada`}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Seleccionar Talla</h3>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes && product.sizes.map((s) => (
                                <button
                                    key={s.size}
                                    onClick={() => { setSelectedSize(s.size); setQty(1); }}
                                    className={`px-6 h-12 rounded-lg border-2 font-bold transition-all flex items-center justify-center gap-2 ${selectedSize === s.size
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-slate-100 hover:border-slate-300 text-slate-600'
                                        } ${s.stock === 0 ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
                                >
                                    {s.size}
                                    {s.stock === 0 && <span className="text-[8px] uppercase">(Sin stock)</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {stockForSelectedSize > 0 && (
                            <div className="flex items-center border-2 border-slate-100 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    className="px-4 py-2 hover:bg-slate-50 transition-colors font-bold"
                                >
                                    -
                                </button>
                                <span className="px-4 font-bold">{qty}</span>
                                <button
                                    onClick={() => setQty(Math.min(stockForSelectedSize, qty + 1))}
                                    className="px-4 py-2 hover:bg-slate-50 transition-colors font-bold"
                                >
                                    +
                                </button>
                            </div>
                        )}
                        <button
                            onClick={addToCartHandler}
                            disabled={stockForSelectedSize === 0}
                            className={`flex-1 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-xl ${stockForSelectedSize > 0
                                    ? 'bg-slate-900 text-white hover:bg-primary'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                }`}
                        >
                            <ShoppingBag size={20} /> {stockForSelectedSize > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
