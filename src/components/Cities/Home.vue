<template >
  <v-container>
    <v-row v-if="!error" justify="center" >
      <v-col
          cols="3"
          sm="6"
          md="8"
      >
        <v-btn v-if="user" @click="GoToAddCityForm()">AddCity</v-btn>
        <city-serch></city-serch>
        <city-list @error="setError"></city-list>
      </v-col>
    </v-row>
    <v-row v-else justify="center" >
      <v-col
          sm="6"
          md="8"
      >
        <v-alert
            type="error"
        >{{ error }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';

export default {
  components: {
    'city-list': () => import('@/components/Cities/CitiesList'),
    'city-serch': () => import('@/components/Cities/Search')
  },
  data: () => ({
    error: ''
  }),
  computed: mapState({
    user: state => state.users.user
  }),
  methods: {
    GoToAddCityForm(){
      this.$router.push('/addcity');
    },

    setError(event){
      this.error = event;
    },
  }
}

</script>