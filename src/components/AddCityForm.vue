<template>
  <v-container >
    <v-card
        class="mx-auto my-12"
        max-width="374"
    >
      <v-card-title>Add city</v-card-title>
      <v-card-text>
        <v-row>
          <strong>Name: </strong><v-text-field v-model="name"></v-text-field>
        </v-row>
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
        <template v-if="addingStatus">
          <v-row>
            <v-alert
            >{{addingStatus}}</v-alert>
          </v-row>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="orange"
            text
            @click="add()"
        >
          Add
        </v-btn>
        <v-btn
            color="orange"
            text
            @click="comeBack()"
        >
          Come back
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data: ()=> ({
    name: '',
    location: '',
    population: '',
    area: '',
    found: '',
    addingStatus: ''
  }),
  computed: {
  },
  methods: {
    ...mapActions(['addCity']),
    async add() {
      let city ={};
      city.name = this.name;
      city.location =  this.location;
      city.population = this.population;
      city.area = this.area;
      city.found = this.found;
      console.log('city', city);
      try {
        let result = await this.addCity(city);
        if(result === 'ok') {
          this.addingStatus = 'The city has been added';
        } else  {
          this.addingStatus = 'Something go wrong';
        }
      } catch (err) {
        console.log(err);
      }
    },
    comeBack() {
      this.$router.push('/');
    }
  }
}
</script>