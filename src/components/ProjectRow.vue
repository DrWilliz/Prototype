<template>
  <tr :data-project-id="project.id" data-project-url="stack.html" class="clickable-row">
    <td>{{ project.name }}</td>
    <td>{{ project.author }}</td>
    <td>{{ project.createdAt }}</td>
    <td>{{ project.template }}</td>
    <td>
      <span class="status" :class="project.status ? 'active' : 'inactive'">
        {{ project.status ? 'Active' : 'Inactive' }}
      </span>
    </td>
    <td>
      <label class="toggle-switch">
        <input
          type="checkbox"
          :checked="project.status"
          @change="toggleProjectStatus"
          :disabled="isToggling"
        />
        <span class="slider"></span>
      </label>
      <button @click="deleteProject" class="delete-project-btn" :disabled="isDeleting">
        <FontAwesomeIcon :icon="faTrash" class="delete-icon" />
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { type IProject } from '@/types/project'
import { ref } from 'vue'
import axiosInstance from '@/api/axios'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const props = defineProps<{
  project: IProject
}>()

const emit = defineEmits(['project-status-changed'])

const isToggling = ref(false)

const isDeleting = ref(false)
const router = useRouter()

async function deleteProject() {
  if (isDeleting.value) return

  // Confirm deletion in case they are stupid
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the project "${props.project.name}"?`,
  )
  if (!confirmDelete) return

  try {
    isDeleting.value = true

    // Use the delete-stack endpoint with the Portainer project ID
    await axiosInstance.delete('/delete-stack', {
      data: {
        id: props.project.portainerID,
      },
    })

    // Emit an event to the parent component to remove the project from the list

    alert(`Project "${props.project.name}" has been deleted successfully.`)
  } catch (error) {
    console.error('Error deleting project:', error)
  } finally {
    isDeleting.value = false
  }
}

async function toggleProjectStatus() {
  if (isToggling.value) return

  try {
    isToggling.value = true

    const endpoint = props.project.status ? '/stop' : '/start'

    await axiosInstance.post(endpoint, {
      id: props.project.portainerID,
    })

    emit('project-status-changed', {
      id: props.project.id,
      newStatus: !props.project.status,
    })
  } catch (error) {
    console.error(`Error ${props.project.status ? 'stopping' : 'starting'} project:`, error)
  } finally {
    isToggling.value = false
  }
}
</script>

<style scoped>
.delete-project-btn {
  background-color: transparent;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.delete-icon {
  font-size: 1.25rem;
}

.delete-project-btn:hover {
  background-color: rgba(220, 53, 69, 0.1);
  color: #a71d2a;
}

.delete-project-btn:disabled {
  color: #6c757d;
  cursor: not-allowed;
  background-color: transparent;
}
</style>
