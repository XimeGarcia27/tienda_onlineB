import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login, userInfo, loading, error } = useAuthStore();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LogIn size={32} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Bienvenido</h1>
                    <p className="text-slate-400 mt-2 font-medium">Ingresa a tu cuenta Stitch</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm font-bold">
                        <AlertCircle size={20} /> {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            className="bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-4 font-medium transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Contraseña</label>
                            <a href="#" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Olvidé mi contraseña</a>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-4 font-medium transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-primary transition-all uppercase tracking-widest shadow-lg mt-4 disabled:opacity-50"
                    >
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <p className="text-center mt-8 text-sm font-medium text-slate-400">
                    ¿No tienes una cuenta? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary font-black uppercase tracking-widest ml-1 hover:underline">Regístrate</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
