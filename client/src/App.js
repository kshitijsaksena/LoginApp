import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './util/ProtectedRoute'

const App = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/dashboard' element={ <ProtectedRoute/> }>
                        <Route path='' element={ <Dashboard/>} />
                    </Route>
                    <Route path='/login' exact element={ <Login/> } />
                    <Route path='/' element={ <Register /> } />
                    <Route path='*' element={ <PageNotFound /> } />
                </Routes>
            </BrowserRouter>

    )
}

export default App;