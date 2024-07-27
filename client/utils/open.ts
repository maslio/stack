import type { Open } from '#components'

export type OpenRef = Ref<InstanceType<typeof Open> | undefined>

export function openRef() {
  return ref() as OpenRef
}
