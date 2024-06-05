import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TasksContext';
import RegisterPage from "./pages/RegisterPage";
import LoginPage  from "./pages/LoginPage";
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'; /* Agregar encima de <Routes> para que aparezca sobre todas las páginas creadas*/

function App() { 
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Navbar /> 
        <main className="container content-container mx-auto px-10 md:px-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
