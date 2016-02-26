var array = [];

$(document).ready(function() {

	// Instantiate a slider
	var mySlider = $("#ex1Slider").slider({step: 1,
		min: 1,
		max: 6,
		tooltip: 'hide',
		value: 1,
		reversed: true,
		ticks: [1, 2, 3, 4, 5, 6],
		ticks_labels: ['1', '2', '3', '4', '5', '6']
	});

	var mySliderOther = $(".slider-factors").slider({step: 1,
		min: 1,
		max: 5,
		tooltip: 'hide',
		value: 1,
		reversed: true,
		ticks: [1, 2, 3, 4, 5],
		ticks_labels: ['1', '2', '3', '4', '5']
	});

	  $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });

	// Call a method on the slider
	

	
	var originalVal;
	$("#ex1Slider").on('change', function(){
	    originalVal = $(this).slider('getValue');
			switch (originalVal) {
			  case 1:
			   $('.ifa').text('Extremely predictable and supportive');
			   break;

			  case 2:
			    $('.ifa').text('Very predictable and well balanced');
			    break;
			  case 3:
			    $('.ifa').text('Evolving but balanced');
			    break;
			  case 4:
			    $('.ifa').text('Evolving and unbalanced');
			    break;
			     case 5:
			    $('.ifa').text('Volatile and unbalanced');
			    break;
			     case 6:
			    $('.ifa').text('Very volatile and underfunded');
			    break;
			  default:
			    $('.ifa').text('Extremely predictable and supportive');
			}
			mainFunc();
	});

	
	$('.slider-factors').on('change', function(){
		var dataFactor = $(this).attr('id');
		var valueSlider = $(this).slider('getValue');
		$('.factors').find("[data-factor='" + dataFactor + "']").text(valueSlider);
		mainFunc();
	});


	// Open dialog
	$('.input-score').each(function(){
		var self = $(this);
		$(this).parent('td').prev().find('span').on('click', function(){
			var dataAttrCur = self.attr('data-factor');
			$('.dialog[data-dialog=' + dataAttrCur + ']').show();
		});
	});

	// Close dialog
	$('.dialog .arrow-back').on('click', function(){
		$(this).parent('.dialog').hide();
	});

	$('.tab-content table tr:last-child td').on('click', function(){
		$('.tab-content table tr:last-child td').removeClass('active');
		$(this).addClass('active');
		var scoreEconom = Math.abs($(this).text());
		mainFunc(scoreEconom);
	});

	$(".wrap-qualitative-factors-item.eca1").find('input').each(function(){
		if($(this).prop('checked')) {
			var eca1 = ($(this).parent('label').index()-1);
			console.log(eca1);
		}
	});

  
});

function mainFunc(scoreEconom) {
	var valIfa = $("#ex1Slider").slider('getValue'),
		
		scoreFinman = $('#finman').slider('getValue'),
		scoreBudflex = $('#budflex').slider('getValue'),
		scoreBudper = $('#budper').slider('getValue'),
		scoreLiq = $('#liq').slider('getValue'),
		scoreDebt = $('#debt').slider('getValue'),
		scoreConlib = $('#conlib').slider('getValue'),
		params = "{ 'inputStructure': { 'ifa': "+valIfa+" , 'economy': { 'score': "+scoreEconom+", 'overwrite': true, 'eca1': 0, 'eca2': 0, 'eca3': 0, 	'eca4': 0, 	'eca5': 0, 	'eca6': 0 },'management': { 'score': "+scoreFinman+", 'overwrite': true, 'fma1': 3, 'fma2': 3, 'fma3': 3, 'fma4': 3, 'fma5': 3, 'fmtr': true }, 'budgetFlexibility': { 'score': "+scoreBudflex+", 'overwrite': true, 'bfa1': 0, 'bfa2': 0, 'bfa3': 0, 'bfa4': 0, 'bfa5': 0, 'bfa6': 0 }, 'budgetPerformance': { 'score': "+scoreBudper+", 'overwrite': true, 'bpa1': 0, 'bpa2': 0, 'bpa3': 0, 'bpa4': 0, 'bpa5': 0 }, 'liquidity': { 'score': "+scoreLiq+", 'overwrite': true, 'lqExtAdj': 3, 'lqa1': 0, 'lqa2': 0, 'lqa3': 0, 'lqa4': 0 }, 'debt': { 'score': "+scoreDebt+", 'overwrite': true, 'dba1': 0, 'dba2': 0, 'dba3': 0, 'dba4': 0 }, 'contLiability': "+scoreConlib+", 'overrides': { 'cwp': 0, 'cir': 0, 'np1': 0, 'np2': 0, 'np3': 0, 'nr1': 0, 'ns1': 0 } }}"
	// var	params = "{ 'inputStructure': { 'ifa': 3 , 'economy': { 'score': 3, 'overwrite': true, 'eca1': 0, 'eca2': 0, 'eca3': 0, 'eca4': 0, 	'eca5': 0, 	'eca6': 0 },'management': { 'score': 3, 'overwrite': true, 'fma1': 3, 'fma2': 3, 'fma3': 3, 'fma4': 3, 'fma5': 3, 'fmtr': true }, 'budgetFlexibility': { 'score': 3, 'overwrite': true, 'bfa1': 0, 'bfa2': 0, 'bfa3': 0, 'bfa4': 0, 'bfa5': 0, 'bfa6': 0 }, 'budgetPerformance': { 'score': 3, 'overwrite': true, 'bpa1': 0, 'bpa2': 0, 'bpa3': 0, 'bpa4': 0, 'bpa5': 0 }, 'liquidity': { 'score': 3, 'overwrite': true, 'lqExtAdj': 3, 'lqa1': 0, 'lqa2': 0, 'lqa3': 0, 'lqa4': 0 }, 'debt': { 'score': 3, 'overwrite': true, 'dba1': 0, 'dba2': 0, 'dba3': 0, 'dba4': 0 }, 'contLiability': 3, 'overrides': { 'cwp': 0, 'cir': 0, 'np1': 0, 'np2': 0, 'np3': 0, 'nr1': 0, 'ns1': 0 } }}"
	
	$.ajax({
		dataType: 'json',
     	url: 'http://84.47.146.236:8080/csbservices/ipf',                       
     	type: "post",
    	data: params,
    	success:function(data) {
    	array = [];
	      var p1 = data.outputStructure.ipcec,
	          p2 = data.outputStructure.ipcfm,
	          p3 = data.outputStructure.ipcbf,
	          p4 = data.outputStructure.ipcbp,
	          p5 = data.outputStructure.ipclq,
	          p6 = data.outputStructure.ipcdb,
	          p7 = data.outputStructure.ipccl;
	          p8 = data.outputStructure.baseCode;
	          p9 = data.outputStructure.icrCode;
	       $('.wrap-qualitative-factors .total').text(p1);
	       $('#economy').slider('setValue', p1); 
	       $('#finman').slider('setValue', p2); 
	       $('#budflex').slider('setValue', p3); 
	       $('#budper').slider('setValue', p4); 
	       $('#liq').slider('setValue', p5); 
	       $('#debt').slider('setValue', p6); 
	       $('#conlib').slider('setValue', p7); 
	       updateGraph(p1, p2, p3, p4, p5, p6, p7, p8, p9);
	       compareCoord();
	    },
	    error: function (jqXHR, exception) {
		    console.log(jqXHR);
		}
	});

}

function updateGraph(p1, p2, p3, p4, p5, p6, p7, p8, p9) {
	var marginLine = 21;
	$('.point-1').parent('li').css("bottom", (p1-1) * marginLine);
	$('.point-2').parent('li').css("bottom", (p2-1) * marginLine);
	$('.point-3').parent('li').css("bottom", (p3-1) * marginLine);
	$('.point-4').parent('li').css("bottom", (p4-1) * marginLine);
	$('.point-5').parent('li').css("bottom", (p5-1) * marginLine);
	$('.point-6').parent('li').css("bottom", (p6-1) * marginLine);
	$('.point-7').parent('li').css("bottom", (p7-1) * marginLine);
	$('.point-8').parent('li').css("bottom", (p8-3) * 4.25);
	$('.point-9').parent('li').css("bottom", (p9-3) * 4.25);
}

function compareCoord() {
	$('.points li').each(function(){
		var topPos = $(this).css('bottom').slice(0, -2);
		 array.push(topPos);
	});
	
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
