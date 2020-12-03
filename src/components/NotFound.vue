<template>
  <v-container>
  <v-row justify="center" >
    <v-col
        cols="3"
        sm="6"
        md="8"
    >
      <v-alert type="error">{{$t('notFound.title')}}</v-alert>
      <v-row justify="end"><v-btn to="/">{{$t('notFound.home')}}</v-btn></v-row>
    </v-col>
  </v-row>
  </v-container>
</template>