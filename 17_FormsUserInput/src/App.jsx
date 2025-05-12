import Header from './components/Header.jsx';
// import Login from './components/Login.jsx';
import Login from './components/StateLogin.jsx';
// import Login from './components/RefLogin.jsx';
import SignUp from './components/Signup.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Login />
        {/* <SignUp /> */}
      </main>
    </>
  );
}

export default App;
