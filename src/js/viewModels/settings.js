define(['ojs/ojcore', 'knockout', 'jquery', 'jfeed', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', 'ojs/ojmodel', 'ojs/ojswitch'], function(oj, ko, $, jfeed) {
  	    
  function SettingsViewModel() {
 		var self = this;
		self.isChecked = ko.observable();
  }

  return new SettingsViewModel();

});