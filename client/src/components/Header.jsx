import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, LayoutDashboard } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';

const Header = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const userInfo = useAuthStore((state) => state.userInfo);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 lg:px-20 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-2">
                        <LayoutDashboard className="text-primary w-8 h-8" />
                        <h2 className="text-xl font-black tracking-tighter uppercase">Stitch</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-semibold hover:text-primary transition-colors">Inicio</Link>
                        <Link to="/shop" className="text-sm font-semibold hover:text-primary transition-colors">Tienda</Link>
                        <Link to="/about" className="text-sm font-semibold hover:text-primary transition-colors">Nosotros</Link>
                        <Link to="/contact" className="text-sm font-semibold hover:text-primary transition-colors">Contacto</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-1.5">
                        <Search className="text-slate-500 w-4 h-4" />
                        <input
                            className="bg-transparent border-none focus:ring-0 text-sm w-32 lg:w-48 placeholder:text-slate-400 p-0 ml-2"
                            placeholder="Buscar"
                            type="text"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to={userInfo ? "/profile" : "/login"} className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
                            <User className="w-6 h-6" />
                            {userInfo?.isAdmin && (
                                <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border border-white"></span>
                            )}
                        </Link>
                        <Link to="/cart" className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
                            <ShoppingBag className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
