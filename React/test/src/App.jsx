import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Header from './components/header'


// Pages (composants)
import Home from './pages/home'
import Shop from './pages/shop'



function About() {
  return <h1>ℹ️ À propos de nous</h1>
}

function Contact() {
  return <h1>📧 Contactez-nous</h1>
}

function NotFound() {
  return <h1>404 - Page non trouvée 😢</h1>
}

export default function App() {
  return (
    <div>
      {/* Barre de navigation */}
      <Header />

      <main style={{ padding: '2rem' }}>
        {/* C'est ici que les pages vont s'afficher */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Page 404 - toujours en dernier */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}