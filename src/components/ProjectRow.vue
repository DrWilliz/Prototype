<template>
  <tr :data-project-id="project.id" data-project-url="stack.html" class="clickable-row">
    <td>{{ project.name }}</td>
    <td>{{ project.author }}</td>
    <td>{{ project.createdAt }}</td>
    <td>{{ project.subdomain }}</td>
    <td>
      <span class="status" :class="checked ? 'active' : 'inactive'">
        {{ checked ? 'Active' : 'Inactive' }}
      </span>
    </td>
    <td>
      <label class="toggle-switch">
        <input v-model="checked" type="checkbox" />
        <span class="slider"></span>
      </label>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { type IProject } from '@/types/project'
import { reactive, toRef } from 'vue'

const props = defineProps<{
  project: IProject
}>()

const checked = toRef(props.project.status)
</script>
