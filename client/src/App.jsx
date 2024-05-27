import React, { useEffect, useState } from 'react';
import './App.css';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import UpdateProperty from './UpdateProperty';

function App() {
    const [properties, setProperties] = useState([]);
    const [propertyToEdit, setPropertyToEdit] = useState(null);
    const [user, setUser] = useState(null);


    
    const addOrUpdateProperty = (property) => {
      if (propertyToEdit !== null) {
          const updatedProperties = properties.map((p) =>
              p.id === property.id ? property : p
          );
          setProperties(updatedProperties);
          setPropertyToEdit(null);
      } else {
          setProperties([...properties, property]);
      }
  };

    const editProperty = (index) => {
        setPropertyToEdit(index);
    };

    


    const deleteProperty = (id) => {
        // const updatedProperties = properties.filter((_, i) => i !== index);
        // setProperties(updatedProperties)
 
          if(user?.role === "seller"){
            if(window.confirm("are you sure you want to delete")){
            axios.delete(`http://localhost:3001/api/delete/${id}`)
          }
        }
          else{
            window.alert("you can't delete becaue you are not seller");
        };
    };

    const handleRegister = (newUser) => {
        setUser(newUser);
    };

    const handleLogin = (credentials) => {
        if (credentials.email === user?.email && credentials.password === user?.password) {
            setUser(user);
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        setUser(null);
    };

    
    
    useEffect(() => {
      axios.get("http://localhost:3001/api/properties").then((response)=>{
        // console.log(response);
        setProperties(response.data);
      })
      // .catch((error)=>{
      //   console.log(error);
      // })
    },)

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar user={user} onLogout={handleLogout} />
                <Routes>
                    <Route path="/register" element={<RegistrationForm onRegister={handleRegister} />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin}  user={user} setUser={setUser} />} />
                    <Route
                        path="/add-property"
                        element={user?.role === 'seller' ? (
                            <PropertyForm onSave={addOrUpdateProperty} propertyToEdit={propertyToEdit !== null ? properties[propertyToEdit] : null} />
                        ) : (
                            <Navigate to="/login" />
                        )}
                    />


<Route  
                        path="/update-property/:propertyId"
                        element={user?.role === 'seller' ? (
                            <UpdateProperty properties={properties} onSave={addOrUpdateProperty} />
                        ) : (
                            <Navigate to="/login" />
                        )}
                    />

                    <Route
                        path="/properties"
                        // element={user?.role === 'seller' ? (
                        //     <PropertyList properties={properties} onEdit={editProperty} onDelete={deleteProperty} />
                        // ) : (
                        //     <Navigate to="/login" />
                        // )}
                        element={
                          <PropertyList properties={properties} user={user} onEdit={editProperty} onDelete={deleteProperty} />
                      }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;







// App.js

// import React, { useState } from 'react';
// import './App.css';
// import LoginForm from './LoginForm';
// import PropertyForm from './PropertyForm';
// import PropertyList from './PropertyList';

// function App() {
//     const [user, setUser] = useState(null);

//     const handleLogin = (authenticatedUser) => {
//         setUser(authenticatedUser);
//         // Optionally, perform any actions after successful login
//     };

//     const handleLogout = () => {
//         setUser(null);
//     };

//     return (
//         <div className="App">
//             <h1>Login Page</h1>
//             {user ? (
//                 <div>
//                     <h2>Welcome, {user.firstname}!</h2>
//                     <button onClick={handleLogout}>Logout</button>
//                     <PropertyForm />
//                     <PropertyList />
//                 </div>
//             ) : (
//                 <LoginForm onLogin={handleLogin} />
//             )}
//         </div>
//     );
// }

// export default App;
