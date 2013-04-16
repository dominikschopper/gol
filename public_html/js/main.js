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
	    89: 'caterer'
	},
	87: {
	    77: 'spaceship'
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
    var GolPlayground = function (where, col, row) {
	
	this.parent = $(where);
	
	this.colNo = col || 180;
	this.rowNo = row || 90;
	
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
	    }
	    console.log('created row %o', r);
	}
    };
    
    return GolPlayground;
}());


