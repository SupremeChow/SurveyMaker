import {addPrefabControlDiv} from './formMenuControl.js';
//import{} from './buttonEventHandlers.js'

import{createStarRatingPrefab} from './starRating.js'
import{createCheckBoxPrefab} from './checkBox.js'
import{createMultChoicePrefab} from './multipleChoice.js'
import{createSelectBoxPrefab} from './selectBox.js'
import{createShortAnswerPrefab} from './shortAns.js'
import{createShortParagraphPrefab} from './shortPara.js'


//_____________________________________________________________________________________________________________		
//______________TODO------------------------------TODO--------------------TODO----------
//_____________________________________________________________________________________________________________


//Better labeling a for inputs, especialy paragraph. Don't rely on defaults to explain what goes in input
//Deleting items, moving (nice to have), duplication
//Remove added options ie to multiple choice or selector box
//Provide require functionality and checker



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

const formSelector = '<select class="formSelectorMenu creatorComponents"><option value = "" selected="selected">Select a form type</option>' + selectBoxOptionTags + shortParagraphOptionTags + shortAnswerOptionTags + multipleChoiceOptionTags + checkBoxOptionTags + starTags + ' </select> <br>';
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


//_____________________________________________________________________________________________________________
//___________________________ Button Handlers for General Form Manipulation __________________________________
//_____________________________________________________________________________________________________________


//selectAddOptionButton
$(document).on('click', '.saveButton', (callingButton) =>
{
    
    handleSaveForm($(callingButton.target));
});


const handleSaveForm = (callingButton) => {

    let formDivId = $(callingButton).attr("formDivId");
    //let fieldQuestion = $(formDivId + " .questionHeaderField").val();

    //$(formDivId + " label.questionHeader").text(fieldQuestion);

    $(formDivId).children(".showOnEdit").hide();
    $(formDivId).children(".hideOnEdit").show();

    //$(formDivId + " input:last").show();
    $(formDivId).next().children(".showOnEdit").hide();
    $(formDivId).next().children(".hideOnEdit").show();
}


//selectAddOptionButton
$(document).on('click', '.editButton', (callingButton) =>
{
    
    handleEditForm($(callingButton.target));
});

const handleEditForm = (callingButton) => {

    let formDivId = $(callingButton).attr("formDivId");

    $(formDivId).children(".showOnEdit").show();
    $(formDivId).children(".hideOnEdit").hide();

    $(formDivId).next().children(".showOnEdit").show();
    $(formDivId).next().children(".hideOnEdit").hide();
}	


//selectAddOptionButton
$(document).on('click', '.moveUpButton', (callingButton) =>
{
    
    handleMoveUpForm($(callingButton.target));
});


const handleMoveUpForm = (callingButton) => {
    let formId = $(callingButton).attr('formDivId');
    let formControlId = $(formId).next('.prefabControlsDiv').attr('id');

    let previousFormId = $(formId).prevAll('.formField:first').attr('id');

    


    //check if forms are there and if true, swap

    if(previousFormId != '')
    {
        $(formId).insertBefore('#'+ previousFormId);
        $('#' + formControlId).insertAfter(formId);
    }
}


//selectAddOptionButton
$(document).on('click', '.moveDownButton', (callingButton) =>
{
    
    handleMoveDownForm($(callingButton.target));
});

const handleMoveDownForm = (callingButton) => {
    let formId = $(callingButton).attr('formDivId');
    

    let nextFormId = $(formId).nextAll('.formField:first').attr('id');
    let otherFormControlId = $('#' + nextFormId).next('.prefabControlsDiv').attr('id');


    //check if forms are there and if true, swap

    if(nextFormId != '')
    {
        $('#'+ nextFormId).insertBefore(formId);
        $('#' + otherFormControlId).insertAfter('#'+ nextFormId);
    }

}



//selectAddOptionButton
$(document).on('click', '.removeButton', (callingButton) =>
{
    
    handleRemoveForm($(callingButton.target));
});

const handleRemoveForm = (callingButton) => {
    let formId = $(callingButton).attr('formDivId');
    let formControlId = $(formId).next('.prefabControlsDiv').attr('id');

    //Decrement relevant form counts
    if($(formId).hasClass('selectPrefabDiv'))
    {
        selectBoxCounter--;
    }
    else if($(formId).hasClass('shortParaPrefabDiv'))
    {
        shortParagraphCounter--;
    }
    else if($(formId).hasClass('shortAnsPrefabDiv'))
    {
        shortAnswerCounter--;
    }
    else if($(formId).hasClass('checkPrefabDiv'))
    {
        checkBoxCounter--;
    }
    else if($(formId).hasClass('multPrefabDiv'))
    {
        multipleChoiceCounter--;
    }
    else ($(formId).hasClass('starPrefabDiv'))
    {
        starCounter--;
    }

    formCounter--;


    $(formId).remove();
    $('#' + formControlId).remove();
}

//_____________________________________________________________________________________________________________
//____________________________________ Handlers for Editing Form Properties ____________________________
//_____________________________________________________________________________________________________________



//selectAddOptionButton
$(document).on('click', '.selectAddOptionButton', (callingButton) =>
{
    
    handleSelectPrefabSubmit($(callingButton.target));
});

const handleSelectPrefabSubmit = (callingButton) => {
    console.log(callingButton);
    console.log($(callingButton).attr("selectnewoptionid"));
    let inputOptionId = $(callingButton).attr("selectnewoptionid");
    let inputOptionValId = $(callingButton).attr("selectnewoptionvalid");
    let selectBoxId = $(callingButton).attr("selectboxid");

    let selectLabelInputId = $(callingButton).attr("selectLabelInputId");
    let selectLabelId = $(callingButton).attr("selectLabelId");

    

    let newSelectLabel = $('#' + selectLabelInputId).val();
    let newOption = $('#' + inputOptionId).val();
    let newOptionVal = $('#' + inputOptionValId).val();
    console.log(newOption);
    if(newOption !== "")
    {
        if($('#' + selectBoxId + " option").first().val() == "ReplaceDefault")
        {
            $('#' + selectBoxId + " option").replaceWith('<option value = ' + newOptionVal + ' >'+ newOption + '</option>');
            $('#' + inputOptionId).val("");
            $('#' + inputOptionValId).val("");
        }
        else
        {
            console.log("appending to... :#", selectBoxId);
            $('#' + selectBoxId).append('<option value = ' + newOptionVal + ' >'+ newOption + '</option>');
            $('#' + inputOptionId).val("");
            $('#' + inputOptionValId).val("");
        }
        
    }

    //publish Title
    updateTitle(callingButton);
    //change label infront of selectBox
    $('#' + selectLabelId).text(newSelectLabel);
        
}





$(document).on('click', '.shortParaChangeAttrButton ', (callingButton) =>
{
    
    handleShortParaPrefabSubmit($(callingButton.target));
});


const handleShortParaPrefabSubmit = (callingButton) => {

    console.log(callingButton);
    
    let placeHolderInputId = $(callingButton).attr("placeHolderId");
    let maxCharId = $(callingButton).attr("shortParaCharLimId");
    let shortParaTextAreaId = $(callingButton).attr("shortParaId");


    let newPlaceHolder = $('#' + placeHolderInputId).val();
    let newCharLim = $('#' + maxCharId).val();

    

    //Check if valid number (should already be caught since already set max and min and set type to 'number', but just to be sure...)
    if($.isNumeric(newCharLim))
    {
        //Replace placeholder in textArea as well since alls well
        $('#' + shortParaTextAreaId).attr("placeholder", newPlaceHolder);
        $('#' + shortParaTextAreaId).attr("max", newCharLim);
    }
        
    else
    {
        $(callingButton).hide();
        $('#' + maxCharId).css({"border": "thin double red", "background-color": "rgba(250,170,170,0.65)", "border-radius": "4px"}).after("<span>Please provide a valid number</span>");
        
        //Because Jquery can't animate color by default(?) use timeout instead of importing another library
        setTimeout(() =>{
            $('#' + maxCharId).css({"border": "", "background-color": "", "border-radius": ""}).next().remove();
            $(callingButton).show();
        }, 2000);
        
    
    }
    
    //publish Title
    updateTitle(callingButton);
    //Won't clear text fields, they are used to change, not add to the form field
}






$(document).on('click', '.shortAnsChangeAttrButton ', (callingButton) =>
{
    
    handleShortAnsPrefabSubmit($(callingButton.target));
});



//Similar to Short paragraph, but with preleading label for input and shorter input field
const handleShortAnsPrefabSubmit = (callingButton) => {

    console.log(callingButton);
    
    let placeHolderInputId = $(callingButton).attr("placeHolderId");
    let maxCharId = $(callingButton).attr("shortAnsCharLimId");
    let shortAnsLabelInputId = $(callingButton).attr("shortAnsLabelInputId");

    let shortAnsTextAreaId = $(callingButton).attr("shortAnsId");
    //let inputLabelId = $(callingButton).attr("shortAnsLabelId");


    let newPlaceHolder = $('#' + placeHolderInputId).val();
    let newCharLim = $('#' + maxCharId).val();
    let newInputLabel = $('#' + shortAnsLabelInputId).val();

    

    //Check if valid number (should already be caught since already set max and min and set type to 'number', but just to be sure...)
    if($.isNumeric(newCharLim))
    {
        //Replace placeholder in textArea as well since alls well
        $('#' + shortAnsTextAreaId).attr("placeholder", newPlaceHolder);
        $('#' + shortAnsTextAreaId).attr("max", newCharLim);

        //change label infront of text field
        //$('#' + inputLabelId).text(newInputLabel);
    }
        
    else
    {
        $(callingButton).hide();
        $('#' + maxCharId).css({"border": "thin double red", "background-color": "rgba(250,170,170,0.65)", "border-radius": "4px"}).after("<span>Please provide a valid number</span>");
        
        //Because Jquery can't animate color by default(?) use timeout instead of importing another library
        setTimeout(() =>{
            $('#' + maxCharId).css({"border": "", "background-color": "", "border-radius": ""}).next().remove();
            $(callingButton).show();
        }, 2000);
        
    
    }

    //publish Title
    updateTitle(callingButton);
    
    //Won't clear text fields, they are used to change, not add to the form field
}











$(document).on('click', '.multAddOptionButton, .checkAddOptionButton ', (callingButton) =>
{
    handleMultPrefabSubmit($(callingButton.target));
});

const handleMultPrefabSubmit = (callingButton) => {



    let formId = $(callingButton).attr("formId"); //We'll use this to id each new input so that they are unique but related to form
    console.log('Multiple choice: ');

    let formType = $(callingButton).attr("formType");
    

    let labelId =  $(callingButton).attr("labelId");
    let currentGroupName = $('#'+labelId).text();

    let radioDivId = $(callingButton).attr("multipleChoiceId");
    

    let optionNameId = $(callingButton).attr("multNewOptionId");
    let optionName = $('#' + optionNameId).val();

    let optionValueId = $(callingButton).attr("multNewOptionValId"); 
    let optionValue = $('#' + optionValueId).val();




    //Should check if label is set
    if(currentGroupName != '' && optionName != '' && optionValue != '')
    {
        
        $('#' + radioDivId)
        .append('<input type="'+formType+'" id="' + optionName +'_'+ formId + '" name="' + currentGroupName + ' " value="' + optionValue + '" >')
        .append('<label for="' + optionName +'_'+ formId + '">'+ optionName +'</label>'); 

    }
    else
    {
        //animate error on label field

        //$(callingButton).hide();
        $(callingButton).css({"border": "thin double red", "background-color": "rgba(250,170,170,0.65)", "border-radius": "4px"}).after("<span>Inputs are invalid/missing</span>");
        
        //Because Jquery can't animate color by default(?) use timeout instead of importing another library
        setTimeout(() =>{
            $(callingButton).css({"border": "", "background-color": "", "border-radius": ""}).next().remove();
            //$(callingButton).show();
        }, 2000);
    }

    console.log(callingButton);
    
}


const updateStarCount = (event) =>{

    let chosenImage;
    let newNumStars = $(event.target).val();
    let thisStarId = $(event.target).siblings('.starRatingDiv').attr('idCounter');

    let tempLabel = $('#starLabel_' + thisStarId).text() + '_' + thisStarId;

    //Will remove old list of stars in div, and add new ones

    $(event.target).siblings('.starRatingDiv').empty();

    //loop through and add new starts

    for(let i = 0; i < newNumStars; i++)
            {
                chosenImage = (i <= 3)? starImgPth : emptyStarImgPth;
                //add an input of type 'radio', with relavant attributes. Make display:none so that only label shows, thus providing an image to click
                $(event.target).siblings('.starRatingDiv')
                .append('<input type="radio" id="starRating_'+ thisStarId+'_' + i + '" name="' + tempLabel + '" value="'+ i +'" style="visibility:hidden">')  
                .append('<label for="starRating_'+ thisStarId+'_' + i + '"><img class="starButton" src="'+ chosenImage +'"  width="20" height="20"></img></label>'); 
            }

}









//_____________________________________________________________________________________________________________
//___________________________________________  Helper Functions  __________________________________________________
//_____________________________________________________________________________________________________________




//publishes the title when user submits changes
const updateTitle = (callingButton)=> {

    console.log("The button updating title",callingButton);
    let titleInput = $(callingButton).siblings(".questionHeaderField").val();
    console.log("finding title field ", titleInput);

    $(callingButton).siblings(".questionHeader").text(titleInput);
}







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
    });	




//Handle input event for updating questionHeader
$(document).on('input','.questionHeaderField' , (event)=>{
    
    let currentWord = $(event.target).val();
    let updatingLabelId = $(event.target).attr("labelId");
    $('label#' + updatingLabelId).text(currentWord);
});	



//use this to handle star rating click (click lable image of star, update radio button)
$(document).on('click', '.starButton', (event) => {

    

    let radioId = $(event.target).parent("label").attr("for");



    $('#' + radioId).click(); //click coresponding radio button

    //set clicked star as full star
    $(event.target).attr('src', starImgPth);
    //set previous sibling label images to full star
    $(event.target).parent().prevAll('label').each( (index, object) => {
        console.log(object);
        console.log();
        $(object).children('img').attr('src', starImgPth); 
    });
    //set fllowing sibling label images to full star
    $(event.target).parent().nextAll('label').each( (index, object) => {
        $(object).children('img').attr('src', emptyStarImgPth); 
    });


});



//use to handle when updating number of stars for star rating
$(document).on('change', '.starCountInput', (event) => {
    
    //call updateStarCount, since this and on.input will need to be checked
    updateStarCount(event);

});




    

//TODO place keypress handle for other fields that don't need to be submitted
//ie, for now focus on star rating and number of stars
//later, things unhandled lie default text, char count, etc
//anything really  that isn't submitting options


$(document).ready(() => {






    //When document changes because the user choose which type of form field to make
    $(document).on('change', '.formSelectorMenu', (theElement) => {

    //..leave these for now, it works and doesn't break what we have
    let targetSelector = theElement.target;

    let formSelected = $(targetSelector).val();

    let formDivId; //for keeping track where the new form field is being placed and manipulated



    switch(formSelected)
    {
        case "selectBox":
            
            formDivId = createSelectBoxPrefab(targetSelector, formCounterId, selectBoxIdCounter);

            //Increment number of SelectBox counter
            selectBoxIdCounter++;
            selectBoxCounter++;
            $(".selectPrefabDiv").css({"border": "thin double black", "background-color": "rgba(0,100,150,0.15)", "margin" : "3px", "padding": "16px"});


            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, formCounterId);

            formCounterId++;
            formCounter++;
            
            break;

        case 'shortParagraph':
                
            formDivId = createShortParagraphPrefab(targetSelector, formCounterId, shortParagraphIdCounter, SURVEY_MAX_CHAR_LIMIT);
            //Increment number of SelectBox counter
            shortParagraphIdCounter++;
            shortParagraphCounter++;

            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, formCounterId);

            formCounterId++;
            formCounter++;

            break;



            //Same as short paragraph, except smaller text field and a label in front
        case 'shortAnswer':
            
            formDivId = createShortAnswerPrefab(targetSelector, formCounterId, shortAnswerIdCounter, SURVEY_MAX_CHAR_LIMIT);

            //Increment number of SelectBox counter
            shortAnswerIdCounter++;
            shortAnswerCounter++;

            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, formCounterId);

            formCounterId++;
            formCounter++;

            break;



        case 'checkBox':
            formDivId=  createCheckBoxPrefab(targetSelector, formCounterId, checkBoxIdCounter);

            checkBoxIdCounter++;
            checkBoxCounter++;

            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, formCounterId);

            formCounterId++;
            formCounter++;

            break;


        case 'multipleChoice':
            
            formDivId =  createMultChoicePrefab(targetSelector, formCounterId, multipleChoiceIdCounter);

            multipleChoiceIdCounter++;
            multipleChoiceCounter++;

            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, formCounterId);

            formCounterId++;
            formCounter++;

            break;
            

            //handle like radio, except not adding options, just changing number of radio buttons
        case 'starRating':


            formDivId = createStarRatingPrefab(targetSelector, formCounterId, starIdCounter, starImgPth, emptyStarImgPth, STAR_RATING_MAX_STAR_LIMIT);


            //Increment number of SelectBox counter
            starIdCounter++;
            starCounter++;

            //Create div for save/edit/ 

            addPrefabControlDiv(formDivId, formCounterId);

            formCounterId++;
            formCounter++;

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
        $("#newFormElementButton").before(formSelector);

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

        /* hold off on this, not working TODO TODO TODO
        //remove any empty space from non titles or labels
        $('label').each(()=>{

            console.log('tagname: ', $(this).prop('tagName'));
            if($(this).text() == "" || $(this).val() == "")
            {
                
                console.log('Bawleeted!');
                $(this).remove(this);
            }
                
        });

        //remove concuring <br>
        $('br').each(()=>{
            //console.log('nodename: ', $(this).prop('tagName'));
            if($(this).next().prop('tagName') == 'br')
                $(this).remove(this);
        });
        */

        $("form").append('<input type="submit" value="Submit Survey">');//'<buton type="submit" form="formStart">Submit Survey</button>');
    
        //..then, maybe at end place button that will actually submit form

        //then create json/data that will be sent to server to be save...
    });




    
    
})

export {handleSaveForm, handleEditForm, handleMoveUpForm, handleMoveDownForm, handleRemoveForm, 
    handleSelectPrefabSubmit, handleShortParaPrefabSubmit, handleShortAnsPrefabSubmit, handleMultPrefabSubmit, 
    updateStarCount, updateTitle};