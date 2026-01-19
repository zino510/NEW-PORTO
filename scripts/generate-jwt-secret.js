#!/usr/bin/env node

/**
 * Script untuk generate JWT secret yang aman
 * Usage: node scripts/generate-jwt-secret.js [length]
 * 
 * Default length: 64 characters
 * Recommended minimum: 32 characters
 */

import crypto from 'crypto'

const length = parseInt(process.argv[2]) || 64

if (length < 32) {
  console.warn('⚠️  Warning: Secret kurang dari 32 karakter (minimum recommended)')
}

console.log(`🔐 Generating ${length}-character JWT secret...\n`)

const secret = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)

console.log('✅ JWT Secret generated successfully!\n')
console.log('Secret:')
console.log(secret)
console.log(`\nLength: ${secret.length} characters`)
console.log('\n📝 Copy this secret ke JWT_SECRET di .env\n')
console.log('🔒 Jangan share secret ini dengan siapapun!')
console.log('📌 Simpan di tempat aman (password manager, dsb)\n')
