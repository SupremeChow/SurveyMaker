

const createShortAnswerPrefab = (targetSelector, formCounterId, shortAnswerIdCounter, SURVEY_MAX_CHAR_LIMIT) =>{
    let formDivId;

    //Insert Div for the shortParagraph Section
    $(targetSelector).replaceWith('<div formId = form_"'+ formCounterId +'" class="shortAnsPrefabDiv formField" id="shortAnsPrefabDiv_' + shortAnswerIdCounter + '"></div>');
    formDivId = '#shortAnsPrefabDiv_' + shortAnswerIdCounter;

    //Add Text input to set question
    $(formDivId)
    .append('<input type="text" class="showOnEdit questionHeaderField creatorComponents" id="shortAnsQuestionField_' + shortAnswerIdCounter + '" labelId="shortAnsQuestionLabel_' + shortAnswerIdCounter + '" placeholder="Place question Here"><br>');

    //Add the question 
    $(formDivId)
    .append('<label class="questionHeader" id="shortAnsQuestionLabel_' + shortAnswerIdCounter + '" for="shortAnsTextArea_' + shortAnswerIdCounter + '"></label><br><br>');
    

    //Add the label infront of the text field
    $(formDivId)
    .append('<label id="shortAnsLabel_' + shortAnswerIdCounter + '" for="shortAnsTextArea_' + shortAnswerIdCounter + '">Label:</label>');
    

    //Add the TextField (Does nothing, there for viewing purposes and showing Author defaults if any) (while size is set here, its assume that text area can be resizeable from user)
    $(formDivId)
    .append('<input type="text" id="shortAnsTextArea_' + shortAnswerIdCounter + '" name="shortAns_' + shortAnswerIdCounter + '" placeholder="Placeholder Text"  maxlength="'+ SURVEY_MAX_CHAR_LIMIT +'"><br>');



    //Add text input for changing input field label
    $(formDivId)
    .append('<input type="text" class="showOnEdit creatorComponents labelInput" id="shortAnsLabelInput_'+ shortAnswerIdCounter +'" labelId="shortAnsLabel_' + shortAnswerIdCounter + '" placeholder="Change Label:">');

    //Add text input for changing placeholder textbox message
    $(formDivId)
    .append('<input type="text" class="showOnEdit creatorComponents" id="shortAnsDefaultMes_'+ shortAnswerIdCounter +'" placeholder="Change placeholder message">');

    //Add text input for character limit
    $(formDivId)
    .append('<input type="number" class="showOnEdit creatorComponents" id="shortAnsCharLimit_'+ shortAnswerIdCounter +'" placeholder="Enter character Limit (max '+ SURVEY_MAX_CHAR_LIMIT +')" max = "'+ SURVEY_MAX_CHAR_LIMIT +'" min = "0">');

    //Add button that will add options to ShortAnswer. Holds ShortAnswer textfield and relevant input id's to access them
    $(formDivId)
    .append('<input type="button" class="shortAnsChangeAttrButton showOnEdit creatorComponents" id="shortAnswChangeAttrButton_'+ shortAnswerIdCounter+'" shortAnsId="shortAnsTextArea_' + shortAnswerIdCounter + '" placeHolderId="shortAnsDefaultMes_' + shortAnswerIdCounter + '" shortAnsCharLimId="shortAnsCharLimit_'+ shortAnswerIdCounter +'" value="Apply Options" >');

    return formDivId;
}

export{createShortAnswerPrefab};