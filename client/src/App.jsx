import { BrowserRouter } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default function App() {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header />
                <main className="main-content">
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

