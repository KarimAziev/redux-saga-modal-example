import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import DevTools from './devTools';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <section>
      <App />
    </section>
  </Provider>,
  document.getElementById('root')
);
