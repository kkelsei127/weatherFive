//global variables here
var citySearchForm = document.querySelector('#cityForm');
var cityInput = document.querySelector('#cityInput');
var city = document.getElementById('city');
var fiveDayContainer = document.getElementById('fiveDayContainer');
var searchList = document.getElementById('searchList');

var searches = JSON.parse(localStorage.getItem('searches')) || []

function callApi(){
	//this takes the user input
	var cityText = cityInput.value.trim();
	var api = "https://api.openweathermap.org/data/2.5/forecast?q=";
	var apiKey = "&appid=5db7c0600e5ee725bab03bf015c8d275&units=imperial";
	//this makes the api link based off users input
	fetch(api + cityText + apiKey)
	.then(function(resp) {return resp.json()})
	.then(function(data) {
		console.log(data);
		city.innerHTML = ("Now viewing weather for: " + data.city.name + ", " + data.city.country);
		var timeSlot = ""

		for (let i = 4; i < data.list.length; i+=8) {
			console.log(data.list[i])
			timeSlot += "<div class='col-sm text-center'><div class='alert alert-danger'>"
			timeSlot += data.list[i].dt_txt.split(' ')[0] + "<br/>"
			timeSlot += `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>`
			timeSlot += data.list[i].main.temp+"&deg;F<br/>"
			timeSlot += data.list[i].weather[0].main + "<br/>"
			timeSlot += (`Wind Speed: ${data.list[i].wind.speed} mph`) + "<br/>"
			timeSlot += (`Humidity: ${data.list[i].main.humidity}%`) + "<br/>"
			timeSlot += "</div></div>"
			
		}

		fiveDayContainer.innerHTML = timeSlot
	})
	.catch(function () {
		console.log(resp.status)
	})	

	citySearchForm.addEventListener('submit', function(event) {
		event.preventDefault();
	
		var cityText = cityInput.value.trim();
		
		//return from function early if submitted cityText is blank
		if (cityText === '') {
			return;
		}
		else {
			
		}
		//add new search to searches array, clear the input
		searches.push(cityText);
		localStorage.setItem('searches', JSON.stringify(searches))
		
		callApi()
		//store updated searches in localStorage, re-render list
		storedSearches();
		renderSearches();
	})
	//renders items in a search list as <button>>elements
	function renderSearches() {
		// clear searchList element
		searchList.innerHTML = '';
		let newSearches = [...new Set(searches)];
			
		for (var i = 0; i < newSearches.length; i++) {
			var search = newSearches[i];

		//render a new button for each search added
	
			var button = document.createElement('button');
			button.textContent = search;
			button.setAttribute('data-index', i);
			button.addEventListener('click', function(){
				var cityText = search;
				console.log(cityText)
				console.log(search)
				var api = "https://api.openweathermap.org/data/2.5/forecast?q=";
				var apiKey = "&appid=5db7c0600e5ee725bab03bf015c8d275&units=imperial";
				//this makes the api link based off users input
				fetch(api + cityText + apiKey)
				.then(function(resp) {return resp.json()})
				.then(function(data) {
					console.log(data);
					city.innerHTML = ("Now viewing weather for: " + data.city.name + ", " + data.city.country);
					var timeSlot = ""
			
					for (let i = 4; i < data.list.length; i+=8) {
						console.log(data.list[i])
						timeSlot += "<div class='col-sm text-center'><div class='alert alert-danger'>"
						timeSlot += data.list[i].dt_txt.split(' ')[0] + "<br/>"
						timeSlot += `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>`
						timeSlot += data.list[i].main.temp+"&deg;F<br/>"
						timeSlot += data.list[i].weather[0].main + "<br/>"
						timeSlot += (`Wind Speed: ${data.list[i].wind.speed} mph`) + "<br/>"
						timeSlot += (`Humidity: ${data.list[i].main.humidity}%`) + "<br/>"
						timeSlot += "</div></div>"
						
					}
			
					fiveDayContainer.innerHTML = timeSlot
				})
			})
			searchList.appendChild(button);
			 }
		}
		function init(){
			//get items from local storage
			var storedSearches = JSON.parse(localStorage.getItem('searches'));
		
			//if searches were retrieved from localStorage, update searches array to it
			if (storedSearches !== null) {
				searches = storedSearches;
			}
		
			// renderSearches();
		}
		function storedSearches() {
			//stringify and set key in localStorage to searches array
			localStorage.setItem('searches', JSON.stringify(searches));
		}
	init()
}
callApi()
