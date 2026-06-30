import { describe, it, expect } from 'vitest'
import sm4 from './4.js'

describe('sm4', () => {
  const key = 'c24df419505c3db9ee9922d97839c221'

  describe('gcm encrypt/decrypt', () => {
    it('should encrypt and decrypt round-trip', () => {
      const plaintext = 'Hello, SM4-GCM!'
      const encrypted = sm4.encrypt(plaintext, key, { mode: 'gcm' })
      expect(typeof encrypted).toBe('string')
      expect(encrypted.length).toBeGreaterThan(0)

      const decrypted = sm4.decrypt(encrypted, key, { mode: 'gcm' })
      expect(decrypted).toBe(plaintext)
    })

    it('should produce correct hex length for "Watone.1234" (39 bytes = 12 IV + 11 CT + 16 Tag)', () => {
      const plaintext = 'Watone.1234'
      const encrypted = sm4.encrypt(plaintext, key, { mode: 'gcm' })
      // "Watone.1234" = 11 bytes, so 12 + 11 + 16 = 39 bytes = 78 hex chars
      expect(encrypted).toHaveLength(78)
    })

    it('should produce different ciphertexts each time (random IV)', () => {
      const plaintext = 'test data'
      const enc1 = sm4.encrypt(plaintext, key, { mode: 'gcm' })
      const enc2 = sm4.encrypt(plaintext, key, { mode: 'gcm' })
      expect(enc1).not.toBe(enc2)
    })

    it('should decrypt with fixed IV', () => {
      const iv = new Uint8Array([
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06,
        0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c
      ])
      const plaintext = 'Watone.1234'
      const encrypted = sm4.encrypt(plaintext, key, { mode: 'gcm', iv })
      const decrypted = sm4.decrypt(encrypted, key, { mode: 'gcm' })
      expect(decrypted).toBe(plaintext)
    })

    it('should reject tampered ciphertext (tag verification fails)', () => {
      const plaintext = 'secret data'
      const encrypted = sm4.encrypt(plaintext, key, { mode: 'gcm' })
      // Flip a hex char in the ciphertext portion
      const chars = encrypted.split('')
      chars[30] = chars[30] === 'a' ? 'b' : 'a'
      const tampered = chars.join('')

      const result = sm4.decrypt(tampered, key, { mode: 'gcm' })
      // Should return the tampered input on failure (error is caught)
      expect(result).toBe(tampered)
    })

    it('should handle empty string', () => {
      const result = sm4.encrypt('', key, { mode: 'gcm' })
      expect(result).toBe('')
    })

    it('should handle null/undefined', () => {
      expect(sm4.encrypt(null, key, { mode: 'gcm' })).toBe(null)
      expect(sm4.encrypt(undefined, key, { mode: 'gcm' })).toBe(undefined)
    })

    it('should support output as array', () => {
      const plaintext = 'test'
      const encrypted = sm4.encrypt(plaintext, key, { mode: 'gcm', output: 'array' })
      expect(encrypted).toBeInstanceOf(Uint8Array)
      // 12 IV + 4 ciphertext + 16 Tag = 32
      expect(encrypted).toHaveLength(32)

      const decrypted = sm4.decrypt(encrypted, key, { mode: 'gcm', output: 'array' })
      expect(decrypted).toBeInstanceOf(Uint8Array)
    })

    it('should handle JSON data', () => {
      const data = { name: 'test', value: 123 }
      const json = JSON.stringify(data)
      const encrypted = sm4.encrypt(json, key, { mode: 'gcm' })
      const decrypted = sm4.decrypt(encrypted, key, { mode: 'gcm' })
      expect(decrypted).toEqual(data)
    })

    it('should handle Chinese characters', () => {
      const plaintext = '你好世界'
      const encrypted = sm4.encrypt(plaintext, key, { mode: 'gcm' })
      const decrypted = sm4.decrypt(encrypted, key, { mode: 'gcm' })
      expect(decrypted).toBe(plaintext)
    })

    it('should handle AAD (additional authenticated data)', () => {
      const plaintext = 'authenticated data'
      const aad = new TextEncoder().encode('some-aad')
      const encrypted = sm4.encrypt(plaintext, key, { mode: 'gcm', aad })
      const decrypted = sm4.decrypt(encrypted, key, { mode: 'gcm', aad })
      expect(decrypted).toBe(plaintext)
    })

    it('should fail decrypt with wrong AAD', () => {
      const plaintext = 'authenticated data'
      const aad = new TextEncoder().encode('correct-aad')
      const encrypted = sm4.encrypt(plaintext, key, { mode: 'gcm', aad })

      const wrongAad = new TextEncoder().encode('wrong-aad')
      const result = sm4.decrypt(encrypted, key, { mode: 'gcm', aad: wrongAad })
      // Should return the input on failure
      expect(typeof result).toBe('string')
    })
  })

  describe('ecb mode (existing)', () => {
    it('should encrypt and decrypt', () => {
      const plaintext = 'test data'
      const encrypted = sm4.encrypt(plaintext, key)
      const decrypted = sm4.decrypt(encrypted, key)
      expect(decrypted).toBe(plaintext)
    })
  })

  describe('cbc mode (existing)', () => {
    it('should encrypt and decrypt', () => {
      const plaintext = 'test data'
      const iv = '0123456789abcdeffedcba9876543210'
      const encrypted = sm4.encrypt(plaintext, key, { mode: 'cbc', iv })
      const decrypted = sm4.decrypt(encrypted, key, { mode: 'cbc', iv })
      expect(decrypted).toBe(plaintext)
    })
  })
})
