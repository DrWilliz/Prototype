<template>
  <div class="loggerDiv">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input class="input-field" type="text" v-model="email" placeholder="Email" required />
        <div class="password-wrapper">
          <input
            class="input-field"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            required
          />
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            <FontAwesomeIcon v-if="showPassword" :icon="far.faEyeSlash" id="toggleIcon" />
            <FontAwesomeIcon v-else :icon="far.faEye" id="toggleIcon" />
          </button>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div class="forgot-password">
        <a href="/passwordchange.html">Forgot password?</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '@/api/axios'

const emits = defineEmits(['login'])

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const router = useRouter()

const login = async () => {
  const response = await axiosInstance
    .post<{ status: number }>('/login', {
      email: email.value,
      password: password.value,
    })
    .then((data) => {
      if (data.status === 200) {
        emits('login')
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}
</script>

<style scoped>
.loggerDiv {
  margin: auto;
}

.toggle-password {
  opacity: 50%;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
