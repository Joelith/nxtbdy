define(['ojs/ojcore', 'knockout', 'socket.io', 'ojs/ojrouter', 'ojs/ojknockout'], function(oj, ko, io) {
	function ControllerViewModel() {
		var self = this;
    // Media queries for repsonsive layouts
    var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
    self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
    self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

    // Router setup
    self.router = oj.Router.rootInstance;
    self.router.configure({
      'signin': {label: 'Sign In', isDefault: true},
      'bus': {label: 'Bus', canEnter: authenticate},
      'social': {label: 'Social', canEnter: authenticate, 
        exit: function () {
          self.router.currentState().value.dispose();
        },
        enter : function () {
          var childRouter = self.router.createChildRouter('bus_id');
          self.router.currentState().value = childRouter;
        }
      },
      'news': {label: 'News', canEnter: authenticate},
      'users': {label: 'Users', canEnter: authenticate},
      'badges': {label: 'Badges', canEnter: authenticate},
      'chat': {label: 'Chat', canEnter : authenticate},
 		});
    oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

    var storage = window.localStorage;
    self.socket;

    self.get_current_bus = function () {
      return storage.getItem('current_bus');
    }
    
    self.server_url = function () {
      if (window.location.hostname == 'localhost') {
        return 'http://localhost:3000';
      } else {
        return 'https://NXTBDYBackend-gse00011381.apaas.us6.oraclecloud.com';
      }
    }

    
    

    function authenticate (){
      if (self.user) {
        return true;
      } else {
        user = storage.getItem('username');
        if (user) {
          self.user = {
            username : user
          };
          return true;
        }
        return false;
      }
    }
    
	}

	return new ControllerViewModel();
});