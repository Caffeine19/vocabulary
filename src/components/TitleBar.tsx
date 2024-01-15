import { defineComponent } from 'vue'

import Logo from './Logo'
import WindowController from './WindowController'

const TitleBar = defineComponent({
  name: 'VTitleBar',
  setup() {
    return () => (
      <header class="flex items-center justify-between dark:bg-primer-dark-gray-700 px-6 py-2">
        <div class="flex items-end space-x-2">
          <Logo class="w-10 h-10"></Logo>
          <p class="dark:text-primer-dark-gray-0 fira-code text-2xl">VOCABULARY</p>
        </div>

        <WindowController></WindowController>
      </header>
    )
  }
})

export default TitleBar
