import React, { Component } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './BackgroundParticle.css';

class ParticleBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
    };
  }

  async componentDidMount() {
    await this.initParticlesEngine();
  }

  initParticlesEngine = async () => {
    const { tsParticles } = await import("@tsparticles/engine");
    await loadSlim(tsParticles);
    this.engine = tsParticles;
    this.setState({ init: true });
  };

  particlesLoaded = (container) => {
    console.log(container);
  };

  render() {
    return (
      <>
        {this.state.init && (
          <Particles
            id="tsparticles"
            particlesLoaded={this.particlesLoaded}
            options={{
              background: {
                color: { value: "transparent",
                 },
                image: "linear-gradient(to left,rgb(231, 95, 255),rgb(62, 206, 222))"
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: { enable: true, mode: "push" },
                  onHover: { enable: true, mode: "repulse" },
                  resize: true,
                },
                modes: {
                  push: { quantity: 4 },
                  repulse: { distance: 200, duration: 0.4 },
                },
              },
              particles: {
                color: { value: "#000000" },
                links: {
                  color: "#000000",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: false,
                  speed: 6,
                  straight: false,
                },
                number: {
                  density: { enable: true, area: 800 },
                  value: 80,
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 5 } },
              },
              detectRetina: true,
            }}
          />
        )}
      </>
    );
  }
}

export default ParticleBackground;
