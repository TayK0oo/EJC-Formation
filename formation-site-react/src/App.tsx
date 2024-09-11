// src/App.tsx

import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/variables.css';
import { Router } from './routes/Router';
import { routes } from './routes/routes';

function App() {
  const [CurrentComponent, setCurrentComponent] = useState<React.ComponentType<any> | null>(null);
  const [router] = useState(() => new Router(routes, setCurrentComponent));

  useEffect(() => {
    router.init();
    return () => router.cleanup();
  }, [router]);

  const navigate = (path: string) => {
    router.navigate(path);
  };

  return (
    <div className="App">
      {CurrentComponent && <CurrentComponent navigate={navigate} />}
    </div>
  );
}

export default App;