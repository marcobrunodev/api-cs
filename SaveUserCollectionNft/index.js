const api = require('../utils/api')
const getCookie = require('../utils/getCookie')

module.exports = async (context, req) => {
  try {
    const {collection} = req.body
    const cookies = req.headers.cookie

    if (!cookies) throw new Error('Invalid token')

    const token = getCookie(cookies, 'discordToken')
    const {user} = await api.getUserByDiscordToken(token)

    if (!user) throw new Error(`Doesn't have user`)

    const updateUser = {
      ...user,
      collection
    }

    context.bindings.outputUser = updateUser

    return {
      status: 200,
      body: {
        status: 200,
        body: {
          status: 200,
          collection
        }
      }
    }
  } catch(error) {
    context.log('SaveUserCollectionsNft', 'ERROR', error)
    return {
      status: 500
    }
  } 
}