import {
  type Component,
  inject,
  provide,
  ref,
  type InjectionKey,
  type Ref,
  shallowRef,
  nextTick
} from 'vue'

export const isActionMenuOpenKey = Symbol('isActionMenuOpen') as InjectionKey<Ref<boolean>>

type Icon = Component

export interface ActionItem {
  name: string
  action: () => void
  icon: Icon
  children?: ActionItem[]
}

export type ActionMenuOptions = ActionItem[][]
export const actionMenuOptionsKey = Symbol('actionMenuOptions') as InjectionKey<
  Ref<ActionMenuOptions>
>

export const menuRefKey = Symbol('menuRef') as InjectionKey<Ref<HTMLElement | null>>

export interface OpenActionMenu {
  (options: ActionMenuOptions, e: MouseEvent): void
}
export const openActionMenuKey = Symbol('openActionMenu') as InjectionKey<OpenActionMenu>

export const actionMenuPositionKey = Symbol('actionMenuPosition') as InjectionKey<
  Ref<{ top: number; left: number }>
>

export const closeActionMenuKey = Symbol('closeActionMenu') as InjectionKey<() => void>

export const useProvideActionMenu = () => {
  const isActionMenuOpen = ref(false)
  provide(isActionMenuOpenKey, isActionMenuOpen)

  const actionMenuOptions: Ref<ActionMenuOptions> = shallowRef([])
  provide(actionMenuOptionsKey, actionMenuOptions)

  const menuRef = ref<HTMLElement | null>(null)
  provide(menuRefKey, menuRef)

  const actionMenuPosition = ref({ top: 0, left: 0 })
  provide(actionMenuPositionKey, actionMenuPosition)

  const openActionMenu: OpenActionMenu = (options, e) => {
    isActionMenuOpen.value = true
    actionMenuOptions.value = options

    const { clientX, clientY } = e
    console.log('🚀 ~ useProvideActionMenu ~ clientX:', clientX, clientY)

    nextTick(() => {
      if (menuRef.value) {
        const rect = menuRef.value.getBoundingClientRect()

        let newTop = clientY
        if (clientY + rect.height > window.innerHeight) {
          newTop = clientY - rect.height
        }
        actionMenuPosition.value.top = newTop
        let newLeft = clientX
        if (clientX + rect.width > window.innerWidth) {
          newLeft = clientX - rect.width
        }
        actionMenuPosition.value.left = newLeft
      }
    })
  }
  provide(openActionMenuKey, openActionMenu)

  const closeActionMenu = () => {
    isActionMenuOpen.value = false
  }
  provide(closeActionMenuKey, closeActionMenu)

  return {
    isActionMenuOpen,
    actionMenuOptions,
    closeActionMenu,
    actionMenuPosition
  }
}

export const useInjectActionMenu = () => {
  const isActionMenuOpen = inject(isActionMenuOpenKey)
  const actionMenuOptions = inject(actionMenuOptionsKey, ref([]))
  const menuRef = inject(menuRefKey)
  const openActionMenu = inject(openActionMenuKey)
  const actionMenuPosition = inject(actionMenuPositionKey, ref({ top: 0, left: 0 }))
  const closeActionMenu = inject(closeActionMenuKey)
  return {
    isActionMenuOpen,
    actionMenuOptions,
    menuRef,
    openActionMenu,
    actionMenuPosition,
    closeActionMenu
  }
}
