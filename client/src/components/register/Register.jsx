import { Link, useNavigate } from "react-router";
import './Register.css'
import { useRegister } from "../../api/authAPI";
import { useUserContext } from "../../contexts/UserContext";

export default function Register() {
    const { register } = useRegister();
    const navigate = useNavigate();
    const { userLoginHandler } = useUserContext();

    const registerHandler = async (formData) => {
        const { firstName, lastName, email, password, rePassword } = Object.fromEntries(formData);

        if(password !== rePassword) {
            console.log('Password dont match!');
            
            return;
        };

        const authData = await register(firstName, lastName, email, password, rePassword);

        userLoginHandler(authData);

        navigate('/');
    }
    return (
        <div className="container">
            <section className="register-container">
                <form className="register-form" action={registerHandler}>
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
                    <label htmlFor="rePassword">Repeat password:</label>
                    <input type="password" id="rePassword" name="rePassword" required />
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