// --------------------------------------
/* used for clock on homepage */
function startTime() {
    var today = new Date();
    var a = "AM";
    var h = today.getHours();
    var m = today.getMinutes();
    //var s = today.getSeconds();
    
    // display 12-hour clock rather than 24-hour
    if (h > 12) {
	    h -= 12;
	    a = "PM";
	} else if (h === 0) {
	   h = 12;
	}

    m = checkTime(m);
    //s = checkTime(s);
    
    document.getElementById('clock').innerHTML = h + ":" + m + ' ' + a;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// --------------------------------------
/* parse out the room number from the LDAP value */
function getRoomNum(str) {
	var room = str.replace("100 Building", "");
	room = room.replace("300 Building", "");
	room = room.replace("400 Building", "");
	room = room.match(/\d+/)[0];  // only get the numbers
	return room;
}

// --------------------------------------
// get querystring parameters
function getParameterByName( name ){
  var regexS = "[\\?&]"+name+"=([^&#]*)", 
  regex = new RegExp( regexS ),
  results = regex.exec( window.location.search );
  if( results == null ){
    return "";
  } else{
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}

// --------------------------------------
// get cookie value
function getCookie(c_name) {
    var c_value = document.cookie,
        c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) c_start = c_value.indexOf(c_name + "=");
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

// --------------------------------------
// get map path depending on the selected building
function loadMapFiles(selectedBldg, sign) {
	var defaultMap = 'floor1';
	var mapPath1;
	var mapPath2 = '';
	var mapPath3 = '';
	
	switch (selectedBldg) {
	case 'Caudill':
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/caudill1.svg';
		mapPath2 = '/sites/all/themes/volstate/img/floorMaps/caudill2.svg';
		break;
	
	case 'Gibson':
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/gibson.svg';
		break;
	
	case 'Thigpen Library':
		if (sign == '1a') {
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/thigpen1a.svg';
		} else {
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/thigpen1b.svg';
		}
		break;
	
	case 'Mattox':
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/mattox.svg';
		break;
	
	case 'Pickel':
		if (sign == '1b') {
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/pickel1b.svg';
		} else {
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/pickel1a.svg';
		}
		break;
	
	case 'Ramer':
		if (sign == '1b') {
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/ramer1b.svg';
		} else {
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/ramer1a.svg';
		}
		break;
	
	case 'SRB':
		switch (sign) {
		case '1a':
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/srb1a.svg';
			mapPath2 = '/sites/all/themes/volstate/img/floorMaps/srb2a.svg';
			mapPath3 = '/sites/all/themes/volstate/img/floorMaps/srb3a.svg';
			break;
		case '1b':
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/srb1b.svg';
			mapPath2 = '/sites/all/themes/volstate/img/floorMaps/srb2a.svg';
			mapPath3 = '/sites/all/themes/volstate/img/floorMaps/srb3a.svg';
			break;
		case '2d':
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/srb1d.svg';
			mapPath2 = '/sites/all/themes/volstate/img/floorMaps/srb2d.svg';
			mapPath3 = '/sites/all/themes/volstate/img/floorMaps/srb3a.svg';
			defaultMap = 'floor2';
			break;
		case '2c':
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/srb1c.svg';
			mapPath2 = '/sites/all/themes/volstate/img/floorMaps/srb2c.svg';
			mapPath3 = '/sites/all/themes/volstate/img/floorMaps/srb3c.svg';
			defaultMap = 'floor2';
			break;
		default:
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/srb1a.svg';
			mapPath2 = '/sites/all/themes/volstate/img/floorMaps/srb2a.svg';
			mapPath3 = '/sites/all/themes/volstate/img/floorMaps/srb3a.svg';
		}
		break;
		
  case 'Vet Tech Bldg':
    mapPath1 = '/sites/all/themes/volstate/img/floorMaps/vettech.svg';
		break;
	
	case 'Wallace North':
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/nwallace.svg';
		break;
	
	case 'Wallace South':
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/swallace1.svg';
		mapPath2 = '/sites/all/themes/volstate/img/floorMaps/swallace2.svg';
		break;
	
	case 'Warf':
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/warf.svg';
		break;
	
	case 'Wood':
		if (sign == '2b') {
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/wood1b.svg';
			mapPath2 = '/sites/all/themes/volstate/img/floorMaps/wood2b.svg';
		} else {
			mapPath1 = '/sites/all/themes/volstate/img/floorMaps/wood1a.svg';
			mapPath2 = '/sites/all/themes/volstate/img/floorMaps/wood2a.svg';
		}
		defaultMap = 'floor2';
		break;
	
	case '100 Building':
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/building100.svg';
		break;
	
	case '300 Building':
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/building300.svg';
		break;
	
	case '400 Building':
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/building400.svg';
		break;
	
	case 'Livingston':
		$( ".options-container" ).hide();		// hide buildings menu
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/livingston.svg';
		break;
	
	case 'Cookeville':
		$( ".options-container" ).hide();		// hide buildings menu
		mapPath1 = '/sites/all/themes/volstate/img/floorMaps/cookeville.svg';
		break;
	}
	
	return [ defaultMap, mapPath1, mapPath2, mapPath3 ];
}
