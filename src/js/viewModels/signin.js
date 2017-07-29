define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe', 'ojs/ojrouter', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojcheckboxset'], function(oj, ko, $, app, mbe) {
	function SigninViewModel() {
		var self = this;

		var storage = window.localStorage;

		self.userName = ko.observable(storage.getItem('username'));
		self.password = ko.observable(storage.getItem('password'));

		self.rememberUserName = ko.observable(['remember']);
		self.notification = ko.observable();

		self.signIn = function() {
			//app.appUtilities.startSpinner();
			/*mbe.authenticate(self.userName(), self.password(), function (code, data) {
				mbe.getCurrentUser().then(function(user) {
					if (window.cordova.platformId != 'browser') app.setupNotifications();

					if (self.rememberUserName()[0] == 'remember') {
						storage.setItem('username', self.userName());
						storage.setItem('password', self.password());
					} else {
						storage.removeItem('username');
						storage.removeItem('password');
					}
					app.user = user;
					//app.appUtilities.stopSpinner();
					oj.Router.rootInstance.go('dashboard');
				});
			}, function(error) {
				console.log('error', error);
				//app.appUtilities.stopSpinner();
			});*/
			if (self.rememberUserName()[0] == 'remember') {
				storage.setItem('username', self.userName());
				storage.setItem('password', self.password());
			} else {
				storage.removeItem('username');
				storage.removeItem('password');
			}
			app.user = {
				username : self.userName()
			}
			oj.Router.rootInstance.go('bus');

		};

	}
	return SigninViewModel;
});