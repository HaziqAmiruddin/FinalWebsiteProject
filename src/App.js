import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticleBackground from './components/BackgroundParticle/BackgroundParticle';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const initialState = {
      input: '',
      imageUrl:'',
      box: {},
      route:'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        //password: '',
        entries: 0,
        joined: '',
      }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      // input: '',
      // imageUrl:'',
      // box: {},
      // route:'SignIn',
      // isSignedIn: false,
      // user: {
      //   id: '',
      //   name: '',
      //   email: '',
      //   //password: '',
      //   entries: 0,
      //   joined: '',
      // }
      initialState,
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      //password: '',
      entries: data.entries,
      joined: data.joined,
    }})
  }

  //test connect own server
  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map(region => {
      const boundingBox = region.region_info.bounding_box;
      return{
        topRow : boundingBox.top_row*height,
        leftCol : boundingBox.left_col*width,
        bottomRow : height - (boundingBox.bottom_row*height),
        rightCol : width - (boundingBox.right_col*width)
      };
    });
  };

  displayFaceBoxes = (boxPosition) => {
    this.setState({boxPosition: boxPosition});
    console.log('Box:', boxPosition);
  }

  onImageLoad = () => {
    if (!this.clarifaiResponse || !this.clarifaiResponse.outputs) {
    console.warn('Clarifai response not available or invalid at image load.');
    return;
    }

    const boxPosition = this.calculateFaceLocation(this.clarifaiResponse);
    console.log('Calculated Box Position:', boxPosition);
    this.displayFaceBoxes(boxPosition);
  }

  OnInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    console.log('click');

    const IMAGE_URL = this.state.input;
    this.setState({imageUrl: IMAGE_URL});
///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

// Your PAT (Personal Access Token) can be found in the Account's Security section
const PAT = '61a67c7afb1f4aa88da599ad09aa7099';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
// const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    // "url": IMAGE_URL
                    "url": IMAGE_URL
                    // "base64": IMAGE_BYTES_STRING
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

// fetch("https://cors-anywhere.herokuapp.com/https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
//     .then(response => response.json())
//     .then(result => {

//         const regions = result.outputs[0].data.regions;

//         regions.forEach(region => {
//             // Accessing and rounding the bounding box values
//             const boundingBox = region.region_info.bounding_box;
            // const topRow = boundingBox.top_row.toFixed(3);
            // const leftCol = boundingBox.left_col.toFixed(3);
            // const bottomRow = boundingBox.bottom_row.toFixed(3);
            // const rightCol = boundingBox.right_col.toFixed(3);

//             region.data.concepts.forEach(concept => {
//                 // Accessing and rounding the concept value
//                 const name = concept.name;
//                 const value = concept.value.toFixed(4);

//                 console.log(`${name}: ${value} BBox: TopRow:${topRow}, LeftCol:${leftCol}, BottomRow:${bottomRow}, RightCol:${rightCol}`);
                
//             });
//         });

//     })
//     .catch(error => console.log('error', error));

fetch("https://cors-anywhere.herokuapp.com/https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {

       console.log('Clarifai API result:', result);

      if (result && result.outputs && result.outputs[0]) {
        fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'Application/json'},
              body: JSON.stringify({
              id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }

      this.clarifaiResponse = result;
      const boxPosition = this.calculateFaceLocation(result);
      this.displayFaceBoxes(boxPosition);
    })
    .catch(error => console.log('error', error));
  }

  // onRouteChange = (route) => {
  //   if(route === 'SignOut'){
  //     this.setState({isSignedIn: false})
  //   }else if(route === 'home'){
  //      this.setState({isSignedIn: true})
  //   }
  //   this.setState({route: route});
  // }
  onRouteChange = (route) => {
  if (route === 'SignOut') {
    this.setState({
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
      //initialState,
    });
  } else if (route === 'home') {
    this.setState({ isSignedIn: true });
  }

  this.setState({ route: route });
}


  render(){
    const {isSignedIn, imageUrl, route, boxPosition} = this.state;
    return (
      <><ParticleBackground />
      <div className='App'>
        {/* Your App Components */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        {route === 'home'
        ? 
          <div>
              <Logo />
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries} 
              />
              <ImageLinkForm OnInputChange={this.OnInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition imageUrl={imageUrl} boxPosition={boxPosition} onImageLoad={this.onImageLoad}/>
          </div>
        : (
            this.state.route === 'SignIn' 
            ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
        }

      </div></>
    );
  }
}

export default App;