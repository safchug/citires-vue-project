<template>
  <v-row>
    <v-text-field v-model="search"
                  label="Searching"
                  hide-details="auto"
    ></v-text-field>
    <v-btn @click="filterCities">
      <v-icon dark>fas fa-search</v-icon>
    </v-btn>
  </v-row>
</template>

<script>

import {mapActions} from 'vuex';

export default {

  data: () => ({
    search: ''
  }),

  methods: {
    ...mapActions(['fetchCities']),
    async filterCities(){
      try {
        console.log(this.search);
        await this.fetchCities(this.search);
      } catch (err) {
        if(err.response) {
          this.$router.push('/notfound');
        }
      }
    }
  }
}

</script>