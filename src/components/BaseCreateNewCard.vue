<template>
  <div>
    <v-card class="mx-auto card-container" raised>
      <v-container fluid>
        <v-flex>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-row align="center" justify="center" class="grey lighten-5" style="height: 300px;">
                <v-col class="item">
                  <v-icon color="black" x-large>$vuetify.icons.add</v-icon>
                  <h1>Create New</h1>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-flex>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-container {
  border: 2px dashed gray;
}
.card-button-container {
  background-color: inherit;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item:hover {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
  cursor: pointer;
}
</style>