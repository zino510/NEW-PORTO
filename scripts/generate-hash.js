#!/usr/bin/env node

/**
 * Script untuk generate bcrypt password hash
 * Usage: node scripts/generate-hash.js <password>
 * 
 * Contoh:
 * node scripts/generate-hash.js 2117
 * node scripts/generate-hash.js mySecurePassword123
 */

import bcrypt from 'bcryptjs'

const password = process.argv[2]

if (!password) {
  console.error('❌ Password harus disediakan')
  console.error('Usage: node scripts/generate-hash.js <password>')
  process.exit(1)
}

if (password.length < 6) {
  console.error('❌ Password minimal 6 karakter')
  process.exit(1)
}

console.log('🔒 Generating bcrypt hash...')
console.log('Password:', password)
console.log('Rounds: 10')

bcrypt.hash(password, 10)
  .then((hash) => {
    console.log('\n✅ Hash generated successfully!\n')
    console.log('Hash:')
    console.log(hash)
    console.log('\n📝 Copy this hash ke AUTH_PASSWORD_HASH di .env\n')
  })
  .catch((error) => {
    console.error('❌ Error generating hash:', error.message)
    process.exit(1)
  })
