<template>
  <div class="main">
    <div class="flex-container justify-boi">
      <h2 class="Loverskrift2">Profile</h2>
    
    </div>
    <div class="Lcontent flex-container" id="profile-div">
      <div class="profile-pic">
        <img class="profile-img" src="/img/enhandsomemand.jpg" alt="Profilbillede" />
        <button class="settings-btn" @click="uploadProfilePicture()">
          <FontAwesomeIcon :icon="faCamera" />
        </button>
        <input
          type="file"
          id="profile-upload"
          style="display: none"
          accept="image/*"
          onchange="previewProfilePicture(event)"
        />
      </div>
      <form action="" class="profile-form">
        <div class="name-input">
          <label for="name-input">Full name</label>
          <input type="text" name="name" value="John Doe" id="name-input" />
        </div>
        <div class="email-input">
          <label for="email-input">Email</label>
          <input type="text" name="email" value="Jd@example.com" id="email-input" disabled />
        </div>
      </form>
    </div>

    <div class="flex-container switches" id="home-div">
      <div @click="enableMode('lightmode')" class="Lcontent light-mode clickable-row">
        <div class="icon-button">
          <FontAwesomeIcon :icon="fasSun" />
          <FontAwesomeIcon :icon="faSun" />
        </div>
        <h3>Light Mode</h3>
        <p>Light Color Theme</p>
      </div>
      <div @click="enableMode('darkmode')" class="Lcontent dark-mode clickable-row">
        <div class="icon-button">
          <FontAwesomeIcon :icon="fasMoon" />
          <FontAwesomeIcon :icon="faMoon" />
        </div>
        <h3>Dark Mode</h3>
        <p>Dark Color Theme</p>
      </div>
      <div @click="enableMode('deepmode')" class="Lcontent deep-pink clickable-row">
        <div class="icon-button">
          <FontAwesomeIcon :icon="fasHeart" />
          <FontAwesomeIcon :icon="faHeart" />
        </div>
        <h3>Deep Mode</h3>
        <p>You know you want it</p>
      </div>
    </div>
    <div class="Lcontent" id="password-div">
      <form action="" class="password-form">
        <div class="cp-input">
          <label for="cp-input">Current password</label>
          <input type="text" name="current password" id="cp-input" />
        </div>
        <div class="np-input">
          <label for="np-input">New password</label>
          <input type="text" name="new password" id="np-input" />
        </div>
        <div class="rnp-input">
          <label for="rnp-input">Repeat new password</label>
          <input type="text" name="repeat new password" id="rnp-input" />
        </div>
        <div>
          <a href="profile.html" id="new-password-button">
            <span class="button-text">Update password</span>
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import enableMode from '@/utility/enableMode'
import { faHeart, faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import {
  faCamera,
  faHeart as fasHeart,
  faMoon as fasMoon,
  faSun as fasSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

function uploadProfilePicture() {
  document.getElementById('profile-upload')?.click()
}

function previewProfilePicture(event: Event) {
  //@ts-ignore
  const file = event.target?.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (e) {
      //@ts-ignore
      document.querySelector('.jprofilbillede').src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.switches [data-prefix='fas'] {
  display: none;
}

.lightmode .switches .light-mode [data-prefix='fas'],
.darkmode .switches .dark-mode [data-prefix='fas'],
.deepmode .switches .deep-pink [data-prefix='fas'] {
  display: block;
}

.lightmode .switches .light-mode [data-prefix='far'],
.darkmode .switches .dark-mode [data-prefix='far'],
.deepmode .switches .deep-pink [data-prefix='far'] {
  display: none;
}
</style>
