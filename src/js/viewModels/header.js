define(['knockout', 'ojs/ojcore', 'appController', 'ojs/ojknockout', 'ojs/ojnavigationlist', 'ojs/ojarraytabledatasource'], function (ko, oj, app) {
 	// Media queries for repsonsive layouts
  var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
  self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
  var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
  self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

  // Navigation
  var navData = [{
    name: 'Chat', id: 'chat',
    iconClass: 'fa fa-home oj-navigationlist-item-icon'
  },{
    name: 'News', id: 'news',
    iconClass: 'fa fa-address-book oj-navigationlist-item-icon'
  },{
  	name: 'Profiles', id: 'users',
  	iconClass: 'fa fa-coffee oj-navigationlist-item-icon'
  },{
    name: 'Settings', id: 'settings',
    iconClass: 'fa fa-coffee oj-navigationlist-item-icon'
  }];
  self.dataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
  self.selectedNavItem = ko.computed(function () {
  	return app.router.currentState().id;
  })


  self.menuChange = function (event, data) {
    console.log('data', data);
    if (data.option == 'selection') {
      url = data.value;
      if (data.value == 'users') url += '&bus_id=' + app.current_bus
      console.log('going to', url);
      //app.router.go(url);
      history.pushState(null, '', 'index.html?root=' + url);
      oj.Router.sync();     

    }
	};
  
});