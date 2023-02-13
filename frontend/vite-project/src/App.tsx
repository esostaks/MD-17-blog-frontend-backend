import AllPosts from '../src/Components/Posts/Posts'
import Home from '../src/Components/Home/Home'
import OnePost from '../src/Components/OnePost/OnePost'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import './App.css'

function App() {

  const client = new QueryClient() 


 
  return (
    <QueryClientProvider client={client}>
      <Router>
        <div className='navigation'>
          <div  className='link'><Link to="/">Blog</Link></div>
            <div  className='link'><Link to="/posts">Posts</Link></div>
          </div>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/posts" element={<AllPosts />}/>
            <Route path="/posts/:id" element={<OnePost />}/>
          </Routes>
          
      </Router>
    </QueryClientProvider>
    
  )
}

export default App
