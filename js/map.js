	// 百度地图API功能
	var fastLoad = true;
	var mySwiper = {};
	var map = new BMap.Map("allmap");    // 创建Map实例
	var oldList = [];
 	map.addControl(new BMap.NavigationControl({anchor:'BMAP_ANCHOR_BOTTOM_RIGHT',type:'BMAP_NAVIGATION_CONTROL_ZOOM',showZoomInfo:false,enableGeolocation:false}));

		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				//map.panTo(r.point);
				map.centerAndZoom(r.point, 5);  // 初始化地图,设置中心点坐标和地图级别  	
				//alert('您的位置：'+r.point.lng+','+r.point.lat);
			}
			else {
				//alert('failed'+this.getStatus());
			}        
		},{enableHighAccuracy: true})

	

    function ComplexCustomOverlay(point){
      this._point = point.point;
      this._params = point.params;

    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
  //  ComplexCustomOverlay.prototype = new BMap.Marker();
    

    ComplexCustomOverlay.prototype.initialize = function(map){
    this._map = map;

     var images = $('<div class="images" style="background: url('+this._params.photoUrl+') no-repeat 50% 50%;background-size:cover;	"></div>'); 
//     var userInfo = $('<div class="info"></div>');

   // var imageListCon = $('<div class="imageListCon"></div>');

		//	var cosleList  = $('<p class="cosle cosleList">×</p>');				
		//    imageListCon.append();
		//    imageListCon.append(cosleList);
//									<p class="userImg"><span></span></p>
//									<div class="nandt">
//									<p class="name">霍元甲</p>
//									<p class="tiem">2012-02-12 08:12:12</p>  									
//									</div> 		
		    var markerHtml = `<span class="pnum">${this._params.pnum}</span>`;

//		    var info = $('<div class="info"></div>');
//		    var infoColse = $('<p class="cosle cosleimg">×</p>');
//		    var infoHtml = `<div class="userInfo">
//									<p class="haiba">altitude:${this._params.altitude}米</p>		
//								</div>`;
//		    var bigimg = $('<img class="bigimg" src="' + this._params.photoUrl + '"/>');
//		    var add = $('<p class="adds">' + this._params.locationName + '</p>');
//		    info.append(infoHtml);
//		    info.append(bigimg);
//		    info.append(add);
//		    info.append(infoColse);
		    var div = $('<div></div>');
//		    if(this._params.pnum > 1) {
//		    	div.append(markerHtml);
//		    }
		    div.append(markerHtml);
		    this._div = div[0];

		    this._images = images[0];
		    //  this._cosleList = cosleList[0];
//		    this._infoColse = infoColse[0];
//		    this._bigImg = bigimg[0];
//		    var a = 1;
//		    this._bigImg.addEventListener('touchstart', function() {
//		    	if(a == 2) {
//		    		window.location.href = './index.html?id=' + getUrlParam('id');
//		    	}
//		    	setTimeout(function() {
//		    		a = 1;
//		    	}, 300)
//		    	a++;
//		    });  
		  
//		  this._infoColse.addEventListener('touchstart',function(){
//						//alert('touch started');
//				$('.info').animate({bottom:'140%',opacity:'0'});
//				setTimeout(function(){
//					$('.info').hide();
//				},800)						
//			});	
	  	 
	  	 
//		  this._cosleList.addEventListener('touchstart',function(){
//						//alert('touch started');
//				$('.imageListCon').animate({bottom:'140%',opacity:'0'});
//				setTimeout(function(){
//					$('.imageListCon').hide();
//				},800)						
//			});		  		 
		  var id = this._params.id;
		  var dynamicId = this._params.dynamicId;
		  var point = this._point;
		  this._images.addEventListener('touchstart',function(){

						
						map.panTo(point,false);	
						window.location.href = './index.html?id=' + dynamicId;
						
//						$('.info').css({bottom:'140%',opacity:'0',display:'none'});
//						div.find('.imageListCon').show();
//						div.find('.imageListCon').animate({bottom:'120%',opacity:'1'});									
//						var $info = div.find('.info');								
//						$info.show();
//						$info.animate({bottom:'120%',opacity:'1'});		
						
			});
	      div.addClass('image');
	    //  div.attr('id','picture'+this._params.id);
	      div.css('z-index',BMap.Overlay.getZIndex(this._point.lat));//聚合功能?
	      div.append(images);
	     
	    //  div.append(imageListCon);
	    //  div.append(info);
	      map.getPanes().labelPane.appendChild(div[0]);//getPanes(),返回值:MapPane,返回地图覆盖物容器列表  labelPane呢???
	      return div[0];
    }
    
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - 35 + "px";
      this._div.style.top  = pixel.y - 30 + "px";
    }