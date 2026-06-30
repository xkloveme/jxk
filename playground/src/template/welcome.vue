<script setup>
import { ref, computed } from 'vue'
import { time_date, sm4, mask_address } from 'jxk'

const msg = ref('欢迎使用 jxk函数, 您可以在此直接使用!')
let input = ref('Watone.1234')
const token = ref('c24df419505c3db9ee9922d97839c221')
const mode = ref('gcm')
const encryptedData = ref('')
const decryptedData = ref('')

const modeOptions = [
  { value: 'ecb', label: 'ECB (默认)' },
  { value: 'cbc', label: 'CBC' },
  { value: 'gcm', label: 'GCM (推荐)' }
]

function handleEncrypt() {
  console.log(time_date)
  console.log(mask_address('上海市浦东新区陆家嘴环路1000号'))
  encryptedData.value = sm4.encrypt(input.value, token.value, { mode: mode.value })
}
function handleDecrypt() {
  decryptedData.value = sm4.decrypt(encryptedData.value, token.value, { mode: mode.value })
}

const cipherLength = computed(() => encryptedData.value ? encryptedData.value.length : 0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div style="margin-bottom: 16px; padding: 12px; background: #f0f9ff; border-radius: 8px; font-size: 14px;">
    <strong>SM4 加密模式演示</strong><br/>
    支持 ECB、CBC、GCM 三种模式。GCM 模式提供认证加密，每次加密自动随机 IV。
  </div>

  <div style="margin-bottom: 12px;">
    <label style="font-weight: bold;">加密模式：</label>
    <select v-model="mode" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc;">
      <option v-for="opt in modeOptions" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>

  <div style="margin-bottom: 12px;">
    <label style="font-weight: bold;">密钥 (32位hex)：</label><br/>
    <textarea v-model="token" rows="2" cols="40" style="font-family: monospace;"></textarea>
  </div>

  <div style="margin-bottom: 12px;">
    <label style="font-weight: bold;">明文：</label><br/>
    <textarea v-model="input" rows="3" cols="40"></textarea>
  </div>

  <div style="margin: 16px 0;">
    <button @click="handleEncrypt" style="padding: 8px 16px; background: #4096ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
      加密
    </button>
  </div>

  <div v-if="encryptedData" style="margin-bottom: 12px;">
    <label style="font-weight: bold;">密文 ({{ cipherLength }} 字符)：</label><br/>
    <textarea :value="encryptedData" readonly rows="3" cols="40" style="font-family: monospace; background: #f5f5f5;"></textarea>
  </div>

  <div v-if="encryptedData" style="margin: 16px 0;">
    <button @click="handleDecrypt" style="padding: 8px 16px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer;">
      解密
    </button>
  </div>

  <div v-if="decryptedData" style="margin-bottom: 12px;">
    <label style="font-weight: bold;">解密结果：</label><br/>
    <div style="padding: 8px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 4px;">
      {{ decryptedData }}
    </div>
  </div>
</template>
