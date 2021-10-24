<!--
    This php file will handle receiving and parsing the JSON data for creating the survey.

    For now, steps are:
    1) Get JSON, and just print | √
    2) Deconstruct JSON into components, then...
    3) Rebuild the survey
    4) Rebuild survey with submit button to submit form
    5) handle saving JSON to mysql
    6) Setup mysql to take in responses from user
    7) Set up system, author creates, saves, gets put into json and placed in mysql, allow user to go to page that will call json
        data and get rebuilt into the webpage survey for submission

        //Using this to figure out sending JSON to php
        https://www.youtube.com/watch?v=mNrJDGfQGz0


        JSON Structure:

        "numSelectBoxes" : selectBoxCounter, 
        "numParagraphs" : shortParagraphCounter,
        "numShortAnswers" :shortAnswerCounter, 
        "numMultipleChoice" : multipleChoiceCounter ,
        "numCheckBoxes" : checkBoxCounter, 
        "numStarRatings" : starCounter ,

        "SurveyList" : formList



        TODO: Figure Out if need all of formEditor for Javascript functions. Maybe best to just have seperate smaller script file
        Mainly to handle star functionality
-->
<?php


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
	</head>
	<body>';
}
function createHtmlBottom()
{
	echo '
        <!-- for now use static css for handling footer -->
		<div class="footer" style="padding:10px;  position:relative; top: 500px; width:100% ">
			resources:
			<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
		</div>
    </body>

</html>';
}


//__________________________ Main Survey maker _____________________________________

CreateHtmlTop(); //Top of the HTML boiler Plate




$receivedSurveyJSON = file_get_contents('php://input'); //grab the POST'ed JSON string

//Decode back into an object file
$surveyJSON = json_decode($receivedSurveyJSON, false);


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



//TheForm is the actual form object,
// $idVal is position (?), $checkBoxIdNumber is a number diferentiating it from the other checkBoxes
function createCheckBox($theForm , $idVal, $checkBoxIdNumber, $arrayOfOptions)
{   echo'
        <div formId= "form_' . $idVal .'" class="checkPrefabDiv formField" id="checkPrefabDiv_' . $checkBoxIdNumber . '">
        
            <label class="questionHeader" id="checkQuestionLabel_' . $checkBoxIdNumber . '" for="checkBox_' . $checkBoxIdNumber . '"> 
                ' . $theForm->question . '
            </label><br>


            <label  id="checkLabel_' . $checkBoxIdNumber . '" for="checkBox_' . $checkBoxIdNumber . '">
            ' . $theForm->label . '
            </label>

            <div id="checkBox_' . $checkBoxIdNumber . '">
    ';

            //Function for adding all options
            for($i = 0; $i < count($arrayOfOptions); $i++)
            {

                //TODO for now, hope that things stay in order, otherwise need to reorder with position


                echo'
                <input type="checkbox" id="'. $arrayOfOptions[$i]->idVal . '" name="' . $theForm->label . '" value="' . $arrayOfOptions[$i]->value . '" >
                <label for="' . $arrayOfOptions[$i]->idVal . '">'. $arrayOfOptions[$i]->label .'</label>

                ';
            }
                

    echo'

            </div><br>
        </div>
    
    ';


}

function createMultipleChoice($theForm , $idVal, $multiplChoiceIdNumber, $arrayOfOptions)
{
    echo'

    <div formId= "form_'. $idVal .'" class="multPrefabDiv formField" id="multPrefabDiv_' . $multiplChoiceIdNumber . '">
    
    
        <label class="questionHeader" id="multQuestionLabel_' . $multiplChoiceIdNumber . '" for="multipleChoice_' . $multiplChoiceIdNumber . '">
            ' . $theForm->question . '
        </label><br>
        
        <label  id="multLabel_' . $multiplChoiceIdNumber . '" for="multipleChoice_' . $multiplChoiceIdNumber . '">
            ' . $theForm->label . '
        </label>


        <div id="multipleChoice_' . $multiplChoiceIdNumber . '">
    ';

            //Put options here....
            //Function for adding all options
            for($i = 0; $i < count($arrayOfOptions); $i++)
            {

                //TODO for now, hope that things stay in order, otherwise need to reorder with position

                echo'
                <input type="radio" id="'. $arrayOfOptions[$i]->idVal . '" name="' . $theForm->label . '" value="' . $arrayOfOptions[$i]->value . '" >
                <label for="' . $arrayOfOptions[$i]->idVal . '">'. $arrayOfOptions[$i]->label .'</label>

                ';
            }


    echo'
        </div><br>


    </div>
    ';
}

function createSelectBox($theForm , $idVal, $selectIdNumber, $arrayOfOptions)
{
    echo'
    
    <div formId= "form_'. $idVal .'" class="selectPrefabDiv formField" id="selectPrefabDiv_' . $selectIdNumber . '">
    
        <label class="questionHeader" id="selectQuestionLabel_' .  $selectIdNumber . '" for="selectBox_' .  $selectIdNumber . '">
            ' . $theForm->question . '
        </label><br>

        <label  id="selectBoxLabel_' .  $selectIdNumber . '" for="selectBox_' .  $selectIdNumber . '">
            ' . $theForm->label . '
        </label>

        <select id="selectBox_' .  $selectIdNumber .  '">
    ';
        //place options here...

        for($i = 0; $i < count($arrayOfOptions); $i++)
        {

            //TODO for now, hope that things stay in order, otherwise need to reorder with position

            echo'
                <option value="' . $arrayOfOptions[$i]->value . '" >' . $arrayOfOptions[$i]->label . '</option>
            ';

           
        }
 
    echo'
        </select><br>
    </div>
     
    ';

}

function createShortAnswer($theForm , $idVal, $shortAnswerIdNumber)
{
    echo'
        <div formId= "form_' . $idVal .'" class="shortAnsPrefabDiv formField" id="shortAnsPrefabDiv_' . $shortAnswerIdNumber . '">
        
            <label class="questionHeader" id="shortAnsQuestionLabel_' . $shortAnswerIdNumber . '" for="shortAnsTextArea_' . $shortAnswerIdNumber . '"> 
                ' . $theForm->question . '
            </label><br>


            <label  id="shortAnsLabel_' . $shortAnswerIdNumber . '" for="shortAnsTextArea_' . $shortAnswerIdNumber . '">
                ' . $theForm->label . '
            </label>


            <input type="text" id="shortAnsTextArea_'. $shortAnswerIdNumber . '" name="shortAns_' . $shortAnswerIdNumber . '" placeholder="' . $theForm->placeHolderText . '"  maxlength="'. $theForm->characterLim .'"><br>
        
        </div>
    ';
}

function createParagraph($theForm , $idVal, $paragraphIdNumber)
{
    echo'
        <div formId = form_"'. $idVal .'" class="shortParaPrefabDiv formField" id="shortParaPrefabDiv_' . $paragraphIdNumber . '">
        
            <label class="questionHeader" id="shortParaQuestionLabel_' . $paragraphIdNumber . '" for="shortParaTextArea_' . $paragraphIdNumber . '">
                ' . $theForm->question . '
            </label><br>

            <textarea id="shortParaTextArea_' . $paragraphIdNumber . '" name="shortPara_' . $paragraphIdNumber . '" placeholder="'. $theForm->placeHolderText .'" rows="5" cols="64" maxlength="'. $theForm->characterLim .'">
            </textarea><br>
        
        </div>
    ';
}

function createStarRating($theForm , $idVal, $starRatingIdNumber)
{
    echo'
        <div formId= "form_' . $idVal . '" class="starPrefabDiv formField" id="starPrefabDiv_' . $starRatingIdNumber . '">
            <label class="questionHeader" id="starQuestionLabel_' . $starRatingIdNumber . '" for="starRating_' . $starRatingIdNumber . '">
                ' . $theForm->question . '
            </label><br>

            <label  id="starLabel_' . $starRatingIdNumber . '" for="starRating_' . $starRatingIdNumber . '">
                ' . $theForm->label . '
            </label>
        
            <div class="starRatingDiv" id="starRating_' . $starRatingIdNumber . '" idCounterId='. $starRatingIdNumber .'>
        ';

        //Loop through number of stars to create
        for($i = 0; $i < $theForm->numStars; $i++)
        {
            global $starImgPth, $emptyStarImgPth;

            $chosenImage = ($i < $theForm->selectedOption) ? $starImgPth : $emptyStarImgPth;

            //add an input of type 'radio', with relavant attributes. Make display:none so that only label shows, thus providing an image to click
            
            echo'
                <input type="radio" id="starRating_' . $starRatingIdNumber . '_' . $i . '" name="' . $theForm->label . '_' . $starRatingIdNumber . '" value="'. $i .'" style="visibility:hidden">
                <label for="starRating_'. $starRatingIdNumber .'_' . $i . '"><img class="starButton" src="'. $chosenImage .'"  width="20" height="20"></img></label>
            ';
        }



    echo'
            </div>
        </div>
    
    ';
}

createHtmlBottom(); //Bottom of html


// console.log($surveyJSON);

//debug
//var_dump($totalForms);
