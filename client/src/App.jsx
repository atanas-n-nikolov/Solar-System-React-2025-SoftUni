import { Route, Routes } from 'react-router'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Planets from './components/planets/Planets'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Quiz from './components/quiz/Quiz'

import './App.css'
import UserProvider from './providers/UserProvider'
import Logout from './components/logout/Logout'
import PlanetDetails from './components/planetsDetails/PlanetDetails'
import QuizForm from './components/quiz/quizForm/QuizForm'
import UserProfile from './components/user/profile/UserProfile'
import EditProfile from './components/user/edit/EditProfile'

export default function App() {

    return (
        <UserProvider>
            <div className="app-wrapper">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />}>
                        </Route>
                        <Route path="/planets" element={<Planets />} />
                        <Route path="/planet/:planetId" element={<PlanetDetails />} />
                        <Route path="/sign-up" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/profile/:userId" element={<UserProfile />} />
                        <Route path="/profile/:userId/edit" element={<EditProfile />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/quiz/:category" element={<QuizForm />} />
                    </Routes>
                </main>
                <Footer />
            </div>
            </UserProvider>
    )
}

