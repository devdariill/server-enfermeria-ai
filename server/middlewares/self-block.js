export const selfBlockMiddleware = (req, res, next) => {
  const origin = req.get('origin') || req.get('Origin') || req.header('Origin') || req.header('origin')
  console.log('🚀 ~ file: self-block.js:3 ~ selfBlockMiddleware ~ origin:', origin)

  const host = req.get('host') || req.get('Host') || req.header('Host') || req.header('host')
  console.log('🚀 ~ file: self-block.js:6 ~ selfBlockMiddleware ~ host:', host)

  // You can now use the 'origin' variable in your middleware logic

  const rawHeaders = req.rawHeaders
  console.log('🚀 ~ file: self-block.js:11 ~ selfBlockMiddleware ~ rawHeaders:', rawHeaders)
  // console.log('🚀 ~ file: self-block.js:3 ~ selfBlockMiddleware ~ rawHeaders:', rawHeaders)

  // let hostValue = null

  // const lengthHeaders = rawHeaders.length
  // for (let i = 0; i < lengthHeaders - 1; i++) {
  //   if ((rawHeaders[i]) === 'Host' || (rawHeaders[i]) === 'host') {
  //     hostValue = rawHeaders[i + 1]
  //     break // Stop searching once you find the "Host" header
  //   }
  // }
  // console.log('🚀 ~ file: self-block.js:11 ~ selfBlockMiddleware ~ hostValue:', hostValue)
  const headers = req.headers
  console.log('🚀 ~ file: self-block.js:25 ~ selfBlockMiddleware ~ headers:', headers)
  // if (hostValue.includes('mackay-bilby-frqr.1.sg-1.fl0.io')) {
  //   return res.status(403).send('Forbidden')
  // }
  const referer = req.headers.referer || req.get('referer')
  console.log('🚀 ~ file: self-block.js:26 ~ selfBlockMiddleware ~ referer:', referer)

  // If a referer is present, you can parse it to get the origin
  if (referer) {
    const url = new URL(referer)
    const origin = `${url.protocol}//${url.host}`
    console.log(`Origin of the request: ${origin}`)
  }

  console.log('🚀 ~ file: self-block.js:27 ~ selfBlockMiddleware ~ req.originalUrl:', req.originalUrl)

  next()
}
