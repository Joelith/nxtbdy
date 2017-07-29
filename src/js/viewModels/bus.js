/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your chat ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', 'ojs/ojmodel'], function(oj, ko, $, app) {
  	    
  function BusViewModel() {
		var self = this;
  	var model = oj.Model.extend({
			idAttribute: 'id'
		});

		var collectionDef = oj.Collection.extend({
			url: app.server_url() + '/bus/nearest',
			model: model
		});

		var dummy = ko.observable();

		self.collection = new collectionDef();
 	 	self.collectionObservable = ko.observable(self.collection);
  	self.dataSource = new oj.CollectionTableDataSource(self.collectionObservable());

		var storage = window.localStorage;

		self.set_current_bus = function (id) {
			console.log('setting cur bus to', id);
			app.current_bus = id;
			storage.setItem('current_bus', id);
		}
  	/*self.dataSource.on('sync', function() {
			if (self.collection.models.length == 1) {
				self.set_current_bus(self.collection.models[0].id);
    		history.pushState(null, '', 'index.html?root=chat&bus_id=' + app.current_bus);
    		oj.Router.sync();
    	}
  	})*/
    self.loadChatRoom = function (event, data) {
    	console.log('load chat', data);
    	if (data.option == 'selection' && data.value[0]) {
    		self.set_current_bus(data.value[0]);
	    	history.pushState(null, '', 'index.html?root=social&bus_id=' + data.value[0]);
	    	oj.Router.sync();     
	  	}
    }

	}
	return new BusViewModel();

});