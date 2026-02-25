import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, AlertCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { register, userInfo, loading, error } = useAuthStore();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
        } else {
            register(name, email, password);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserPlus size={32} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Crear Cuenta</h1>
                    <p className="text-slate-400 mt-2 font-medium">Únete a la comunidad Stitch</p>
                </div>

                {(error || message) && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm font-bold">
                        <AlertCircle size={20} /> {error || message}
                    </div>
                )}

                <form onSubmit={submitHandler} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nombre</label>
                        <input
                            type="text"
                            placeholder="Tu nombre completo"
                            className="bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-4 font-medium transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-4 font-medium transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Confirmar Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="bg-slate-50 border-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-4 font-medium transition-all"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-primary transition-all uppercase tracking-widest shadow-lg mt-4 disabled:opacity-50"
                    >
                        {loading ? 'Cargando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="text-center mt-8 text-sm font-medium text-slate-400">
                    ¿Ya tienes una cuenta? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary font-black uppercase tracking-widest ml-1 hover:underline">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
