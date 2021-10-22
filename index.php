<!DOCTYPE html>

<html lang="eng" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title></title>
		<!-- Uncomment when wanting to use CDN of Jquery on release -->
		<!--
			<script
			  src="https://code.jquery.com/jquery-3.6.0.min.js"
			  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
			  crossorigin="anonymous"></script>
			 -->

		<!-- Comment out when done developing. This imports jquery from local folder -->
		<script src="../jquery/jquery-3.6.0.js"></script>

		<!-- Importing own scripts here -->
		<script type="module" src="js/formEditor.js"></script>

	</head>
	<body>

		<div>
			<form id="formStart" method="post" action="saveSurvey.php">
				<button class="creatorComponents" id="newFormElementButton" >Add</button>
			</form>

			<input type="button" id="publishPageButton" value="Publish...">

		</div>

		<!-- for now use static css for handling footer -->
		<div class="footer" style="padding:10px;  position:relative; top: 500px; width:100% ">
			resources:
			<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
		</div>
	</body>


</html>