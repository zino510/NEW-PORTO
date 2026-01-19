import jwt from 'jsonwebtoken'

const TOKEN_EXPIRY = 30 * 60 // 30 menit
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 // 7 hari

const generateTokens = (username) => {
  const token = jwt.sign(
    { username, type: 'access' },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: TOKEN_EXPIRY }
  )

  const refreshToken = jwt.sign(
    { username, type: 'refresh' },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  )

  return { token, refreshToken }
}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    )
    return { valid: true, decoded }
  } catch (error) {
    return { valid: false, error: error.message }
  }
}

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

  const { refreshToken } = req.body

  try {
    if (!refreshToken) {
      return res.status(400).json({ 
        success: false, 
        message: 'Refresh token harus disediakan' 
      })
    }

    // Verify refresh token
    const verification = verifyToken(refreshToken)
    
    if (!verification.valid) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau sudah expired'
      })
    }

    const { username } = verification.decoded

    // Generate new tokens
    const { token, refreshToken: newRefreshToken } = generateTokens(username)

    // Set cookies
    res.setHeader('Set-Cookie', [
      `authToken=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${TOKEN_EXPIRY}; Path=/`,
      `refreshToken=${newRefreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${REFRESH_TOKEN_EXPIRY}; Path=/`
    ])

    res.status(200).json({
      success: true,
      message: 'Token berhasil di-refresh',
      token,
      refreshToken: newRefreshToken,
      expiresIn: TOKEN_EXPIRY
    })

  } catch (error) {
    console.error('Token Refresh API Error:', error)
    
    res.status(500).json({
      success: false,
      message: 'Terjadi error pada server'
    })
  }
}
