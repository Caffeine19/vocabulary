import { defineComponent } from 'vue'

import Badge from './Badge'
import Inbox24 from './Icon/Inbox24'

type StatusTabIcon = typeof Inbox24

interface StatusTab {
  icon: StatusTabIcon
  label: string
  num: number
}

const StatusTab = defineComponent({
  name: 'VStatusTab',
  props: ['icon', 'label', 'num'],
  setup(props: StatusTab) {
    return () => (
      <li>
        <a
          href=""
          class="rounded-lg flex justify-between items-center px-2 py-1.5 space-x-6 bg-transparent dark:hover:bg-primer-dark-gray-200/[0.08] transition-colors"
        >
          <div class="flex space-x-3 items-center">
            <props.icon class=" dark:fill-primer-dark-gray-400"></props.icon>
            <span class="dark:text-primer-dark-gray-100 font-normal text-lg">{props.label}</span>
          </div>
          <Badge num={props.num}></Badge>
        </a>
      </li>
    )
  }
})

const StatusTabOptions: StatusTab[] = [
  {
    icon: Inbox24,
    label: 'Inbox',
    num: 12
  },
  {
    icon: Inbox24,
    label: 'Archived',
    num: 38
  },
  {
    icon: Inbox24,
    label: 'Tags',
    num: 33
  },
  {
    icon: Inbox24,
    label: 'Deleted',
    num: 9
  }
]

const StatusTabGroup = defineComponent({
  name: 'VStatusTabGroup',
  setup() {
    return () => (
      <ul>
        {StatusTabOptions.map((tab) => (
          <StatusTab icon={tab.icon} label={tab.label} num={tab.num}></StatusTab>
        ))}
      </ul>
    )
  }
})

export default StatusTabGroup
