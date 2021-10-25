<!-- This will act s the entry point users to fill out a survey. 
For now, assume that acces was made with a link with the correct survey
id included in something like a GET in the address bar

-->

<?php
include('surveyReconstructor.php'); //this builds our survey

//SurveyDB
$dbConnection = mysqli_connect('localhost', 'SurveyAuthor', 'ABC123**', 'TestSurveyDB');

//check connection
if(!$dbConnection)
{
    //ERROR... can't connect
    echo' ERROR! Failed to connect to db';
}
else
    //echo ' COnnected to DB';


//TODO, pretend the surveyId  link was taken from address bar, 
//like $theSurveyId = $GET_['surveyId'];


$dummySurveyId = 0;//Because survey id right now is just an integer that increments. Would use UUID if better built
//$theSurveyId = $GET_['surveyId'];


$sqlCommand = "SELECT surveyJSON FROM surveyjson LIMIT 1";
$sqlResult = mysqli_query($dbConnection, $sqlCommand);
$sqlResultFiltered = ($sqlResult->fetch_row())[0]; //Should only get one item, of one row


makeSurvey($sqlResultFiltered, false);






?>
