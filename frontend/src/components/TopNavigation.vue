<template>
  <v-toolbar extended extension-height="50" color="#204f70">
    <v-btn class="nav-icon" icon>
      <img class="logo" src="@/assets/images/mia.png" alt="MIA Logo" />
    </v-btn>

    <v-toolbar-title style="color: white">
      <span>Mass Immersion Approach</span>
    </v-toolbar-title>

    <v-spacer />
    <v-toolbar-items>
      <v-list-item-avatar>
        <img src="@/assets/images/defaultProfile.jpg" alt="Profile Photo" />
      </v-list-item-avatar>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
export default {
  data() {
    return {
      show: true
    };
  }
};
</script>

<style lang="scss" scoped>
.logo {
  margin-left: 15px;
  width: 50px;
  height: 50px;
}

.avatar {
  border: 3px solid gray;
  min-width: 60px;
  width: 60px;
  height: 60px;
}
</style>
