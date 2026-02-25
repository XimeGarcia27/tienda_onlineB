import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Share2, Instagram, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <LayoutDashboard className="text-primary w-8 h-8" />
                            <h2 className="text-xl font-black tracking-tighter uppercase">Stitch</h2>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Definiendo el estilo minimalista para la era moderna. Calidad premium y diseño atemporal.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Share2 className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Globe className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Tienda</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500">
                            <li><Link to="/shop?category=hombre" className="hover:text-primary transition-colors">Hombre</Link></li>
                            <li><Link to="/shop?category=mujer" className="hover:text-primary transition-colors">Mujer</Link></li>
                            <li><Link to="/shop?category=accesorios" className="hover:text-primary transition-colors">Accesorios</Link></li>
                            <li><Link to="/shop" className="hover:text-primary transition-colors">Nuevas Llegadas</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Compañía</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500">
                            <li><Link to="/about" className="hover:text-primary transition-colors">Nuestra Historia</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Sostenibilidad</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Carreras</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Soporte</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Envío</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Devoluciones</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-slate-400">© 2026 STITCH. Todos los derechos reservados.</p>
                    <div className="flex gap-8 text-xs text-slate-400 font-bold uppercase tracking-widest">
                        <a href="#" className="hover:text-slate-900 transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Términos</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
