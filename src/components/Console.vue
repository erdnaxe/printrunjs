<template>
  <div
    height="100%"
    id="console"
  >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

export default Vue.extend({
  name: 'Console',
  computed: mapState({
    consoleText: 'consoleText'
  }),
  data: function () {
    return {
      term: null as Terminal | null
    }
  },
  mounted: function () {
    this.term = new Terminal()
    const fitAddon = new FitAddon()
    const containerElement = document.getElementById('console') as HTMLElement
    this.term.loadAddon(fitAddon)
    this.term.open(containerElement)
    fitAddon.fit()

    // Subscribe to receive text from store
    this.$store.subscribeAction((action) => {
      if (action.type === 'pushToConsole') {
        if (this.term instanceof Terminal) {
          this.term.writeln(action.payload)
        }
      }
    })

    // Push inputs to store
    // TODO See https://github.com/wavesoft/local-echo
  }
})
</script>
