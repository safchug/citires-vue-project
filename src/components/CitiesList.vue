<template >
<v-container>
  <v-row v-if="!err" justify="center" >
    <v-col
        cols="3"
        sm="6"
        md="8"
    >

      <v-btn v-if="user" @click="GoToAddCityForm()">AddCity</v-btn>
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
      >{{err}}</v-alert>
    </v-col>
  </v-row>
</v-container>
</template>

<script>

import {mapActions, mapGetters, mapState} from 'vuex';
import router from '@/components/Router';

export default {
  data: () => ({
    err: '',
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
      router.push(`/city/${id}`);
    },
    async deleteCityWithId(id) {
      try {
        let result = await this.deleteCity(id);
        if(result !== 'ok') {
          this.err = result;
        }
      } catch (err) {
        console.log(err);
      }
    },
    updateCityForm(id){
      router.push(`/update/${id}`);
    },
    GoToAddCityForm(){
      router.push('/addcity');
    }
  },
  async mounted() {
    try {
      let result = await this.fetchCities();
      if(result !== 'ok') {
        this.err = result;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
</script>