<template>
  <div class="home">
    <v-container>
      <h3 class="ma-3 dark--text font-weight-light">Welcome back <span class="pink--text ml-3"> {{this.$route.params.name}}</span></h3>
      
      <h1 class="pink--text font-weight-light ma-3">Our Menu</h1>
      <v-row>
        <v-col sm='12' md='6' lg='4' v-for="data in datas" :key="data.id">
         
          <v-card
         
          class="mx-auto my-4"
          max-width="400"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="data.imgUrl"
            >
          </v-img>
          <v-card-title class="font-weight-bold">{{data.id}}</v-card-title>
      
            <v-card-subtitle class="mt-1"><span class="font-weight-bold">No</span> minium <br> <span class="font-weight-bold" >Free</span> Delivery</v-card-subtitle>
           
            <v-card-actions>
             
              <v-btn
                color="pink"
                @click="goDetail(data.id)"
                text
                :loading='loading'
              >
                show more
              </v-btn>
              
              <v-btn
              fab
              color="success"
              bottom
              v-if="admin"
              small
              absolute
              id="edit-btn"
              class="white--text mr-5"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn >
              <v-btn
              @click="deleteMenu(data.id)"
              fab
              color="red"
              bottom
              right
              small
              absolute
              v-if="admin"
              class="white--text"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-col>

        <!-- <v-btn class="indigo white--text" @click="targetInputFile">Upload Image</v-btn>
        <input type="file" style="display: none;" ref="fileInput" @change="test">
        
        <div v-for="(img,index) in images" :key="index">
        <img :src="img.imgUrl" alt="" width="100px" height="100px">
       </div> -->
      </v-row>
    </v-container>



    
  </div>
</template>

<script>
import {db} from '../firebase/config.js'


export default {
  name: 'Home',
  data() {
    return {
      datas:[],
      loading:false
    }
  },
  methods: {
    goDetail(id){
      this.$router.push({name:'Detail',params:{id}})
      // console.log(this.datas);
    },
    deleteMenu(id){
      this.$loading(true);
      db.collection('foods').doc(id).delete().then(()=>{
        this.datas=this.datas.filter(data=>{
          return data.id!=id;
        })
        this.$loading(false);
      })
      // console.log(id);
    }
        // targetInputFile(){
    //   this.$refs.fileInput.click();
    // },
    // test(e){
    //   let files=e.target.files;
    //   let filename=files[0].name;
    //   store.ref().child('/products/'+filename).put(files[0]).then(snapshot=>{
    //     snapshot.ref.getDownloadURL().then((url)=>{
    //       return url;
    //     })
    //     .then(url=>{
    //       db.collection('pictures').doc(filename).set({
    //         imgUrl:url
    //       })
    //     })
    //     // console.log(snapshot);
    //   });
    // }
  },
  created() {
    this.$loading(true);
    db.collection('foods').onSnapshot(snapshot=>{
      snapshot.docChanges().forEach(change => {
        if(change.type=="added"){
          // console.log();
          this.datas.push({...change.doc.data(),id:change.doc.id});
          this.$loading(false);
        }
        // else if(change.type=="removed"){
          // console.log(change.doc.data());
          // this.datas.push({...change.doc.data(),id:change.doc.id});
          // this.$loading(false);
        // }
      });
    });
    this.$loading(false);
        
 
  },
  computed: {
    admin(){
      return this.$route.params.name=='admin';
    }
  }
    
}
</script>
<style>
  #edit-btn{
    margin-left:220px ;
  }
</style>

   
    