import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Side: Info */}
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-8 italic">Contáctanos</h1>
                        <p className="text-xl text-slate-500 mb-12 font-medium leading-relaxed">
                            ¿Tienes alguna duda o quieres saber más sobre nosotros? Estamos aquí para ayudarte a encontrar el estilo perfecto.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="bg-slate-100 p-4 rounded-2xl text-primary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Teléfono</h4>
                                    <p className="text-lg font-bold text-slate-900">+52 427 244 1012</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-slate-100 p-4 rounded-2xl text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Email</h4>
                                    <p className="text-lg font-bold text-slate-900">contacto@stitch.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-slate-100 p-4 rounded-2xl text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Ubicación</h4>
                                    <p className="text-lg font-bold text-slate-900">San Juan del Río, Querétaro, México</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-slate-100 p-4 rounded-2xl text-primary">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">WhatsApp</h4>
                                    <a href="https://wa.me/524272441012" className="text-lg font-bold text-primary hover:underline">Chat Directo</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="bg-slate-50 p-10 lg:p-14 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">Enviános un mensaje</h3>
                        <form className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nombre Completo</label>
                                <input 
                                    className="bg-white border-2 border-slate-200 focus:border-primary focus:ring-0 rounded-2xl px-6 py-4 font-semibold transition-all outline-none"
                                    type="text" 
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Corporativo</label>
                                <input 
                                    className="bg-white border-2 border-slate-200 focus:border-primary focus:ring-0 rounded-2xl px-6 py-4 font-semibold transition-all outline-none"
                                    type="email" 
                                    placeholder="ejemplo@correo.com"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tu Mensaje</label>
                                <textarea 
                                    rows="4" 
                                    className="bg-white border-2 border-slate-200 focus:border-primary focus:ring-0 rounded-2xl px-6 py-4 font-semibold transition-all outline-none resize-none"
                                    placeholder="¿En qué podemos ayudarte?"
                                ></textarea>
                            </div>
                            <button className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-primary transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl mt-8">
                                <Send size={20} /> Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
