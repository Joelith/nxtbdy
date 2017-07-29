define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', 'ojs/ojmodel'], function(oj, ko, $, app) {
  	    
  function UsersViewModel() {
 		var self = this;
		var model = oj.Model.extend({
			idAttribute: 'id'
		});

		var collectionDef = oj.Collection.extend({
		//	url: 'http://localhost:3000/users/' + app.get_current_bus(),
			model: model
		});

		self.collection = new collectionDef();
		self.collectionObservable = ko.observable(self.collection);
		self.dataSource = new oj.CollectionTableDataSource(self.collectionObservable());

		self.handleActivated = function (info) {
			var rootViewModel = ko.dataFor(document.getElementById('socialView'));
			self.socket = rootViewModel.socket;
			if (rootViewModel.profile_history.length > 0) {
				self.collection.add(rootViewModel.profile_history);
			}
			self.socket.on('user_join', function(user) {
        console.log('receiving user', user);
        //self.collectionObservable
        self.collection.add(user);
      });
		}
  }

  return new UsersViewModel();

});