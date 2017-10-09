(new function(){

        var self = this;

        var config = {

            class: "inputSelect" ,
            attr : "dataName",
            data: {
                //测试数据
                test : [
                    { value: "value", text : "text1" , keyword: "ssssss" },
                    { value: "value", text : "text2" , keyword: "ass" },
                    { value: "value", text : "text3" , keyword: "fswqe" },
                    { value: "value", text : "text4" , keyword: "gjqrnnczv" },
                    { value: "value", text : "text5" , keyword: "sajdhqwudh" }]

            }

        }

        this.setData = function(name,data,bool){

            if( bool && config.data[name] ){

                config.data[name].concat(data);

                return
            }

            config.data[name] = data;

        };

        this.getData = function(name){

            return config.data[name];

        };

        this.bind = function(){

            var a = document.getElementsByTagName("input");
            var className;
            var _class = config.class;
            var _this;
            var data;
            var optionStr = "";
            for( var i in a ){

                _this = a[0];

                if(_this.type = "text"){

                    className = _this.className.split(" ");

                    for( var _i in className ){

                        if(className[_i] === _class ){

                            _this.oninput = function(){

                                var _this = this;

                                optionStr = "";

                                data = self.getData(this.attributes.getNamedItem(config.attr).value);

                                for( var i in data ){

                                    var it = data[i];

                                    if(it.keyword.indexOf(this.value) > -1 && this.value != "") {

                                        optionStr += "<div style='padding:5px 3px;cursor: pointer;' value='"+it.value+"'>"+ it.text +"</div>"

                                    }

                                }

                                if(!this.optionSelect){

                                    var div = document.createElement("div");
                                    div.style.cssText = "border: groove 1px;position:absolute;width:"+ this.offsetWidth +"px;left:"+this.offsetLeft+"px;top:"+ (this.offsetTop + this.offsetHeight) +"px;";
                                    div.innerHTML = optionStr
                                    div.onclick = function(e){

                                        _this.value = e.target.attributes.getNamedItem("value").value;

                                    };
                                    this.optionSelect = div;
                                    if(optionStr != "")
                                        this.after(div);
                                    else
                                        div.remove();

                                }else{

                                    var div = this.optionSelect;
                                    div.innerHTML = optionStr;
                                    if(optionStr != "")
                                        this.after(div);
                                    else
                                        div.remove();


                                }

                                if(!this.onblur) {

                                    this.onblur = function(){

                                        var div = this.optionSelect;

                                        setTimeout(function(){
                                            div.remove();
                                            div = null;
                                            this.onblur = null;
                                        },100)

                                    }

                                }



                            }

                        }

                    }

                };


            }

        }();

    })();
