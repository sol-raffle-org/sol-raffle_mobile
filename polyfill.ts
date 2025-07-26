import { Buffer } from 'buffer'
import { getRandomValues as expoCryptoGetRandomValues } from 'expo-crypto'

import structuredClone from '@ungap/structured-clone'

Buffer.prototype.subarray = function subarray(begin: number | undefined, end: number | undefined) {
  const result = Uint8Array.prototype.subarray.apply(this, [begin, end])
  Object.setPrototypeOf(result, Buffer.prototype) // Explicitly add the `Buffer` prototype (adds `readUIntLE`!)
  return result
}

if (!global.structuredClone) {
  global.structuredClone = structuredClone as unknown as typeof global.structuredClone
}

global.Buffer = Buffer

// getRandomValues polyfill
class Crypto {
  getRandomValues = expoCryptoGetRandomValues
}

const webCrypto = typeof crypto !== 'undefined' ? crypto : new Crypto()

const setupPolyfills = async () => {
  try {
    if (typeof crypto === 'undefined') {
      Object.defineProperty(window, 'crypto', {
        configurable: true,
        enumerable: true,
        get: () => webCrypto,
      })
    }

    const { polyfillGlobal } = require('react-native/Libraries/Utilities/PolyfillFunctions')

    // const { TextEncoderStream, TextDecoderStream } = await import(
    //   '@stardazed/streams-text-encoding'
    // );

    if (!global.structuredClone) {
      polyfillGlobal('structuredClone', () => structuredClone)
    }

    console.log('Polyfills loaded successfully')
  } catch (error) {
    console.error('Failed to setup polyfills:', error)
  }
}

setupPolyfills()

export {}
