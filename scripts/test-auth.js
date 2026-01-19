#!/usr/bin/env node

/**
 * Authentication Testing Script
 * Run: node scripts/test-auth.js [test-name]
 * 
 * Available tests:
 * - all              (Run all tests)
 * - login            (Test login endpoint)
 * - rate-limit       (Test rate limiting)
 * - token-verify     (Test token verification)
 * - token-refresh    (Test token refresh)
 * - logout           (Test logout endpoint)
 */

import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:3000/api'
const TEST_USERNAME = '2117'
const TEST_PASSWORD = '2117'
const WRONG_PASSWORD = 'wrong123'

let testResults = {
  passed: 0,
  failed: 0,
  tests: []
}

// ============================================
// TESTING UTILITIES
// ============================================

const log = {
  info: (msg) => console.log('ℹ️  ' + msg),
  success: (msg) => console.log('✅ ' + msg),
  error: (msg) => console.log('❌ ' + msg),
  warning: (msg) => console.log('⚠️  ' + msg),
  group: (title) => console.group('🧪 ' + title),
  groupEnd: () => console.groupEnd(),
  section: (title) => console.log('\n' + '='.repeat(50) + '\n' + title + '\n' + '='.repeat(50))
}

const assert = {
  equal: (actual, expected, message) => {
    if (actual === expected) {
      testResults.passed++
      log.success(`${message}: ${actual}`)
      return true
    } else {
      testResults.failed++
      log.error(`${message}: Expected ${expected}, got ${actual}`)
      return false
    }
  },
  notNull: (value, message) => {
    if (value !== null && value !== undefined) {
      testResults.passed++
      log.success(message)
      return true
    } else {
      testResults.failed++
      log.error(message + ': Value is null/undefined')
      return false
    }
  },
  isTrue: (condition, message) => {
    if (condition) {
      testResults.passed++
      log.success(message)
      return true
    } else {
      testResults.failed++
      log.error(message)
      return false
    }
  }
}

// ============================================
// TEST CASES
// ============================================

/**
 * Test 1: Login dengan kredensial benar
 */
async function testSuccessfulLogin() {
  log.section('Test 1: Successful Login')
  
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username: TEST_USERNAME,
      password: TEST_PASSWORD,
      rememberMe: false,
      csrfToken: 'test-token'
    })

    log.group('Response Data')
    console.log(response.data)
    log.groupEnd()

    assert.equal(response.status, 200, 'HTTP Status')
    assert.isTrue(response.data.success, 'Success flag')
    assert.notNull(response.data.token, 'Token generated')
    
    testResults.tests.push({
      name: 'Successful Login',
      passed: testResults.passed > 0
    })
    
    return response.data.token
  } catch (error) {
    log.error('Login failed: ' + error.message)
    testResults.failed++
    testResults.tests.push({
      name: 'Successful Login',
      passed: false
    })
    return null
  }
}

/**
 * Test 2: Login dengan password salah
 */
async function testFailedLogin() {
  log.section('Test 2: Failed Login (Wrong Password)')
  
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username: TEST_USERNAME,
      password: WRONG_PASSWORD,
      rememberMe: false,
      csrfToken: 'test-token'
    }, {
      validateStatus: () => true // Don't throw on 401
    })

    log.group('Response Data')
    console.log(response.data)
    log.groupEnd()

    assert.equal(response.status, 401, 'HTTP Status (should be 401)')
    assert.isTrue(!response.data.success, 'Success flag should be false')
    
    testResults.tests.push({
      name: 'Failed Login',
      passed: testResults.passed > 0
    })
  } catch (error) {
    log.error('Test error: ' + error.message)
    testResults.failed++
    testResults.tests.push({
      name: 'Failed Login',
      passed: false
    })
  }
}

/**
 * Test 3: Rate limiting
 */
async function testRateLimiting() {
  log.section('Test 3: Rate Limiting')
  log.warning('This will simulate 6 failed login attempts')
  
  let blockedAt = null
  
  for (let i = 1; i <= 6; i++) {
    log.info(`Attempt ${i}/6...`)
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: TEST_USERNAME,
        password: `wrong${i}`,
        rememberMe: false,
        csrfToken: 'test-token'
      }, {
        validateStatus: () => true
      })

      if (response.status === 429) {
        log.warning(`Rate limited after ${i} attempts`)
        blockedAt = i
        assert.equal(response.status, 429, `Rate limit at attempt ${i}`)
        break
      } else if (response.status === 401) {
        log.warning(`Attempt ${i}: Authentication failed (expected)`)
      } else {
        log.error(`Unexpected status: ${response.status}`)
      }

      // Small delay between attempts
      await new Promise(r => setTimeout(r, 100))
    } catch (error) {
      log.error('Request error: ' + error.message)
      testResults.failed++
    }
  }

  if (blockedAt) {
    testResults.tests.push({
      name: 'Rate Limiting',
      passed: true
    })
  } else {
    log.warning('Rate limiting may not be triggered yet')
    testResults.tests.push({
      name: 'Rate Limiting',
      passed: false
    })
  }
}

/**
 * Test 4: Token verification
 */
async function testTokenVerification(token) {
  log.section('Test 4: Token Verification')
  
  if (!token) {
    log.warning('No token available. Run successful login test first.')
    return
  }

  try {
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    log.group('Response Data')
    console.log(response.data)
    log.groupEnd()

    assert.equal(response.status, 200, 'HTTP Status')
    assert.isTrue(response.data.valid, 'Token valid')
    
    testResults.tests.push({
      name: 'Token Verification',
      passed: testResults.passed > 0
    })
  } catch (error) {
    log.error('Verification failed: ' + error.message)
    testResults.failed++
    testResults.tests.push({
      name: 'Token Verification',
      passed: false
    })
  }
}

/**
 * Test 5: Token refresh
 */
async function testTokenRefresh() {
  log.section('Test 5: Token Refresh')
  
  try {
    // Get a valid refresh token first
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      username: TEST_USERNAME,
      password: TEST_PASSWORD,
      rememberMe: true,
      csrfToken: 'test-token'
    })

    const refreshToken = loginResponse.data.refreshToken

    if (!refreshToken) {
      log.warning('No refresh token available')
      return
    }

    // Now test refresh
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken: refreshToken
    })

    log.group('Response Data')
    console.log(response.data)
    log.groupEnd()

    assert.equal(response.status, 200, 'HTTP Status')
    assert.isTrue(response.data.success, 'Success flag')
    assert.notNull(response.data.token, 'New token generated')
    
    testResults.tests.push({
      name: 'Token Refresh',
      passed: testResults.passed > 0
    })
  } catch (error) {
    log.error('Refresh failed: ' + error.message)
    testResults.failed++
    testResults.tests.push({
      name: 'Token Refresh',
      passed: false
    })
  }
}

/**
 * Test 6: Logout
 */
async function testLogout(token) {
  log.section('Test 6: Logout')
  
  if (!token) {
    log.warning('No token available. Run successful login test first.')
    return
  }

  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {
      token: token
    })

    log.group('Response Data')
    console.log(response.data)
    log.groupEnd()

    assert.equal(response.status, 200, 'HTTP Status')
    assert.isTrue(response.data.success, 'Success flag')
    
    testResults.tests.push({
      name: 'Logout',
      passed: testResults.passed > 0
    })
  } catch (error) {
    log.error('Logout failed: ' + error.message)
    testResults.failed++
    testResults.tests.push({
      name: 'Logout',
      passed: false
    })
  }
}

// ============================================
// RUN TESTS
// ============================================

async function runAllTests() {
  log.section('RUNNING ALL AUTHENTICATION TESTS')
  
  console.log(`API URL: ${API_URL}\n`)
  
  // Test 1: Successful login
  const token = await testSuccessfulLogin()
  
  // Test 2: Failed login
  await testFailedLogin()
  
  // Test 3: Rate limiting (optional - commented to avoid rate limiting)
  // await testRateLimiting()
  
  // Test 4: Token verification
  await testTokenVerification(token)
  
  // Test 5: Token refresh
  await testTokenRefresh()
  
  // Test 6: Logout
  await testLogout(token)
}

async function runSpecificTest(testName) {
  switch (testName.toLowerCase()) {
    case 'login':
      await testSuccessfulLogin()
      break
    case 'failed':
      await testFailedLogin()
      break
    case 'rate-limit':
      log.warning('Rate limiting test will block for 15 minutes. Proceed? (y/n)')
      break
    case 'verify':
      log.warning('Run login test first')
      break
    case 'refresh':
      await testTokenRefresh()
      break
    case 'logout':
      log.warning('Run login test first')
      break
    default:
      log.error(`Unknown test: ${testName}`)
  }
}

// ============================================
// PRINT RESULTS
// ============================================

function printResults() {
  log.section('TEST RESULTS SUMMARY')
  
  console.log(`Total Tests: ${testResults.tests.length}`)
  console.log(`✅ Passed: ${testResults.passed}`)
  console.log(`❌ Failed: ${testResults.failed}`)
  console.log(`Success Rate: ${Math.round((testResults.passed / (testResults.passed + testResults.failed)) * 100)}%\n`)
  
  log.group('Detailed Results')
  testResults.tests.forEach((test, idx) => {
    const status = test.passed ? '✅' : '❌'
    console.log(`${idx + 1}. ${status} ${test.name}`)
  })
  log.groupEnd()
  
  if (testResults.failed === 0) {
    log.success('All tests passed! 🎉')
    process.exit(0)
  } else {
    log.error(`${testResults.failed} test(s) failed`)
    process.exit(1)
  }
}

// ============================================
// MAIN
// ============================================

async function main() {
  const testName = process.argv[2] || 'all'
  
  console.log('\n')
  console.log('🧪 Authentication Testing Script')
  console.log('================================\n')
  
  try {
    if (testName === 'all') {
      await runAllTests()
    } else {
      await runSpecificTest(testName)
    }
  } catch (error) {
    log.error('Test execution error: ' + error.message)
    process.exit(1)
  } finally {
    setTimeout(printResults, 1000)
  }
}

main()
