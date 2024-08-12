// @ts-ignore
import * as jxk from '../../src/index'

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    console.log(jxk)
    let sm4Config = {
      inputEncoding: 'utf8',
      outputEncoding: 'hex',
    };


    let plaintext = '中国国密加解密算法'
    let ciphertext = jxk.sm4.encrypt(plaintext + '', 'b854a476bb97a0e9a9a4b214b2c6558a', sm4Config)
    console.log("===🐛=== ~ setCounter ~ ciphertext:", ciphertext);
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}
