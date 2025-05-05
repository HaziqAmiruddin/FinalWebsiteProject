import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticleBackground from './components/BackgroundParticle/BackgroundParticle';
class App extends Component {
  render(){
    return (
      <><ParticleBackground />
      <div className='App'>
        {/* Your App Components */}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div></>
    );
  }
}

export default App;
