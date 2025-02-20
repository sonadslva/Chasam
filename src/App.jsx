import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Introduction from "./components/Introduction"

function App() {
  

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/" element={<Introduction/>}/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
