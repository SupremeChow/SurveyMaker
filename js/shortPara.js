/** 
 * 
 * Class and methods related to ShortParagraph form
 * 
 */

 class ShortParagraph 
 {
    formType='ShortParagraph';
    idVal;
    position;
    question;
    //label; //Didn't use label before, may not need, but keep here if prudent to add one
    characterLim;
    placeHolderText;

    constructor(idVal, position, question, characterLim, placeHolderText )
    {
        this.idVal = idVal;
        this.position = position;
        this.question = question;
        //this.label = label;
        this.characterLim = characterLim;
        this.placeHolderText = placeHolderText;
    }

    //____________________________________________ setters _________________________________
 
    set idVal(newIdVal){this._idVal = newIdVal;}
    set position(newPosition){this._position = newPosition;}
    set question(newQuestion){this._question = newQuestion;}
    //set label(newLabel){this._label = newLabel;}
    set characterLim(newCharLim){this._characterLim = newCharLim;}
    set placeHolderText(newPlaceHolder){this._placeHolderText = newPlaceHolder;}
 
 
    //____________________________________________ getters _________________________________

    get type(){return this._formType }
    get idVal(){return this._idVal;}
    get position(){return this._position;}
    get question(){return this._question;}
    //get label(){return this._label}
    get characterLim(){return this._characterLim;}
    get placeHolderText(){return this._placeHolderText;}

    //__________________________________________ Other Methods and functions ________________

    toJSON()
    {
        return {
            formType : this.formType,
            idVal : this.idVal,
            position : this.position,
            question : this.question,
            //label : this._label,
            characterLim : this.characterLim,
            placeHolderText : this.placeHolderText
        };

    }
 }
 





const createShortParagraphPrefab = (targetSelector, formCounterId, shortParagraphIdCounter, SURVEY_MAX_CHAR_LIMIT) =>{
    let formDivId;

    //Insert Div for the shortParagraph Section
    $(targetSelector).replaceWith('<div formId = form_"'+ formCounterId +'" class="shortParaPrefabDiv formField" id="shortParaPrefabDiv_' + shortParagraphIdCounter + '"></div>');
    formDivId = 'shortParaPrefabDiv_' + shortParagraphIdCounter;



    //Add Text input to set question
    $('#'+formDivId)
    .append('<input type="text" class="showOnEdit questionHeaderField creatorComponents" id="shortParaQuestionField_' + shortParagraphIdCounter + '" labelId="shortParaQuestionLabel_' + shortParagraphIdCounter + '" placeholder="Place question Here"><br>');


    //Add  the question 
    $('#'+formDivId)
    .append('<label class="questionHeader" id="shortParaQuestionLabel_' + shortParagraphIdCounter + '" for="shortParaTextArea_' + shortParagraphIdCounter + '"></label><br><br>');
    


    //Add the TextField (Does nothing, there for viewing purposes and showing Author defaults if any) (while size is set here, its assume that text area can be resizeable from user)
    $('#'+formDivId)
    .append('<textarea id="shortParaTextArea_' + shortParagraphIdCounter + '" name="shortPara_' + shortParagraphIdCounter + '" placeholder="Placeholder Text" rows="5" cols="64" maxlength="'+ SURVEY_MAX_CHAR_LIMIT +'"></textarea><br>');




    //Add text input for changing placeholder textbox message
    $('#'+formDivId)
    .append('<input type="text" class="showOnEdit creatorComponents" id="shortParaDefaultMes_'+ shortParagraphIdCounter +'" placeholder="Change placeholder message">');

    //Add text input for character limit
    $('#'+formDivId)
    .append('<input type="number" class="showOnEdit creatorComponents" id="shortParaCharLimit_'+ shortParagraphIdCounter +'" placeholder="Enter character Limit (max '+ SURVEY_MAX_CHAR_LIMIT +')" max = "'+ SURVEY_MAX_CHAR_LIMIT +'" min = "0">');

    //Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
    $('#'+formDivId)
    .append('<input type="button" class="shortParaChangeAttrButton showOnEdit creatorComponents" id="shortParawChangeAttrButton_'+ shortParagraphIdCounter+'" shortParaId="shortParaTextArea_' + shortParagraphIdCounter + '" placeHolderId="shortParaDefaultMes_' + shortParagraphIdCounter + '" shortParaCharLimId="shortParaCharLimit_'+ shortParagraphIdCounter +'" value="Apply Options">');

    return formDivId;
}

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

        return true;
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
    //updateTitle(callingButton);
    //Won't clear text fields, they are used to change, not add to the form field
}

export{createShortParagraphPrefab, handleShortParaPrefabSubmit, ShortParagraph};