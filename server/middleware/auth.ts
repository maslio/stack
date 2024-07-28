import { decodeToken, getUser } from '../directus/auth'

const cookieName = 'directus_session_token'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, cookieName)
  if (!token) {
    event.context.user = null
    return
  }
  try {
    const session = decodeToken(token)
    const user = await getUser(session)
    event.context.user = user
  }
  catch (e: any) {
    consola.error(e)
  }
})
