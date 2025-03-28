import { Link } from "react-router";
import './Register.css'

export default function Register() {
    return (
        <div className="container">
            <section className="register-container">
                <form className="register-form">
                    <h2>Register</h2>

                    <div className="form-full-name">
                    <div className="form-group">
                    <label htmlFor="firstName">First name:</label>
                    <input type="text" id="firstName" name="firstName" required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="lastName">Last name:</label>
                    <input type="text" id="lastName" name="lastName" required />
                    </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="re-password">Repeat password:</label>
                    <input type="password" id="re-password" name="re-password" required />
                    </div>

                    <button type="submit">Register</button>
                    <p className="signup-message">
                        Already have an account? <Link to="/login">Click here to login</Link>
                    </p>
                </form>

                <aside className="register-image">
                    <img src="/images/register-image.png" alt="Register Illustration" />
                </aside>
            </section>
        </div>
    )
}