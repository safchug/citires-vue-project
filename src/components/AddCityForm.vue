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
            @click="addCity()"
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
import {mapActions, mapGetters} from "vuex";

export default {
  data: ()=> ({
    name: '',
    location: '',
    population: '',
    area: '',
    found: ''
  }),
  computed: {
    ...mapGetters(['addingStatus']),
  },
  methods: {
    ...mapActions(['addCity']),
    add() {
      let city = {
       name: this.name,
        location: this.location,
        population: this.population,
        area: this.area,
        found: this.found};

      console.log(city);
      this.addCity(city);
    },
    comeBack() {
      this.$router.push('/');
    }
  }
}
</script>