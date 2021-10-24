<!--
    This php file will handle receiving and parsing the JSON data for creating the survey.

    For now, steps are:
    1) Get JSON, and just print | √
    2) Deconstruct JSON into components, then...| ~√ ( parsed, but didn't break into parts that could be individual variables. Stick with saving JSON in mysql for now)
    3) Rebuild the survey | ~ √ (Main strucutre there, but no css or submit button (see next requirement))
    4) Rebuild survey with submit button to submit form | ...
    5) handle saving JSON to mysql |...
    6) Setup mysql to take in responses from user | ...
    7) Set up system, author creates, saves, gets put into json and placed in mysql, allow user to go to page that will call json
        data and get rebuilt into the webpage survey for submission | ...

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

//include('formFieldMaker.php'); //Include the php functions for creating the fields
include('surveyReconstructor.php');




//_____________________Handle Receiving JSON of published survey




/*
    //Example of using XMLRequest to send the data
    //Originally used to send the JSON here, but could use to post to server

    const finalJSONString = JSON.stringify(finalJSON);

        //https://www.youtube.com/watch?v=mNrJDGfQGz0 Tell me what to do, oh wise video....
        const xhr = new XMLHttpRequest();
        xhr.open('POST','saveSurvey.php');
        xhr.setRequestHeader('Content-type', 'application/json'); //Note, if ambitious, figure out sending credentials and tokens from author
        xhr.send(finalJSONString); //It is done....


*/ 




//better for JSON (?)
$receivedSurveyJSON = file_get_contents('php://input'); //grab the POST'ed JSON string

//Don't use this, not great for JSON (i think?), better for just POSTing Survey (ie key-value pair list)
//ie, notice the key would be 'surveyJSON', and the value would be HUUUUGGGEEE. No ideal, no?
//$receivedSurveyJSON = $_POST['surveyJSON'];



//Hold off, just create preview
//makeSurvey($receivedSurveyJSON, true); //call surveyReconstructor.php function to make the page for us

createSurveyContent($receivedSurveyJSON, true); //This loads the content only part, for previewing

//Now that we got the JSON, have tested rendering the full survey, and provided a preview for author, move to saving

//Next step, just save the json to DB, so that on load, just call makeSurve($dbJSON, false);



// console.log($surveyJSON);

//debug
//var_dump($totalForms);
