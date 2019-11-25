<template>
  <v-toolbar extended extension-height="100" color="#204f70">
    <v-btn class="nav-icon" icon>
      <img class="logo" src="@/assets/images/mia.png" alt="MIA Logo" />
    </v-btn>

    <v-toolbar-title style="color: white">
      <span>Mass Immersion Approach</span>
    </v-toolbar-title>

    <v-spacer />
    <v-toolbar-items>
      <v-btn class="nav-icon" icon>
        <v-badge v-model="show" color="red">
          <template v-slot:badge>
            <span>6</span>
          </template>
          <v-icon large>$vuetify.icons.github</v-icon>
        </v-badge>
      </v-btn>
      <v-list-item-avatar>
        <img src="@/assets/images/profile.png" alt="Profile Photo" />
      </v-list-item-avatar>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
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
.nav-icon {
  margin: 0 10px 0 10px;
  width: 60px;
  height: 60px;
}

.avatar {
  border: 3px solid gray;
  min-width: 60px;
  width: 60px;
  height: 60px;
}
</style>