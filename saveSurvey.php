<!--
    This php file will handle receiving and parsing the JSON data for creating the survey.

    For now, steps are:
    1) Get JSON, and just print | √
    2) Deconstruct JSON into components, then...| ~√ ( parsed, but didn't break into parts that could be individual variables. Stick with saving JSON in mysql for now)
    3) Rebuild the survey | ~ √ (Main strucutre there, but no css or submit button (see next requirement))
    4) Rebuild survey with submit button to submit form | √
    5) handle saving JSON to mysql | √
    6) Setup mysql to take in responses from user | ...
    7) Set up system, author creates, saves, gets put into json and placed in mysql, allow user to go to page that will call json
        data and get rebuilt into the webpage survey for submission | ...




        TODO: Figure Out if need all of formEditor for Javascript functions. Maybe best to just have seperate smaller script file
        Mainly to handle star functionality

        TOD: Check if order will be retained always, seems to be fine for now, but when placed in db,
        things might get mixed up


        TODO: AS of 10/24 early morning:
            * tidy up website with css (√ Original back) and add button to submitt feature (does nothing) √
            * then go hard on database, first saving json of info to rebuild, and tables for person to answer
            * last sprint, allow user to submit and send to db
            * formalize whole thing, cleanup and polish, last round bug checks


        TODO nice to have, provide a title to dynamically place in title tag

        TODO Header/Question and lable are same text size, fix that

        TODO (Nice to have) validate input, and prevent xss input (Not issue in this situation, but in real deployment, MUST set up for security)
-->
<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
//Setup SQL connection

//!!!!!!!!!!!!!!!!!!!!
//WARNING!!!! Using a bad username, password, AND SAVING TO PLAIN TEXT IS BAD! Only doing for getting things running
//There are better ways to connecting, but for scope of this project, this will do
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//TODO for now, work in DB named 'TestSurveyDB', for building. When finalized with schema, move everything to appropriately named
//SurveyDB
$dbConnection = mysqli_connect('localhost', 'SurveyAuthor', 'ABC123**', 'surveyMakerDB');

//check connection

if(!$dbConnection)
{
    //ERROR... can't connect
    echo' ERROR! Failed to connect to db';
}
else
    //echo ' COnnected to DB';



//include('formFieldMaker.php'); //Include the php functions for creating the fields
include('surveyReconstructor.php');




//_____________________Handle Receiving JSON of published survey







//better for JSON (?)
$receivedSurveyJSON = file_get_contents('php://input'); //grab the POST'ed JSON string




// $decodedJSON = json_decode($receivedSurveyJSON, true); //Decode, for SQL (Reconstructor already decodes, may need to send this instead since pulling from DB will be object)

// $encodedJSON = json_encode($decodedJSON);






//____________________________________ Saving data ____________________

//TODO NOT WORKING..............................................................

//Go through as if doing surveyReconstructor, but instead extrapoating parts and inserting in DB
/*
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
 
 
 
     foreach($theSurveyList as $form) //got throug each survey and save...
     {
         switch($form->formType){
             case 'CheckBox':
                 
                 
                 $checkBoxFormCounter++;
                 $formFieldCounter++;
                 break;
             
             case 'MultipleChoice':
                
                 $multipleChoiceFormCounter++;
                 $formFieldCounter++;
 
             break;
 
             case 'SelectBox':
                 
                 $selectFormCounter++;
                 $formFieldCounter++;
 
             break;
 
             case 'ShortAnswer':
                 
                 $shortAnswerFormCounter++;
                 $formFieldCounter++;
 
             break;
 
             case 'ShortParagraph':
                 
                 $paragraphFormCounter++;
                 $formFieldCounter++;
 
             break;
 
             case 'StarRating':
                 
                 $starRatingFormCounter++;
                 $formFieldCounter++;
 
             break;
         }
     }

*/



























     

//_______________________________ DB TESTS _____________ DELETE LATER___________________


//Don't use this, not great for JSON (i think?), better for just POSTing Survey (ie key-value pair list)
//ie, notice the key would be 'surveyJSON', and the value would be HUUUUGGGEEE. No ideal, no?
//$receivedSurveyJSON = $_POST['surveyJSON'];





//________________________________ Create either preview or whole page _________________________

//Hold off, just create preview
//makeSurvey($receivedSurveyJSON, true); //call surveyReconstructor.php function to make the page for us

//createSurveyContent($receivedSurveyJSON, true); //This loads the content only part, for previewing

//_________________________________________________________________________________________________





    //Test submiting JSON to a dummy JSON table, using given JSON and a dummy survey id



/*
$sqlCommand = 'INSERT INTO surveyjson (id, surveyId , surveyJSON) VALUES (NULL, "1234a56" ,  ? )';




if($stmt = $dbConnection->prepare($sqlCommand))
{
    $stmt->bind_param('s', $receivedSurveyJSON );
    $stmt->execute();
}
else{
    $error = $dbConnection->errno . ' ' . $dbConnection->error;
    echo $error; // 1054 Unknown column 'foo' in 'field list'
}

*/

//$sqlResult = mysqli_query($dbConnection, $sqlCommand);





//____________________________ Inserts the Received/Posted JSON in DB

//                                                                              VVVVV Dummy

// $sqlCommand = 'INSERT INTO surveyjson (id, surveyId , surveyJSON) VALUES (NULL, "1234a56" ,  ? )'; // ? is a place holder



// if($stmt = $dbConnection->prepare($sqlCommand)) //Check if sqlCommand is valid, returns true if no error in formating
// {
//     $stmt->bind_param('s', $receivedSurveyJSON ); //Bind the JSON varialbe receivedSurveyJSON to the place holder '?' ('s' stands for string, can place multiple place holder and use 'ssis...')
//     $stmt->execute(); //run the command
// }
// else{
//     $error = $dbConnection->errno . ' ' . $dbConnection->error;
//     echo $error; // 1054 Unknown column 'foo' in 'field list'
// }


//VVVVVVVVVVVVVVVVVVV DOesn't really work, use above instead

// $sqlCommand = "INSERT INTO surveyjson (surveyId , surveyJSON) VALUES (1234a56 ,  $receivedSurveyJSON )";

// $sqlResult = mysqli_query($dbConnection, $sqlCommand);

// $sqlResultFiltered = mysqli_fetch_all($sqlResult, MYSQLI_ASSOC);


// print_r($sqlResultFiltered);







//__________ This will grab the JSON, grab the only result (since limit row 1), and recreates page ______________________


/*

$sqlCommand = "SELECT surveyJSON FROM surveyjson LIMIT 1";//"INSERT INTO surveyjson (surveyId , surveyJSON) VALUES (1234a56 ,  $receivedSurveyJSON )";

$sqlResult = mysqli_query($dbConnection, $sqlCommand);


$sqlResultFiltered = ($sqlResult->fetch_row())[0];


*/


//Take the results from above and build a site from it

makeSurvey($receivedSurveyJSON, true);


