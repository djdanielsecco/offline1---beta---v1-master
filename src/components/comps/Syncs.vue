<template>
    <div class="syncs">
    <div id="sync-p" class="container">
    	
    </div>
    	<button class="btavancar" @click="syncar">Sync to RTDB</button>
    	
    </div>
</template>

<script>
	if ('indexedDB' in window) {
                    readAllData('sync-posts')
                        .then(function(data) {
                            console.log('From cache to sync', data);
						var i=0;
						for(var key in data){
							i++;
							document.getElementById("sync-p").innerHTML = "data for sync  index  .> .  " + i;
							document.getElementById("nots").innerHTML = "data to sync  " +i;
						}
						
                        });
                };
	
	
    export default {
		name: 'syncs',
        data () {
            return {
            }
        },
        components: {
        },
		methods: {
            syncar() {
               


    console.log('[Service Worker] Syncing new Posts');
 
      readAllData('sync-posts')
        .then(function(data) {
          var i = -1;
          for (var dt of data) {
              
               var synData = {
                     id: dt.id,
                     image: dt.image,
                     tag_num: dt.tag_num,
                     geolocation: dt.geolocation,
                     cod_Tree: dt.cod_Tree,
                     data: dt.data,
                     hora: dt.hora,
                     user: dt.user
               };
             
             
             console.log(synData);
           
            fetch('https://ativador-55a4a.firebaseio.com/posts.json' , {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
        mode: 'cors',
              body:JSON.stringify(dt)
            })
              .then(function(res) {
                console.log('Sent data', res);
                
                if (res.ok) {
                  res.json()
                    .then(function(resData) {
                     
                      i++;
                      console.log(dt, '  ---> ', data[i].id);
                      deleteItemFromData('sync-posts', data[i].id);
                      //deleteItemFromData('remoteDocuments', data[i].id);
                    });
                }
              })
              .catch(function(err) {
                console.log('Error while sending data', err);
              });
          }

        })
   this.$router.push('/');

            },
           
        },
    }
</script>

<style scoped="true">
      button.btavancar {
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