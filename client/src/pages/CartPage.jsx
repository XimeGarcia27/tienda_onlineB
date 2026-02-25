import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, MessageCircle, ArrowRight } from 'lucide-react';
import useCartStore from '../store/cartStore';

const CartPage = () => {
    const { cartItems, removeItem, getTotalPrice } = useCartStore();
    const navigate = useNavigate();

    const checkoutHandler = () => {
        const total = getTotalPrice();
        const itemsList = cartItems.map(item => `- ${item.name} (${item.size}) x${item.qty}: $${(item.price * item.qty).toFixed(2)}`).join('%0A');
        const message = `*Nuevo Pedido - STITCH*%0A%0A${itemsList}%0A%0A*Total: $${total.toFixed(2)}*%0A%0A_Por favor, confírmenme los detalles de envío._`;

        const phoneNumber = '521234567890'; // Replace with actual number
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
            <h1 className="text-4xl font-black uppercase tracking-tight mb-12">Tu Carrito</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl">
                    <p className="text-slate-400 mb-8 font-medium">Tu carrito está vacío</p>
                    <Link to="/shop" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary transition-all">
                        Ir a la Tienda
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {cartItems.map((item) => (
                            <div key={`${item.product}-${item.size}`} className="flex gap-6 p-6 bg-white border border-slate-100 rounded-2xl">
                                <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                                            <p className="text-sm font-medium text-slate-400">Talla: <span className="text-slate-800">{item.size}</span></p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.product, item.size)}
                                            className="text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <p className="text-sm font-bold text-slate-500">Cantidad: {item.qty}</p>
                                        <p className="font-black text-slate-900">${(item.price * item.qty).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-32 shadow-2xl">
                            <h3 className="text-xl font-black uppercase tracking-widest mb-8">Resumen</h3>
                            <div className="flex justify-between mb-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span className="text-white">${getTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-8 text-slate-400 text-sm font-bold uppercase tracking-widest">
                                <span>Envío</span>
                                <span className="text-white">Calculado al finalizar</span>
                            </div>
                            <div className="h-px bg-white/10 mb-8"></div>
                            <div className="flex justify-between mb-12">
                                <span className="font-black text-xl uppercase tracking-tighter">Total</span>
                                <span className="font-black text-2xl text-primary">${getTotalPrice().toFixed(2)}</span>
                            </div>
                            <button
                                onClick={checkoutHandler}
                                className="w-full bg-primary text-white font-bold py-5 rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl"
                            >
                                Comprar vía WhatsApp <MessageCircle size={24} fill="currentColor" />
                            </button>
                            <button
                                onClick={() => navigate('/shop')}
                                className="w-full mt-4 text-white/60 hover:text-white transition-colors text-sm font-bold flex items-center justify-center gap-2 uppercase tracking-widest"
                            >
                                Seguir comprando <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
