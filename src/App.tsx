import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ActivityListPage from './pages/ActivityListPage'
import ActivityDetailPage from './pages/ActivityDetailPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <Routes>
          <Route path="/" element={<ActivityListPage />} />
          <Route path="/activities/:id" element={<ActivityDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}