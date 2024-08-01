export interface LayoutProvide {
  id: string
  isMini: ComputedRef<boolean>
  pageEl: Ref<HTMLElement>
  menuEl: Ref<HTMLElement>
  next: OpenRef
  nextEl: Ref<HTMLElement>
  nextId: Ref<string | null>
  bottomEl: Ref<HTMLElement>
  footerEl: Ref<HTMLElement>
  scroll: ReturnType<typeof useScroll>
  close: () => void
  open: (target: string, data: any) => void
}

export function useLayout() {
  return inject('layout') as LayoutProvide
}
