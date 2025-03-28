import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import HeroSection from './components/home/hero-section/HeroSection'
import LastQuestion from './components/home/last-question/LastQuestion'
import Planets from './components/planets/Planets'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Quiz from './components/quiz/Quiz'
import Facts from './components/home/facts/Facts'

export default function App() {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<>
                            <HeroSection />
                            <Home />
                            <section className="something">
                                <Facts />
                                <LastQuestion />
                            </section>
                        </>}>
                        </Route>
                        <Route path="/planets" element={<Planets />} />
                        <Route path="/sign-up" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/quiz" element={<Quiz />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

