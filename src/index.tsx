import ReactDOM from 'react-dom/client';
import App from './App';
import { WallProvider } from './context/wall';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <WallProvider>
    <App />
  </WallProvider>
);
