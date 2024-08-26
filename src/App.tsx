import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Test } from './components/Test'
import { ThemeProvider } from './components/theme-provider'
import { LayoutAdmin } from './components/admin/layout/LayoutAdmin'
import { Home } from './components/home/Home'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<LayoutAdmin />}>
            <Route path="/a" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
