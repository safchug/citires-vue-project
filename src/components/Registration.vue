<template>
  <div v-if="isRegistered">
    <v-container>
      <v-row>
        <v-alert
            type="info"
            color="orange"
        >You`ve been successfuly registred</v-alert>
      </v-row>
    </v-container>
  </div>
  <v-form v-else-if="!isRegistered" v-model="valid" ref="form">
    <v-container>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="birthday"
              :counter="10"
              :rules="birthdayRules"
              label="Birthday"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="mail"
              :rules="emailRules"
              label="E-mail"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="password"
              :type="inputType"
              :rules="passwordRules"
              label="Password"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="passwordRepition"
              :type="inputType"
              :rules="repeatPasswordRules"
              label="Repeat password"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <template v-if="isFailure">
        <v-row>
        <v-alert
            type="error"
        >{{message}}</v-alert>
        </v-row>
      </template>
        <v-row>
        <v-btn color="secondary"
               @click.prevent="validateAndRegist()"
        >Rigister</v-btn>
      </v-row>

    </v-container>

  </v-form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    birthday: '',
    mail: '',
    password: '',
    passwordRepition: '',
    inputType: 'password',

    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Passwword must be more than 6 characters'
    ],
    birthdayRules: [
      v => !!v || 'Birthday is required',
    ],
  }),
  computed: {
    ...mapGetters(['isRegistered', 'isFailure', 'message']),
    repeatPasswordRules() {
      let rules = [];

      const passReq = v => !!v || 'To repeat pasword is required';
      rules.push(passReq);

      if(this.password && this.passwordRepition) {
        const rule = v => this.password === this.passwordRepition || 'Passwords dont match';
        rules.push(rule);
      }
      return rules;
    }
  },
  methods: {
    ...mapActions(['regist']),
    validateAndRegist(){
      this.$refs.form.validate();
      if(this.valid){
        let data = {
          firstname: this.firstname,
          lastname: this.lastname,
          mail: this.mail,
          birthday: this.birthday,
          password: this.password
        }
        this.regist(data);
      }
    }
  }

}
</script>