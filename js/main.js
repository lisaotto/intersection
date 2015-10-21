function random(obj) {
	var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
}

function renderTweets (tweetobj1, tweetobj2) {
	$('.driver, .pedestrian').css('opacity',0);
	$('#tweet1').html('<span class="icon-twitter"></span>' + tweetobj1.A);
	$('#tweet2').html('<span class="icon-twitter"></span>' + tweetobj2.A);
	$('#handle1').html("@" + tweetobj1.C);
	$('#handle2').html("@" + tweetobj2.C);
	var datedisplay = moment(tweetobj1.B).format('MMMM Do, YYYY')
	$('#date').html(datedisplay);
	$('.driver, .pedestrian, #date').animate({'opacity':1});

	
}

function generateTweets(){
var sheet = gsheet('https://spreadsheets.google.com/feeds/cells/1g8pUtv78S-AfY2aZw42RJ15L2bzimujYaZevP5Rj4aY/1/public/basic?alt=json');
sheet.ready(function(){
	console.log(this.sheet)
	for (var i in this.sheet){
		if (this.sheet[i].hasOwnProperty('E')) delete this.sheet[i];

	}
	console.log(this.sheet)
	var tweetobj1 = random(this.sheet);
	console.log(tweetobj1);
	var date = new Date (tweetobj1.B);
	var datestring1 = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
	var sheet2 = gsheet('https://spreadsheets.google.com/feeds/cells/1g8pUtv78S-AfY2aZw42RJ15L2bzimujYaZevP5Rj4aY/2/public/basic?alt=json');
		sheet2.ready(function(){

			var matchedtweets = []


			for (var i in this.sheet){
				tweetobj2 = this.sheet[i];

				var date2 = new Date (tweetobj2.B);
				var datestring2 = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
				if (datestring1 == datestring2){

					matchedtweets.push(tweetobj2)

					//renderTweets(tweetobj1, tweetobj2)
					//break;
				}
			}
		tweetobj2 = matchedtweets[Math.floor(Math.random()*matchedtweets.length)];
		renderTweets(tweetobj1, tweetobj2);

		var classes = ['left', 'center', 'right']
		$('.driver').removeClass('left center right').addClass(random(classes));
		$('.pedestrian').removeClass('left center right').addClass(random(classes));


	})

})
} 
generateTweets();

$('.open').click(function(){
	$('footer').fadeIn()
});

$('.close').click(function(){
	$('footer').fadeOut()
});

$('.title').click(function(){
	$('.driver, .pedestrian, #date').animate({'opacity':0});
	generateTweets();
});







/* Twitter Widegt Fail

 var config1 = {
  "id": '653220207209529344',
  "domId": 'pedestrian',
  "maxTweets": 0,
  "enableLinks": true
};
twitterFetcher.fetch(config1);


var config2 = {
  "id": '653222188724584449',
  "domId": 'driver',
  "maxTweets": 20,
  "enableLinks": true
};
twitterFetcher.fetch(config2);

var config3= {
  "id": '653373323435491329',
  "domId": 'ugh',
  "maxTweets": 0,
  "enableLinks": true
};
twitterFetcher.fetch(config3); */