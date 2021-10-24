<?php

include('formFieldMaker.php'); //Include the php functions for creating the fields

$starImgPth = 'img/star.png';
$emptyStarImgPth = 'img/starEmpty.png';

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
        <script src="../jquery/jquery-3.6.0.js"></script>

        <!-- Importing own scripts here -->
		<script type="module" src="js/formEditor.js"></script>
        
        
        <link rel="stylesheet" href="style.css">
	</head>
	<body>
    
        
    ';
}

//use boolean $isPreview to prevent button press
function createHtmlBottom($isPreview)
{
    // if($isPreview)
    // {
    //     echo '
    //         <button class="previewButton" type="button">Submit Disabled</button>
    //     ';
    // }
    // else
    // {
    //     echo '
    //             <input type="submit" value="Submit Survey">
    //     ';
    // }
        

    
        //     </form>
        //  </div>
         echo'
        <!-- for now use static css for handling footer -->
		<div class="footer" style="padding:10px;  position:relative; top: 500px; width:100% ">
			resources:
			<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
		</div>
    </body>

</html>';
}

function createSurveyContent($surveyJSON, $isPreview)
{
    echo'
    <div id=mainContent>
            <form id="formStart" method="post" action="submitSurvey.php">

    ';
     //Decode back into an object file
     $surveyJSON = json_decode($surveyJSON, false);


     $theSurveyList = $surveyJSON->SurveyList;
 
 
 
     //Counters and number of formFields
 
     $totalForms = $surveyJSON->numForms;
     $formFieldCounter = 0;
 
     $numSelectForms = $surveyJSON->numSelectBoxes ;
     $selectFormCounter = 0;
 
 
     $numParagraphForms = $surveyJSON->numParagraphs ;
     $paragraphFormCounter = 0;
 
 
     $numShortAnswerForms = $surveyJSON-> numShortAnswers;
     $shortAnswerFormCounter = 0;
 
 
     $numMultpleChoiceForms = $surveyJSON->numMultipleChoice ;
     $multipleChoiceFormCounter = 0;
 
 
     $numCheckBoxForms = $surveyJSON-> numCheckBoxes;
     $checkBoxFormCounter = 0;
 
 
     $numStarRatingForms = $surveyJSON-> numStarRatings;
     $starRatingFormCounter = 0;
 
 
 
     //If a Preview, create a header saying so
     if($isPreview)
         echo'<h1 class="previewHeader">SurveyPreview<h1>';
 
 
 
 
     foreach($theSurveyList as $form) //got throug each survey...
     {
         switch($form->formType){
             case 'CheckBox':
                 //TODO better format paramters to send and receive
                 createCheckBox($form, $form->position, $checkBoxFormCounter, $form->checkOptions);
                 $checkBoxFormCounter++;
                 $formFieldCounter++;
                 break;
             
             case 'MultipleChoice':
                 //TODO better format paramters to send and receive
                 createMultipleChoice($form, $form->position, $multipleChoiceFormCounter, $form->multOptions);
                 $multipleChoiceFormCounter++;
                 $formFieldCounter++;
 
             break;
 
             case 'SelectBox':
                 //TODO better format paramters to send and receive
                 createSelectBox($form, $form->position, $selectFormCounter, $form->selectOptions);
                 $selectFormCounter++;
                 $formFieldCounter++;
 
             break;
 
             case 'ShortAnswer':
                 createShortAnswer($form, $form->position, $shortAnswerFormCounter);
                 $shortAnswerFormCounter++;
                 $formFieldCounter++;
 
             break;
 
             case 'ShortParagraph':
                 createParagraph($form, $form->position, $paragraphFormCounter);
                 $paragraphFormCounter++;
                 $formFieldCounter++;
 
             break;
 
             case 'StarRating':
                 createStarRating($form, $form->position, $starRatingFormCounter);
                 $starRatingFormCounter++;
                 $formFieldCounter++;
 
             break;
         }
     }

     if($isPreview)
    {
        echo '
            <button class="previewButton" type="button">Submit Disabled</button>
        ';
    }
    else
    {
        echo '
                <input type="submit" value="Submit Survey">
        ';
    }
        

    echo'
            </form>
        </div>
    ';

}

//Receives JSON string, which will deconstruct and use to make the survey page
//Second parameter is used to determine if a preview mode (ie author hit publish and see results)
function makeSurvey($surveyJSON, $isPreview)
{

    createHtmlTop();

    createSurveyContent($surveyJSON, $isPreview);

   

    createHtmlBottom($isPreview); //Bottom of html
}