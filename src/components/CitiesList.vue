<template >
<v-container>
  <v-row v-if="!error" justify="center" >
    <v-col
        cols="3"
        sm="6"
        md="8"
    >
      <v-btn v-if="user"
             @click="GoToAddCityForm()"
      >AddCity</v-btn>
      <v-row>
      <v-text-field v-model="search"
                    label="Searching"
                    hide-details="auto"
      ></v-text-field>
      <v-btn @click="filterCities()">
        <v-icon dark>fas fa-search</v-icon>
      </v-btn>
      </v-row>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          City
        </th>
        <th class="text-left">
          Population
        </th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="city in cities"
          :key="city.name"
      >
        <td>{{ city.name }}</td>
        <td>{{ city.population }}</td>
        <td width="285"><v-btn @click="openCityInfo(city.id)">info</v-btn>
          <template v-if="user && user.id === city.userId">
            <v-btn @click="updateCityForm(city.id)">Update</v-btn>
            <v-btn @click="deleteCityWithId(city.id)">Delete</v-btn>
          </template>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
    </v-col>
  </v-row>
  <v-row v-else justify="center" >
    <v-col
        cols="3"
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

import {mapActions, mapState} from 'vuex';

export default {
  data: () => ({
    error: '',
    search: ''
  }),

  computed: {
    ...mapState({
      user: state => state.users.user,
      cities: state => state.cities.cities
    })
  },
  methods: {
    ...mapActions(['fetchCities', 'deleteCity']),
    openCityInfo(id) {
      this.$router.push(`/city/${id}`);
    },
    async deleteCityWithId(id) {
      try {
        let result = await this.deleteCity(id);
        if(result) this.$router.push('/');
      } catch (err) {
        if(err.response) {
          this.error = err.response.data.message;
        } else if (err.message.includes('authorized')) {
          this.$router.push('/login');
        } else {
          this.error = 'Something went wrong';
        }
      }
    },
    updateCityForm(id){
      this.$router.push(`/update/${id}`);
    },
    GoToAddCityForm(){
      this.$router.push('/addcity');
    },
    async filterCities(){
      try {
        await this.fetchCities(this.search);
      } catch (err) {
        if(err.response) {
          this.$router.push('/notfound');
        }
      }
    }
  },
  async mounted() {
    try {
      await this.fetchCities();
    } catch (err) {
      if(err.response) {
        this.error = err.response.data.message;
      } else {
        this.error = 'Something went wrong';
      }
    }
  }
}
</script>