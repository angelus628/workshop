var EmployeeView = function(adapter, template, employee){
	this.initialize = function(){
		this.el = $('<div/>');

		//Add add location
		this.el.on('click', '.add-location-btn', function(event){
			event.preventDefault();
		    navigator.geolocation.getCurrentPosition(
		        function(position) {
		            alert(position.coords.latitude + ',' + position.coords.longitude);
		        },
		        function() {
		            alert('Error al obtenetener la ubicación actual');
		        });
		    return false;
		});

		//Add contacs
		this.el.on('click', '.add-contact-btn', function(event){
			event.preventDefault();
		    console.log('addToContacts');
		    if (!navigator.contacts) {
		        alert("No existe soporte para el API de contactos", "Error");
		        return;
		    }
		    var contact = navigator.contacts.create();
		    contact.name = {givenName: employee.firstName, familyName: employee.lastName};
		    var phoneNumbers = [];
		    phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
		    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true);
		    contact.phoneNumbers = phoneNumbers;
		    contact.save();
		    return false;
		});
	};

	this.initialize();

	this.render = function(){
		this.el.html(template(employee));
		return this;
	};
}