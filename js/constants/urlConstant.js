
 var urlConfig = function(){
	var protocol = "http";
	var host = "localhost";
	var port = "19000";
	var url = protocol + "://" + host + ":" + port;
	
	return {
		URL : {
			GET_SEARCH_LIST : function(page, size) {
				return url + "/search/all?page=" + page + "&size="+ size;
			},
			GET_VIDEO_LIST : function(page, size) {
				return url + "/search/video?page=" + page + "&size="+ size;
			},
		}
	}
	
};
angular.module('smartadroll').constant('URL_CONSTANT', urlConfig());