import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import api from '../api';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const addItem = useCartStore((state) => state.addItem);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                // Only active products and limit to first 4
                setProducts(data.filter(p => p.active !== false).slice(0, 4));
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const availableSize = product.sizes && product.sizes.find(s => s.stock > 0);
        if (availableSize) {
            addItem(product, 1, availableSize.size);
            alert('Producto añadido al carrito');
        } else {
            alert('Este producto no tiene stock disponible');
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[85vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAiJOAeCfhRDXnIIUXDkXJ-GMAZO5MwZ0avLiKbFst-yS4yHSoM7_v3egk2fmYByhJ4tovV2anEOLsZLRq4MRuFSHYqaRKlpsVw4aYVoQiT1Z4cHISl7Y2z2OnTeKQ2jZQo5AMTdm7RsQI4mFX_JrDYnbpWkovtHRrE73UMWvWe7wCFlVe5C3Wg9SUQ3XkMlL5oCuwR1GXRf1HP_QIJUf6136X-iwXEiM6-8Yz-k3FT94ntG7VQmMxgn09NpmfjpuoCrUba4yMzVU')`
                    }}
                ></div>
                <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-20 flex flex-col justify-center items-start text-white">
                    <p className="text-sm font-bold tracking-[0.3em] uppercase mb-4 opacity-90">Season Premiere</p>
                    <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter mb-8">
                        NUEVA<br />COLECCIÓN<br />2026
                    </h1>
                    <button className="bg-white text-slate-900 hover:bg-primary hover:text-white transition-all duration-300 font-bold px-10 py-4 rounded-full text-lg shadow-xl uppercase tracking-wider">
                        Comprar ahora
                    </button>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight uppercase">Categorías</h2>
                        <div className="h-1 w-12 bg-primary mt-2"></div>
                    </div>
                    <a href="#" className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors">Ver todas</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/shop?category=Hombre" className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer">
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{
                                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1u9NO_CQet0iliIqsDXU_Pa76IuBSKHAon0DFZpPqfqj4u4co1EB73bP0B4oFPyVdwckpfIldi8uk-7CGmo8qxttrcv6H86GZ8gnGqQNFU5uVKczYXg9RL1ox7UcaGusxfSOSRvfWeyKSN__zSm7M_DVIZIfilbiVh_6A3_BnYqBrZupEUsOJF8iLLn_G_B3l89NRrQzWJ32JgFKrt7FoU_nBNy5tjqmfnCucDbG_SYYetOu0eYLGoOizH0CW6O-DasquugFmyU8')`
                            }}
                        ></div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-white text-2xl font-black uppercase">Hombre</h3>
                            <p className="text-white/80 text-sm font-medium mt-1">Explorar Colección</p>
                        </div>
                    </Link>
                    <Link to="/shop?category=Mujer" className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer">
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{
                                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyyULlhgnZcal_jgaCS3QQ9CyYHpIjZo6eIGAlBPresh4ynWQKVJjKH24fAbqvAjqr92q59xEqaZmYP_zkdtcXVkRzZ5U3Pz4FCiMLGrUC9hGrCeF6Rf2hidyx6ypUNKcsaAQmJb8gn4ysbgTzScDlunRvKyFEyeiv5ibzBp3Kam-VEKhZPwXlRwm-dlW-ELigCXO61o9ZYp9obiIghigyeJHyqRtZ4IT13Enq3uNkGEZ4X1jQa1p4Hk9WvWHFxKq7cYlnm9mrurA')`
                            }}
                        ></div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-white text-2xl font-black uppercase">Mujer</h3>
                            <p className="text-white/80 text-sm font-medium mt-1">Explorar Colección</p>
                        </div>
                    </Link>
                    <Link to="/shop?category=Accesorios" className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer">
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{
                                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuByiCOQz-Qs55VNC8nlzbbp159xEZDIHmjz5tk_KV23_pxfqqZYsOmXH8vO0vOUVmrHvxqptdPX9x13GfWxb18QjkyyPoSbIVMSp9VFGdQMKcIBCrCEu2SHbxRqly7R_v0R2IUfs1RUCXKQOnOqXU1SXEGFhlstcKIOg_ThDSoaJPWOrRLAG9G5dxRveXjEPYV-OTSBPkn0n-Ft4NNxZ-dz-XyuGRUPBck6joPYwyVRDD_hwepU0yvQAbB4m4rpVrbj54k3NDgamc8')`
                            }}
                        ></div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-white text-2xl font-black uppercase">Accesorios</h3>
                            <p className="text-white/80 text-sm font-medium mt-1">Explorar Detalles</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section className="bg-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-20">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight uppercase">Productos Destacados</h2>
                            <div className="h-1 w-12 bg-primary mt-2"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product._id} className="group flex flex-col gap-4">
                                <Link to={`/product/${product._id}`} className="relative aspect-[4/5] bg-white rounded-lg overflow-hidden cursor-pointer">
                                    <img
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToCart(product);
                                        }}
                                        className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                    >
                                        <ShoppingCart className="text-primary w-5 h-5" />
                                    </button>
                                </Link>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{product.category}</p>
                                    <h4 className="font-bold text-slate-800">{product.name}</h4>
                                    <p className="text-primary font-black mt-1">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-20 py-24 text-center">
                <div className="bg-slate-900 text-white rounded-3xl p-12 lg:p-20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full -ml-24 -mb-24"></div>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">Únete al Club Stitch</h2>
                    <p className="text-slate-400 max-w-lg mx-auto mb-10 relative z-10">Suscríbete para recibir noticias sobre lanzamientos exclusivos, eventos y un 15% de descuento en tu primera compra.</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <input className="flex-1 bg-white/10 border-white/20 rounded-lg px-6 py-4 focus:ring-primary focus:border-primary text-white" placeholder="Tu email" type="email" />
                        <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-lg transition-all" type="submit">Suscribirme</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
