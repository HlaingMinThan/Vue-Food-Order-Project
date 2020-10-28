<template>
  <div class="Detail">
    
    <v-img
      flat
      style="margin:0 auto;"
      height="300"
      width="420"
      :src="data.imgUrl"
    >
      <v-btn small fab  class="mt-1" @click="goHome">
        <v-icon class="pink--text">mdi-arrow-left</v-icon>
      </v-btn>
    </v-img>

    <v-card-title>{{data.id}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>
     <div v-for="(detail,index) in data.details" :key="index" >
       <div v-if="detail.item1" class="font-weight-bold items">item1 - <span>{{detail.item1}}</span></div>
       <div v-if="detail.item1Price" class="pink--text price">price - <span>{{detail.item1Price}}</span><v-btn text @click="addToCart1(detail.item1,detail.item1Price,data.id)"><v-icon  class="pink--text">mdi-plus</v-icon></v-btn><v-chip >{{cart1}}</v-chip></div>
       <div v-if="detail.item2" class="font-weight-bold items">item2 - <span >{{detail.item2}}</span></div>
       <div v-if="detail.item2Price" class="pink--text price">price - <span>{{detail.item2Price}}</span><v-btn text @click="addToCart2(detail.item2,detail.item2Price,data.id)"><v-icon  class="pink--text">mdi-plus</v-icon></v-btn><v-chip >{{cart2}}</v-chip></div>
      </div>
    
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Today's available Time</v-card-title>

    <v-card-text>
    
        <v-chip class="mr-2">6:30AM-12:00PM</v-chip>


        <v-chip>4:00PM-10:30PM</v-chip>
    
    </v-card-text>

    <v-card-actions>
      <v-dialog
      v-model="dialog"
      width="500"
     
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="pink"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Order
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="pink white--text">
           Hi Dear {{customerName}}
        </v-card-title>

        <v-card-text>
          <form>
            <v-text-field
              v-model="name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
            v-model="email"
            label="Email"
            required
            ></v-text-field>
            <v-textarea
              v-model="address"
              label="address">
            </v-textarea>
            <v-text-field v-model="phone_number"  label="phone number"></v-text-field>
             
             
        
            
          </form>
        </v-card-text>

        <p  class="red--text" v-if="error">{{error}}</p>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            class="white--text"
            @click="order"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-card-actions>
    
    
    
  </div>
</template>
<script>
  
  import {db,auth} from '../firebase/config'
  export default {
    data: () => ({
      name:'',
      email:'',
      address:'',
      phone_number:'',
      data:{},
      dialog:false,
      error:'',
      cart1:0,
      cart2:0,
      customerName:'',
      // order1:{},
      // order2:{},
      orders:[]
    }),

    methods: {
     goHome(){
       auth.onAuthStateChanged(user=>{
         if(user.email=='saeda2011@gmail.com'){
            this.$router.push({name:'Home',params:{name:'admin'}});
         }else{
          this.$router.push({name:'Home',params:{name:this.customerName}});
         }
       })
     },
     order(){
       if(this.name && this.email && this.address && this.phone_number){
        //  console.log('true');
        // this.orders.push({...this.order1,...this.order2});
        console.log(this.orders);
        this.error='';
      }else{
        
        this.error='Please Fill All The Field To Order';
       }
     },
     addToCart1(item1,price1,id){
      
       let order1={};
       
        this.cart1++;
      
        order1.item1TotalPrice=this.cart1*price1;
      
        order1.item1=item1;
        order1.item1Amount=this.cart1;
        // console.log(id);
        db.collection('orders').doc(id).set({
          order1:null,
          order2:null
        });
        db.collection('orders').doc(id).update({
          order1:order1
        })
      },
     addToCart2(item2,price2,id){
      
       let order2={};
       
        this.cart2++;
      
        order2.item2TotalPrice=this.cart2*price2;
      
        order2.item2=item2;
        order2.item2Amount=this.cart2;
        // this.order2=order2;
        db.collection('orders').doc(id).update({
          order2:order2
        })
      },
   
    

      
    }

    ,
    created() {
      this.$loading(true);
    db.collection('foods').doc(this.$route.params.id).get().then(doc=>{
     
        
         this.data={id:doc.id,...doc.data()};
         this.$loading(false);
        });
        db.collection('orders').onSnapshot(snapshot=>{
      snapshot.docChanges().forEach(change => {
        if(change.type=="added"){
          // console.log(change.doc.data());
          // this.cart1=.order1.item1Amount;
          // this.cart2=.order2.item2Amount;
          
        }
      });
    });
    auth.onAuthStateChanged((user) =>{
        if (user.email!="saeda2011@gmail.com") {
          db.collection('users').doc(user.uid).get().then(doc=>{
        // console.log(doc.data().username);
       this.customerName=doc.data().username;
        
      })
    } else {
        // No user is signed in
        // this.$loading(false);

        }
      });
       
  }
    
  }
</script>
<style scoped>
   .Detail{
     width: 100%;
   }
   .v-image{
     margin-top: 100px;
   }
   p{
     text-align: center;
   }
   .price{
     font-size: 18px;
     margin: 20px 0;
   }
   .items{
     font-size: 20px;
     letter-spacing: 2px;
   }
</style>