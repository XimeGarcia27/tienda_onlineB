import React from 'react';
import { Target, Eye, ShieldCheck, Heart } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80" 
                        alt="Fashion background" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">Nuestra Historia</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">Reinventando la moda contemporánea con calidad y pasión.</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-8">¿Quiénes Somos?</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                            En <span className="text-primary font-black uppercase">Stitch</span>, no solo vendemos ropa; creamos experiencias. Nacimos de la necesidad de ofrecer prendas con personalidad propia, combinando las últimas tendencias globales con una manufactura excepcional.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            Nuestra misión es empoderar a cada persona a través de su estilo, brindando confianza y comodidad en cada paso que dan.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl translate-y-8">
                            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80" alt="About 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" alt="About 2" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-widest">Nuestros Valores</h2>
                        <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <ShieldCheck size={32} />, title: "Calidad", desc: "Materiales premium que duran toda la vida." },
                            { icon: <Target size={32} />, title: "Innovación", desc: "Diseños vanguardistas en cada colección." },
                            { icon: <Eye size={32} />, title: "Transparencia", desc: "Procesos éticos y honestos con el cliente." },
                            { icon: <Heart size={32} />, title: "Pasión", desc: "Amamos lo que hacemos y se nota." }
                        ].map((value, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2">
                                <div className="text-primary mb-6">{value.icon}</div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-tight">{value.title}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
