import React, { useEffect, useState } from 'react';
import Gallery from './components/Gallery';
import { ThreeDots } from 'react-loader-spinner';
import './components/styles/app.scss';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // يمكنك تعديل المدة حسب الحاجة

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loader">
          <ThreeDots color="#000" height={100} width={100} />
          <h1 className="welcome-text">Welcome to the Image Gallery!</h1>
        </div>
      ) : (
        <Gallery />
      )}
    </div>
  );
}

export default App;
