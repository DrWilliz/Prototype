<template>
  <div class="loggerDiv">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input class="input-field" type="text" name="username" placeholder="Brugernavn" required />
        <div class="password-wrapper">
          <input
            class="input-field"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            id="password"
            placeholder="Adgangskode"
            required
          />
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            <FontAwesomeIcon v-if="showPassword" :icon="far.faEyeSlash" id="toggleIcon" />
            <FontAwesomeIcon v-else :icon="far.faEye" id="toggleIcon" />
          </button>
        </div>
        <!-- Login button -->
        <button type="submit" class="login-button">Login</button>
      </form>
      <div class="forgot-password">
        <a href="/passwordchange.html">Glemt adgangskode?</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const emit = defineEmits(['login'])

const showPassword = ref(false)

function login() {
  emit('login')
}
</script>

<style scoped>
.loggerDiv {
  margin: auto;
}

.toggle-password {
  opacity: 50%;
}
</style>
