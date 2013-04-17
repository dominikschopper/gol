/**
 * ...
 */
var golConf = {
    presets: {
	// row
	4: {
	    // col
	    7: 'spaceship'
	},
	13: {
	    23: 'spaceship2'
	},
	6: {
	    33: 'blinker2'
	},
	57: {
	    58: 'caterer'
	},
	67: {
	    47: 'spaceship'
	}
    },
    figures: {
	spaceship: {
	    states: [
		[ 1, 1, 1 ],
		[ 1, 0, 0 ],
		[ 0, 1, 0 ]
	    ]
	},
	blinker1: {   // blinker
	    states: [
		[ 1, 1, 1 ]
	    ]
	},
	blinker2: {   // blinker
	    states: [
		[ 1 ],
		[ 1 ],
		[ 1 ]
	    ]
	},
	spaceship2: {
	    states: [
		[ 0, 1, 0, 0, 1 ],
		[ 1, 0, 0, 0, 0 ],
		[ 1, 0, 0, 0, 1 ],
		[ 1, 1, 1, 1, 0 ]
	    ]
	},
	caterer: {   // caterer
	    states: [
		[ 0, 0, 1, 0, 0, 0, 0, 0 ],
		[ 1, 0, 0, 0, 1, 1, 1, 1 ],
		[ 1, 0, 0, 0, 1, 1, 0, 0 ],
		[ 1, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 1, 0, 0, 0, 0 ],
		[ 0, 1, 1, 0, 0, 0, 0, 0 ]
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
var GolCell = (function () {
    var GolCell = function () {

	this.element = null;

	this.state = false;
	this.nextState = false;

	this.neighbours = [ ];
	//console.log('creating cell');
	return this;
    };

    GolCell.prototype.setElement = function (e) {
	this.element = e;
	return this;
    };

    /**
     *
     * @param {Boolean} state
     * @returns {GolCell}
     */
    GolCell.prototype.setNextState = function (state) {
	this.nextState = (state ? true : false);
	return this;
    };

    GolCell.prototype.setState = function (state) {
		this.state = (state ? true : false);
		return this;
    };

    GolCell.prototype.activateState = function () {
	this.state = this.nextState;
	this.nextState = false;
	return this;
    };

    /**
     *
     * @returns {Boolean}
     */
    GolCell.prototype.getState = function () {
	return this.state;
    };

    /**
     *
     * @param {type} n
     * @returns {GolCell}
     */
    GolCell.prototype.addNeighbour = function (n) {
	this.neighbours.push(n);
	return this;
    };

    /**
     *
     * @param {type} n
     * @returns {GolCell}
     */
    GolCell.prototype.removeNeighbour = function (n) {

	var neighbours = [ ],
	    i = 0;

	for (i in this.neighbours) {
	    if (this.neighbours.hasOwnProperty(i) && this.neighbours[i] !== n) {
		neighbours.push(n);
	    }
	}

	this.neighbours = neighbours;

	return this;
    };

    /**
     *
     * @returns {Number}
     */
    GolCell.prototype.getActiveNeighbourCount = function () {

	var count = 0;

	for (i in this.neighbours) {
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
var FwCell = (function () {
    var FwCell = function () {

	this.state = false;
	this.neighbours = [ ];

	return this;
    };

    /**
     *
     * @param {Boolean} state
     * @returns {FwCell}
     */
    FwCell.prototype.setState = function (state) {
	this.state = (state ? true : false);
	return this;
    };

    /**
     *
     * @returns {Boolean}
     */
    FwCell.prototype.getState = function () {
	return this.state;
    };

    /**
     *
     * @param {type} n
     * @returns {FwCell}
     */
    FwCell.prototype.addNeighbour = function (n) {
	this.neighbours.push(n);
	return this;
    };

    /**
     *
     * @param {type} n
     * @returns {FwCell}
     */
    FwCell.prototype.removeNeighbour = function (n) {

	var neighbours = [ ],
	    i = 0;

	for (i in this.neighbours) {
	    if (this.neighbours.hasOwnProperty(i) && this.neighbours[i] !== n) {
		neighbours.push(n);
	    }
	}

	this.neighbours = neighbours;

	return this;
    };

    /**
     *
     * @returns {Number}
     */
    FwCell.prototype.getActiveNeighbourCount = function () {

	var count = 0;

	for (i in this.neighbours) {
	    if (this.neighbours.hasOwnProperty(i) && this.neighbours[i].getState()) {
		count += 1;
	    }
	}

	return count;
    };

    // returning the FwCell
    return FwCell;
}());


/**
 *
 * @type GolPlayground
 */
var GolPlayground = (function () {
	/**
	 * @constructor
	 * @param {Object} where
	 * @param {Object} col
	 * @param {Object} row
	 * @returns GolPlayground
	 */
    var GolPlayground = function (where, col, row) {

		this.parent = $(where);

		this.colNo = col || 90;
		this.rowNo = row || 50;

		this.matrix = [ ];
    };

    GolPlayground.prototype.draw = function () {
		var r = 0,
		    c = 0,
		    cell = null,
		    cellEl = null;

		for (r=0; r<this.rowNo; r+=1) {

		    this.matrix[r] = [  ];
		    for (c=0; c<this.colNo; c+=1) {

				cell = new GolCell();
				cellEl = $('<div class="gol-cell">');
				cell.setElement( cellEl );
				this.matrix[r][c] = cell;
				this.parent.append(cellEl);

				/* c % 10 === 0 ? console.log('created col %o', c) : null; */
		    }
//		    this.parent.append($('<div style="clear:left;height:0;width:0">'));
		    // console.log('created row %o', r);

		}

		this.parent.css({ width: ((cellEl.outerWidth()+2)*this.colNo), height: ((2+cellEl.outerHeight())*this.rowNo), padding: 0 });

//		this.parent.append($('<div style="clear:left;height:0;width:0">'));
		//this.parent.append($('<br clear="all" />'));
		return this;
    };

    GolPlayground.prototype.preset = function (conf) {

    	var rowStart = 0,
    		r = 0,
    		row = 0,
    		colStart =0,
    		c = 0,
    		col = 0,
    		figure = '',
    		status = false,
    		field = [ ];

		console.log('PRESET!', conf);

		for (rowStart in conf.presets) {
			if (conf.presets.hasOwnProperty(rowStart)) { // checking if the row exist and the js default check!
				console.log('row', rowStart);
				for (colStart in conf.presets[rowStart]) {
					if (conf.presets[rowStart].hasOwnProperty(colStart)) {
						console.log('col', colStart);
						figure = conf.presets[rowStart][colStart];
						field = conf.figures[figure].states
						for (r in field) {
							if (field.hasOwnProperty(r)) {
								row = rowStart + r;
								for (c in field[r]) {
									col = colStart + c;
									status = field[r][c];
									if (this.matrix.hasOwnProperty(row) && this.matrix[row].hasOwnProperty(col)) {
										console.log('setting row: %o / col %o to status: %o', row, col, status);
										this.matrix[row][col].setState(status);
									}
								}
							}
						}
					}
				}
			}
		}

		return this;
    };

    return GolPlayground;

}());
