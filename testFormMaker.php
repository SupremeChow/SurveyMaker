<?php

function createHtmlTop()
{
	echo '<!DOCTYPE html>

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
	</head>
	<body>';
}
function createHtmlBottom()
{
	echo '</body>

</html>';
}


/**
 * Use make*Field() to create the Editable components for the Author to manipulate
 * 
 * Use make*() for reconstructing for when pulling variables from database and recreating page
 */

//Drop-down template maker (<select>)

/*
function makeDropDownField()
{
	echo '
		<select id="abcSelection">
		</select>

		<input type="text" id="newOptionName" placeholder="AddOption">
		<button id="addNewOption">Add Option </button>

		<script>
			$(document).ready(() => {

				$("#addNewOption").click(() => {
					let newOption = $("#newOptionName").val();
					if(newOption !== "")
						$("#abcSelection").append("<option value = \"TODO FIGURE VALUE\" >" + newOption + "</option>");
				});
				
			})
		</script>
	';
}
*/














function makeForm($numFields, $aLabel)
{
	echo '<form action="dummySubmit.php" method="post">
	
	
	';
	for($i = 0; $i < $numFields; $i++)
	{
		echo '<div>';
		echo '<label for="' . $i . '">' . $aLabel . '</label> ';
		echo '<input type="text" name="question' . $i . '" placeholder="typeAnswer...">';
		echo '</div>';
	}
	
	echo '
	<button type="submit"> SubmitSurvey! </button>
	</form>';
}

$numFields = $_POST['numFields'];
$aLabel = $_POST['aLabel'];

createHtmlTop();
makeForm($numFields, $aLabel);
createHtmlBottom();