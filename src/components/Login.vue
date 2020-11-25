<template>
  <v-form v-model="valid" ref="form"
          @submit.prevent="submit()">
    <v-container>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="mail"
              :rules="mailRules"
              :counter="10"
              label="Mail"
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
      <template v-if="error">
        <v-row>
          <v-alert
              type="error"
          >{{error}}</v-alert>
        </v-row>
      </template>
      <v-row>
        <v-btn type="submit" color="secondary">Log in</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {mapActions} from 'vuex';
import LoginData from "@/models/LoginData";

export default {
  data:()=> ({
    valid: false,
    mail: '',
    password: '',
    inputType: 'password',
    error: '',
    mailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.trim().length >= 6 || 'Password must be valid',
    ]
  }),
  methods: {
    ...mapActions(['login']),
    submit() {
      this.$refs.form.validate();
      if(this.valid) {
        this.loginUser();
      }
    },
    async loginUser() {
      try {
        const loginData = new LoginData(this.mail, this.password);
        const result = await this.login(loginData);

        if (result) this.$router.push('/');

      } catch (err) {
        if(err.response) {
          this.error = err.response.data.message;
        } else {
          this.error = 'Something went wrong';
        }
      }
    },
  }
}
</script>