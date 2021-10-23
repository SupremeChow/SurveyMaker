import {addPrefabControlDiv, handleSaveForm, handleEditForm, handleMoveUpForm, handleMoveDownForm, handleRemoveForm} from './formMenuControl.js';
//import{} from './buttonEventHandlers.js'


import{createCheckBoxPrefab, handleCheckPrefabSubmit, CheckBox, checkOption} from './checkBox.js'
import{createMultChoicePrefab, handleMultPrefabSubmit, MultipleChoice, MultOption} from './multipleChoice.js'
import{createSelectBoxPrefab} from './selectBox.js'
import{createShortAnswerPrefab} from './shortAns.js'
import{createShortParagraphPrefab} from './shortPara.js'
import{createStarRatingPrefab} from './starRating.js'


//_____________________________________________________________________________________________________________		
//______________TODO------------------------------TODO--------------------TODO----------
//_____________________________________________________________________________________________________________

/** 
 * Better labeling a for inputs, especialy paragraph. Don't rely on defaults to explain what goes in input
Deleting items, moving (nice to have), duplication
Remove added options ie to multiple choice or selector box
Provide require functionality and checker (nice to have)

Main: As classes are moved to seperate files, start implementing state of form tracking here.
    *track total forms in a list (to preserve order), allow remove and move buttons to update this list
    *provide a method that, on publish, will iterate through list and call toJSON() on objects
    * place those json output into a file to be (FINALLY) send to php back server to process for saving
    * Test resconstructing of page
    * Setup db to handle submission of survey JSON to save for reconstructing and formating answers
    * Setup and test allowing user to submit form

    * Change default labels to relevant Type+id#

    !!! setting the form type out of order (adding two empties, then setting the second to CHeck, first to para)
    !!! makes them appear out of counting order, assign form order on template select
    !!! the labels aren't too important, they are there as temp labels and to distinguish same types

    !! Changed so formTypeSelector gets the formCountId, and increments those values, then gets added
    !! to formList[] as placeHolders to preserve spot in list
    !! Will need to 
        1) implement setting relevant data to new chosen formType when placeholder is destroyed
        2) Handle looping through formList[] affecting placeholder

        currently, fixed move up/down, need to handle order with delete
        Right now, primarily setting up classes for rest of form types, finish that, then move to delete
        

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



//A list of forms, used to track what's added and order
//stick the form objects (their individual classes here)
let formList = [];



//_____________________________________________________________________________________________________________
//___________________________ Button Handlers for General Form Manipulation __________________________________
//_____________________________________________________________________________________________________________
//DO NOT MOVE TO FORMMENUCONTROLS! Need to alter state of formList from here

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
        console.log('checking list BEFORE move up...:', formList);

        //swap in main list
        let targetPos;
        let targetForm = formList.filter((aForm, index) => {

            console.log('Checking against : ', aForm.idVal, index);
            if(aForm.idVal === $(callingButton.target).attr('formDivId'))
            {
                targetPos = index;
                return true;
            }
            return false;
            
        });


    

    
        //formList[targetPos-1] 
        let tempForm = formList.splice(targetPos, 1, formList[targetPos-1])[0];

        console.log('the spliced removed', tempForm);

        console.log(' formList should only be one, the previous',formList);
        formList.splice(targetPos-1, 1, tempForm);






        console.log('checking list change up...:');

        formList.forEach((object, index) => {

            console.log('object, index : ', object, index);
        });
    }
    
});





//moveDown Button
$(document).on('click', '.moveDownButton', (callingButton) =>
{
    
    let didMove = handleMoveDownForm($(callingButton.target));
    if(didMove)
    {
        console.log('checking list BEFORE move down...:', formList);
        //swap in main list
        let targetPos;
        let targetForm = formList.filter((aForm, index) => {

            console.log('Checking against : ', aForm.idVal, index);
            if(aForm.idVal === $(callingButton.target).attr('formDivId'))
            {
                targetPos = index;
                return true;
            }
            return false;
            
        });

        //use Object.assign(target, source) to create copy
        let tempForm = formList.splice(targetPos,1,formList[targetPos+1])[0];

        
        console.log(' formList should only be two', formList);



        formList.splice(targetPos+1, 1, tempForm);





        console.log('checking list change down...:', formList);

        console.log('checking list change up...:');

        formList.forEach((object, index) => {

            console.log('object, index : ', object, index);
        });
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

    formCounter--;
    
    handleRemoveForm($(callingButton.target));
});



//_____________________________________________________________________________________________________________
//____________________________________ Handlers for Editing Form Properties ____________________________
//_____________________________________________________________________________________________________________



//selectAddOptionButton
$(document).on('click', '.selectAddOptionButton', (callingButton) =>
{
    
    handleSelectPrefabSubmit($(callingButton.target));
});

const handleSelectPrefabSubmit = (callingButton) => {
    
    let inputOptionId = $(callingButton).attr("selectnewoptionid");
    let inputOptionValId = $(callingButton).attr("selectnewoptionvalid");
    let selectBoxId = $(callingButton).attr("selectboxid");

    let selectLabelInputId = $(callingButton).attr("selectLabelInputId");
    let selectLabelId = $(callingButton).attr("selectLabelId");

    

    let newSelectLabel = $('#' + selectLabelInputId).val();
    let newOption = $('#' + inputOptionId).val();
    let newOptionVal = $('#' + inputOptionValId).val();

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
            $('#' + selectBoxId).append('<option value = ' + newOptionVal + ' >'+ newOption + '</option>');
            $('#' + inputOptionId).val("");
            $('#' + inputOptionValId).val("");
        }
        
    }

    /*
    //publish Title
    updateTitle(callingButton);
    //change label infront of selectBox
    $('#' + selectLabelId).text(newSelectLabel);
    */
        
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










//both multPrefabSubmit and CheckPrefabSubmit are the same method, but we'll seperate them into coresponding js files to make them independent of eachother

$(document).on('click', '.multAddOptionButton', (callingButton) =>
{
    
    handleMultPrefabSubmit($(callingButton.target));
});
$(document).on('click', '.checkAddOptionButton ', (callingButton) =>
{
    
    handleCheckPrefabSubmit($(callingButton.target));
});





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

    //grab the formId and position before being destroyed
    let thisFormId = $(targetSelector).attr('formId');
    let thisFormPos = $(targetSelector).attr('formPos');

    let formSelected = $(targetSelector).val();

    let formDivId; //for keeping track where the new form field is being placed and manipulated



    switch(formSelected)
    {
        case "selectBox":
            
            formDivId = createSelectBoxPrefab(targetSelector, thisFormId, selectBoxIdCounter);
            //let newSelect = new selectBoxCounter();
            //formList.push(newSelect);

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

            console.log('new check ', newCheckBox);


            formList.push(newCheckBox);

            console.log(formList);

            checkBoxIdCounter++;
            checkBoxCounter++;

            //Create div for save/edit/ 
            addPrefabControlDiv(formDivId, thisFormId);

          //  formCounterId++;
          //  formCounter++;

            break;


        case 'multipleChoice':
            
            formDivId =  createMultChoicePrefab(targetSelector, thisFormId, multipleChoiceIdCounter);
            let newMultChoice = new MultipleChoice(formDivId, thisFormPos, '', 'Mult'+multipleChoiceIdCounter);
            console.log('new Mult ',newMultChoice);

            formList.push(newMultChoice);

            console.log(formList);

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
        $('#newFormElementButton').prevAll('.formSelectorMenu:first').attr('formId', formCounterId).attr('id', 'PlaceHolder_' + formCounterId).attr('formPos', formCounter);

        formCounterId++;
        formCounter++;

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