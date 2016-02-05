var array = [];

$(document).ready(function() {

	changeRangeInput();
   
	$("input").keyup(function(){	
		changeRangeInput();
	});
  
    $("input").on('blur', function(){	
		changeRangeInput();
	});
	
	$("input").each(function(i){
		$(this).attr('old-value', $(this).val());
	});
	
  	$("input").on('focus', function(){
		var oldVal = $(this).val();
		$(this).attr('old-value', oldVal);
	});

	// Instantiate a slider
	var mySlider = $("#ex1Slider").slider();

	// Call a method on the slider
	var value = mySlider.slider('getValue');


	var	params = "{ 'inputStructure': { 'ifa': 4, 'economy': { 'score': 3, 'overwrite': true, 'eca1': 0, 'eca2': 0, 'eca3': 0, 	'eca4': 0, 	'eca5': 0, 	'eca6': 0 },'management': { 'score': 3, 'overwrite': true, 'fma1': 3, 'fma2': 3, 'fma3': 3, 'fma4': 3, 'fma5': 3, 'fmtr': true }, 'budgetFlexibility': { 'score': 3, 'overwrite': true, 'bfa1': 0, 'bfa2': 0, 'bfa3': 0, 'bfa4': 0, 'bfa5': 0, 'bfa6': 0 }, 'budgetPerformance': { 'score': 3, 'overwrite': true, 'bpa1': 0, 'bpa2': 0, 'bpa3': 0, 'bpa4': 0, 'bpa5': 0 }, 'liquidity': { 'score': 3, 'overwrite': true, 'lqExtAdj': 3, 'lqa1': 0, 'lqa2': 0, 'lqa3': 0, 'lqa4': 0 }, 'debt': { 'score': 3, 'overwrite': true, 'dba1': 0, 'dba2': 0, 'dba3': 0, 'dba4': 0 }, 'contLiability': 3, 'overrides': { 'cwp': 0, 'cir': 0, 'np1': 0, 'np2': 0, 'np3': 0, 'nr1': 0, 'ns1': 0 } }}"

		$.ajax({
	     	url: 'http://84.47.146.236:8080/csbservices/ipf',                       
	     	type: "post",
	    	data: params
 		 });
  
});

function changeRangeInput() {
	
	var rangeInput = parseFloat($("#range").val())
	array = [];
	
	
	$(".point-input").each(function(i){
		var oldVal;
		var rangeStepCurrent = Math.floor(rangeInput/5),
			rangeStep = Math.floor(rangeInput/5),
			heightGraph = $('.graph').height(),
			pointCircle = $(".point-"+(i+1)),
			currentValueInput = $(this).val();

		

		// $.ajax({
	 //     	url: 'http://localhost/snp/',   
	 //    	data: object,
	 //      	success: function (data, textStatus) { 
	 //        	console.log(object)
  //    		} 
 	// 	 });

		$(this).attr('max', rangeInput);
		$(this).attr('min', '0');
			
		if (currentValueInput <= rangeInput) {
			array.push(point($(this), pointCircle));
		} else {
			var oldValue = $(this).attr('old-value'),
				oldValueRangeInput = $("#range").attr('old-value');
			$(this).val(oldValue);
			$("#range").val(oldValueRangeInput);
			array.push(point($(this), pointCircle));
		}
		
		//Range on charts
		$($(".range-val:not(.bottom)").get().reverse()).each(function(){
			$(this).text(rangeStep);
			rangeStep=rangeStep+rangeStepCurrent;
		});	
	});
	
	compareCoord();
}

function point(pointInputCoord, pointSelector) {
	var rangeInput = parseFloat($("#range").val()),
		heightGraph = $('.graph').height(),
		coordPoint = ((pointInputCoord.val()*(heightGraph-6))/rangeInput);
	$(pointSelector).parent('li').css("bottom", coordPoint);

	return coordPoint;
}

function compareCoord() {
	
	for (i=0; i < array.length-1; i++){
		
		var heightGreyLine = Math.abs(array[i]-array[i+1]),
			nextVerticalLine = $('.points li:eq('+ i +')').next().find(".vertical-line"),
			reversLineClass = "reverse-line";
		
		$('.points li:eq('+ i +')').next('li').removeClass(reversLineClass);
		nextVerticalLine.css('height', heightGreyLine );
		nextVerticalLine.show();
		
		switch(true) {
			case(array[i] > array[i+1]):
				$('.points li:eq('+ i +')').next('li').addClass(reversLineClass);
				break;
			case(array[i] === array[i+1]): 
				nextVerticalLine.hide();
				break;
		}
	}
}
