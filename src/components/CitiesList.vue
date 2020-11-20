<template >
<v-container>
  <v-row justify="center" >
    <v-col
        cols="3"
        sm="6"
        md="8"
    >
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
        <v-btn @click="updateCityForm(city.id)">Update</v-btn>
        <v-btn @click="deleteCityWithId(city.id)">Delete</v-btn></td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
      <v-btn @click="GoToAddCityForm()">AddCity</v-btn>
    </v-col>
  </v-row>
</v-container>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import router from '@/components/Router';

export default {
  data: ()=> ({

  }),
  computed: mapGetters(['cities', 'failureMessage']),
  methods: {
    ...mapActions(['fetchCities', 'deleteCity']),
    openCityInfo(id) {
      router.push(`/city/${id}`);
    },
    deleteCityWithId(id) {
      this.deleteCity(id);
    },
    updateCityForm(id){
      router.push(`/update/${id}`);
    },
    GoToAddCityForm(){
      router.push('/addcity');
    }
  },
  mounted() {
    this.fetchCities();
  }
}
</script>