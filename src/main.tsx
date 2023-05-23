import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import DevTools from './devTools';
import store from './store';

const domNode = document.getElementById('root');
const root = createRoot(domNode as unknown as Element);

root.render(
  <Provider store={store}>
    <section>
      <App />
      <aside>
        <DevTools />
      </aside>
    </section>
  </Provider>
);
