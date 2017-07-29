define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', 'ojs/ojmodel', 'ojs/ojswitch'], function(oj, ko, $, app) {
  	    
  function SettingsViewModel() {
 		var self = this;
		self.isChecked = ko.observable();

		self.logout = function () {
			var storage = window.localStorage;

			storage.removeItem('username');
			storage.removeItem('password');
			app.user = null;

console.log('go?');
	    	window.location.reload(true);
		}
  }

  return new SettingsViewModel();

});