console.log('linked');
$(document).ready(function(){

var $input = $('#prompt').val();
var $list = $('#log');
bank = 10000;

var addToList = function(){
	var $input = $('#prompt').val();
		if(event.which===13){
			if($input==="purse"){
				getPurse();
			}else{
			var $createLi = $('<li>');
			$createLi.text($input);
			$list.append($createLi);
			$('#prompt').val('');
		}
	}	
};

$(document).keypress(addToList);

// if($input==="purse"){
var getPurse = function(){
 var $createLi = $('<li>');
 	$createLi.attr('class', 'action');
	$createLi.text('ShylockBot pulls out his purse containing '+ bank + ' ducats');
	$list.append($createLi);
	console.log($createLi);
	$('#prompt').val('');
}
// }


});