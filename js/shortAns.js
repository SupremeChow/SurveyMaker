/** 
 * 
 * Class and methods related to ShortAnswer form
 * 
 */

class ShortAnswer 
{
    idVal;
    position;
    question;
    label; 
    characterLim;
    placeHolderText;

    constructor(idVal, position, question, label, characterLim, placeHolderText )
    {
        this.idVal = idVal;
        this.position = position;
        this.question = question;
        this.label = label;
        this.characterLim = characterLim;
        this.placeHolderText = placeHolderText;
    }

    //____________________________________________ setters _________________________________

    set idVal(newIdVal){this._idVal = newIdVal;}
    set position(newPosition){this._position = newPosition;}
    set question(newQuestion){this._question = newQuestion;}
    set label(newLabel){this._label = newLabel;}
    set characterLim(newCharLim){this._characterLim = newCharLim;}
    set placeHolderText(newPlaceHolder){this._placeHolderText = newPlaceHolder;}


    //____________________________________________ getters _________________________________

    get idVal(){return this._idVal}
    get position(){return this._position}
    get question(){return this._question}
    get label(){return this._label}
    get characterLim(){return this._characterLim}
    get placeHolderText(){return this._placeHolderText}

    //__________________________________________ Other Methods and functions ________________

    toJSON()
    {
        return {
            idVal : this.idVal,
            position : this.position,
            question : this.question,
            label : this.label,
            characterLim : this.characterLim,
            placeHolderText : this.placeHolderText
        };

    }
}





const createShortAnswerPrefab = (targetSelector, formCounterId, shortAnswerIdCounter, SURVEY_MAX_CHAR_LIMIT) =>{
    let formDivId;

    //Insert Div for the shortParagraph Section
    $(targetSelector).replaceWith('<div formId = form_"'+ formCounterId +'" class="shortAnsPrefabDiv formField" id="shortAnsPrefabDiv_' + shortAnswerIdCounter + '"></div>');
    formDivId = 'shortAnsPrefabDiv_' + shortAnswerIdCounter;

    //Add Text input to set question
    $('#'+formDivId)
    .append('<input type="text" class="showOnEdit questionHeaderField creatorComponents" id="shortAnsQuestionField_' + shortAnswerIdCounter + '" labelId="shortAnsQuestionLabel_' + shortAnswerIdCounter + '" placeholder="Place question Here"><br>');

    //Add the question 
    $('#'+formDivId)
    .append('<label class="questionHeader" id="shortAnsQuestionLabel_' + shortAnswerIdCounter + '" for="shortAnsTextArea_' + shortAnswerIdCounter + '"></label><br><br>');
    

    //Add the label infront of the text field
    $('#'+formDivId)
    .append('<label id="shortAnsLabel_' + shortAnswerIdCounter + '" for="shortAnsTextArea_' + shortAnswerIdCounter + '">ShortAnswer'+shortAnswerIdCounter+'</label>');
    

    //Add the TextField (Does nothing, there for viewing purposes and showing Author defaults if any) (while size is set here, its assume that text area can be resizeable from user)
    $('#'+formDivId)
    .append('<input type="text" id="shortAnsTextArea_' + shortAnswerIdCounter + '" name="shortAns_' + shortAnswerIdCounter + '" placeholder="Placeholder Text"  maxlength="'+ SURVEY_MAX_CHAR_LIMIT +'"><br>');



    //Add text input for changing input field label
    $('#'+formDivId)
    .append('<input type="text" class="showOnEdit creatorComponents labelInput" id="shortAnsLabelInput_'+ shortAnswerIdCounter +'" labelId="shortAnsLabel_' + shortAnswerIdCounter + '" placeholder="Change Label:">');

    //Add text input for changing placeholder textbox message
    $('#'+formDivId)
    .append('<input type="text" class="showOnEdit creatorComponents" id="shortAnsDefaultMes_'+ shortAnswerIdCounter +'" placeholder="Change placeholder message">');

    //Add text input for character limit
    $('#'+formDivId)
    .append('<input type="number" class="showOnEdit creatorComponents" id="shortAnsCharLimit_'+ shortAnswerIdCounter +'" placeholder="Enter character Limit (max '+ SURVEY_MAX_CHAR_LIMIT +')" max = "'+ SURVEY_MAX_CHAR_LIMIT +'" min = "0">');

    //Add button that will add options to ShortAnswer. Holds ShortAnswer textfield and relevant input id's to access them
    $('#'+formDivId)
    .append('<input type="button" class="shortAnsChangeAttrButton showOnEdit creatorComponents" id="shortAnswChangeAttrButton_'+ shortAnswerIdCounter+'" shortAnsId="shortAnsTextArea_' + shortAnswerIdCounter + '" placeHolderId="shortAnsDefaultMes_' + shortAnswerIdCounter + '" shortAnsCharLimId="shortAnsCharLimit_'+ shortAnswerIdCounter +'" value="Apply Options" >');

    return formDivId;
}

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

        return true;

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
        
        return false;
    
    }

    //publish Title
   // updateTitle(callingButton);
    
    //Won't clear text fields, they are used to change, not add to the form field
}

export{createShortAnswerPrefab, handleShortAnsPrefabSubmit, ShortAnswer};