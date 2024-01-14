import { defineComponent } from 'vue'

import TitleBar from './components/TitleBar'

const App = defineComponent({
  setup() {
    return () => (
      <div class="flex flex-col w-screen h-screen">
        <TitleBar></TitleBar>
        <div class="dark:bg-primer-dark-gray-900 grow flex">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
})

export default App
