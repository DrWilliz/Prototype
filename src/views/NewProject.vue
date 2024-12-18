<template>
  <div class="newStack">
    <h2>New Project</h2>
    <form @submit.prevent="createProject" id="newProjectForm">
      <label for="project-name">Project Name:</label>
      <input
        type="text"
        id="project-name"
        v-model="projectName"
        required
        placeholder="Enter project name"
      />

      <label for="subdomain">Subdomain:</label>
      <input
        type="text"
        id="subdomain"
        v-model="subdomain"
        required
        placeholder="Enter subdomain"
      />

      <label for="template">Select Template:</label>
      <select id="template" v-model="selectedTemplate" required>
        <option value="">Select a template</option>
        <option value="Nginx">Nginx</option>
        <option value="Wordpress">Wordpress</option>
      </select>

      <button id="newStackButton" type="submit">Create</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axiosInstance from '@/api/axios'
import router from '@/router'

const projectName = ref('')
const subdomain = ref('')
const selectedTemplate = ref('')

async function createProject() {
  // Templates with placeholders (CHANGENAME, SUBDOMAIN)
  const templates = {
    Nginx: `{"networks":{"traefik-proxy":{"external":true}},"services":{"CHANGENAME":{"image":"nginx:latest","networks":["traefik-proxy"],"deploy":{"labels":["traefik.enable=true","traefik.http.routers.CHANGENAME.rule=Host(\`SUBDOMAIN.kubelab.dk\`)","traefik.http.routers.CHANGENAME.entrypoints=web,websecure","traefik.http.routers.CHANGENAME.tls.certresolver=letsencrypt","traefik.http.services.CHANGENAME.loadbalancer.server.port=80"]}}}}`,
    Wordpress:
      'networks:\n  traefik-proxy:\n    external: true\n  wp-network:\n    driver: overlay\nservices:\n  wordpress:\n    image: wordpress:latest\n    environment:\n      WORDPRESS_DB_HOST: db\n      WORDPRESS_DB_USER: wpuser\n      WORDPRESS_DB_PASSWORD: wppassword\n      WORDPRESS_DB_NAME: wpdatabase\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.bwakhroute.rule=Host(`SUBDOMAINwp.kubelab.dk`)\n        - traefik.http.routers.bwakhroute.entrypoints=web,websecure\n        - traefik.http.routers.bwakhroute.tls.certresolver=letsencrypt\n        - traefik.http.services.bwakhroute.loadbalancer.server.port=80\n  db:\n    image: mariadb:latest\n    environment:\n      MYSQL_ROOT_PASSWORD: rootpassword\n      MYSQL_DATABASE: wpdatabase\n      MYSQL_USER: wpuser\n      MYSQL_PASSWORD: wppassword\n    networks:\n      - wp-network\n  phpmyadmin:\n    image: phpmyadmin:latest\n    environment:\n      PMA_HOST: db\n      PMA_USER: wpuser\n      PMA_PASSWORD: wppassword\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.beshroute.rule=Host(`SUBDOMAINpma.kubelab.dk`)\n        - traefik.http.routers.beshroute.entrypoints=web,websecure\n        - traefik.http.routers.beshroute.tls.certresolver=letsencrypt\n        - traefik.http.services.beshroute.loadbalancer.server.port=80',
  }

  // Validate inputs
  if (!projectName.value || !subdomain.value || !selectedTemplate.value) {
    alert('Please fill in all fields')
    return
  }

  // Slug for the project name
  const projectSlug = projectName.value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')

  try {
    // Get the template and replace placeholders
    let stackFileContent = templates[selectedTemplate.value as keyof typeof templates]

    // Replace SUBDOMAIN, CHANGENAME with actual values
    stackFileContent = stackFileContent
      .replace(/SUBDOMAIN/g, subdomain.value)
      .replace(/CHANGENAME/g, projectSlug)

    // Send request to create stack
    const response = await axiosInstance.post(
      '/create-stack',
      {
        name: projectName.value,
        stackFileContent: stackFileContent,
        fromTemplate: false,
        swarmId: 'v1pkdou24tzjtncewxhvpmjms',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log('Stack creation response:', response)
    alert('Project created successfully!')

    router.push('/')
  } catch (error) {
    console.error('Error creating stack:', error)
    alert('Failed to create project')
  }
}
</script>
