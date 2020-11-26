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
      <template v-if="user">
        <v-row justify="end">
          {{user.name}}
        </v-row>
        <v-btn text @click="logout()">
          Log out
        </v-btn>
      </template>
      <template v-else>
        <v-btn text to="/login">
          Log in
        </v-btn>
        <v-btn text to="/registration">
          Sign in
        </v-btn>
      </template>
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
import {mapActions, mapState} from 'vuex';

export default {
  name: 'App',
  comments: {

  },
  data: () => ({
    //
    drawer: true,
  }),
  computed: {
    ...mapState({
      user: state => state.users.user
    }),
  },
  methods: {
    ...mapActions(['auth', 'logout'])
  },
  mounted() {
    this.auth();
  }
};
</script>
