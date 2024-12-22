import React, { useContext, useState } from 'react';
import '/workspaces/fs-tp-80-A.Roca-Autenticaci-n/src/front/styles/index.css';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isRegister, setIsRegister] = useState(true);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = isRegister 
            ? await actions.register(formData) 
            : await actions.login(formData);

        if (success) {
            navigate('/private');
        } else {
            setError('Usuario o contrasena incorrectos');
        }
    };

    return (
        <div className="form-container">
            <h2>{isRegister ? 'Registro' : 'Inicio de Sesión'}</h2>
            <form onSubmit={handleSubmit} className="form-control">
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                />
                <input
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                />
                <input type="submit" value={isRegister ? 'Registrar' : 'Iniciar Sesión'} />
            </form>
            {error && <p className="error-message">{error}</p>}
            <button onClick={() => setIsRegister(!isRegister)} className={`toggle-button ${isRegister ? 'register-active' : 'login-active'}`}>
                {isRegister ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
        </div>
    );
};
