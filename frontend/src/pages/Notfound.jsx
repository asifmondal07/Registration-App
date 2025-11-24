import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    console.log('Page not found')
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg mb-5">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 text-xl underline hover:text-blue-800 transition">Go Back Home</Link>
      
    </div>
  );
}

export default NotFound;