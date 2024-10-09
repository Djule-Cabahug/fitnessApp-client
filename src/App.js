import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Container from 'react-bootstrap/Container'
import Register from './pages/Register';
import Login from './pages/Login';
import Workouts from './pages/Workouts';
import Logout from './pages/Logout';
import Error from './pages/Error';



function App() {

  //State hook for the user state is defined here to allow it to have a global context/scope
  //This can be achieved using prop drilling, or via react context
  //This will used to store the user information and will be used for validating if a user  is logged in on the app or not
  const [user, setUser] = useState({
    id: null
  })

  //function for clearing localStorage on logout
  function unsetUser(){
    localStorage.clear()
  }

  useEffect(() => {

    if (localStorage.getItem("token")) {
      
      setUser({
        id: localStorage.getItem("token")
      });

    } else {
      setUser({
        id: null
      });
    }
  }, []) 

  //Used to check if the information is properly stored upon login and the localStorage information is cleared upon logout.
  useEffect(()=> {
    console.log(user);
    console.log(localStorage);
  }, [user])




  return (
      <>
        <UserProvider value={{ user, setUser, unsetUser}}>
          <Router>
            <AppNavbar/>
            <Container>
              <Routes>
                <Route path="/workouts" element={<Workouts />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/logout" element={<Logout />}/>
                <Route path="*" element={<Error />} />
              </Routes>
            </Container>
          </Router> 

        </UserProvider>
      </>
  );
}

export default App;

/*
  IMPORTANT NOTE:
  - Storing information in a context object is done by providing any information such as states and functions using the corresponding "Provider" component
  - All information provided to the "provider" component can be accessed later on the from the context object as properties to componets "wrapped"
  - The "user" state, "setUser" function, and the "unsetUser" function will be available to all the pages since the "UserProvider" component
  "wraps" the router components and all of it's pages.
*/

// In react JS, multiple components rendered in a single component it should be wrapped in a parent component. Not doing so, will return an error in our application. The "JSX Fragment" component to render it properly.