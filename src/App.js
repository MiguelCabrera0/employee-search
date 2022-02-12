import { Navigation } from './Navigation';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Loginpage } from './Pages/Loginpage';

function App() {
  const [user, setUser] = useState("");
  const [logon, setlogon] = useState(false); //change to false

  return (
    <div className="App">
      <Routes>
        {!logon && (
          <Route path='/*' element={<Loginpage auth={(user, logon) => { setUser(user); setlogon(logon); }} />} />
        )}
        {logon && (
          <Route path='/*' element={<Navigation auth={(user, logon) => { setUser(user); setlogon(logon); }} user={user}/>} />
        )}
      </Routes>
    </div>
  );
}

export default App;
