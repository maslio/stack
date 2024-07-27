import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { writeFile } from 'node:fs/promises'

interface FetchedTasks {
  tasks: Record<string, { description: string }>
}

const rootDir = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
const filename = join(rootDir, 'tasks.json')

export default defineTask({
  meta: {
    name: 'dev:generate:tasks',
    description: 'Generate Task list',
  },
  async run() {
    const data = await $fetch<FetchedTasks>('/_nitro/tasks')
    const tasks = Object.entries(data.tasks).map((task) => {
      return {
        name: task[0],
        description: task[1].description,
      }
    })
    await writeFile(filename, JSON.stringify(tasks, null, 2))
    return {
      result: tasks,
    }
  },
})
