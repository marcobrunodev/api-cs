module.exports = async (context, req) => {
  try {
    const rankingDB = context.bindings.inputSoloMatchesRanking
    const result = []
    const seen = new Set()

    for (const item of rankingDB) {
      const key = item.username + item.discriminator

      if (!seen.has(key)) {
        result.push(item)
        seen.add(key)
      }
    }

    const ranking = result.map((pos, index) => ({
      ...pos,
      rank: index + 1
    }))

  
    return {
      status: 200,
      body: {
        status: 200,
        ranking: ranking.slice(0, 100)
      }
    }
  } catch(error) {
    context.log('GetRank100', 'ERROR', error)
    return {
      status: 500
    }
  }
}