var img_ids = [
	       "production", 
	       "dev", 
	       "military",
	       "bluebrown", 
	       "5vp", 
	       "6dev", 
	       "6powers", 
	       "discard", 
	       "4types", 
	       "alien"
	       ];
var imgs = [];

var homeworld_colors = {'Alpha Centauri': '#663300',
			'Epsilon Eridani': '#0099FF',
			'Old Earth': '#000099',
			'Ancient Race': '#66FF00',
			'Damaged Alien Factory': '#FFFF00',
			"Earth's Lost Colony": '#00CCFF',
			'New Sparta': '#FF0000',
			'Separatist Colony': '#555555',
			'Doomed world': '#000000'};
 
function LoadImages() {
    for (var i = 0; i < img_ids.length; ++i) {
	var new_img = Image();
	new_img.src = 'images/' + img_ids[i] + '.png';
	imgs.push(new_img);
    }
}


function RenderHomeworldGoalData(canvas_id, data) {
    LoadImages();
    var desc = "Influence of goal on winning rate of homeworld.<br>" +
	"The baseline winning rate of each homeworld is the fat dot. " +
	"The winning rate with the goal is the end of the segment without" +
	"the dot.  Hence, you can tell the absolute rate of winning by the " +
	"end of the line, and the relative change by the magnitude of the line.";

    window.onload = function() {
	document.getElementById('homeworld_goal_canvas_desc').innerHTML = desc;
									 
	var canvas = document.getElementById(canvas_id);
	var context = canvas.getContext('2d');
	
	var base_y = 80;
	var mul = 300;
	context.font = "12 px sans-serif";
	var w = imgs[0].width;

	context.fillStyle = '#000';
	for (var i = 0; i < imgs.length; ++i) {
	    var top_loc = canvas.height - imgs[i].height;
	    context.drawImage(imgs[i], i * w, top_loc);
	} 


	var MAX_RATE = 1.3;
	var MIN_RATE = .7;
	var LEFTOVERS = canvas.height - imgs[0].height;

	function y_coord(r) {
	    return (MAX_RATE - r) / (MAX_RATE - MIN_RATE) * LEFTOVERS;
	}

	context.fillStyle = 'black';
	for (var i = MIN_RATE; i <= MAX_RATE; i += .1) {
	    context.fillText(("" + (i + .001)).substring(0, 3), 
			     canvas.width - 250, y_coord(i));
	}

	for (var i = 0; i < data.length; ++i) {
	    var hw = data[i].homeworld;
	    var hw_col = homeworld_colors[hw];
	    context.fillStyle = hw_col;
	    context.fillText(hw, canvas.width - 200, (i + 1) * 20 + 150);

	    var space_per_line = (imgs[0].width / imgs.length);
	    var cur_x = i * space_per_line * .8 + space_per_line * .1;
	    for (var j = 0; j < data[i].adjusted_rate.length; ++j) {
		var rate = data[i].adjusted_rate[j];
		var pos = y_coord(rate);
		var base = y_coord(data[i].win_rate);
		context.fillRect(cur_x, pos, 2, base - pos);
		context.fillRect(cur_x - 2, base, 5, 5);
		cur_x += w;
	    }

	}

    }
}

/*
window.onload = function() {
    hide_images();
    var elem = document.getElementById('myCanvas');

    if (elem && elem.getContext) {
	var context = elem.getContext('2d');

	if (context) {
	    RenderHomeworldData(context, data);
	}
    }
}
*/