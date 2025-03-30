import { Link, useNavigate } from "react-router";

import './Login.css';
import { useActionState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useLogin } from "../../api/authAPI";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);

        const authData = await login(values.email, values.password);

        userLoginHandler(authData);

        navigate("/");
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, { email: '', password: '' });
    return (
        <div className="container">
            <section className="login-container">
                <form className="login-form" action={loginAction}>
                    <h2>Login</h2>
                    <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" disabled={isPending}>Login</button>
                    <p className="signup-message">You don't have an account? <Link to="/sign-up">Click here to sign up</Link></p>
                </form>

                <aside className="login-image">
                    <img src="/images/login-image.png" alt="Login Illustration" />
                </aside>
            </section>
        </div>
    )
}