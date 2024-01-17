import { defineComponent } from 'vue'

import logoSrc from '@/assets/images/Logo.png'

const Logo = defineComponent({
  name: 'VLogo',
  setup() {
    return () => <img src={logoSrc} />
  }
})

export default Logo
