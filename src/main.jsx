import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// NOTE: We intentionally do NOT wrap <App/> in React.StrictMode.
// StrictMode double-mounts components in dev, and our speech hooks talk to the
// global window.speechSynthesis (an imperative, stateful API). The double
// mount/unmount fires the hooks' cancel() cleanup mid-utterance, which silenced
// Sia after a few lines and left the guide with no voice. Running once keeps
// speechSynthesis stable. (Production already mounts once regardless.)
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
