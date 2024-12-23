import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Config/Reducer.jsx'

const Store = createStore(reducer)

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
  </Provider>
)
