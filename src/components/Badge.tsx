import { defineComponent } from 'vue'

const Badge = defineComponent({
  name: 'VBadge',
  props: {
    num: Number
  },
  setup(props) {
    return () => (
      <div class="dark:bg-primer-dark-gray-400/40 rounded-full flex items-center justify-center px-2 py-0.5">
        <span class=" text-sm dark:text-primer-dark-white">{props.num}</span>
      </div>
    )
  }
})

export default Badge
