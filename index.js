'use strict';
$(document).ready(function(){
	//定义旗子个数（雷的个数）
	var num=15;
	//do while 设置难度，当雷的个数为15的时候循环停止
	do{
		console.log(111);
		//清空网格
		$(".scene").empty();
		// i=横向坐标
		for(let i=0;i<10;i++){
			// j=纵向坐标
			for(let j=0;j<10;j++){
				var isLei=Math.random()>0.85;
				//data用来保存坐标数据，添加id方便获取指定坐标对应的元素
				$("<div>").addClass(function () {
						if(isLei){
							return 'block lei';
						}else{
							return 'block';
						}
					})
					.attr("id",i+"-"+j)
					.data({position:{x:i,y:j}})
					.mousedown(mousedownEvent)
					.appendTo('.scene')

			}
		}
		console.log($(".lei").length);
	}while($(".lei").length!==15);
	//清除右击默认事件
	$(document).on("contextmenu",function(e){
		e.preventDefault();
	})
	function mousedownEvent(e){
		if(e.which==1){
			//左击(把左击的this指针转到点击元素)
			leftClick.call(this);
		}else if(e.which==3){
			//右击
			rightClick.call(this);
		}
	}
	//左击事件
	function leftClick(ele){
		//如果标记了旗子，则不能点击
		if($(this).hasClass("flag")){
			return;
		}else{
			if($(this).hasClass("lei")){
				//如果是雷，则显示所有雷
				$(".lei").addClass("danger");

			}else{
				$(this).addClass("safe");
				let pos=$(this).data().position;
				//判断当前区域四周是否有雷，有的话n++；最后输出雷的个数
				var n=0;
				for(let i=pos.x-1;i<=pos.x+1;i++){
					for(let j=pos.y-1;j<=pos.y+1;j++){
						if($("#"+i+"-"+j).hasClass("lei")){
							n++;
						}
					}
				}
				//当前位置内容为0，找周围为0的块，将它变为safe
				if(n==0){
					for(let i=pos.x-1;i<=pos.x+1;i++){
						for(let j=pos.y-1;j<=pos.y+1;j++){
							var obj=$("#"+i+"-"+j);
							//判断是否存在这个块
							if(obj.length==1){
								//除去当前这个元素
								//判断块是否点击过，如果没有继续执行点击事件，直到
								if(!obj.hasClass("safe")){
									leftClick.call(obj[0])
								}
							}
						}
					}
				}else{
					$(this).html(n);
				}

			}
		}

	}
	//右击事件
	function rightClick(){
		//标记旗子的个数，雷的个数
		//如果已点击，则不能标记
		if(!$(this).hasClass("safe")){
			//如果已经标记，再次点击则撤销标记
			if($(this).hasClass("flag")){
				$(this).removeClass("flag");
				num++;
			}else{
				if(num>0){
					$(this).addClass("flag");
					num--;
					if(num <= 0){
						//标记的都是雷
						if($(".flag").filter(".lei").length==15){
							alert("成功")
						}
					}
				}else{
					alert("请重新选择")
				}
			}
		}else{
			return;
		}
		console.log(num);
		$(".flagNum").html(num);
	}

})




/*$(document).ready(function () {
	for(let i=0;i<10;i++){
		for(let j=0;j<10;j++){
			var isLei=Math.random()>0.8
			$("<div>").addClass(function(){
				if(isLei){
					return "block lei";
				}else{
					return "block";
				}
			})
				.attr({id:i+"-"+j})
				.data({position:{x:i,y:j}})
				.mousedown(mousedownEvent)
				.appendTo(".scene");
		}
	}
	$(document).on("contextmenu",function(e){
		e.preventDefault();
	})
	function mousedownEvent(e){
		if(e.which==1){
			leftClick.call(this);
		}else if(e.which==3){
			rightClick.call(this);
		}
	}
	function leftClick(){
		if($(this).hasClass("lei")){
			$(".lei").addClass("danger")
		}else{
			$(this).addClass("safe");
			var n=0;
			var pos=$(this).data().position;
			for(let i=pos.x-1;i<=pos.x+1;i++){
				for(let j=pos.y-1;j<pos.y+1;j++){
					if($("#"+i+"-"+j).hasClass("lei")){
						n++;
					}
				}
			}
			$(this).html(n);
			if(n==0){
				for(let i=pos.x-1;i<=pos.x+1;i++){
					for(let j=pos.y-1;j<pos.y+1;j++){
						var obj=$("#"+i+"-"+j);
						if(obj.length==1&&!obj.hasClass("lei")){
							leftClick.call(obj[0]);
						}
					}
				}
			}
		}
	}
	function rightClick(){

	}
})*/
