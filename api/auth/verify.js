import jwt from 'jsonwebtoken'

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

  try {
    // Get token dari Authorization header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Token tidak ditemukan'
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    const verification = verifyToken(token)

    if (!verification.valid) {
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Token tidak valid atau sudah expired'
      })
    }

    // Token valid
    res.status(200).json({
      success: true,
      valid: true,
      user: verification.decoded.username,
      message: 'Token valid'
    })

  } catch (error) {
    console.error('Verify API Error:', error)
    
    res.status(500).json({
      success: false,
      valid: false,
      message: 'Terjadi error pada server'
    })
  }
}
