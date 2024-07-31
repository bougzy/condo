
// import React, { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// import UploadProperty from "./components/UploadProperty";
// import AdminPanel from "./components/AdminPanel";
// import Register from "./components/Register";
// import AdminLogin from "./components/AdminLogin";
// import Footer from "./components/Footer";

// function App() {
//   const [isAdmin, setIsAdmin] = useState(false);

//   return (
//     <>
//       <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      
//         <Routes>
//           <Route path="/" exact element={<Home />} />
//           <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />}/>
//           <Route path="/upload" element={<UploadProperty />} />
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route path="/admin" element={<AdminPanel />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//         <Footer />
  
//     </>
//   );
// }

// export default App;


import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import UploadProperty from "./components/UploadProperty";
import AdminPanel from "./components/AdminPanel";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <> 
    <QueryClientProvider client={queryClient}>
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/upload" element={<UploadProperty />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
    </>
  );
}

export default App;
