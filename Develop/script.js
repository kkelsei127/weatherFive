//global variables here
var APIKey = "5db7c0600e5ee725bab03bf015c8d275";
var searchFormEl = document.querySelector('#search-form');
var city = document.getElementById('search-input');

//this was copied from the fetch example on classwork
//get api here
// function fetchApi(query, format) {
	
// 	var weatherRequestUrl = "http://api.openweathermap.org/data/2.5/weather?q=";

// 	if (format) {
// 		weatherRequestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + '&appid=' + APIKey;
// 	}


// 	fetch(weatherRequestUrl)
// 		.then(function (response) {
// 		console.log(response)
// 		if (!response.ok) {
// 			throw response.json();
// 		}else{
// 			alert("ERROR:" + response.status)
// 		}

// 		return response.json();
// 		})
// 		.then(function (data) {
// 		// write query to page so user knows what they are viewing
// 		resultTextEl.textContent = data.search.query;

// 		console.log(data);

// 		// if (!data.results.length) {
// 		// 	console.log('No results found!');
// 		// 	resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
// 		// } else {
// 		// 	resultContentEl.textContent = '';
// 		// 	for (var i = 0; i < data.results.length; i++) {
// 		// 	printResults(data.results[i]);
// 		// 	}
// 		// }
// 		// })
// 		// .catch(function (error) {
// 		// console.error(error);
// 		});
// }

// //fetch API
// function handleSearchFormSubmit(event) {
// event.preventDefault();

// var searchInputVal = document.querySelector('#search-input').value;

// if (!searchInputVal) {
// 	console.error('You need a search input value!');
// 	return;
// }

// fetchApi(searchInputVal);
// }

// searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// //function for putting text into appropriate weather divs
 
function getCity(){
	var city = document.getElementById('search-input');
	var targetedCity = document.getElementById('targetedCity');
	targetedCity.innerHTML = "Now viewing weather for " + city.value + " "


fetch("https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&appid=5db7c0600e5ee725bab03bf015c8d275")
.then(response => response.json())
.then(data =>{
	for(i = 0; i < 5; i++){
		document.getElementById("day"+ (i+1) +'min').innerHTML ="Minimum Temperature: " +Number(data.list[i].main.temp_min - 288.53).toFixed(1) +'°';
	}
	for(i = 0; i < 5; i++){
		document.getElementById("day"+ (i+1) +'max').innerHTML ="Maximum Temperature: " +Number(data.list[i].main.temp_max - 288.53).toFixed(1) +'°';
	}
	for(i = 0; i < 5; i++){
		document.getElementById("image" + (i+1)).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
	}
})
}