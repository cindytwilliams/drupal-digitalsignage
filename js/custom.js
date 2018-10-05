(function ($) {  

  Drupal.behaviors.volstate = {

    attach: function (context, settings) {            

		
		// --------------------------------------
		// ONLOAD	
		jQuery(document).ready(function() {
  		
  		// get URL of current page
      var page = $(location).attr('pathname');
      
      // get location values from cookie or querystring
      var campus = getLocation('campus','Gallatin');
      var bldg = getLocation('bldg','Ramer');
      var sign = getLocation('sign','1a');
        		          
      // --------------------------------------
      /* SLIDESHOW page */
      if ( page.indexOf('slideshow') > 0 )  {
        
        // hide floating nav bar on slideshow page
        $(".float-nav").css('display','none');
        
        // refresh page every xx minutes
        $(document).idleTimeout({ 
        	inactivity: 1800000,   // 30 minutes (in milliseconds)
        	noconfirm: 10000, 
        	sessionAlive: 10000,
        	redirect_url: '/slideshow/' + campus
        });
      }
	    
      /* redirect to slideshow page if idle */
      if ( ($(location).attr('pathname') != '/slideshow') && ($(location).attr('pathname') != '/slideshow/' + campus) && ($(location).attr('pathname') != '/admin') ) {
        $(document).idleTimeout({ 
        	inactivity: 60000,   // 1 minute
        	noconfirm: 10000, 
        	sessionAlive: 10000,
        	redirect_url: '/slideshow/' + campus
        });
      }
		
      // -------------------------------------------
      /* CAMPUS MAP page */
      if ( page.indexOf('map') > 0 )  {
      	
      	$('#campusMap').wayfinding({
      		'maps': [
      			{'path': '/sites/all/themes/volstate/img/campusMap.svg', 'id': 'floor1'}
      		],
      		'path': {
      			width: 3,
      			color: '#39FF14',
      			radius: 8,
      			speed: 5
      		},
      		'startpoint': function () {
      			return 'lcd.1';
      		},
      		'defaultMap': 'floor1',
      		'showLocation': true,
      		'zoomToRoute': false
      	});
      	
      	// click on building link
      	$('a').click( function () {
      		var room = $(this).attr('href');
      		room = room.replace("#", "");
      		$('#campusMap').wayfinding('routeTo', 'R' + room);	
      	});
      
      }
				
      // -------------------------------------------
      /* PEOPLE FINDER page */
      if ( page.indexOf('directory') > 0 )  {
      	
      	var pathColor = '#39FF14';   // green
      	var pathSpeed = 5;	// lower number is faster than higher number
      	
      	// display selected building in page title
      	var selectedBldg = window.location.pathname.split("/").pop();
      	selectedBldg = selectedBldg.replace("%20"," ");
      	selectedBldg = selectedBldg.replace("Vet Tech%20Bldg","Vet Tech Bldg");
      	if (selectedBldg != '') {
      		$( "h1.page-header" ).append( " - " + selectedBldg);
      	}
      	
      	// get map files depending on the selected building
      	var mapFiles = loadMapFiles(selectedBldg,sign);   // load into an array
      	var defaultMap = mapFiles[0]
      	var mapPath1 = mapFiles[1];
      	var mapPath2 = mapFiles[2];
      	var mapPath3 = mapFiles[3];
      	
      	// render the map
      	if (mapPath3 != '') {			// 3 floors
      		$('#myMaps').wayfinding({
      			'maps': [
      				{'path': mapPath1, 'id': 'floor1'},
      				{'path': mapPath2, 'id': 'floor2'},
      				{'path': mapPath3, 'id': 'floor3'}
      			],
      			'path': {
      				width: 3,
      				color: pathColor,
      				radius: 8,
      				speed: pathSpeed
      			},
      			'startpoint': function () {
      				return 'lcd.1';
      			},
      			'loadMessage': '',
      			'defaultMap': defaultMap,
      			'showLocation': true,
      			'zoomToRoute': false
      		});
      	} else {
      		if (mapPath2 != '') {		// 2 floors
      			$('#myMaps').wayfinding({
      				'maps': [
      					{'path': mapPath1, 'id': 'floor1'},
      					{'path': mapPath2, 'id': 'floor2'}
      				],
      				'path': {
      					width: 3,
      					color: pathColor,
      					radius: 8,
      					speed: pathSpeed
      				},
      				'startpoint': function () {
      					return 'lcd.1';
      				},
      				'loadMessage': '',
      				'defaultMap': defaultMap,
      				'showLocation': true,
      				'zoomToRoute': false
      			});
      		} else {					// 1 floor
      			$('#myMaps').wayfinding({
      				'maps': [
      					{'path': mapPath1, 'id': 'floor1'}
      				],
      				'path': {
      					width: 3,
      					color: pathColor,
      					radius: 8,
      					speed: pathSpeed
      				},
      				'startpoint': function () {
      					return 'lcd.1';
      				},
      				'loadMessage': '',
      				'defaultMap': defaultMap,
      				'showLocation': true,
      				'zoomToRoute': false
      			});
      		}
      	}
      	
      	// toggle accessible route */
      	$('#accessible').on('click', function() {
      	    var state = $(this).data('state');  
      		state = !state; 
      		if (state) {
      	        $('#myMaps').wayfinding('accessibleRoute', true);
      	        $(".wheelchair-btn").css("background-color", "#9D2235"); // red
      	    } else {
      	        $('#myMaps').wayfinding('accessibleRoute', false);
      	        $(".wheelchair-btn").css("background-color", "#808080");  // gray
      	    }
      		$(this).data('state', state);  
      	});
      	
      	// click on a person's row
      	$('tr').click( function () {
      		var room = getRoomNum($(this).find('td').eq(3).text()); 	// get room # from building string
      		$('#myMaps').wayfinding('routeTo', 'R' + room);	
      	});
      	
      	// highlight selected row when clicked
      	$(".table tr").click(function() {
      	    var selected = $(this).hasClass("highlight");
      	    $(".table tr").removeClass("highlight");
      	    if(!selected)
      	    	$(this).addClass("highlight");
      	});
      	
      	// scroll people list to clicked letter
      	$('.letters-container a').click( function () {
      		$("html, body").animate({ scrollTop: $(this).attr("href").offset().top }, 1500);
      	});
      
      }
  					
			// -------------------------------------------
			/* MAIN MENU */
			if ((page == '/') || (page == '/homepage')) {
			    
		    // display clock
		    startTime();
		    
		    // display weather for current campus
				$.simpleWeather({
					location: campus + ', TN',
					woeid: '',
					unit: 'f',
					success: function(weather) {
						html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
						$("#weather").html(html);
					},
					error: function(error) {}
				});
			}
			
			// -------------------------------------------
			/* ALL PAGES */
			
			// display people finder link for current building
			if (bldg == 'Library') { bldg = 'Thigpen Library'; }
      $("#people-link").attr("href", "/directory/" + bldg);
			
			// floating nav menu
			$('.float-nav').click(function() {
			  $('.main-nav, .menu-btn').toggleClass('active');
			});
			
		});   // end body onload
		
		
		
		// -------------------------------------------
		/* JQUERY FUNCTIONS */
		
		// -------------------------------------------
		// get location values from cookie or querystring
    function getLocation(cookieName,defaultVal) {
      var val;
      if (getParameterByName(cookieName) != '') {
    		// get campus from querystring and store in cookie
    		val = getParameterByName(cookieName);
    		$.cookie(cookieName, val, { path: '/', expires: 30 });
    	
    	} else {
    		// get campus from cookie
    		var cookie = getCookie(cookieName);
    		if (cookie) {
    		    val = $.cookie(cookieName);
    		
    		} else {
    			// use the default value
    			val = defaultVal;
          $.cookie(cookieName, val, { path: '/', expires: 30 }); 
        }
    	}
    	return val;
    }
    
  }
		
 };})(jQuery);