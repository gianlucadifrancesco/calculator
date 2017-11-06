var op = null;
var first = null;
var second = null;
var temp = null;
var button = null;
var lastPressed = "number";

function reset() {
  var display = document.getElementById("display");
  display.innerHTML = 0;
  var cells = document.getElementsByTagName("td");
  for (var i = 0; i<cells.length; i++) {
    cells[i].classList.remove('currOp');
  }
  display.style.fontSize = "41px";
  op = null;
  first = null;
  second = null;
  temp = null;
  button = null;
  lastPressed = "number";
}

function numbers(curr) {
  var cells = document.getElementsByTagName("td");
  if (cells[cells.length-1].classList.contains('currOp')) reset();
  var display = document.getElementById("display");
  if (lastPressed == "number") {
    if( (display.innerHTML == "0" || display.innerHTML == "-0") && curr.innerHTML != '.') {
      display.innerHTML = display.innerHTML.replace('0', curr.innerHTML);
		} else if(display.innerHTML.replace('-', '').length < 9) {
			display.innerHTML = display.innerHTML + curr.innerHTML;
		}
	} else {
    first = display.innerHTML;
		display.innerHTML = curr.innerHTML;
	}
	lastPressed = "number";
}

function opfunc(curr) {
  if (curr == button) return;
  if (button != null && button.innerHTML == '=') {
		first = null;
		second = null;
  }
  button = curr;

  var cells = document.getElementsByTagName("td");
  for (var i = 0; i<cells.length; i++) {
    cells[i].classList.remove('currOp');
  }
  curr.classList.add('currOp');

  if(lastPressed == "number" && op != null) {
    second = display.innerHTML;
    display.innerHTML = eval('('+first+')'+op+'('+second+')');
    first = curr.innerHTML;
    second = null;
  }

  if (curr.innerHTML == '\u00f7') {
    op = '/';
  } else if (curr.innerHTML == 'x') {
    op = '*';
  } else {
    op = curr.innerHTML;
  }

  first = curr.innerHTML;
  lastPressed = "op";
}

function dot(curr) {
	var display = document.getElementById("display");
	if ( !( display.innerHTML.indexOf('.') > - 1 ) ) {
		if( (display.innerHTML == "0" || display.innerHTML == "-0") && curr.innerHTML != '.') {
			display.innerHTML = display.innerHTML.replace('0', curr.innerHTML);
		} else if(display.innerHTML.replace('-', '').length < 9) {
			display.innerHTML = display.innerHTML + curr.innerHTML;
		}
	}
}

function moreless() {
	var display = document.getElementById("display");
	if(display.innerHTML.charAt(0) == '-') {
		display.innerHTML = display.innerHTML.substring(1, display.length);
	} else {
		display.innerHTML = "-"+display.innerHTML;
	}
}

function perc() {
	var display = document.getElementById("display");
	if (first != null) {
		display.innerHTML = first/100 * display.innerHTML;
	} else {
		display.innerHTML = display.innerHTML / 100;
	}
}

function eq(curr) {
	var cells = document.getElementsByTagName("td");
	for (var i = 0; i<cells.length; i++) {
		cells[i].classList.remove('currOp');
	}
	curr.classList.add('currOp');
	button = curr;
	var display = document.getElementById("display");

	if (first != null && lastPressed == "number") {
		second = display.innerHTML;
	} else if(lastPressed == "op") {
    first = display.innerHTML;
    second = display.innerHTML;
  } else if(lastPressed == "eq") {
		first = display.innerHTML;
    display.innerHTML = eval('('+first+')'+op+'('+second+')');
	} else {
		curr.classList.remove('currOp');
    return;
	}

  display.innerHTML = eval('('+first+')'+op+'('+second+')');
	lastPressed = "eq";
}
