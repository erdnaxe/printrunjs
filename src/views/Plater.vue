<template>
  <canvas
    v-resize="onResize"
    id="renderCanvas"
  ></canvas>
</template>

<style lang="scss">
#renderCanvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { EnvironmentHelper } from '@babylonjs/core/Helpers/environmentHelper'
import '@babylonjs/core/Materials/standardMaterial'
import '@babylonjs/core/Helpers/sceneHelpers'

class Plater {
  private _canvas: HTMLCanvasElement
  private _engine: Engine
  private _scene: Scene

  constructor (canvasElement: string) {
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement
    this._engine = new Engine(this._canvas, true)
    this._scene = new Scene(this._engine)
    this._scene.createDefaultCameraOrLight(true, true, true)
    const helper = this._scene.createDefaultEnvironment()
    if (helper instanceof EnvironmentHelper) {
      helper.setMainColor(Color3.White())
    }
  }

  render (): void {
    // Create sphere to test
    const sphere = MeshBuilder.CreateSphere('sphere1',
      { segments: 16, diameter: 2 }, this._scene)
    sphere.position.y = 1

    // Create plate
    MeshBuilder.CreateGround('plate',
      { width: 6, height: 6, subdivisions: 2 }, this._scene)

    // Run the render loop.
    this._engine.runRenderLoop(() => {
      this._scene.render()
    })
  }

  resize (): void {
    this._engine.resize()
  }

  dispose (): void {
    this._scene.dispose()
  }
}

export default Vue.extend({
  name: 'Plater',
  data: () => ({
    plater: null as Plater | null
  }),
  mounted: function () {
    // Mount plater and render
    this.plater = new Plater('renderCanvas')
    this.plater.render()
  },
  destroyed: function () {
    // Properly destroy scene
    if (this.plater instanceof Plater) {
      this.plater.dispose()
    }
  },
  methods: {
    onResize () {
      if (this.plater instanceof Plater) {
        this.plater.resize()
      }
    }
  }
})
</script>
