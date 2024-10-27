import { useNavigate } from 'react-router-dom';
import './Home.css';
import imge from './4258773-removebg-preview.png'
export const Home = () => {
    const navigate = useNavigate();

    // Update handleClick to accept an item and navigate accordingly
    const handleClick = (item) => {
        return () => {
            item === "doctor" ? navigate('/dlogin') : navigate('/login');
        };
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li> */}
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li> */}
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                            {/* <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>
                        {/* Use the updated handleClick function */}
                        <button className="btn btn-primary dbtn mx-2" onClick={handleClick('doctor')}>Doctor</button>
                        <button className="btn btn-primary pbtn mx-2" onClick={handleClick('patient')}>Patient</button>
                    </div>
                </div>
            </nav>

            <div className="row">
            <div className="hero col-sm-12 col-lg-6">
                <h1>Happy MotherHood</h1>
                <p>HEALTH,TIPS AND COMMUNITY FOR EXPECTING WOMEN</p>
            </div>
            <div className="hero col-sm-12 col-lg-6">
                <img src={imge} alt="hh" />
            </div>
            </div>
        </div>
    );
};