import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ActivityListPage from './pages/ActivityListPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <Routes>
          <Route path="/" element={<ActivityListPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}