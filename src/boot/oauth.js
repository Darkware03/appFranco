import { boot } from "quasar/wrappers";
import VueGoogleOAuth2 from "vue-google-oauth2";
import Vue from 'vue'

  const gAuthOptions = {
    "client_id": "609894322727-8ilafpv5j3ksfk5hgpml9hh3pt775sp6.apps.googleusercontent.com",
    "project_id": "freenlace-393105",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs"
  }

export default boot(({ app }) => {
  Vue.use(VueGoogleOAuth2, gAuthOptions)
})
