import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import HeroSection from './components/home/hero-section/HeroSection'
import LastQuestion from './components/home/last-question/LastQuestion'
import Planets from './components/planets/Planets'

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
                            <LastQuestion />              
                        </>}>
                        </Route>
                        <Route path="/planets" element={<Planets />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

