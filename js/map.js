	// 百度地图API功能
	var fastLoad = true;
	var mySwiper = {};
	var map = new BMap.Map("allmap");    // 创建Map实例
	var oldList = [];

	var longitude = getUrlParam('longitude')||'';
	var latitude = getUrlParam('latitude')||'';

 	map.addControl(new BMap.NavigationControl({anchor:'BMAP_ANCHOR_BOTTOM_RIGHT',type:'BMAP_NAVIGATION_CONTROL_ZOOM',showZoomInfo:false,enableGeolocation:false}));

		var geolocation = new BMap.Geolocation();

			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					map.addOverlay(mk);
					//map.panTo(r.point);
				if(longitude){
					var ContentPoint =  new BMap.Point(longitude,latitude);
					map.centerAndZoom(ContentPoint, 7);
				}else{
					map.centerAndZoom(r.point, 6);  // 初始化地图,设置中心点坐标和地图级别  	
				}
					
					
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
    ComplexCustomOverlay.prototype.initialize = function(map){
    this._map = map;

     var images = $('<div class="images" style="background: url('+this._params.photoUrl+') no-repeat 50% 50%;background-size:cover;	"></div>'); 	
		    var markerHtml = `<span class="pnum">${this._params.pnum}</span>`;

		    var div = $('<div></div>');
		    div.append(markerHtml);
		    this._div = div[0];

		    this._images = images[0];	  		 
		  var id = this._params.id;
		  var dynamicId = this._params.dynamicId;
		  var point = this._point;
		  this._images.addEventListener('touchstart',function(){

						
						map.panTo(point,false);	
						window.location.href = './index.html?id=' + dynamicId;			
			});
	      div.addClass('image');
	    //  div.attr('id','picture'+this._params.id);
	      div.css('z-index',BMap.Overlay.getZIndex(this._point.lat));//聚合功能?
	      div.append(images); 
	      map.getPanes().labelPane.appendChild(div[0]);//getPanes(),返回值:MapPane,返回地图覆盖物容器列表  labelPane呢???
	      return div[0];
    }
    
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - 35 + "px";
      this._div.style.top  = pixel.y - 30 + "px";
    }