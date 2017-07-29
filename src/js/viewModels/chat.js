/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your chat ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'socket.io', 'appController', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', 'ojs/ojmodel', 'ojs/ojinputtext', 'ojs/ojbutton'], function(oj, ko, $, io, app) {
  	    
  function ChatViewModel() {
  	var self = this;

  	var model = oj.Model.extend({
			idAttribute: 'id'
		});

		var collectionDef = oj.Collection.extend({
			model: model
		});

		self.collection = new collectionDef();
 	 	self.collectionObservable = ko.observable(self.collection);
  	self.dataSource = new oj.CollectionTableDataSource(self.collectionObservable());

  	self.msg = ko.observable();

  	self.msgSubmit = function (event, ui) {
  		if (ui.option == 'value' && ui.value != '') {
  			self.buttonClick();
  		}
  	}

  	self.scrollToBottom = function () {
  		console.log('scrolling');
  		if ($('#listview')[0]) {
  			$('#listview').animate({
        scrollTop: $('#chat_panel')[0].scrollHeight}, 2000);
      }
		}

    self.buttonClick = function (data, event) {
    	console.log('button click?', self.msg());
    	self.socket.emit('message', {
    		message: self.msg(),
    		from_name: app.user.username,
    		from_id: app.user.username
    	});
    	self.msg('');
    }

		self.handleActivated = function (info) {
			//console.log('dashboard activated');
			var rootViewModel = ko.dataFor(document.getElementById('socialView'));
			console.log('root', rootViewModel);
			self.socket = rootViewModel.socket;
			if (rootViewModel.history.length > 0) {
				self.collection.add(rootViewModel.history);
				self.scrollToBottom();
			}
			self.socket.on('message', function(msg) {
        console.log('receiving message', msg);
        //self.collectionObservable
        self.collection.add(msg);
        self.scrollToBottom()
      });
		}
	}
	return ChatViewModel;

});