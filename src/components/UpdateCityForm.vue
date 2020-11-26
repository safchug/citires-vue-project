<template>
    <v-container >
      <v-form v-model="valid" @submit.prevent="submit()" ref="form">
      <v-card
          class="mx-auto my-12"
          max-width="374"
      >

        <template v-if="!error">
        <v-card-title >{{city.name}}</v-card-title>
        <v-card-text>
            <v-row>
              <v-text-field v-model="name"
                            :rules="nameRules"
                            label="Name">
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="location"
                            :rules="locationRules" label="Location"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="population"
                            :rules="populationRules" label="Population"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="area"
                            :rules="areaRules"
                            label="Area"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="found"
                            :rules="foundRules"
                            label="Found"></v-text-field>
            </v-row>
          <template v-if="updateStus">
            <v-row>
              <v-alert
              >{{updateStus}}</v-alert>
            </v-row>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn
              type="submit"
              color="orange"
              text
          >
            Update
          </v-btn>

          <v-btn
              color="orange"
              text
              @click="comeBack()"
          >
            Come back
          </v-btn>

        </v-card-actions>
        </template>
          <template v-else>
            <v-row>
              <v-alert
                  type="error"
              >{{ error }}</v-alert>
            </v-row>
          </template>
      </v-card>
      </v-form>
    </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import City from "@/models/City";

export default {
  data: ()=> ({
    name: '',
    location: '',
    population: '',
    area: '',
    found: '',
    error: '',
    updateStus: '',
    valid: false,
    nameRules: [
      v => v.trim().length > 0 || 'Name is required'
    ],
    locationRules: [
      v => v.trim().length > 0 || 'Location is required'
    ],
    populationRules: [
      v => v.trim().length > 0 || 'Population is required'
    ],
    areaRules: [
      v => v.trim().length > 0 || 'Area is required'
    ],
    foundRules: [
      v => v.trim().length > 0 || 'Found is required'
    ]
  }),
  computed: {
    ...mapState({
      city: state => state.cities.city
    })
  },
  methods: {
    ...mapActions(['fetchCityWithId', 'updateCityWithId', 'logout']),
    submit(){
      this.$refs.form.validate();
      if(this.valid) {
        this.updateCity(this.city.id);
      }
    },
    async updateCity(id) {
      try {
        const city = new City(this.name, this.location,
          this.population, this.area, this.found);

        let result = await this.updateCityWithId({id, city});
        if(result) this.updateStus = 'The city has been updated';
      } catch (err) {
        if(err.response) {
          this.error = err.response.data.message;
        } else if (err.message.includes('authorized')) {
          this.logout();
          this.error = 'You need to login'
        } else {
          this.error = 'Something went wrong';
        }
      }
    },
    comeBack(){
      this.$router.push('/');
    }
  },
  async mounted() {
    try {
      let result = await this.fetchCityWithId(this.$route.params.id);
    } catch (err) {
      if(err.response) {
        this.error = err.response.data.message;
      } else {
        this.error = 'Something went wrong';
      }
    }
  },

  watch: {
    city: function () {
      this.name = this.city.name;
      this.location = this.city.location;
      this.population = this.city.population;
      this.area = this.city.area;
      this.found = this.city.found;
    }
  }
}
</script>