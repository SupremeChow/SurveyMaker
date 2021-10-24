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
-->
<?php

$receivedSurveyJSON = file_get_contents('php://input'); //grab the POST'ed JSON string

//Decode back into an object file
$surveyJSON = json_decode($receivedSurveyJSON, false);

// console.log($surveyJSON);

//debug
var_dump($surveyJSON);
