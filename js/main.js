/**
 * ...
 */

"use strict";

var golConf = {
	field: {
		rows: 60,
		cols: 90
	},
	presets : {
		// row
		4 : {
			// col
			7 : 'spaceship'
		},
		23 : {
			// col
			45 : 'spaceship'
		},
		13 : {
			23 : 'spaceship2'
		},
		7 : {
			19 : 'spaceship2'
		},
		6 : {
			33 : 'blinker2'
		},
		34 : {
			22 : 'caterer'
		},
		59 : {
			58 : 'caterer'
		},
		58 : {
			12 : 'spaceship'
		}
	},
	figures : {
		spaceship : {
			states : [
				[1, 1, 1],
				[1, 0, 0],
				[0, 1, 0]
			]
		},
		blinker1 : {// blinker
			states : [ [1, 1, 1] ]
		},
		blinker2 : {// blinker
			states : [
				[1],
				[1],
				[1]
			]
		},
		spaceship2 : {
			states : [
				[0, 1, 0, 0, 1],
				[1, 0, 0, 0, 0],
				[1, 0, 0, 0, 1],
				[1, 1, 1, 1, 0]
			]
		},
		caterer : {// caterer
			states : [
				[0, 0, 1, 0, 0, 0, 0, 0],
				[1, 0, 0, 0, 1, 1, 1, 1],
				[1, 0, 0, 0, 1, 1, 0, 0],
				[1, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0, 0],
				[0, 1, 1, 0, 0, 0, 0, 0]
			]
		}
	}
};





/**
 *
 * @type GolCell
 * @property {Boolean} state
 * @property {Array} neighbours
 */
var GolCell = (function() {
	var GolCell = function() {

	this.element = null;

	this.state = false;
	this.nextState = false;

	this.neighbours = [];
	//console.log('creating cell');
	return this;
	};

	GolCell.prototype.setElement = function(el) {

	this.element = el;
	var me = this;

	this.element.click(function (ev) {

		ev.stopPropagation();
		console.log('before', me.getState(), me.element);

		if (me.getState()) {
		me.setState(false);
		}  else {
		me.setState(true);
		}

		console.log('after ', me.getState(), me.element);
	});
	return this;
	};

	/**
	 *
	 * @param {Boolean} state
	 * @returns {GolCell}
	 */
	GolCell.prototype.setNextState = function(state) {
	this.nextState = (state ? true : false);
	return this;
	};

	GolCell.prototype.setState = function(state) {

	this.state = (state ? true : false);

	if (this.getState()) {
		this.element.addClass('active');
	}  else {
		this.element.removeClass('active');
	}

	return this;
	};

	GolCell.prototype.activateState = function() {
	this.setState(this.nextState);
	this.nextState = false;
	return this;
	};

	/**
	 *
	 * @returns {Boolean}
	 */
	GolCell.prototype.getState = function() {
	return this.state;
	};

	/**
	 *
	 * @param {type} n
	 * @returns {GolCell}
	 */
	GolCell.prototype.addNeighbour = function(n) {
	this.neighbours.push(n);
	return this;
	};

	/**
	 *
	 * @param {type} n
	 * @returns {GolCell}
	 */
	GolCell.prototype.removeNeighbour = function(n) {

		let neighbours = [];
		let i = 0;

		for (i in this.neighbours) {
			if (this.neighbours.hasOwnProperty(i) && this.neighbours[i] !== n) {
			neighbours.push(n);
			}
		}

		this.neighbours = neighbours;

		return this;
	};

	/**
	 * emtpies neighbours array
	 * @returns {GolCell}
	 */
	GolCell.prototype.removeAllNeighbours = function () {
		this.neighbours = [ ];
		return this;
	};

	/**
	 *
	 * @returns {Number}
	 */
	GolCell.prototype.getActiveNeighbourCount = function() {

	let count = 0;

	for (let i in this.neighbours) {
		if (this.neighbours.hasOwnProperty(i) && this.neighbours[i].getState()) {
		count += 1;
		}
	}

	return count;
	};

	// returning the GolCell
	return GolCell;
}());



/**
 *
 * @type FwCell
 * @property {Boolean} state
 * @property {Array} neighbours
 */
var FwCell = (function() {

	var FwCell = function() {

		this.state = null;
		this.el = null;
		this.neighbours = [];

		return this;
	};

	FwCell.prototype.setElement = function (el) {
		// element is given and ...
		if (el) {
			// ... element is not jquery wrapped
			if (!el.jquery) {
				el = jQuery(el);
			}
			this.el = el;
			// reset the state to neutral
			this.state = null;
		}
		return this;
	};

	/**
	 *
	 * @param {Boolean} state
	 * @returns {FwCell}
	 */
	FwCell.prototype.setState = function(state) {
		// setting internal state
		this.state = (state ? true : false);
		this.el.data('state', this.state);
		if (this.state) {
			this.el.addClass('active');
		} else {
			this.el.removeClass('active');
		}
		return this;
	};

	/**
	 *
	 * @returns {Boolean}
	 */
	FwCell.prototype.getState = function() {
		if (this.state === null) {
			this.state = this.el.data('state');
		}
		return this.state;
	};


	// returning the FwCell
	return FwCell;
}());


/**
 *
 * @type GolPlayground
 */
var GolPlayground = (function() {
	/**
	 * @constructor
	 * @param {Object} where
	 * @param {Object} col
	 * @param {Object} row
	 * @returns GolPlayground
	 */
	var GolPlayground = function(where, col, row) {

	this.parent = $(where);

	this.colNo = col || 90;
	this.rowNo = row || 50;

	this.matrix = [];
	};

	GolPlayground.prototype.draw = function() {
		var r = 0,
			c = 0,
			cell = null,
			cellEl = null,
			lastRow = 0,
			nextRow = 0,
			lastCol = 0,
			nextCol = 0;

		for (r = 0; r < this.rowNo; r += 1) {
			this.matrix[r] = [];
			for (c = 0; c < this.colNo; c += 1) {
			cell = new GolCell();
			cellEl = $('<div class="gol-cell">');
			cell.setElement(cellEl);
			this.matrix[r][c] = cell;
			this.parent.append(cellEl);
			}
		}

		for (r = 0; r < this.rowNo; r += 1) {
			lastRow = (r - 1 < 0 ? this.rowNo - 1 : r - 1);
			nextRow = (r + 1 >= this.rowNo ? 0 : r + 1);
			for (c = 0; c < this.colNo; c += 1) {
			lastCol = (c - 1 < 0 ? this.colNo - 1 : c - 1);
			nextCol = (c + 1 >= this.colNo ? 0 : c + 1);
			this.matrix[r][c].addNeighbour(this.matrix[lastRow][lastCol]);
			this.matrix[r][c].addNeighbour(this.matrix[lastRow][c]);
			this.matrix[r][c].addNeighbour(this.matrix[lastRow][nextCol]);
			this.matrix[r][c].addNeighbour(this.matrix[r][lastCol]);
			this.matrix[r][c].addNeighbour(this.matrix[r][nextCol]);
			this.matrix[r][c].addNeighbour(this.matrix[nextRow][lastCol]);
			this.matrix[r][c].addNeighbour(this.matrix[nextRow][c]);
			this.matrix[r][c].addNeighbour(this.matrix[nextRow][nextCol]);
			}
		}
		var stepButton = $('<input type="submit" value="next step" />&nbsp;&nbsp;');
		var playButton = $('<input type="submit" value="play" />');
		var stopButton = $('<input type="submit" value="stop" />');

		this.parent.css({
			width: ((cellEl.outerWidth() + 2) * this.colNo),
			height: ((2 + cellEl.outerHeight()) * this.rowNo),
			padding: 0
		});

		var me1 = this;
		var timeout = [];

		stepButton.click(function () {
			me1.step();
		});

		playButton.click(function () {
			if (timeout.length > 0) {
				return;
			}
			timeout.push( window.setInterval(function () { me1.step(); }, 450) );
		});

		stopButton.click(function () {
			clearInterval(timeout.pop());
		});

		this.parent.parent().append(stepButton);
		this.parent.parent().append(stopButton);
		this.parent.parent().append(playButton);

		return this;
	};

	GolPlayground.prototype.preset = function(conf) {

	var rowStart = 0,
		r = 0,
		row = 0,
		colStart = 0,
		c = 0,
		col = 0,
		figure = '',
		status = false,
		field = [];

	//console.log('matrix: %o // preset config %o', this.matrix, conf);

	for (rowStart in conf.presets) { if (conf.presets.hasOwnProperty(rowStart)) { // checking if the row exist and the js default check!

		rowStart = parseInt(rowStart, 10);

		for (colStart in conf.presets[rowStart]) { if (conf.presets[rowStart].hasOwnProperty(colStart)) {

		colStart = parseInt(colStart,10);

		figure = conf.presets[rowStart][colStart];
		field = conf.figures[figure].states;
		//console.log('colStart: %o - rowStart: %o - figure: %o', colStart, rowStart, figure);

		for (r in field) { if (field.hasOwnProperty(r)) {
			r = parseInt(r, 10);
			row = rowStart + r;
			for (c in field[r]) { if (field[r].hasOwnProperty(c)) {
			c = parseInt(c, 10);
			col = colStart + c;
			status = field[r][c];
			if (this.matrix.length > row && this.matrix[row].length > col ) {
				this.matrix[row][col] && this.matrix[row][col].setState(status);
				//console.log('setting row: %o / col %o  => obj(%o) to status: %o', row, col, this.matrix[row][col], status);
			}
			} }
		} }
		} }
	} }

	return this;
	};

	GolPlayground.prototype.step = function() {
	var s1 = Date.now();
	var cell = {},
		actives = 0,
		r = 0,
		c = 0;

	for (r = 0; r < this.rowNo; r += 1) {
		for (c = 0; c < this.colNo; c += 1) {
		cell = this.matrix[r][c];
		actives = cell.getActiveNeighbourCount();
		if (cell.getState()) {
			if (actives === 2 || actives === 3) {
			cell.setNextState(true);
			}
		} else {
			if (actives === 3) {
			cell.setNextState(true);
			}
		}
		}
	}

	for (r = 0; r < this.rowNo; r += 1) {
		for (c = 0; c < this.colNo; c += 1) {
		cell = this.matrix[r][c];
		cell.activateState();
		}
	}
	console.log('_end_ step %o ms', Date.now() - s1);
	return this;
	};

	return GolPlayground;

}());


var FwPlayground = (function () {
	var FwPlayground = function (where, col, row) {
		this.parent = $(where);

		this.colNo = col || 90;
		this.rowNo = row || 50;

		this.fwCell = new FwCell();

		this.matrix = [];
		this.matrix2 = [];
		this.matrix_ = [];

		this.activeCol = 0;
		this.activeRow = 0;

		return this;
	};

	FwPlayground.prototype.draw = function() {
		var r = 0,
			c = 0,
			cellEl = null;
 		var me = this;
		for (r = 0; r < this.rowNo; r += 1) {
			this.matrix[r] = [];
			for (c = 0; c < this.colNo; c += 1) {
				cellEl = $('<div data-col="'+ c +'" data-row="'+ r +'" data-state="false" data-nextstate="false" id="cell-'+ r +'-'+ c +'" class="gol-cell col-'+ c +' row-'+ r +'">');

			cellEl.click(function (ev) {

				ev.stopPropagation();
				var el = jQuery(this);
				me.fwCell.setElement(el);
				if (me.fwCell.getState()) {
					me.fwCell.setState(false);
				}  else {
					me.fwCell.setState(true);
					me.matrix[ el.data('row') ][ el.data('col') ] = true;
				}

			});

				this.matrix[r][c]  = false;

				this.parent.append(cellEl);
			}
		}

		this.matrix_ = this.matrix.slice();
		this.matrix2 = this.matrix.slice();

		var stepButton = $('<input type="submit" value="fw step" />&nbsp;&nbsp;');
		var playButton = $('<input type="submit" value="fw play" />');
		var stopButton = $('<input type="submit" value="fw stop" />');

		this.parent.css({
			width: ((cellEl.outerWidth() + 2) * this.colNo),
			height: ((2 + cellEl.outerHeight()) * this.rowNo),
			padding: 0
		});

		var me = this;
		var timeout = [];

		stepButton.click(function () {
			me.step();
		});

		playButton.click(function () {
			if (timeout.length > 0) {
				return;
			}
			timeout.push( window.setInterval(function () { me.step(); }, 450) );
		});

		stopButton.click(function () {
			clearInterval(timeout.pop());
		});

		this.parent.parent().append(stepButton);
		this.parent.parent().append(stopButton);
		this.parent.parent().append(playButton);

		return this;
	};

	FwPlayground.prototype.preset = function () {
		return true;
	};

	FwPlayground.prototype.getId = function () {
		return '#cell-'+ this.activeRow +'-'+ this.activeCol;
	};

	FwPlayground.prototype.next = function () {
		var col = this.activeCol,
			row = this.activeRow;

		++this.activeCol;

		if (this.activeCol >= this.colNo) {
			this.activeCol = 0;
			++this.activeRow;
		}

		if (this.activeRow >= this.rowNo) {
			this.activeCol = 0;
			this.activeRow = 0;
			return false;
		}

		return { row: row, col: col };
	};

	FwPlayground.prototype.getActiveNeighbours = function (row, col) {
		var count = 0,
			r = 0,
			c = 0,
			rowMinus = row - 1 < 0           ? this.rowNo - 1 : row - 1,
			rowPlus  = row + 1 >= this.rowNo ? 0              : row + 1,
			colMinus = col - 1 < 0           ? this.colNo - 1 : col - 1,
			colPlus  = col + 1 >= this.colNo ? 0              : col + 1,
			rows = [ rowMinus, row, rowPlus ],
			cols = [ colMinus, col, colPlus ];

		console.log('rows %o ::: cols %o', rows, cols);

		for (r in rows) {
			for (c in cols) {
				if (c === col && r === row) {
					continue;
				}
				if (this.matrix[r][c] == true) {
					count += 1;
				}
			}
		}

		console.log('getActives for row: %o, col: %o -> %o', row, col, count);
		return count;
	};

	FwPlayground.prototype.step = function () {
		console.log('step');
		var max = this.rowNo * this.colNo,
			actives = 0,
			rc = {};

		rc = this.next();
		while (rc !== false) {
			//console.log('col/row', rc)
			this.fwCell.setElement($(this.getId()));
			actives = this.getActiveNeighbours(rc.row, rc.col);
			console.log('row: %o, col: %o, active: %o', rc.row, rc.col, actives);
			if (actives === 3) {
				this.fwCell.setState(true);
				this.matrix2[rc.row][rc.col] = true;
			} else if (this.fwCell.getState() === true && actives === 2) {
				this.fwCell.setState(true);
				this.matrix2[rc.row][rc.col] = true;
			} else {
				this.fwCell.setState(false);
				this.matrix2[rc.row][rc.col] = false;
			}
			rc = this.next();
		}

		this.matrix = this.matrix2;
		this.matrix2 = this.matrix_.slice();


	};

	return FwPlayground;
}());