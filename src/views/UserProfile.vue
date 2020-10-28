<template>
    <div>
      
        <v-container class="ml-3">
          <v-card>
            
            <h3 class=" ma-5 dark--text font-weight-light pt-4">Hi! Our Dear Customer  <span class="ml-1 pink--text font-weight-bold">{{customer.username}}</span></h3><br>
            <h4 class="ml-5 grey--text">Thanks For Choosing us</h4><br>
            <h3 class="pink--text font-weight-light ml-5">change contact phone number</h3><br>
            <v-row>
              <vue-tel-input-vuetify class="ml-5" v-model="phone"  @country-changed="countryChanged"></vue-tel-input-vuetify>
            
            </v-row>
              
          
            <p v-if="feedback" class="success--text ml-5">{{feedback}}</p>
            <v-card-actions>
              <v-btn @click="changePhoneNum" class="pink white--text" small>Change</v-btn><br>
            </v-card-actions>
  
              
          </v-card>
          </v-container>
    </div>
</template>
<script>
    import {db,auth} from '@/firebase/config'
export default {
    name:"UserProfile",
    data() {
        return {
            customer:{},
            phone:'',
            feedback:''
        }
    },
    methods: {
      countryChanged(country) {
            this.country = country.dialCode
            this.phone+=`+${this.country}`;
        },
    changePhoneNum(){
      let userId=auth.currentUser.uid;
      this.$loading(true);
      // console.log(userId);
      db.collection('users').doc(userId).update({
        phoneNum:this.phone
      }).then(()=>{
        this.$loading(false);
        this.feedback="phone number changed"
      })
    }
    },
    created() {
        this.$loading(true);
        auth.onAuthStateChanged((user) =>{
        if (user) {
          db.collection('users').doc(user.uid).get().then(doc=>{
        
          console.log(doc.data())
        this.customer=doc.data();
        this.$loading(false)
        
      })
    } else {
        // No user is signed in
        this.$loading(false);

        }
      });
    },
}
</script>
<style>
    
</style>