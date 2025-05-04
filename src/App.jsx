import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Goal from './Component/Goal/Goal'
import YourGoal from './Component/Goal/YourGoal'

function App() {

  return (
    <Router>
     <Routes>
     <Route path="" element={<Goal/>}/>
     <Route path="/your-goal" element={<YourGoal />} />
     </Routes>
    </Router>
  )
}

export default App
