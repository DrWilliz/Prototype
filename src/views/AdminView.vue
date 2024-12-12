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
          <th>Name</th>
          <th>Admin</th>
          <th>Handling</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.UserId">
          <td>{{ user.UserId }}</td>
          <td>{{ user.Email }}</td>
          <td>{{ user.Name }}</td>
          <td>{{ user.IsAdmin ? 'Yes' : 'No' }}</td>
          <td>
            <button class="delete-btn" @click="deleteUser(user.UserId)">Delete</button>
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
        isAdmin: false,
        Name: '',
      },
      confirmPassword: '',
      errorMessage: '',
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async handleSubmit() {
      // Check if passwords match
      if (this.userData.Password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      try {
        // Send data to backend API
        const response = await axiosInstance.post('/create-user', this.userData);

        // Handle API response
        if (response.data.success) {
          alert(response.data.success);
          // Reset form and fetch updated user list
          this.resetForm();
          this.fetchUsers();
        } else if (response.data.error) {
          this.errorMessage = response.data.error;
        }
      } catch (err) {
        this.errorMessage = 'Error creating user: ' + err.message;
        console.error(err);
      }
    },

    // Fetch users from backend
    async fetchUsers() {
      try {
        const response = await axiosInstance.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users', error);
        alert('Failed to fetch users');
      }
    },

    // Delete user
    async deleteUser(userId) {
      const confirmDelete = confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        try {
          console.log(`Deleting user with ID: ${userId}`);

          const response = await axiosInstance.delete(`/users/${userId}`);

          if (response.status === 200 || response.status === 204) {
            alert('User successfully deleted');
            // Refresh the user list
            this.fetchUsers();
          } else {
            alert('Failed to delete user');
          }
        } catch (error) {
          console.error('Network request error', error);
          alert('Error deleting user');
        }
      }
    },

    // Reset form after successful user creation
    resetForm() {
      this.userData = {
        Email: '',
        Password: '',
        isAdmin: false,
        Name: '',
      };
      this.confirmPassword = '';
      this.errorMessage = '';
    }
  },
};

</script>
