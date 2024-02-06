import { type Component, inject, provide, ref, type InjectionKey, type Ref } from 'vue'

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

  const actionMenuOptions: Ref<ActionMenuOptions> = ref([])
  provide(actionMenuOptionsKey, actionMenuOptions)

  const actionMenuPosition = ref({ top: 0, left: 0 })
  provide(actionMenuPositionKey, actionMenuPosition)

  const openActionMenu: OpenActionMenu = (options, e) => {
    const { clientX, clientY } = e
    console.log('🚀 ~ useProvideActionMenu ~ clientX:', clientX, clientY)
    actionMenuPosition.value = {
      top: clientY,
      left: clientX
    }

    isActionMenuOpen.value = true
    actionMenuOptions.value = options
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
  const openActionMenu = inject(openActionMenuKey)
  const actionMenuPosition = inject(actionMenuPositionKey, ref({ top: 0, left: 0 }))
  const closeActionMenu = inject(closeActionMenuKey)
  return {
    isActionMenuOpen,
    actionMenuOptions,
    openActionMenu,
    actionMenuPosition,
    closeActionMenu
  }
}
