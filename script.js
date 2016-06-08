//on document ready
$(document).ready(function(){

	/*WIP****/
	function lock(){
		$("[name='marginBottom']").prop('readonly', true);
	}
	/***/

	function setBox(){
		//array to contain proprty names and values from form
		var box = { };

		$.each($('form').serializeArray(), function() {
			if($.isNumeric(this.value)){
				box[this.name] = parseInt(this.value);
			}
			else {
				box[this.name] = this.value;
			}
		});

		//content-box || border-box

		//contentBox size 
		$(".content-box").removeAttr( 'style' );

		//for content-box box-sizing
		if(box.boxSizing=="content-box"){
			//dimensions determines content dimensions
			if($.isNumeric(box.boxHeight)){
				$(".content-box").height(box.boxHeight);
			}
			if($.isNumeric(box.boxWidth)){
				$(".content-box").width(box.boxWidth);
			}

			var $paddingBoxWidth = $(".content-box").width()+box.paddingLeft+box.paddingRight;
			var $borderBoxWidth = $paddingBoxWidth+box.borderLeft+box.borderRight;
		}
		//for border-box box-sizing
		else if(box.boxSizing=="border-box"){
			//dimensions determine border/padding/content combined dimensions
			if($.isNumeric(box.boxHeight)){
				$borderBoxHeight = box.boxHeight;
				$paddingBoxHeight = $borderBoxHeight - box.borderTop - box.borderBottom;
				$(".content-box").height($paddingBoxHeight - box.paddingTop - box.paddingBottom);
			}

			if($.isNumeric(box.boxWidth)){
				$borderBoxWidth = box.boxWidth;
				$paddingBoxWidth = $borderBoxWidth - box.borderRight - box.borderLeft;
				$(".content-box").width($paddingBoxWidth - box.paddingRight - box.paddingLeft);
			}
		}
		
		//contentBox position
		var $contentBoxTop = box.paddingTop+box.borderTop+box.marginTop;
		$(".content-box").css('top', $contentBoxTop);

		var $contentBoxLeft = box.paddingLeft+box.borderLeft+box.marginLeft;
		$(".content-box").css('left', $contentBoxLeft);

		//paddingBox size and position
		var $paddingBoxHeight = $(".content-box").height()+box.paddingTop+box.paddingBottom;
		var $paddingBoxTop = box.borderTop+box.marginTop;
		$(".padding-box").height($paddingBoxHeight);
		$(".padding-box").css('top', $paddingBoxTop);

		
		var $paddingBoxLeft = box.marginLeft+box.borderLeft;
		$(".padding-box").width($paddingBoxWidth);
		$(".padding-box").css('left', $paddingBoxLeft);

		//borderBox size and position
		var $borderBoxHeight = $paddingBoxHeight+box.borderTop+box.borderBottom;
		var $borderBoxTop = box.marginTop;
		$(".border-box").height($borderBoxHeight);
		$(".border-box").css('top', $borderBoxTop);

		
		var $borderBoxLeft = box.marginLeft;
		$(".border-box").width($borderBoxWidth);
		$(".border-box").css('left', $borderBoxLeft);

		//marginBox size and position
		var $marginBoxHeight = $borderBoxHeight+box.marginTop+box.marginBottom;
		var $marginBoxWidth = $borderBoxWidth+box.marginLeft+box.marginRight;
		$(".margin-box").height($marginBoxHeight);
		$(".margin-box").width($marginBoxWidth);
	}

	setBox();

	$("form").change(function(){
		setBox();
	});

});