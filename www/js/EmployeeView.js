var EmployeeView = function(adapter, template, employee){
	this.initialize = function(){
		this.el = $('<div/>');
	};

	this.initialize();

	this.render = function(){
		this.el.html(template(employee));
		return this;
	}
}