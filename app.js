angular.module('rtfmApp', ['ui.router','firebase'])


.constant('fb', {
	url: 'https://practicefire.firebaseio.com'
})

.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider
		.state('threads', {
			url: '/threads',
			templateUrl: 'templates/threads.html',
			controller: 'threadsCtrl',
			resolve: {
				threadsRef: function(threadService){
					return threadService.getThreads();
				}
			}
		})
		.state('thread', {
			url: '/threads/:threadId',
			controller: 'threadCtrl',
			resolve: {
				threadRef: function(threadService, $stateParams){
					return threadService.getThread($stateParams.threadId);
				} 
			},
			commentsRef: function(threadService, $stateParams){
				return threadService.getComments($stateParams.threadId);
			}
		});
	
	$urlRouterProvider
		.otherwise('/threads');
	
});