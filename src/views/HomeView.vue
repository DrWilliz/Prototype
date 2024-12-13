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

    <!-- <div class="flex-container" id="home-div">
          <div class="Lcontent">
            <figure class="charts">
              <div class="pie"></div>
              <figcaption class="legends">
                <span>Available 6</span>
                <span>Active 2</span>
                <span>Inactive 2</span>
              </figcaption>
            </figure>
          </div>
          <div class="Lcontent"></div>
          <div class="Lcontent"></div>
        </div> -->

    <div class="flex-container" id="home-div">
      <div class="Lcontent">
        <h2>Diagram</h2>
      </div>
      <div class="Lcontent">
        <h2>Pie Chart</h2>
      </div>
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
            <th>Subdomain</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="xprojects">
          <ProjectRow v-for="project in searchedProjects" :key="project.id" :project="project" />
          <!-- <tr data-project-id="1" data-project-url="stack.html" class="clickable-row">
            <td>Project 1</td>
            <td>Maria Anders</td>
            <td>06-03-2025</td>
            <td>examflow2025</td>
            <td><span class="status active">Active</span></td>
            <td>
              <label class="toggle-switch">
                <input type="checkbox" />
                <span class="slider"></span>
              </label>
            </td>
          </tr>
          <tr data-project-id="2" data-project-url="stack.html" class="clickable-row">
            <td>Project 2</td>
            <td>Francisco Chang</td>
            <td>07-03-2025</td>
            <td>exam-project-2025</td>
            <td><span class="status active">Active</span></td>
            <td>
              <label class="toggle-switch">
                <input type="checkbox" />
                <span class="slider"></span>
              </label>
            </td>
          </tr>
          <tr data-project-id="3" data-project-url="stack.html" class="clickable-row">
            <td>Project 3</td>
            <td>John Doe</td>
            <td>07-10-2024</td>
            <td>FSH2024</td>
            <td><span class="status inactive">Inactive</span></td>
            <td>
              <label class="toggle-switch">
                <input type="checkbox" />
                <span class="slider"></span>
              </label>
            </td>
          </tr>
          <tr data-project-id="4" data-project-url="stack.html" class="clickable-row">
            <td>Project 4</td>
            <td>Jane Doe</td>
            <td>16-11-2025</td>
            <td>lastone</td>
            <td><span class="status inactive">Inactive</span></td>
            <td>
              <label class="toggle-switch">
                <input type="checkbox" />
                <span class="slider"></span>
              </label>
            </td>
          </tr> -->
        </tbody>
      </table>
      <div class="stack-button-div">
        <a href="newproject.html" id="newStackButton">
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
      template: '',
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
