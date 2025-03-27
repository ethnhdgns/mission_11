import './App.css'
import BookList from './pages/BookList'
// import CookieConsent from 'react-cookie-consent'
import Fingerprint from './components/Fingerprint'

function App() {
  return (
    <>
      <BookList/>
      {/* <CookieConsent>
        This website used cookies to enhance the user experience.
      </CookieConsent> */}
      <Fingerprint/>
    </>
  )
}

export default App
