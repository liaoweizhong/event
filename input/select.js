(function(w,s){
	
	w.inputSelect = new s();
	
	var color = document.getElementsByTagName("colorSelect");
	
	w.inputSelect.setExtend("color",function(element){
		
		var value = element.getAttribute("value");
		try{
			
			value = JSON.parse(value);
			
		}catch (e) {
			
			value = value.split(',');
			
		}
		var type = element.getAttribute("isJB");
	
		var div = document.createElement("div");
		div.style.cssText = "height:100%;width:100%;";
		
		var option;
		
		if( type !== null ){
			
			//如果渐变
			
			return div;
			
		}
		
		for( var i = 0,len = value.length; i < len ; i++ ){
			
			option = document.createElement("div");
			
			option.style.cssText = "float:left;height:100%;width:"+(1/len*100)+"%;background-color:"+value[i];
			
			div.appendChild(option); 
			
		}
		
		return div
		
	});
	
	w.inputSelect.setExtend("img",function(element){
		
		var value = element.getAttribute("value");
		try{
			
			value = JSON.parse(value);
			
		}catch (e) {
			
			value = value.split(',');
			
		}
		var type = element.getAttribute("isJB");
	
		var div = document.createElement("div");
		div.style.cssText = "height:100%;width:100%;";
		
		var option;
		
		if( type !== null ){
			
			//如果渐变
			return div;
			
		}
		
		for( var i = 0,len = value.length; i < len ; i++ ){
			
			option = document.createElement("img");
			
			option.src = value[i];
			
			option.style.cssText = "float:left;height:100%;width:"+(1/len*100)+"%;";
			
			div.appendChild(option); 
			
		}
		
		return div
		
	});
	
	
	for( var i in color ){
		
		if( i == "length") return
		
		w.inputSelect.into(color[i]);
		
	}
	
	
	
}(

	window ,
	
	function(){
		
		var selectTagName = "colorselect";
		var valueTagName = "value";
		var optionAraeTagName = "optionarea";
		var optionTagName = "coloroption";
		
		this.refresh = function(){
			
			var color = document.getElementsByTagName("colorSelect");
			
			for( var i in color ){
		
				if( i == "length") return
				
				this.into(color[i]);
				
			}
			
		}
		
		//初始化
		this.into = function(element){
			
			if( !element || element.isMySelect ) return;
			
			element.isMySelect = true;
			
			this.zhuanhuan(element);
			
			this.bindEvent(element); //新建事件

		}
		
		this.zhuanhuan = function(element){
			
			var html = element.innerHTML;
			element.innerHTML = "";
			
			element.appendChild( document.createElement(valueTagName) );
			var area = document.createElement(optionAraeTagName);
			
			area.className += "hide";
			
			area.innerHTML = html;
			element.appendChild( area );
			
			return element;		
		}
		
		//创建element
		this.createElement = function(element){
			
			return this.createSelect(element);
			
		}
		
		//展开内容
		this.showPlay = function(){
			
			var optionArea = this.getElementsByTagName("optionArea")[0];
			
			var _class = optionArea.className.replace(/\s{1,}/g," ").split(" ");
			
			var ind = _class.indexOf("hide");
			
			if( ind > -1 ){
				
				_class.splice(ind,1);
				
				optionArea.className = _class.join(" ");
				
			}
	
		}
		
		this.extendOption = function(element){
			
			element || ( element = this )
			
			var option = element.getElementsByTagName(optionAraeTagName)[0].children;
			
			var div,type,i;
			
			for( i in option ){
				
				var it = option[i];
				
				if( i == "length" || it.isExtend ){ return }
			
				it.isExtend = true;
			
				type = it.getAttribute("type");
				
				if( this.extended[type] ) {
					
					div = this.extended[type](it);
					
					if( typeof div === "string" ) it.innerHTML = div;
					else  { it.innerHTML="" ;it.appendChild(div); }
					
				};
				
			}
			
		}
		
		//关闭内容
		this.hidePlay = function(){
			
			var optionArea = this.getElementsByTagName("optionArea")[0];
			
			var _class = optionArea.className.replace(/\s{1,}/g," ").split(" ");
			
			var ind = _class.indexOf("hide");
			
			if( ind < 0 ){
				
				optionArea.className += "hide";
				
			}
	
		}

		//创建select
		this.createSelect = function(element){
			
			var div = element || document.createElement(selectTagName);
			
			this.into(div);
			
			return div;
			
		}
		
		//创建Option
		this.createOption = function(key,val){
			
			var option = document.createElement(optionTagName);
			
			option.setAttribute(key,val);
			
			if( this.appendChild ){ this.appendChild( option ) };
			
			return option;
			
		}
		
		//一直很安静
		this.optionVal = function(value){
			//这里的this指向element
			
			if( typeof value === "string" ){
				
				value = value.split(",");
				
			}
			
			if( typeof value === "object" && value.constructor === Array ){
				//只有传值为数组的时候才会执行
				
				
			}
			
		}
		
		//根据颜色创建面板
		this.createColorByValue = function(value,type){
			
			var div = document.createElement("div");
			div.style.cssText = "height:100%;width:100%;";
			
			var option;
			
			if( type == "jb" ){
				
				
				
				return div;
				
			}
			
			for( var i = 0,len = value.length; i < len ; i++ ){
				
				option = document.createElement("div");
				
				option.style.cssText = "float:left;height:100%;width:"+(1/len*100)+"%;background-color:"+value[i];
				
				div.appendChild(option); 
				
			}
			
			return div
			
		}
		
		this.setExtend = function(name,func){
			
			if( !name ) return ;
			
			this.extended[name] = func;
			
		}
		
		this.extended = {};
		
		//绑定事件
		this.bindEvent = function(element){
			
			if( !element ) return;
			
			var eventArray = ["click","change","coloroption"];
			
			for( var i in eventArray ){
				
				var evens = "on" + eventArray[i];
				
				element[evens] && ( element.w = element[evens] );
				element[evens] = new this.event;
				element[evens]( element.w );
				
			}
			
			for( var i in this ){
				
				element[i] = this[i];
				
			}
			
			element.onclick(function(e){
				
				e.stopPropagation();
				
				this.extendOption();
				
				this.showPlay();
				
				var _this = e.target;

				var even 
				
				for(var i = 0 ; i < 10 ; i++ ){
					
					even = _this.getAttribute("evenClick");
				
					if( even ) break;
				
					even = even || _this.tagName.toLowerCase();
					
					if( this["on"+even] ) break;
					
					_this = _this.parentElement;
					
					if( !_this ) break;
					
				}
				
				e._target = _this;
				
				this["on"+even] && this["on"+even](e);
								
				if( !document._onclick ){
				
					document._onclick = document.onclick;
					
					document.onclick = function(event){
						
						if( event.target !== element ){
							
							element.hidePlay();
							
							this.onclick = this._onclick;
							
							this._onclick = null;
							
						}
						
						document._onclick && document._onclick.apply(this,arguments);
						
					}
					
				}
				
			});
			
			element.oncoloroption(function(e){
				
				e.type = "change";
				
				this.onchange(e);
				
				this.hidePlay();
				
			})
			
			element.onchange(function(e){
				
				this.setValue(e && e._target || "");
				
			})
			
		}
		
		this.setValue = function(value){
			
			var valueElement = this.getElementsByTagName("value")[0];
			
			this.value = value.getAttribute("value");
			
			valueElement.setAttribute("value",this.value);
			
			if( typeof value === "string" ){
				
				valueElement.innerText = value;
				
			}else{
				
				valueElement.innerHTML = value.innerHTML;
				
			}
			
		}
		
		this.getValue = function(){
			
			var valueElement = this.getElementsByTagName("value")[0];
			
			valueElement.getAttribute("value");
			
		}
		
		this.event = function(){

			var data = [];

			var ret = function(func){

				if(typeof func === "function"){

					data.push(func);
					
					func.remove = function(){
						
						data.splice(data.indexOf(func),1);
						
					}

					return func;

				}

				for( var i in data ){

					data[i].apply(this,arguments);

				}

			};

			ret.remove = function(){

				data = [];

			};

			return ret;

		};
		
	}

))
