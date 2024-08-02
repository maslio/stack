import type { Reactive } from 'vue'

export interface LayoutProvide {
  id: string
  isMini: ComputedRef<boolean>
  pageEl: Ref<HTMLElement>
  menuEl: Ref<HTMLElement>
  nextEl: Ref<HTMLElement>
  nextId: Ref<string | null>
  bottomEl: Ref<HTMLElement>
  footerEl: Ref<HTMLElement>
  scroll: ReturnType<typeof useScroll>
  close: (target?: string) => void
  open: (target: string, data: any) => void
  opened: Reactive<{
    next: string | number | null
    self: string | number | null
    dialog: string | number | null
  }>
}

export function useLayout() {
  return inject('layout') as LayoutProvide
}
