import React from 'react'
import Redes from './Redes'
import Footer from './Footer'
import logo from '../Assets/Logo.png'
import { FaLocationArrow } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import { CiLocationOn} from 'react-icons/ci';

const Contacto = () => {
    return (
        <>
            <Redes />
            <div className='container-contactenos'>
                <p className='titulo-proyecto'>Contactenos</p>
                <div className='grid-container-contactenos'>
                    <div className='item1'>
                        <p className='titulo1-gcc'>Creador de esta aplicacion:</p>

                        <div className='grid-tech'>
                            <div className='grid-tech-item'>
                                <img src={logo} alt='Logo' className='img-contacto' />
                            </div>
                            <div className='grid-tech-item1'>
                                <a href='https://techmaniatic.com/' className='btn-iniciar-sesion1'>Ver Pagina</a>
                            </div>
                        </div>
                        <br />
                        <ul className='menu-tech'>
                            <li><FaLocationArrow/> contacto@techmaniatic.com</li>
                            <li><AiFillPhone/> +57 300 536 7192 / +57 314 679 2843</li>
                            <li><AiOutlineInstagram/> @techmaniatic</li>
                            <li><CiLocationOn/> Viterbo Caldas, Colombia</li>
                        </ul>

                    </div>
                    <div className='item2'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15897.063921699131!2d-75.8811107302246!3d5.0605779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e478537250ec0cf%3A0x15a105e281e5bed2!2sViterbo%2C%20Caldas!5e0!3m2!1ses!2sco!4v1687964778888!5m2!1ses!2sco" allowfullscreen="" loading="lazy" className='mapa' referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contacto