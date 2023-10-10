export const selfBlockMiddleware = (req, res, next) => {
  const rawHeaders = req.rawHeaders
  console.log('🚀 ~ file: self-block.js:3 ~ selfBlockMiddleware ~ rawHeaders:', rawHeaders.slice(0, 5))

  let hostValue = null

  const lengthHeaders = rawHeaders.length
  for (let i = 0; i < lengthHeaders - 1; i++) {
    if (rawHeaders[i] === 'Host') {
      hostValue = rawHeaders[i + 1]
      break // Stop searching once you find the "Host" header
    }
  }
  console.log('🚀 ~ file: self-block.js:11 ~ selfBlockMiddleware ~ hostValue:', hostValue)

  if (!hostValue.includes('mackay-bilby-frqr.1.sg-1.fl0.io')) {
    return res.status(403).send('Forbidden')
  }

  next()
}
