<template>
  <div class="foto">
    <h1>{{ msg }}</h1>
      <p>Registre uma imagens para comprovar a identificação da árvore.</p>
      <div v-if="!image">
            <div id="lastIMG"> 
              <img id="imgL" src="@/assets/icoo.png" width="100px" height="auto"/>    
    </div>
    <input id="inputF" type="file" accept="video/*;capture=camcorder" @change="onFileChange">
  </div>
  <div v-else>
          <div id="lastIMG"> 
          <img id="imgL" src="" width="100px" height="auto"/>  
    </div>
    <img id="imgLoad" :src="image" width="100px" height="auto"/>
      <input id="inputF" type="file" accept="video/*;capture=camcorder" @change="onFileChange">
   <button @click="removeImage">Remove image</button>
      <br>
       <button class="btavancar" @click="avancar">Salvar</button>
      <!-- <button class="btavancar" @click="carregar">caregar</button>-->
  </div>
      <!--<input type="button" value="Resize Image"  @click="ResizeImage"/>-->
    <img src="" id="output">
  </div>
</template>
<script>
    var downloadURL;
    import {
        firestore
    } from '@/main.js'
    import {
        noty
    } from '@/assets/js/config.js'
    var $ = require('jquery')
    window.post = {}
    import Swiper from 'swiper'
    export default {
        name: 'foto',
        data() {
            return {
                msg: 'Imagens',
                image: '',
                imageB: '',
                urr: ''
            }
        },
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
                // this.createImageTest(files[0]);
                var file = e.target.files[0];
                //var storageRef = firebase.storage().ref(file.name);
                console.log('<filename =============>', file.size);
                var metadata = {
                    contentType: 'image/jpeg'
                };
            },
            createImage(file) {
                var dataT = new Date();
                var image = new Image();
                var reader = new FileReader();
                var vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                   // $("#lastIMG").append('<img  src="' + vm.image + '" width="100px" height="auto"/>');
                    var ind = new Date().toISOString();
                    post = {
                        id: ind,
                        image: vm.image,
                        lele: vm.image.length,
                        tag_num: this.$store.getters.getterTagN,
                        geolocation: this.$store.getters.getterGeoL,
                        cod_Tree: this.$store.getters.getterCodTree,
                        data: dataT.getDate() + '/' + dataT.getMonth() + '/' + dataT.getFullYear(),
                        hora: dataT.getHours() + ':' + dataT.getMinutes() + ':' + dataT.getSeconds(),
                        user: this.$store.getters.getterUsrN,
                        counts: '',
                        downloadlink: ''
                    };
                    console.log('variavel>', post);
                  //  $("#imgLoad").remove();
                    this.ResizeImage(file);
                };
                reader.readAsDataURL(file);
                console.log('readerfile > ', reader);
            },
            ResizeImage(file) {
                if ( //window.File && window.FileReader
                    navigator.mediaDevices && navigator.mediaDevices.getUserMedia
                ) {
                    // var filesToUploads = document.getElementById('inputF').files;
                    //var file = filesToUploads[0];
                    //var file = post.image;
                    if (file) {
                        var reader = new FileReader();
                        // Set the image once loaded into file reader
                        reader.onload = function(e) {
                            var img = document.createElement("img");
                            img.id = 'result';
                            img.src = e.target.result;
                            var canvas = document.createElement("canvas");
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0);
                            var MAX_WIDTH = 1024;
                            var MAX_HEIGHT = 768;
                            var width = img.width;
                            var height = img.height;
                            if (width > height) {
                                if (width > MAX_WIDTH) {
                                    height *= MAX_WIDTH / width;
                                    width = MAX_WIDTH;
                                }
                            } else {
                                if (height > MAX_HEIGHT) {
                                    width *= MAX_HEIGHT / height;
                                    height = MAX_HEIGHT;
                                }
                            }
                            canvas.width = width;
                            canvas.height = height;
                            // var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, width, height);
                            var dataurl = canvas.toDataURL(file.type);
                            //document.getElementById('lastIMG').src = dataurl;
                            post.image = dataurl;
                            post.lele = dataurl.length;
                               $("#imgLoad").remove(); 
                            $("#imgL").attr("src", post.image);
                            console.log('readerfile new> ', post);
                        }
                        reader.readAsDataURL(file);
                    }
                } else {
                    alert('The File APIs are not fully supported in this browser.');
                }
            },
            removeImage: function(e) {
                $("#imgL").attr("src", "");
               // $("#lastIMG").remove();
               // $("#imgLoad").remove();
            },
            avancar() {
                // post.downloadlink =  downloadURL ;
                firestore.collection("sid").doc(post.id).set(post)
                    .then(function(docRef) {
                        console.log("Document written with ID: ", post.id);
                        //console.log("Document Data with ID: ", dodoref);
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
                firestore.collection("sid2").add(post)
                    .then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    })
                if ('serviceWorker' in navigator && 'SyncManager' in window) {
                    navigator.serviceWorker.ready
                        .then(function(sw) {
                            writeData('sync-posts', post)
                                .then(function() {
                                    return sw.sync.register('sync-new-posts');
                                })
                                .then(function() {
                                    var data = {
                                        message: 'Your Post was saved for syncing!'
                                    };
                                    noty("success", data.message, post.id);
								
                                    console.log(data);
                                })
                                .catch(function(err) {
                                    console.log(err);
                                });
                        })
                };
                if ('indexedDB' in window) {
                    readAllData('sync-posts')
                        .then(function(data) {
                            console.log('From cache', data);
						var i=0;
						for(var key in data){
							i++;
							document.getElementById("sync-p").innerHTML = "data for sync  index !!!! .> .  " + i;
							document.getElementById("nots").innerHTML = "data to sync  " +i;
						}
						
                        });
                };
                var mySwiper = new Swiper('.swiper-container', {});
                //mySwiper.slideTo(1);
                this.$router.push('/');
            },
            carregar() {
                for (var i = 1; i < 400; i++) {
                    var ind = new Date().toISOString();
                    post.id = '"' + i + '"';
                    post.counts = i;
                    console.log(i);
                    firestore.collection("sid3").doc('"' + i + '"').set(post)
                        .then(function(docRef) {
                            console.log("Document written with ID: " + '  >' + i);
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
                    if ('serviceWorker' in navigator && 'SyncManager' in window) {
                        navigator.serviceWorker.ready
                            .then(function(sw) {
                                writeData('sync-posts', post)
                                    .then(function() {
                                        return sw.sync.register('sync-new-posts');
                                    })
                                    .then(function() {
                                        var data = {
                                            message: 'Your Post was saved for syncing!'
                                        };
                                        // noty("success", data.message, post.id);
                                        console.log(data);
                                    })
                                    .catch(function(err) {
                                        console.log(err);
                                    });
                            })
                    };
                };
            }
        }
    };
    /*  readAllData('posts')
          .then(function(data) {
              $("#imgf").text('');
              for (var dt of data) {
                  $("#imgf").html("<p> " + dt.data + '----' + dt.id + '-->' + dt.hora + "</p><br> ");
              }
          })*/
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2,
    p {
        font-weight: normal;
        color: black;
    }

    button {
        color: aliceblue;
        background-color: #000;
        font-size: 1em;
        padding: 1em 2em;
        margin: 1em;
        border: none !important;
        border-radius: 5em;
        box-shadow: none;
    }
</style>
<!--// fetch('https://192.168.0.8/lambanca', { // method: 'POST', // headers: { // // 'dataType': 'json', // 'Access-Control-Allow-Origin': '*/*', // 'Content-Type': 'application/json', // 'Accept': 'application/json' // }, // dataType: 'json', // mode: 'cors', // body: JSON.stringify([post]) // }).then(function(response) { // console.log(response); // return response.json(); // }).then(function (data) { // // console.log(data); // }) // .catch(function(err) { // console.log('******'); // }); // // fetch('https://ativador-55a4a.firebaseio.com/posts/alfa.json', { // method: 'POST', // headers: { // // 'dataType': 'json', // 'Access-Control-Allow-Origin': '*/*', // 'Content-Type': 'application/json', // 'Accept': 'application/json' // }, // dataType: 'json', // mode: 'cors', // body: JSON.stringify([post]) // }).then(function(response) { // console.log(response); // return response.json(); // }).then(function (data) { // // console.log(data); // }) // .catch(function(err) { // console.log('******'); // }); // firebase.database().ref('posts/'+(post.tag_num)).set(post); // firebase.database().ref('posts').push(post);-->