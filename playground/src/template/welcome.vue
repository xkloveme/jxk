<script setup>
import { ref } from 'vue'
import { is_number,sm4 } from 'jxk'

const msg = ref('欢迎使用 jxk函数, 您可以在此直接使用!')
let input = ref('我是原始数据')
const token = ref('5e0a3ab263b283e3db6001018776c4f0')
const encryptedData = ref('')
const decryptedData = ref('')
function handleEncrypt() {
 encryptedData.value = sm4.encrypt(input.value, token.value)
}
function handleDecrypt() {
 decryptedData.value = sm4.decrypt(encryptedData.value, token.value)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  TOKEN:
  <textarea v-model="token" rows="5" cols="33"></textarea>
  <br/>
  输入前:
  <textarea v-model="input" rows="5" cols="33"></textarea>
  <br/>
  <button @click="handleEncrypt">加密</button>
  <div>加密后：{{encryptedData}}</div>
  <button @click="handleDecrypt">解密</button>
  <div>解密后：{{decryptedData}}</div>
</template>
