<template>
  <div class="create-user">
    <h2>Create user</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="userData.Email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="userData.Password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm password:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="userData.Name" required />
      </div>
      <div class="form-group">
        <label for="isAdmin">Admin:</label>
        <input type="checkbox" id="isAdmin" v-model="userData.isAdmin" />
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userData: {
        Email: '',
        Password: '',
        isAdmin: false,  // Default value
        Name: '',
      },
      confirmPassword: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      // Tjek om passwordene matcher
      if (this.userData.Password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      try {
        // Send data til backend API
        const response = await axios.post('http://localhost:3000/create-user', this.userData);
        
        // Håndter svar fra API
        if (response.data.success) {
          alert(response.data.success);
        } else if (response.data.error) {
          this.errorMessage = response.data.error;
        }
      } catch (err) {
        this.errorMessage = 'Fejl ved oprettelse af bruger: ' + err.message;
        console.error(err);
      }
    },
  },
};
</script>