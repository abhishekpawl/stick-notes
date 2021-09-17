import './App.css';
import Card from './Card'

function App() {
  return (
    <main>
      <div className="container">
        <div className="title">
          <h2 style={{textShadow: '0 5px 15px rgba(0, 0, 0, 0.3)', marginTop: '2rem'}}>
            Your Cards
          </h2>
          <div className="underline"></div>
        </div>
        <Card />
      </div>
    </main>
  );
}

export default App;
