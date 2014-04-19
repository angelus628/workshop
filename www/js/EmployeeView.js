var EmployeeView = function(adapter, template, employee){
	this.initialize = function(){
		this.el = $('<div/>');
		this.el.on('click', '.change-pic-btn', this.changePicture);

		//Add add location
		this.el.on('click', '.add-location-btn', this.addLocation);

		//Add contacs
		this.el.on('click', '.add-contact-btn', this.addToContacts);
	};

	this.render = function(){
		this.el.html(template(employee));
		return this;
	};

	this.addToContacts = function(){
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
	}

	this.addLocation = function(){
		event.preventDefault();
	    navigator.geolocation.getCurrentPosition(
	        function(position) {
	            alert(position.coords.latitude + ',' + position.coords.longitude);
	        },
	        function() {
	            alert('Error al obtenetener la ubicación actual');
	        });
	    return false;
	};

	this.changePicture = function(){
		event.preventDefault();
		if(!navigator.camera){
			alert('No existe soporte para el API de la cámara');
		}
		var options = {
			quality : 50,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : 1,
			encodingType : 0
		}

		navigator.camera.getPicture(
			function(imageData){
				$('.employee-iamge', this.el).attr('src', 'data:image/jpeg;base64,' + imageData);
			},
			function(){
				alert('Error tomando la foto', 'Error');
			},
			options
		);
		return false;
	};

	this.initialize();
}