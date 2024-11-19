<template>
  <div class="create-user">
    <h2>Opret ny bruger</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Brugernavn:</label>
        <input type="text" id="username" v-model="userData.username" required />
      </div>
      <div class="form-group">
        <label for="password">Adgangskode:</label>
        <input type="password" id="password" v-model="userData.password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Bekræft adgangskode:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>
      <div class="form-group">
        <label for="role">Rolle:</label>
        <select id="role" v-model="userData.role" required>
          <option value="user">Bruger</option>
          <option value="admin">Administrator</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Opret</button>
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
.create-user {
  width: 300px;
  margin: auto;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.create-user h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
