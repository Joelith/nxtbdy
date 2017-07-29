define(['ojs/ojcore', 'knockout', 'jquery', 'socket.io', 'appController', 'ojs/ojtabs'], function(oj, ko, $, io, app) {
  	    
  function SocialViewModel() {
 		var self = this;

 		self.socket;
    self.serverurl = app.server_url();
    self.history = [];
    self.profile_history = [];

    self.bus = ko.observable();
		self.loadRoom = function (room_id) {
      self.bus({
        name : room_id
      });
			//console.log('loading room', room_id, self.serverurl);
			self.history = [];
      if (!self.socket) {
        self.socket = io.connect(self.serverurl);
        /*self.socket.on('connect', function () {
          console.log('registering for room');
          self.socket.emit('room', room_id, app.user);
        });*/
      } else {
        //self.socket.emit('room', room_id, app.user);
      }

      self.socket.on('message', function(msg) {
       	if (self.history.length == 0) {
       		self.history = msg;
       	}
      });
      self.socket.on('user_join', function (user) {
      	if (self.profile_history.length == 0) {
      		self.profile_history = user;
      	}
      	console.log('user join', user, self.profile_history);

      });

      self.socket.emit('room', room_id, app.user);
  		return true;
  	}

		self.handleActivated = function (info) {
	  	 	var parentRouter = info.valueAccessor().params.ojRouter.parentRouter;
	      // Retrieve the childRouter instance created in main.js
	      self.detailRouter = parentRouter.currentState().value;
	      self.detailRouter.configure(function (stateId) {
	        if (stateId) {
	          var data = stateId.toString();
	          state = new oj.RouterState(data, {
	            value: data,
	            // For each state, before entering the state,
	            // make sure the data for it is loaded.
	            canEnter: function () {
	            	console.log('can enter?');
	              // The state transition will be on hold
	              // until loadData is resolved.
	              return self.loadRoom(data);
	            }
	          });
	          return state;
	        }

	      });
	      return oj.Router.sync();
	    }	
  }

  return new SocialViewModel();

});