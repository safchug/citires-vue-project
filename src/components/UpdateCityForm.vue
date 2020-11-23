<template>
    <v-container >
      <v-card
          class="mx-auto my-12"
          max-width="374"
      >

        <template v-if="!err">
        <v-card-title >{{city.name}}</v-card-title>
        <v-card-text>
          <v-row>
            <strong>Location: </strong><v-text-field v-model="location"></v-text-field>
          </v-row>
          <v-row>
            <strong>Population: </strong><v-text-field v-model="population"></v-text-field>
          </v-row>
          <v-row>
            <strong>Area: </strong><v-text-field v-model="area"></v-text-field>
          </v-row>
          <v-row>
            <strong>Found: </strong><v-text-field v-model="found"></v-text-field>
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
              color="orange"
              text
              @click="updateCity(city.id)"
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
              >{{err}}</v-alert>
            </v-row>
          </template>
      </v-card>
    </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data: ()=> ({
    name: '',
    location: '',
    population: '',
    area: '',
    found: '',
    err: '',
    updateStus: ''
  }),
  computed: {
    ...mapState({
      city: state => state.cities.city
    })
  },
  methods: {
    ...mapActions(['fetchCityWithId', 'updateCityWithId']),
    async updateCity(id) {
      let data = {
        location: this.location,
        population: this.population,
        area: this.area,
        found: this.found};
      console.log(data);
      try {
        let result = await this.updateCityWithId({id, data});
        if(result === 'ok') {
          this.updateStus = 'The city has been updated';
        } else {
          this.err = result;
        }
      } catch (err) {
        console.log(err);
      }
    },
    comeBack(){
      this.$router.push('/');
    }
  },
  async mounted() {
    try{
      let result = await this.fetchCityWithId(this.$route.params.id);
      if(result !== 'ok') {
        this.err = result;
      }
    } catch (err) {
      console.log(err);
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