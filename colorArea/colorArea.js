var toColor = {
	
		to : function(c1,c2,v){
		
			c1 = this.colorToArray(c1);
		
			c2 = this.colorToArray(c2);
			
			if( typeof v === "string" && v.indexOf("%") > 0 ){
			
				v = parseInt(v) / 100;
			
			}
			
			c1[0] += parseInt((c2[0] - c1[0]) * v);
			c1[1] += parseInt((c2[1] - c1[1]) * v);
			c1[2] += parseInt((c2[2] - c1[2]) * v);
		
			return this.ArrayToColor(c1);
		
		},
		
		colorToArray : function(color){
	
			if( typeof color === "string" && color.indexOf("#") > -1 ){
				
				return this.hexToArray(color);
			
			} 
			
		},
		
		hexToArray : function(color){
	
			var i = 1;
			var a , b , c ;
			
			a = parseInt( "0x" + color.substring(i,i+=2) );
			b = parseInt( "0x" + color.substring(i,i+=2) );
			c = parseInt( "0x" + color.substring(i,i+=2) );
		
			return [a,b,c];
		
		},
		
		ArrayToColor : function(array){
	
			var a ,b ,c;
			
			return "#" + array[0].toString(16) + array[1].toString(16) + array[2].toString(16); 

		}
	
	}
