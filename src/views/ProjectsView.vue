<template>
  <div class="main">
    <div class="flex-container justify-boi">
      <h2 class="Loverskrift2">Projects</h2>
     
      
    </div>
    <div class="stackList">
      <input
        type="text"
        id="xsearch-input"
        placeholder="Search projects..."
        onkeyup="searchProjects()"
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
          <tr data-project-id="1" data-project-url="stack.html" class="clickable-row">
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
          </tr>
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
