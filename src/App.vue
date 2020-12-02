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
          {{$t('menu.logout')}}
        </v-btn>
      </template>
      <template v-else>
        <v-btn text to="/login">
          {{$t('menu.login')}}
        </v-btn>
        <v-btn text to="/registration">
          {{$t('menu.register')}}
        </v-btn>
      </template>
      <lang-menu></lang-menu>
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
import LanguageMenu from "@/components/LanguageMenu";

export default {
  name: 'App',
  components: {
    'lang-menu': LanguageMenu
  },
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
