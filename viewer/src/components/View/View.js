import React, { Component } from 'react';
import * as THREE from "three";
import file from "../data/challenge-mesh.json"
import './View.css'

class View extends Component {

  constructor(props) {
    super(props);
    this.toggleColorOnClick();
  }

  toggleColorOnClick(){
    this.meshColor = new THREE.Color(Math.random(), Math.random(), Math.random())
  }

  componentDidMount() {
    const mesh_representation = file['07Enbsqm9C7AQC9iyBwfSD'].mesh_representation;
    const geometry = new THREE.Geometry();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer();
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    const material = new THREE.MeshStandardMaterial({color: this.meshColor});

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.position.z = 25;

    // Lighting
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 0, 40);
    scene.add(light);


    for (let i = 0; i < mesh_representation.positions.length; i=i+3) {
      geometry.vertices.push(
          new THREE.Vector3(
              mesh_representation.positions[i],
              mesh_representation.positions[i+1],
              mesh_representation.positions[i+2])
      );
    }

    for (let i = 0; i < mesh_representation.indices.length; i=i+3) {
      let normal = new THREE.Vector3(
          mesh_representation.normals[i],
          mesh_representation.normals[i+1],
          mesh_representation.normals[i+2]
      );

      let face = new THREE.Face3(
          mesh_representation.indices[i],
          mesh_representation.indices[i+1],
          mesh_representation.indices[i+2],
          normal
      );
      geometry.faces.push(face);
    }

    // Normals not displayed correct -> Recalculate
    geometry.computeFaceNormals();

    let instance = new THREE.Mesh(geometry, material)
    instance.position.set(0,0,0);
    instance.rotateX(0.6);
    scene.add(instance);

    function render(time) {
      //Make Object Rotate
      /*
      time *= 0.001
      const speed = .5;
      const rot = time * speed;
      instance.rotation.y = rot;
      */

      instance.material.color = this.meshColor;
      renderer.render(scene, camera);

      requestAnimationFrame(render.bind(this));
    }

    requestAnimationFrame(render.bind(this));

    // Toggle-Color-On-Click functionality
    renderer.domElement.addEventListener("click", onclick.bind(this), true);

    function onclick(event) {
      console.log("onclick")
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children, true);

      for(let i = 0; i < intersects.length; i++)
      {
        if (intersects[i].object === instance)
        {
          console.log("hit");
          this.toggleColorOnClick();
        }
      }
    }
  }

  render() {
    return (
        <div>
          <button className="myButton" onClick={this.toggleColorOnClick.bind(this)}>
            Change Mesh Color
          </button>
        </div>
    );
  }
}

export default View;
