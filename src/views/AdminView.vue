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
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
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
 <div class="user-list-container">
    <h2>User administration</h2>

    <table class="user-table">
      <thead>
        <tr>
          <th>UserId</th>
          <th>Email</th>
          <th>Navn</th>
          <th>Admin</th>
          <th>Handling</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.UserId">
          <td>{{ user.UserId }}</td>
          <td>{{ user.Email }}</td>
          <td>{{ user.Name }}</td>
          <td>{{ user.IsAdmin ? 'Ja' : 'Nej' }}</td>
          <td>
            <button class="delete-btn" @click="deleteUser(user.UserId)">Slet</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import axiosInstance from '@/api/axios';

export default {
  data() {
    return {
      userData: {
        Email: '',
        Password: '',
        isAdmin: false, // Default værdi
        Name: '',
      },
      confirmPassword: '',
      errorMessage: '',
      users: [], // Brugerlisten
    };
  },
  mounted() {
    this.fetchUsers(); // Hent brugere, når komponenten er mountet
  },
  methods: {
    // Håndter brugeroprettelse
    async handleSubmit() {
      // Tjek om passwordene matcher
      if (this.userData.Password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      try {
        // Send data til backend API
        const response = await axiosInstance.post('/create-user', this.userData);

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

    // Hent brugere fra backend
    async fetchUsers() {
      try {
        const response = await axiosInstance.get('/users');
        this.users = response.data; // Opdaterer brugerlisten med data fra backend
      } catch (error) {
        console.error('Fejl ved hentning af brugere', error);
      }
    },

    // Slet bruger
    async deleteUser(userId) {
      const confirmDelete = confirm('Er du sikker på, at du vil slette denne bruger?');
      if (confirmDelete) {
        try {
          console.log(`Sletter bruger med ID: ${userId}`);

          const response = await axiosInstance.delete(`/users/${userId}`);
          console.log('Delete response:', response);

          if (response.status === 200 || response.status === 204) {
            alert('Bruger blev slettet');
            this.fetchUsers(); // Opdater brugerlisten efter sletning
          } else {
            alert('Fejl ved sletning af bruger');
          }
        } catch (error) {
          console.error('Fejl ved netværksanmodning', error);
          alert('Fejl ved sletning af bruger');
        }
      }
    },
  },
};
</script>
