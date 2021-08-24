import React, {useState, useEffect} from 'react';
import './App.css';
import Api from './service/Api';

function App() {
  useEffect(()=>{
    getTopTrack()
  }, [])

  const [search, setSearch] = useState('')
  const [tracks, setTracks] = useState([])
  async function getArtista(){
    const response = await Api.get('/search?q=', {params:{q: search}})
    // const response = await Api.get('/track/3135556')
     console.log(response.data);

  }

  async function getTopTrack(){
    // const response = await Api.get('/search', {params:{q: search}})
    const response = await Api.get('/chart/tracks')
    console.log(response.data);
    setTracks(response.data.tracks.data);
  }

  const tableTracks = tracks.map((track,index) => {
    return (
     <tr> 
        <td align= 'left'>{track.position}</td>
        <td align= 'left'>{track.title}</td>
        <td align= 'left'>{track.artist.name}</td>
      </tr>
    )
  })


  function onChange(event){
    setSearch(event.target.value)
  }
  return (
    <div className="App">
      <div className="container-search">
        <h1>Deezer</h1>
        <input onChange={onChange} />
        <button onClick={getArtista}>Procurar</button>
        <select name="cars" id="cars">
          <option value="q">Artista</option>
          <option value="saab">Álbum</option>
          <option value="mercedes">Título Musical</option>
        </select>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <table>
        <tr>
          <th>Posição</th>
          <th>Música</th>
          <th>Artista</th>
        </tr>
      {tableTracks}
      </table>
        </div>
  );
}

export default App;
