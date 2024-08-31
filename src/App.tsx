import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Test } from './components/Test'
import { ThemeProvider } from './components/theme-provider'
import { LayoutAdmin } from './components/admin/layout/LayoutAdmin'
import { Home } from './components/home/Home'
import { Articles } from './components/article/Articles'
import { ShowArticle } from './components/article/ShowArticle'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:link" element={<ShowArticle />} />
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
