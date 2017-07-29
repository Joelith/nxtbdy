define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', 'ojs/ojmodel'], function(oj, ko, $, app) {
  	    
  function NewsViewModel() {
 		var self = this;
		var model = oj.Model.extend({
			idAttribute: 'id'
		});

		var collectionDef = oj.Collection.extend({
			url: app.server_url() + '/news',
			model: model
		});

		self.collection = new collectionDef();
		self.collectionObservable = ko.observable(self.collection);
		self.dataSource = new oj.CollectionTableDataSource(self.collectionObservable());

  }

  return new NewsViewModel();

});