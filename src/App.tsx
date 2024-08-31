import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ThemeProvider } from './components/theme-provider'
import { LayoutAdmin } from './components/admin/layout/LayoutAdmin'
import { Home } from './components/home/Home'
import { Articles } from './components/article/Articles'
import { ShowArticle } from './components/article/ShowArticle'
import { Articles as ArticlesAdmin } from './components/admin/article/Articles'
import { CreateArticle } from './components/admin/article/CreateArticle'

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
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Home />} />
            <Route path="articles" element={<ArticlesAdmin />} />
            <Route path="articles/create" element={<CreateArticle />} />
            <Route path="articles/:link" element={<ShowArticle />} />
          </Route> 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
