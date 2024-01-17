import { defineComponent } from 'vue'

import Copy24 from './Icon/Copy24'
import Rule24 from './Icon/Rule24'
import X24 from './Icon/X24'

type ControllerIcon = typeof Copy24

interface windowController {
  icon: ControllerIcon
  action: () => void
}

const windowControllerOptions: windowController[] = [
  {
    icon: Rule24,
    action: window.electronAPI.minimize
  },
  {
    icon: Copy24,
    action: window.electronAPI.maximize
  },
  {
    icon: X24,
    action: window.electronAPI.close
  }
]

const WindowController = defineComponent({
  name: 'VWindowController',
  setup() {
    return () => (
      <div class="flex items-center space-x-4">
        {windowControllerOptions.map((controller) => (
          <button onClick={controller.action} class="cursor-pointer">
            <controller.icon class=" fill-primer-dark-gray-0"></controller.icon>
          </button>
        ))}
      </div>
    )
  }
})
export default WindowController
