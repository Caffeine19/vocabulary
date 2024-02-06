import { InjectionKey, Ref, inject, provide, ref } from 'vue'

import { ButtonType } from '@renderer/components/Button.vue'

const isActionMenuOpenKey = Symbol('isActionMenuOpen') as InjectionKey<Ref<boolean>>

export interface ConfirmationOptions {
  title?: string
  description?: string
  confirmButtonType?: ButtonType
  onConfirm?: () => void
  onCancel?: () => void
}
const confirmationOptionsKey = Symbol('confirmationOptions') as InjectionKey<
  Ref<ConfirmationOptions>
>

const openConfirmationKey = Symbol('openConfirmation') as InjectionKey<
  (options: ConfirmationOptions) => void
>

const closeConfirmationKey = Symbol('closeConfirmation') as InjectionKey<() => void>

export const useProvideConfirmation = () => {
  const isConfirmationOpen = ref(false)
  provide(isActionMenuOpenKey, isConfirmationOpen)

  const confirmationOptions = ref<ConfirmationOptions>({})
  provide(confirmationOptionsKey, confirmationOptions)

  const openConfirmation = (options: ConfirmationOptions) => {
    console.log('🚀 ~ openConfirmation ~ options:', options)
    isConfirmationOpen.value = true
    confirmationOptions.value = options
  }
  provide(openConfirmationKey, openConfirmation)

  const closeConfirmation = () => {
    isConfirmationOpen.value = false
  }
  provide(closeConfirmationKey, closeConfirmation)

  return {
    isConfirmationOpen,
    confirmationOptions,
    openConfirmation,
    closeConfirmation
  }
}

export const useInjectConfirmation = () => {
  const isConfirmationOpen = inject(isActionMenuOpenKey, ref(false))
  const confirmationOptions = inject(confirmationOptionsKey)
  const openConfirmation = inject(openConfirmationKey, () => {})
  const closeConfirmation = inject(closeConfirmationKey, () => {})

  return {
    isConfirmationOpen,
    confirmationOptions,
    openConfirmation,
    closeConfirmation
  }
}
