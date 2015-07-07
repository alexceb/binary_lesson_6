var StudentModel = function( data ) {
	this.name = data.name;
	this.age = data.age;
	this.years = data.years;
	this.examsTaken = data.examsTaken;
	this.takeExam = data.takeExam;
	this.changed = false;
};

var StudentController = function( initObj ) {
	this.model = initObj.model || {};
	this.render = initObj.render || function() {};
	this.updateExams = initObj.updateExams;
	this.clickHandlers = initObj.clickHandlers;
	this.view = document.getElementById( initObj.elementId );
};

StudentController.prototype = {

	addClicksListeners : function(handlers) {
		var that = this,
			handler,
			element;

		if (handlers) {
			for (var listener in handlers) {

				element = document.querySelector(listener);
				handler = that[handlers[listener]];

				element.addEventListener('click', function() {
					handler.apply(that);
				});
			}
		}
	},

	showView : function() {

		this.view.innerHTML = this.render();
		this.addClicksListeners(this.clickHandlers);

	},

	refreshView : function() {

		var that = this;
		if ( that.model.changed ) {
			that.showView();
			that.model.changed = false;
		}
		
	},

	observeChanges : function() {

		var that = this;
		setTimeout( function execute() {
			that.refreshView();
			setTimeout( execute, 100 );
		}, 100 );
	}
}

var student = new StudentModel({
    name: 'Piotr',
   	age: 22,
   	year: 5,
   	examsTaken: 2,
   	takeExam: function(){
    	this.examsTaken++;
    	this.changed = true;
	}
});
	
var controller = new StudentController({
	model: student,
	elementId: 'student-container',
	render: function() {
        return 	  '<span>' 
        			+ this.model.name + ' has already taken ' + this.model.examsTaken + ' exams ' 
        		+ '</span>' 
        		+ '<button id="student-exams-button">Increase exams taken</button>';
    },
    clickHandlers: {
        '#student-exams-button': 'updateExams'
    },
    updateExams: function(){
		this.model.takeExam();
    }
});

controller.showView();
controller.observeChanges();