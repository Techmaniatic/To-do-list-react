import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "../Componentes/Login";
import Inicio from "../Componentes/Inicio";
import DetalleDeProyecto from "../Componentes/DetalleDeProyecto";
import Eventos from "../Componentes/Eventos";

const AppRouting = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Inicio" element={<Inicio />} />
                    <Route path="/Eventos" element={<Eventos />} />
                    <Route path="/Proyecto/:id" element={<DetalleDeProyecto />}  />
                </Routes>
            </Router>
        </>
    )
}

export default AppRouting