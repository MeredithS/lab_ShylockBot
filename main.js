console.log('linked');
$(document).ready(function(){

	var $input = $('#prompt').val();
	var $list = $('#log');
	var bank = 10000;
	var debtors =[];
	var interest = .35;


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
				}if($stringToArray[0]==='loan'){
					lendMoney();
				}if($input==='ledger'){
					ledger();
				}if($input==="collect interest"){
					collectInt();
				}if($stringToArray[0]==='set'){
					setInterest();
				}if($stringToArray[0]==='collect'){
					collectDebt();
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
		bank -= parseInt($amount);
		var $createLi = $('<li>');
	 	$createLi.attr('class', 'action');
		$createLi.text('ShylockBot gives '+ $stringToArray[1]+ " "+ $amount + ' ducats');
		$list.append($createLi);
		var Debtor = function Debtor(name,moneyOwed){
			this.name = name;
			this.moneyOwed = moneyOwed;
		}
		SoonToBeDebtors = new Debtor($stringToArray[1],$stringToArray[2]);
		debtors.push(SoonToBeDebtors);
		console.log(debtors);
		$('#prompt').val('');

	}

	var ledger = function(){
		var $input = $('#prompt').val();
		var $createLi = $('<li>');
	 	$createLi.attr('class', 'action');
		$createLi.text('ShylockBot pulls out his ledger');
		$list.append($createLi);
	 	for(i=0; i<debtors.length; i++){
		 	var $createLi = $('<li>');
		 	$createLi.attr('class', 'quote');
			$createLi.text(debtors[i].name + " owes me " + debtors[i].moneyOwed + " ducats");
			$list.append($createLi);
		}console.log(debtors);
	};

var setInterest = function(){
	var $input = $('#prompt').val();
	var $stringToArray = $input.split(' ');
	var newInterest = $stringToArray[3].replace('%',"");
	var newInterestDecimal=parseInt(newInterest)/100
	var $createLi = $('<li>');
	 	$createLi.attr('class', 'action');
		$createLi.text('ShylockBot adjusts his interest rate from '+ (interest*100)+"% to "+$stringToArray[3]);
		$list.append($createLi);
		interest=newInterestDecimal;

}
var collectInt = function(){
		var $createLi = $('<li>');
	 	$createLi.attr('class', 'action');
		$createLi.text('ShylockBot collects interest at '+ (interest*100)+"%");
		$list.append($createLi);
		for(i=0; i<debtors.length; i++){
			debtors[i].moneyOwed =parseInt(debtors[i].moneyOwed * interest) + parseInt(debtors[i].moneyOwed);
			var $createLi = $('<li>');
		 	$createLi.attr('class', 'quote');
			$createLi.text(debtors[i].name + " now owes me " + debtors[i].moneyOwed + " ducats");
			$list.append($createLi);
		}
}

var collectDebt = function(){
	var $input = $('#prompt').val();
	var $stringToArray = $input.split(' ');
	console.log($stringToArray);
	var $createLi = $('<li>');
	$createLi.attr('class', 'action');
	$createLi.text('ShylockBot opens his purse');
	$list.append($createLi);
	console.log($stringToArray[4]);
	for(var i=0; i<debtors.length; i++){	
		if($stringToArray[4]===debtors[i].name){ //if the name location eqauls a name in the debtor array
			console.log(debtors);				
			debtors[i].moneyOwed=parseInt(debtors[i].moneyOwed - $stringToArray[1]); //then the new amount of money they owe equals their original amount - the collected amount
			console.log(debtors);
			console.log(debtors[i].moneyOwed);
			bank+=parseInt($stringToArray[1]);				//add the money collected back to the bank
			console.log(bank);
			if(debtors[i].moneyOwed<0){							//if the new amount of money they owe is less then 0
				console.log(debtors);						
				alert('ShylockBot is an asshole and is asking for too much money');			//alert too much money is being asked for
				return;																//exit loop
			}else if(debtors[i].moneyOwed=0){			// else if the new amount owed equals 0 then remove person from debtors array
				debtors.splice([i],1);
			}
		}
	}
};



});