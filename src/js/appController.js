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
       'chat': {label: 'Chat', isDefault: true},
 		 });
    oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
    self.serverurl = 'http://localhost:3000';

    self.socket = io.connect(self.serverurl);
	}

	return new ControllerViewModel();
});