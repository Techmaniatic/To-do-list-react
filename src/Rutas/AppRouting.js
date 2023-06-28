import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "../Componentes/Login";
import Inicio from "../Componentes/Inicio";
import DetalleDeProyecto from "../Componentes/DetalleDeProyecto";
import Eventos from "../Componentes/Eventos";
import EditarEvento from "../Componentes/EditarEvento";
import Contacto from "../Componentes/Contacto";

const AppRouting = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Inicio" element={<Inicio />} />
                    <Route path="/Eventos" element={<Eventos />} />
                    <Route path="/Contacto" element={<Contacto />} />
                    <Route path="/Proyecto/:id" element={<DetalleDeProyecto />}  />
                    <Route path="/Evento/:id" element={<EditarEvento  />}  />
                </Routes>
            </Router>
        </>
    )
}

export default AppRouting