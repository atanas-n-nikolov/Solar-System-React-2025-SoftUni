import { Link } from "react-router";

import './Login.css';

export default function Login() {
    return (
        <div className="container">
            <section className="login-container">
                <form className="login-form">
                    <h2>Login</h2>
                    <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                    <p className="signup-message">You don't have an account? <Link to="/sign-up">Click here to sign up</Link></p>
                </form>

                <aside className="login-image">
                    <img src="/images/login-image.png" alt="Login Illustration" />
                </aside>
            </section>
        </div>
    )
}