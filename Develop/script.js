//global variables here
var citySearchForm = document.querySelector('#cityForm');
var cityInput = document.querySelector('#cityInput');
var city = document.getElementById('city');
var fiveDayContainer = document.getElementById('fiveDayContainer');
var searchList = document.getElementById('searchList');

var searches = []

function callApi(){
	//this takes the user input
	var cityText = cityInput.value.trim();
	console.log(cityText)
	var api = "https://api.openweathermap.org/data/2.5/forecast?q=";
	var apiKey = "&appid=5db7c0600e5ee725bab03bf015c8d275&units=imperial";
	//this makes the api link based off users input
	fetch(api + cityText + apiKey)
	.then(function(resp) {return resp.json()})
	.then(function(data) {
		console.log(data);
		city.innerHTML = ("Now viewing weather for: " + data.city.name + ", " + data.city.country);
		var timeSlot = ""
	
		for (i in data.list){
			
			timeSlot += "<div class='col-md-3 text-center'><div class='alert alert-primary'>"
			timeSlot += data.list[i].dt_txt.split(' ')[0] + "<br/>"
			// timeslot += "<img src='https://openweathermap.org/img/wn/10d@2x.png'/> <br/>"
			timeSlot += data.list[i].main.temp+"&deg;F<br/>"
			timeSlot += data.list[i].weather[0].main + "<br/>"
			timeSlot += ("Wind Speed: " + data.list[i].wind.speed +" mph") + "<br/>"
			timeSlot += ("Humidity: " + data.list[i].main.humidity + " %") + "<br/>"
			timeSlot += "</div></div>"

			var date = data.list[i].dt_txt.split(' ')[0]
			console.log(date)

			// for (let i = 0; i < date.length; i++) {
			// 	const day = date[index];
			// 	if (day == day) {
					
			// 	}
			// }

			// for (let i = 0; i < data.list; i++) {
			// 	var date = data.list[i].dt_txt.split(' ')[0]
			// 	if (date == date[i]) {
			// 		date[i].style.display = 'hidden'
			// 	}
			// }
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
			console.log(cityText)

		}
	
		//add new user to leaders array, clear the input
		searches.push(JSON.stringify(cityText));
	
	
		//store updated leaders in localStorage, re-render list
		storedSearches();
		renderSearches();
	})
	//renders items in a leader list as <li> elements
	function renderSearches() {
		// clear leaderList element
		searchList.innerHTML = '';
	
		//render a new li for each leader added
		for (var i = 0; i < searches.length; i++) {
			var search = searches[i];
	
			var button = document.createElement('button');
			button.textContent = search;
			button.setAttribute('data-index', i);
	
			searchList.appendChild(button);
			}

		}
		function init(){
			//get items from local storage
			var storedSearches = JSON.parse(localStorage.getItem('searches'));
		
			//if leaders were retrieved from localStorage, update leaders array to it
			if (storedSearches !== null) {
				searches = storedSearches;
			}
		
			renderSearches();
		}
		function storedSearches() {
			//stringify and set key in localStorage to leaders array
			localStorage.setItem('searches', JSON.stringify(searches));
		}
	init()
}
callApi();


//this checks the date and updates the dates 
var d = new Date();
var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function checkDay(day){
	if(day +d.getDay() > 6){
		return day +d.getDay()-7;
	}else{
		return day +d.getDay();
	}
}

for(i=0; i<5; i++){
	document.getElementById('day'+(i+1)).innerHTML = weekday[checkDay(i)];
}
