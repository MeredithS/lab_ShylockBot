console.log('linked');
$(document).ready(function(){

var $input = $('#prompt').val();
var $list = $('#log');
var bank = 10000;


var addToList = function(){
	var $input = $('#prompt').val();
		if(event.which===13){
			var $stringToArray = $input.split(' ');
			var $createLi = $('<li>');
			$createLi.attr('class', 'command');
			$createLi.text($input);
			$list.append($createLi);
			if($input==="purse"){
				getPurse();
			}else if($stringToArray[0]==='loan'){
				lendMoney();
			}
			$('#prompt').val('');
	}	
};

$(document).keypress(addToList);


var getPurse = function(){
 var $createLi = $('<li>');
 	$createLi.attr('class', 'action');
	$createLi.text('ShylockBot pulls out his purse containing '+ bank + ' ducats');
	$list.append($createLi);
	console.log($createLi);
	$('#prompt').val('');
}

var lendMoney = function(){	
	var $input = $('#prompt').val();
	var $stringToArray = $input.split(' ');
	var $amount = $input.replace ( /[^\d.]/g, '' );
	console.log($amount);
	bank += parseInt($amount);
	var $createLi = $('<li>');
 	$createLi.attr('class', 'action');
	$createLi.text('ShylockBot gives '+ $stringToArray[1]+ " "+ $amount + ' ducats');
	$list.append($createLi);
	console.log(bank);
	$('#prompt').val('');

}


});