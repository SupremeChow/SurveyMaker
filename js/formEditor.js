import {addPrefabControlDiv, handleSaveForm, handleEditForm, handleMoveUpForm, handleMoveDownForm, handleRemoveForm} from './formMenuControl.js';
//import{} from './buttonEventHandlers.js'


import{createCheckBoxPrefab, handleCheckPrefabSubmit, CheckBox, CheckOption} from './checkBox.js'
import{createMultChoicePrefab, handleMultPrefabSubmit, MultipleChoice, MultOption} from './multipleChoice.js'
import{createSelectBoxPrefab, handleSelectPrefabSubmit, SelectBox, SelectOption} from './selectBox.js'
import{createShortAnswerPrefab, handleShortAnsPrefabSubmit, ShortAnswer} from './shortAns.js'
import{createShortParagraphPrefab, handleShortParaPrefabSubmit, ShortParagraph} from './shortPara.js'
import{createStarRatingPrefab, updateStarCount, StarRating} from './starRating.js'


//_____________________________________________________________________________________________________________		
//______________TODO------------------------------TODO--------------------TODO----------
//_____________________________________________________________________________________________________________

/** 
 * Better labeling a for inputs, especialy paragraph. Don't rely on defaults to explain what goes in input
Deleting items, moving (nice to have), duplication
Remove added options ie to multiple choice or selector box (important, but for now focus on getting whole system connected)
Provide require functionality and checker (nice to have)

Main: As classes are moved to seperate files, start implementing state of form tracking here.
    *track total forms in a list (to preserve order), allow remove and move buttons to update this list
    *provide a method that, on publish, will iterate through list and call toJSON() on objects
    * place those json output into a file to be (FINALLY) send to php back server to process for saving
    * Test resconstructing of page
    * Setup db to handle submission of survey JSON to save for reconstructing and formating answers
    * Setup and test allowing user to submit form

    * Change default labels to relevant Type+id# (nice to have)

    !!! setting the form type out of order (adding two empties, then setting the second to CHeck, first to para)
    !!! makes them appear out of counting order, assign form order on template select
    !!! the labels aren't too important, they are there as temp labels and to distinguish same types

    





        10/23 Early morning: Main fix now: 
            * Tie Publish button to creating JSON of state, and test pushing to php
            * everything else
            

        

*/

//_____________________________________________________________________________________________________________
//___________________________ Constants and variable Declarations__________ __________________________________
//_____________________________________________________________________________________________________________


//A prefab SelectBox for choosing which survey feature to add, which will then be replaced when selected
const selectBoxOptionTags = '<option value = "selectBox"> Select Box </option>' ;
const shortParagraphOptionTags = '<option value = "shortParagraph"> Short Paragraph </option>' ;
const shortAnswerOptionTags = '<option value = "shortAnswer"> Short Answer </option>' ;
const multipleChoiceOptionTags = '<option value = "multipleChoice"> Multiple Choice </option>' ;
const checkBoxOptionTags = '<option value = "checkBox"> Check Box </option>' ;
const starTags = '<option value = "starRating"> Star Rating </option>' ;

const formSelector = '<select class="formSelectorMenu creatorComponents"><option value = "" selected="selected">Select a form type</option>' + selectBoxOptionTags + shortParagraphOptionTags + shortAnswerOptionTags + multipleChoiceOptionTags + checkBoxOptionTags + starTags + ' </select><br>';
//const selectPrefab = '<form><select id="abcSelection"></select><input type="text" id="newOptionName" placeholder="AddOption" value=""><input type="button" class="addNewOptionButton" value="Add Option"></form>'

//A limit for max characters that the webhost/company will allow an author to set. Author is free to set it to less
const SURVEY_MAX_CHAR_LIMIT = 500;
//A limit to number of stars that the webhost/company will allow an author to set. Author is free to set it to less
const STAR_RATING_MAX_STAR_LIMIT = 10;

//images
const starImgPth = 'img/star.png'
const emptyStarImgPth = 'img/starEmpty.png';



//counters and IdIterators

let formCounterId = 0;   //For assigning id's to form fields, will not decrement on deletes, used mainly to handle main controls
let formCounter = 0;	//For tracking number of form fields, can decrement on deletes


let selectBoxIdCounter = 0; //For assigning id's to SelectBox & elements, will not decrement on deletes
let selectBoxCounter = 0;	//For tracking number of SelectBoxes, can decrement on deletes

let shortParagraphIdCounter = 0; //For assigning id's to shortParagraphs & elements, will not decrement on deletes
let shortParagraphCounter = 0;	//For tracking number of shortParagraphss, can decrement on deletes

let shortAnswerIdCounter = 0; //For assigning id's to shortAnswers & elements, will not decrement on deletes
let shortAnswerCounter = 0;	//For tracking number of shortAnswers, can decrement on deletes

let multipleChoiceIdCounter = 0; //For assigning id's to multipleChoice & elements, will not decrement on deletes
let multipleChoiceCounter = 0;	//For tracking number of multipleChoice, can decrement on deletes

let checkBoxIdCounter = 0; //For assigning id's to multipleChoice & elements, will not decrement on deletes
let checkBoxCounter = 0;	//For tracking number of multipleChoice, can decrement on deletes

let starIdCounter = 0; //For assigning id's to star rating & elements, will not decrement on deletes
let starCounter = 0;	//For tracking number of star, can decrement on deletes



//A list of forms, used to track what's added and order
//stick the form objects (their individual classes here)
let formList = [];



//_____________________________________________________________________________________________________________
//___________________________ Button Handlers for General Form Manipulation __________________________________
//_____________________________________________________________________________________________________________
//DO NOT MOVE TO FORM MENU CONTROLS! Need to alter state of formList from here

//save Button (leave edit mode)
$(document).on('click', '.saveButton', (callingButton) =>
{
    
    handleSaveForm($(callingButton.target));
});



//edit Button (bring back editing controls)
$(document).on('click', '.editButton', (callingButton) =>
{
    
    handleEditForm($(callingButton.target));
});




//moveUp Button
$(document).on('click', '.moveUpButton', (callingButton) =>
{
    let didMove = handleMoveUpForm($(callingButton.target));

    if(didMove)
    {

        //swap in main list
        let targetPos;
        formList.filter((aForm, index) => {

        if(aForm.idVal === $(callingButton.target).attr('formDivId'))
        {

            targetPos = index;
            //and change it's position value while here
            aForm.position = index - 1;
            return true;
        }
        return false;
            
        });


    

    
        //formList[targetPos-1] 
        let tempForm = formList.splice(targetPos, 1, formList[targetPos-1])[0];

        formList.splice(targetPos-1, 1, tempForm);

    
        formList[targetPos].position = targetPos;
        



 
    }
    
});





//moveDown Button
$(document).on('click', '.moveDownButton', (callingButton) =>
{
    
    let didMove = handleMoveDownForm($(callingButton.target));
    if(didMove)
    {
        //swap in main list
        let targetPos;
        formList.filter((aForm, index) => {

            if(aForm.idVal === $(callingButton.target).attr('formDivId'))
            {
                targetPos = index;
                //and change it's position value while here
                aForm.position = index + 1;
                return true;
            }
            return false;
            
        });

        //use Object.assign(target, source) to create copy
        let tempForm = formList.splice(targetPos,1,formList[targetPos+1])[0];


        formList.splice(targetPos+1, 1, tempForm);

        //..and update position of swapped element
        formList[targetPos].position = targetPos;


       
    }
});





//removeButton
$(document).on('click', '.removeButton', (callingButton) =>
{
    
    //Decrement relevant form counts
    if($(callingButton.target).hasClass('selectPrefabDiv'))
    {
        selectBoxCounter--;
    }
    else if($(callingButton.target).hasClass('shortParaPrefabDiv'))
    {
        shortParagraphCounter--;
    }
    else if($(callingButton.target).hasClass('shortAnsPrefabDiv'))
    {
        shortAnswerCounter--;
    }
    else if($(callingButton.target).hasClass('checkPrefabDiv'))
    {
        checkBoxCounter--;
    }
    else if($(callingButton.target).hasClass('multPrefabDiv'))
    {
        multipleChoiceCounter--;
    }
    else ($(callingButton.target).hasClass('starPrefabDiv'))
    {
        starCounter--;
    }


    //Before deleting, remove and shift all positions in formList
    //get Position in list
    let formId = $(callingButton.target).attr('formDivId');
    let position;
    let decrementFlag = false; //use this to signal the loop to decrement next elements
    formList.every((aForm, index) => {
        if(decrementFlag)
        {
            //decrement position values while in this loop
            aForm.position = index - 1;
        }
        if(aForm.idVal === (formId))
        {
            decrementFlag = true;
            position = index;
            
        }
        return true;
    });

    //if there trailing forms, do a splice
    if(position < formList.length-1)
    {
        
        let shiftedForms = formList.splice(position+1);
        formList.splice(position, 1, ...shiftedForms);
        
    }
    else
    {
        //else just pop
        formList.pop();
    }
        

    formCounter--;
    
    handleRemoveForm($(callingButton.target));


});



// ********** ___________VVVVVVVVVVVVVVVVV     All these handlers update the DOM state, so also update their coresponding object in formList


//_____________________________________________________________________________________________________________
//____________________________________ Handlers for Editing Form Properties ____________________________
//_____________________________________________________________________________________________________________

//Note: Things are sort of handled as if MVC, where first update view (jquery and html), then update changes to model (data in formList)
//One thing that could be done different is have the View actionHandler return values, instead of a boolean,
//which the model can use to adjust, rather than recall all the commands to get the same updated inputs.
//For now, too fat in, would be nice to change in future


//selectAddOptionButton
$(document).on('click', '.selectAddOptionButton', (callingButton) =>
{
    
    let hasChanged = handleSelectPrefabSubmit($(callingButton.target));

    if(hasChanged)
    {
        let inputOptionId = $(callingButton.target).attr('selectNewOptionId');
        let inputOptionValId = $(callingButton.target).attr('selectNewOptionValid');
    
    
        let newOption = $('#' + inputOptionId).val();
        let newOptionVal = $('#' + inputOptionValId).val();

        console.log(newOption, newOptionVal, '---------------');


        //update object data:  append option to checkOption


        formList.every((aForm, index) => {

            console.log(aForm.idVal, $(callingButton.target).parent('.formField').attr('id'));
            if(aForm.idVal === $(callingButton.target).parent('.formField').attr('id'))
            {
                let newSelectOption = new SelectOption(aForm.selectOptions.length, newOption, newOptionVal, false); 

                aForm.selectOptions.push(newSelectOption);
                console.log(aForm);
                
                return false;
            }
            return true;
            
        });
    }
});




$(document).on('click', '.shortParaChangeAttrButton ', (callingButton) =>
{
    
    let hasChanged = handleShortParaPrefabSubmit($(callingButton.target));

    if(hasChanged)
    {

        let placeHolderInputId = $(callingButton.target).attr("placeHolderId");
        let newPlaceHolder = $('#' + placeHolderInputId).val();

        let maxCharId = $(callingButton.target).attr("shortParaCharLimId");
        let newCharLim = $('#' + maxCharId).val();


    

        //update object data


        formList.every((aForm, index) => {
            if(aForm.idVal === $(callingButton.target).parent('.formField').attr('id'))
            {
                aForm.placeHolderText = newPlaceHolder;
                aForm.characterLim = newCharLim;
                
                return false;
            }
            return true;
            
        });
    }

});




$(document).on('click', '.shortAnsChangeAttrButton ', (callingButton) =>
{
    
    let hasChanged = handleShortAnsPrefabSubmit($(callingButton.target));
    if(hasChanged)
    {

        let placeHolderInputId = $(callingButton.target).attr("placeHolderId");
        let newPlaceHolder = $('#' + placeHolderInputId).val();

        let maxCharId = $(callingButton.target).attr("shortAnsCharLimId");
        let newCharLim = $('#' + maxCharId).val();


    

        //update object data


        formList.every((aForm, index) => {
            if(aForm.idVal === $(callingButton.target).parent('.formField').attr('id'))
            {
                
                
                aForm.placeHolderText = newPlaceHolder;
                aForm.characterLim = newCharLim;

                
                return false;
            }
            return true;
            
        });
    }

});




//both multPrefabSubmit and CheckPrefabSubmit are the same method, but we'll seperate them into coresponding js files to make them independent of eachother

$(document).on('click', '.multAddOptionButton', (callingButton) =>
{
    
    let hasChanged = handleMultPrefabSubmit($(callingButton.target));

    if(hasChanged)
    {
        let formId = $(callingButton.target).attr("formId"); 


        let optionNameId = $(callingButton.target).attr("multNewOptionId");
        let optionName = $('#' + optionNameId).val();
    
        let optionValueId = $(callingButton.target).attr("multNewOptionValId"); 
        let optionValue = $('#' + optionValueId).val();

        //update object data:  append option to checkOption


        formList.every((aForm, index) => {
            if(aForm.idVal === $(callingButton.target).parent('.formField').attr('id'))
            {
                let newMultOption = new MultOption(optionName+'_'+formId, aForm.multOptions.length, optionName, optionValue, false);

                aForm.multOptions.push(newMultOption);
                
                return false;
            }
            return true;
            
        });
    }
});


$(document).on('click', '.checkAddOptionButton ', (callingButton) =>
{
    
    let hasChanged = handleCheckPrefabSubmit($(callingButton.target));

    if(hasChanged)
    {
        let formId = $(callingButton.target).attr("formId"); 


        let optionNameId = $(callingButton.target).attr("multNewOptionId");
        let optionName = $('#' + optionNameId).val();
    
        let optionValueId = $(callingButton.target).attr("multNewOptionValId"); 
        let optionValue = $('#' + optionValueId).val();

        //update object data:  append option to checkOption


        formList.every((aForm, index) => {
            if(aForm.idVal === $(callingButton.target).parent('.formField').attr('id'))
            {
                let newMultOption = new CheckOption(optionName+'_'+formId, aForm.checkOptions.length, optionName, optionValue, false);

                aForm.checkOptions.push(newMultOption);
                
                return false;
            }
            return true;
            
        });
    }
});





//use to handle when updating number of stars for star rating
$(document).on('change', '.starCountInput', (event) => {

    
    //call updateStarCount, since this and on.input will need to be checked
    let numStars = updateStarCount(event, starImgPth, emptyStarImgPth);

    //update starCount of the relevant class
    // Also change the value of how many stars selected (selectedOption), value being 3 for numStars >= 3, numStars everything else



    formList.every((aForm, index) => {
        console.log(aForm.idVal, $(event.target).attr('formDivId')) ;
        if(aForm.idVal === $(event.target).attr('formDivId'))
        {
            console.log('matcher here...')
            aForm.numStars = numStars;
            console.log('numstar set as:, and excpeected: ', aForm.numStars, numStars);
            aForm.selectedOption = (numStars > 3) ? 3 : numStars;
            return false;
        }
        return true;
        
    });








});

//use this to handle star rating click (click lable image of star, update radio button), and setting data value
$(document).on('click', '.starButton', (event) => {

    

    let radioId = $(event.target).parent("label").attr("for");



    $('#' + radioId).click(); //click coresponding radio button

    //set clicked star as full star
    $(event.target).attr('src', starImgPth);
    //set previous sibling label images to full star
    $(event.target).parent().prevAll('label').each( (index, object) => {
        $(object).children('img').attr('src', starImgPth); 
    });
    //set fllowing sibling label images to full star
    $(event.target).parent().nextAll('label').each( (index, object) => {
        $(object).children('img').attr('src', emptyStarImgPth); 
    });


    let theFormDiv = $(event.target).parent().parent().parent('.formField').attr('id'); 

    formList.every((theFormObject) => {
        if(theFormObject.idVal !== theFormDiv)
            return true;
        else
        {    
            theFormObject.selectedOption = $('#'+ radioId).attr('value');
            return false;
        }
    });

});











//_____________________________________________________________________________________________________________
//___________________________________________  Helper Functions  __________________________________________________
//_____________________________________________________________________________________________________________



//TODO Tie updating title/questionHeader to updating object data


//TODO ----------------------- VVVVVVVVVVVVVVVVVVVVVVVVVVV  redundant i think, think i removed all buttons tied to updating title

//publishes the title when user submits changes
// const updateTitle = (callingButton)=> {

//     console.log("The button updating title",callingButton);
//     let titleInput = $(callingButton).siblings(".questionHeaderField").val();
//     console.log("finding title field ", titleInput);

//     $(callingButton).siblings(".questionHeader").text(titleInput);
// }


//------------------------------- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  




//_____________________________________________________________________________________________________________
//___________________________________________  Main handler  __________________________________________________
//_____________________________________________________________________________________________________________



//handle input event for updating label (TODO tie to other elements, for now just do for radio button)
$(document).on('input','.labelInput' , (event)=>{
    
        let currentWord = $(event.target).val();
        let updatingLabelId = $(event.target).attr("labelId");
        $('label#' + updatingLabelId).text(currentWord);

        //handle updating radio button /checkbox names as well if the label is followed by a div
        if($('label#' + updatingLabelId).next().is('div'))
        {
            $('label#' + updatingLabelId).next().children('input').attr('name', currentWord);
        }

        //use parent formDiv to get position, which can access to formList to update label variable (! if not paragraph, unless later inplement label for paragraph)
        let theFormDiv = $(event.target).parent('.formField').attr('id');
        formList.every((theFormObject) => {
            if(theFormObject.idVal !== theFormDiv)
                return true;
            else
            {    
                theFormObject.label = currentWord;
                return false;
            }
        });


    });	




//Handle input event for updating questionHeader
$(document).on('input','.questionHeaderField' , (event)=>{
    
    let currentWord = $(event.target).val();
    let updatingLabelId = $(event.target).attr("labelId");
    $('label#' + updatingLabelId).text(currentWord);

    //use parent formDiv to get position, which can access to formList to update Question/header variable (! if not paragraph, unless later inplement label for paragraph)
    let theFormDiv = $(event.target).parent('.formField').attr('id');
    formList.every((theFormObject) => {
        if(theFormObject.idVal !== theFormDiv)
            return true;
        else
        {    
            theFormObject.question = currentWord;
            return false;
        }
    });

});	










$(document).ready(() => {






    //When document changes because the user choose which type of form field to make
    $(document).on('change', '.formSelectorMenu', (theElement) => {

    

    //..leave these for now, it works and doesn't break what we have
    let targetSelector = theElement.target;

    //grab the formId and position before being destroyed
    let thisFormId = $(targetSelector).attr('formId');
    let thisFormPos = $(targetSelector).attr('formPos');

    let formSelected = $(targetSelector).val();

    let formDivId; //for keeping track where the new form field is being placed and manipulated



    switch(formSelected)
    {
        case "selectBox":
            
            formDivId = createSelectBoxPrefab(targetSelector, thisFormId, selectBoxIdCounter);
            let newSelect = new SelectBox(formDivId, thisFormPos, '', 'SelectBox'+selectBoxIdCounter);
            formList.splice(thisFormPos,1,newSelect);

            //Increment number of SelectBox counter
            selectBoxIdCounter++;
            selectBoxCounter++;
            $(".selectPrefabDiv").css({"border": "thin double black", "background-color": "rgba(0,100,150,0.15)", "margin" : "3px", "padding": "16px"});


            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, thisFormId);

          //  formCounterId++;
          //  formCounter++;
            
            break;

        case 'shortParagraph':
                
            formDivId = createShortParagraphPrefab(targetSelector, thisFormId, shortParagraphIdCounter, SURVEY_MAX_CHAR_LIMIT);

            //TODO, if decide to change mind and add a label for the paragraph, be sure to include with constructor
            let newShortPara = new ShortParagraph(formDivId, thisFormPos, '', SURVEY_MAX_CHAR_LIMIT, '');

            //formList.push(newShortPara);
            formList.splice(thisFormPos,1,newShortPara);

            //Increment number of SelectBox counter
            shortParagraphIdCounter++;
            shortParagraphCounter++;

            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, thisFormId);

          //  formCounterId++;
          //  formCounter++;

            break;



            //Same as short paragraph, except smaller text field and a label in front
        case 'shortAnswer':
            
            formDivId = createShortAnswerPrefab(targetSelector, thisFormId, shortAnswerIdCounter, SURVEY_MAX_CHAR_LIMIT);

            let newShortAns = new ShortAnswer(formDivId, thisFormPos, '', 'ShortAnswer'+shortAnswerIdCounter, SURVEY_MAX_CHAR_LIMIT, '');

            //formList.push(newShortAns);
            formList.splice(thisFormPos,1,newShortAns);

            //Increment number of SelectBox counter
            shortAnswerIdCounter++;
            shortAnswerCounter++;

            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, thisFormId);

          //  formCounterId++;
          //  formCounter++;

            break;



        case 'checkBox':
            formDivId=  createCheckBoxPrefab(targetSelector, thisFormId, checkBoxIdCounter);
            let newCheckBox = new CheckBox(formDivId, thisFormPos, '', 'CheckBox'+checkBoxIdCounter);

           // formList.push(newCheckBox);
           formList.splice(thisFormPos, 1, newCheckBox);

            checkBoxIdCounter++;
            checkBoxCounter++;

            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, thisFormId);

          //  formCounterId++;
          //  formCounter++;

            break;


        case 'multipleChoice':
            
            formDivId =  createMultChoicePrefab(targetSelector, thisFormId, multipleChoiceIdCounter);
            let newMultChoice = new MultipleChoice(formDivId, thisFormPos, '', 'MultipleChoice'+multipleChoiceIdCounter);

            //formList.push(newMultChoice);
            formList.splice(thisFormPos, 1, newMultChoice);


            multipleChoiceIdCounter++;
            multipleChoiceCounter++;

            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, thisFormId);

           // formCounterId++;
           // formCounter++;

            break;
            

            //handle like radio, except not adding options, just changing number of radio buttons
        case 'starRating':


            formDivId = createStarRatingPrefab(targetSelector, thisFormId, starIdCounter, starImgPth, emptyStarImgPth, STAR_RATING_MAX_STAR_LIMIT);

            let newStarRating = new StarRating(formDivId, thisFormPos, 5, 3, '', 'StarRating'+starIdCounter)
            //formList.push(newStarRating);
            formList.splice(thisFormPos, 1, newStarRating);

            //Increment number of SelectBox counter
            starIdCounter++;
            starCounter++;

            //Create div for save/edit/ 

            addPrefabControlDiv(formDivId, thisFormId);

           // formCounterId++;
           // formCounter++;

            break;


    }

    //Apply css
    $(".formField").css({"border": "thin double black", "background-color": "rgba(0,100,150,0.15)", "margin" : "3px", "padding": "16px"});
    $("form label").css({"font-weight" : "bold"});
    $("form .questionHeader").css({"font-size" : "30px","text-decoration" : "underline"});
    });









    //_____________________________________________________________________________________________________________
    //___________________________________________  Other Commands on Document.ready()  _________________________________
    //_____________________________________________________________________________________________________________

    



    // Add a new select box for deciding which prefab survey to create
    $('#newFormElementButton').click( (event) => {
        event.preventDefault();
        $('#newFormElementButton').before(formSelector);

        //Need to set a formId attribute, so that order of new forms added correctly
        //In a way, these are placeHolders in formList[]
        //Will need to filter/map the list when converting to JSON/Publishing to remove all placeholders and update order values
        $('#newFormElementButton').prevAll('.formSelectorMenu:first').attr('formId', formCounterId).attr('id', 'PlaceHolder_' + formCounterId).attr('formPos', formCounter).addClass('formField');

        //then push a blank object with relevant position and class (NOTE, use idVal, since not too relevant that it repeats, just need to set it so that we have placeholder)
        formList.push({idVal:'placeHolder', position: formCounter});


        formCounterId++;
        formCounter++;

        $(".formField").css({"border": "thin double black", "background-color": "rgba(0,100,150,0.15)", "margin" : "3px", "padding": "16px"});
        // //refresh footer
        // $('.footer').css('top', '100%');
    });


    


    //----------------   PUBLISH (TODO figure out)
    
    //This function should clear the author tools leaving a barebones page, and (somehow) convert DOM data to something like JSON
    //Which can be saved in MySQL so that the page can be re-rendered for survey use
    //Current Steps:
    //
    // 1) Clear author tools|
    // 2) Convert DOM to relevant data, and maybe move to JSON
    // 3) send to Server
    // 4) make php that can retrieve said data and reconstruct page, which can submit data back to php to turn in survey data


    $('#publishPageButton').click( (event) => {
        //Remove class .creatorComponents, which should be attached to everything that would edit the page
        //thus leaving the stripped down page

        //Apply any unpublished title
        

        $(".creatorComponents").remove(".creatorComponents"); //Kill all
        //Show any hidden components not killed
        $(".hideOnEdit").show();
        //remove publish button
        $("#publishPageButton").remove();

        

        //TESTING JSON


        let finalJSON = {
            "numForms" : formCounter,

            "numSelectBoxes" : selectBoxCounter, 
            "numParagraphs" : shortParagraphCounter,
            "numShortAnswers" :shortAnswerCounter, 
            "numMultipleChoice" : multipleChoiceCounter ,
            "numCheckBoxes" : checkBoxCounter, 
            "numStarRatings" : starCounter ,

            "SurveyList" : formList

        };

        console.log(finalJSON);

        const finalJSONString = JSON.stringify(finalJSON);

        //https://www.youtube.com/watch?v=mNrJDGfQGz0 Tell me what to do, oh wise video....
        const xhr = new XMLHttpRequest();
        xhr.open('POST','saveSurvey.php');
        xhr.setRequestHeader('Content-type', 'application/json'); //Note, if ambitious, figure out sending credentials and tokens from author
        xhr.send(finalJSONString); //It is done....


        
        //This button will 'Submit the survey', which we won't do when editing, so is removed
        //When recreating the survey after publishing, use php to add this back in to allow submission
       // $("form").append('<input type="submit" value="Submit Survey">');
    


    });




    
    
})

export {handleSaveForm, handleEditForm, handleMoveUpForm, handleMoveDownForm, handleRemoveForm, 
    handleSelectPrefabSubmit, handleShortParaPrefabSubmit, handleShortAnsPrefabSubmit, handleMultPrefabSubmit, 
    updateStarCount}; // Hold off on this, may be redundant updateTitle