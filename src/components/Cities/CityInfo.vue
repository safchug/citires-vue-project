<template>
  <v-container >
    <v-card
        class="mx-auto my-12"
        max-width="374"
    >
      <v-card-title >{{city.name}}</v-card-title>
      <v-card-text>
        <v-row>
          <strong>{{$t('cityInfo.location')}}: </strong>{{city.location}}
        </v-row>
        <v-row>
          <strong>{{$t('cityInfo.population')}}: </strong>{{city.population}}
        </v-row>
        <v-row>
          <strong>{{$t('cityInfo.area')}}: </strong>{{city.area}}
        </v-row>
        <v-row>
          <strong>{{$t('cityInfo.found')}}: </strong>{{city.found}}
        </v-row>
        <v-row>
          <strong>{{$t('cityInfo.createdBy')}}: </strong>
        </v-row>
        <v-row>
          <strong>{{$t('cityInfo.name')}}: </strong>{{city.user.name}}
        </v-row>
        <v-row>
          <strong>{{$t('cityInfo.mail')}}: </strong>{{city.user.mail}}
        </v-row>
        <v-row v-if="error">
          <v-alert
              type="error"
          >{{ error }}</v-alert>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <template v-if="user && user.id === city.userId">
        <v-btn
            color="orange"
            text
            @click="updateCity(city.id)"
        >
          {{$t('cityInfo.update')}}
        </v-btn>

        <v-btn
            color="orange"
            text
            @click="deleteCityWithId(city.id)"
        >
          {{$t('cityInfo.delete')}}
        </v-btn>
        </template>
        <v-btn
            color="orange"
            text
            @click="comeBack()"
        >
          {{$t('cityInfo.comeback')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  data: () => ({
    error: ''
  }),
    computed: {
      ...mapState({
        user: state => state.users.user,
        city: state => state.cities.city
      })
    },
    methods: {
      ...mapActions(['fetchCityWithId', 'deleteCity', 'logout']),
      async deleteCityWithId(id) {
        try {
          let result = await this.deleteCity(id);
          if(result) this.$router.push('/');
        } catch (err) {
          if(err.response) {
            this.error = err.response.data.message;
          } else if (err.message.includes('authorized')) {
            this.logout();
            this.error = this.$t('messages.youNeedToLogIn');
          } else {
            this.error = this.$t('messages.somethingWentWrong');
          }
        }
      },
      updateCity(id){
        this.$router.push(`/update/${id}`);
      },
      comeBack(){
        this.$router.push('/');
      },

    },
    async mounted() {
      try {
        let result = await this.fetchCityWithId(this.$route.params.id);
      } catch (err) {
        if(err.response) {
          if(err.response.status === 400) {
            this.$router.push('/notfound');
          }

          this.error = err.response.data.message;
        } else {
          this.error = this.$t('messages.somethingWentWrong');
        }
      }
    }
  }
</script>