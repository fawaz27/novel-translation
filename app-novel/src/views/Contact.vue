<template>
    
    <v-container>
    
  
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel possimus, delectus dignissimos esse aliquid veritatis? Suscipit consectetur pariatur laudantium, possimus accusantium placeat quibusdam, eaque animi, cupiditate esse debitis! Repellendus, eveniet!</p>
   
  </v-container>
 

</template>

<script>

// import axios from 'axios';
export default {
	name: 'contact-view',

	components: {

	},

	data: () => ({

	}),
	async mounted() {
		// const api = axios.create({
			
		// 	baseURL: 'http://localhost:3000/auth/login'
		// })
		// try {
		// 	const response = await api.post();
		// 	if (response.status == 200 || response.status == 304 ) {
		// 		console.log('Good Working');
		// 		console.log(response.data);

		// 	}
		// 	else {
		// 		console.log('Not Working');
		// 		console.log(response.data);
		// 	}
		// } catch (error) {
		// 	console.error(error);
		// }

			let headersList = {
				"Accept": "*/*",
				"User-Agent": "Thunder Client (https://www.thunderclient.com)",
				"Content-Type": "application/json"
			}

			let bodyContent = JSON.stringify({
				"email":"boukarifawaz27@gmail.com",
				"password":"banikanny"
			});

			let response = await fetch("http://127.0.0.1:3000/auth/login", { 
				method: "POST",
				body: bodyContent,
				headers: headersList
			});

			let data = await response.text();
			console.log(data);

		
	},


}
</script>

<style scoped>

</style>
