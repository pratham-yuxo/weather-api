fetch('https://extreme-ip-lookup.com/json/')
.then( res => res.json())
.then(response => {
    console.log("Country: ", response.country);
 })
 .catch((data, status) => {
    console.log('Request failed');
 })