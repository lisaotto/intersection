function random(obj) {
	var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
}

function renderTweets(data) {

	console.log(data);

	$('.driver, .pedestrian').css('opacity',0);

	var classes = ['left', 'center', 'right']
	$('.driver').removeClass('left center right').addClass(random(classes));
	$('.pedestrian').removeClass('left center right').addClass(random(classes));

	$('#tweet1').html('<span class="icon-twitter"></span>' + data.driver_text);
	$('#tweet2').html('<span class="icon-twitter"></span>' + data.ped_text);
	$('#handle1').html("@" + data.driver_user);
	$('#handle2').html("@" + data.ped_user);
	$('#date').html(data.date);
	$('.driver, .pedestrian, #date').animate({'opacity':1});

}

function fetch() {
	$.ajax({
		url: 'http://intersection-api.lisaot.to',
		success: renderTweets
	});
}

fetch();

$('.open').click(function(){
	$('footer').fadeIn()
});

$('.close').click(function(){
	$('footer').fadeOut()
});

$('.title').click(function(){
	$('.driver, .pedestrian, #date').animate({'opacity':0});
	fetch();
});
