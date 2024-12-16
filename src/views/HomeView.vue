<template>
  <!-- Page content -->
  <div class="main">
    <div class="flex-container">
      <!-- <div>
            <span @click="openNav()">Menu</span>
          </div> -->
    </div>
    <div class="flex-container justify-boi">
      <h2 class="Loverskrift2">Home</h2>
    </div>

    <div class="stackList">
      <input
        type="text"
        id="xsearch-input"
        placeholder="Search projects..."
        v-model="searchInput"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Date</th>
            <th>Template</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="xprojects">
          <ProjectRow v-for="project in searchedProjects" :key="project.id" :project="project" />
        </tbody>
      </table>
      <div class="stack-button-div">
        <a href="/newproject" id="newStackButton">
          <span class="button-text">New project</span>
          <span class="button-icon"><i class="fa-solid fa-plus"></i></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectRow from '@/components/ProjectRow.vue'
import type { IProject } from '@/types/project'
import { computed, ref, onMounted } from 'vue'
import axiosInstance from '@/api/axios'

const searchInput = ref('')
const projects = ref<IProject[]>([])

async function getProjects() {
  try {
    await axiosInstance.get('/projects')
    const response = await axiosInstance.get('/database-projects')
    projects.value = response.data.map((project: any) => ({
      id: project.Stack_ID,
      name: project.Name,
      author: project.Author,
      createdAt: project.Date,
      template: project.TemplateName,
      status: project.Status === 1,
    }))
  } catch (error) {
    console.error('Fetching projects failed. Miserably:', error)
  }
}

const searchedProjects = computed<IProject[]>(() => {
  return projects.value.filter((project) => {
    const data = Object.values(project).join(' ').toLowerCase()
    return data.includes(searchInput.value.toLowerCase())
  })
})

async function getStacks() {
  try {
    const response = await axiosInstance.get('/projects')
    console.log('Projects:', response.data.projects)
    console.log('Sync Result:', response.data.syncResult)
  } catch (error) {
    console.error('Fetching failed:', error)
  }
}

window.onload = getStacks
onMounted(getProjects)
</script>
