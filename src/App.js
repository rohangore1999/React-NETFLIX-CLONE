import './App.css';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Row from './components/Row';
import requests from './request';

function App() {
  return (
    <div className="App">
      {/* title */}
      <Nav />

      {/* Banner */}
      <Banner />

      {/* as it is the first row it should be bigger */}
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLarge={true} />

      <Row title="Trending" fetchUrl={requests.fetchTrending} />

      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />

      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />

      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />

      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />

      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />

      <Row title="Documentary Movies" fetchUrl={requests.fetchDocumentaries} />

    </div>
  );
}

export default App;
