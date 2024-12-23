import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
            } else {
                const isValidUser = await actions.checkUser();
                if (!isValidUser) {
                    localStorage.removeItem("token");
                    navigate("/");
                }
            }
        };

        checkAuthentication();
    }, [actions, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <div className="private-view">
            <h2>Vista Privada</h2>
            <h3>del usuario</h3>
            <p>{store.user?.email || "No disponible"}</p>
            <button className="logout" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};
