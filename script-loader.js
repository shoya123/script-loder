let scriptLoader = {
    src: {
        parallel: [],
        series: []
    },

    loadedCount: 0,

	head: document.getElementsByTagName('head')[0],

	setSrc: function(path, type) {
        switch (type) {
            case 'parallel':
                this.src.parallel.push(path);
                break;

            case 'series':
            default:
                this.src.series.push(path);
                break;
        }
    },

	load: function(onSuccess, onError) {
        let _self = this;
        let parallelSrcCount = _self.src.parallel.length;
        this.loadByParallel();
        setTimeout(function() {
            if (_self.loadedCount < parallelSrcCount) {
              setTimeout(arguments.callee, 5);
            } else {
              _self.loadBySeries(onSuccess, onError);
            }
        }, 5);
	},

    cr: function(src){
		let script = document.createElement('script');
		script.src = src;
        this.head.appendChild(script);
        return script;
    },
    
    loadByParallel: function(onError) {
        let _self = this;
        let script;
        while (this.src.parallel.length > 0) {
            script = this.cr(this.src.parallel.shift());
            script.onload = function (){
                console.log(_self.loadedCount);
                _self.loadedCount++;
            };
        }
		// エラー
        script.onerror = onError;
    },

    loadBySeries: function(onSuccess, onError) {
		if (this.src.series.length === 0) {
			if (onSuccess) {
				onSuccess();
			}
			return;
        }

        let _self = this;
        let script = this.cr(this.src.series.shift());
		script.onload = function(){
			_self.loadBySeries(onSuccess, onError);
        }

		// エラー
        script.onerror = onError;
    }
}