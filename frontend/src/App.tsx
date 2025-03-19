import './App.css'
import BookList from './BookList'
// import CookieConsent from 'react-cookie-consent'
import Fingerprint from './Fingerprint'

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
