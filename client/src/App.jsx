import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import HeroSection from './components/home/hero-section/HeroSection'

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
                        </>}>
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

