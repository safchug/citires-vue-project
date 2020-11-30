<template >
  <v-simple-table v-if="cities && cities.length > 0">
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
  <v-alert v-else type="info">Nobody added any cities yet</v-alert>
</template>

<script>

import {mapActions, mapState} from 'vuex';

export default {
  data: () => ({
    error: '',
  }),

  computed: {
    ...mapState({
      user: state => state.users.user,
      cities: state => state.cities.cities
    })
  },
  methods: {
    ...mapActions(['fetchCities', 'deleteCity', 'logout']),
    openCityInfo(id) {
      this.$router.push(`/city/${id}`);
    },
    async deleteCityWithId(id) {
      try {
        let result = await this.deleteCity(id);
        if(result) this.$router.push('/');
      } catch (err) {
        if(err.response) {
          this.$emit('error', err.response.data.message);
        } else if (err.message.includes('authorized')) {
          this.logout();
        } else {
          this.$emit('error', 'Something went wrong');
        }
      }
    },
    updateCityForm(id){
      this.$router.push(`/update/${id}`);
    },
  },
  async mounted() {
    try {
      await this.fetchCities();
    } catch (err) {
      if(err.response) {
        this.error = err.response.data.message;
      } else {
        this.$emit('error', 'Something went wrong');
      }
    }
  }
}
</script>