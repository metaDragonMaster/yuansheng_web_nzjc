import $router from "./index.js"
export default {
	toName(name,params) {
		if(!!!name) {return ;}
		console.log("params",params)
		return $router.push({"name":name,"params":params});
	},
	toPath(path,query) {
		if(!!!path) {return ;}
		console.log("query",query)
		return $router.push({"path":path,"query":query});
	},
	// newWindow(href,parent,param = '_media') {
	// 	if(parent) {
	// 		return window.open(href,param);
	// 	}
	// 	window.open(href);
	// },

    newWindow(href,type) {//,parent
        // if(parent) {
        // 	return window.open(href,'_parent');
        // }

        let validate = ['_parent','_media','_blank'].includes(type);
        if(validate) {
            return window.open(href,type);
        }
        window.open(href,'_parent');
    },
}
