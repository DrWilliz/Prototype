<template>
  <div class="create-user">
    <h2>Create user</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">E-mail:</label>
        <input type="text" id="username" v-model="userData.username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="userData.password" required />
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
        <label for="role">Role:</label>
        <select id="role" v-model="userData.role" required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: '',
        password: '',
        role: 'user',
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$emit('create-user', this.userData);
        alert('Brugeren blev oprettet!');
      } catch (err) {
        alert('Fejl under oprettelse af bruger: ' + err.message);
      }
    },
  },
};
</script>

<style scoped>

</style>
