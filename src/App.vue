<template>
  <v-app>
    <v-app-bar
      app
      color="orange"
      light
    >

      <v-btn text light to="/">
        CitiesService
      </v-btn>

        <v-spacer></v-spacer>

        <v-btn text to="/login">
          Log in
        </v-btn>
        <v-btn text to="/registration">
          Sign in
        </v-btn>
      </v-app-bar>


    <v-main>
      <v-container fluid>

        <!-- If using vue-router-->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  comments: {

  },
  data: () => ({
    //
    drawer: true
  }),
};
</script>
