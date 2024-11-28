import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import { ModalProvider } from './context/ModalContext'; 
import router from './router/router';

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
