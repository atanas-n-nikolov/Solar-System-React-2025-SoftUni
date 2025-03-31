import { Link } from 'react-router';

import './Header.css';
import useAuth from '../../hooks/useAuth';

export default function Header() {
    const { email, isAuthenticated, _id } = useAuth();

    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo-container">
                    <Link to="/" className="logo">
                        <img
                            src="/images/solar-system.svg"
                            alt="Logo"
                            className="logo-img"
                        />
                        <span className="logo-text">Solar System</span>
                    </Link>
                </div>
                <nav>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/planets" className="nav-link">
                                Planets
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/quiz" className="nav-link">
                                        Quiz
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/profile/${_id}`} className="nav-link">
                                        {email}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link">
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                            <Link to="/sign-up" className="nav-link">
                                Sign up
                            </Link>
                        </li>
                        )}
                                                <li className="nav-item">
                            <Link to="/contact" className="nav-link">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};