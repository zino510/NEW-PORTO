export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    // Clear cookies
    res.setHeader('Set-Cookie', [
      'authToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
      'refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
    ])

    res.status(200).json({
      success: true,
      message: 'Logout berhasil'
    })

  } catch (error) {
    console.error('Logout API Error:', error)
    
    res.status(500).json({
      success: false,
      message: 'Terjadi error pada server'
    })
  }
}
