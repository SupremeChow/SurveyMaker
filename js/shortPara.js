

const createShortParagraphPrefab = (targetSelector, formCounterId, shortParagraphIdCounter, SURVEY_MAX_CHAR_LIMIT) =>{
    let formDivId;

    //Insert Div for the shortParagraph Section
    $(targetSelector).replaceWith('<div formId = form_"'+ formCounterId +'" class="shortParaPrefabDiv formField" id="shortParaPrefabDiv_' + shortParagraphIdCounter + '"></div>');
    formDivId = '#shortParaPrefabDiv_' + shortParagraphIdCounter;



    //Add Text input to set question
    $(formDivId)
    .append('<input type="text" class="showOnEdit questionHeaderField creatorComponents" id="shortParaQuestionField_' + shortParagraphIdCounter + '" labelId="shortParaQuestionLabel_' + shortParagraphIdCounter + '" placeholder="Place question Here"><br>');


    //Add  the question 
    $(formDivId)
    .append('<label class="questionHeader" id="shortParaQuestionLabel_' + shortParagraphIdCounter + '" for="shortParaTextArea_' + shortParagraphIdCounter + '"></label><br><br>');
    


    //Add the TextField (Does nothing, there for viewing purposes and showing Author defaults if any) (while size is set here, its assume that text area can be resizeable from user)
    $(formDivId)
    .append('<textarea id="shortParaTextArea_' + shortParagraphIdCounter + '" name="shortPara_' + shortParagraphIdCounter + '" placeholder="Placeholder Text" rows="5" cols="64" maxlength="'+ SURVEY_MAX_CHAR_LIMIT +'"></textarea><br>');




    //Add text input for changing placeholder textbox message
    $(formDivId)
    .append('<input type="text" class="showOnEdit creatorComponents" id="shortParaDefaultMes_'+ shortParagraphIdCounter +'" placeholder="Change placeholder message">');

    //Add text input for character limit
    $(formDivId)
    .append('<input type="number" class="showOnEdit creatorComponents" id="shortParaCharLimit_'+ shortParagraphIdCounter +'" placeholder="Enter character Limit (max '+ SURVEY_MAX_CHAR_LIMIT +')" max = "'+ SURVEY_MAX_CHAR_LIMIT +'" min = "0">');

    //Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
    $(formDivId)
    .append('<input type="button" class="shortParaChangeAttrButton showOnEdit creatorComponents" id="shortParawChangeAttrButton_'+ shortParagraphIdCounter+'" shortParaId="shortParaTextArea_' + shortParagraphIdCounter + '" placeHolderId="shortParaDefaultMes_' + shortParagraphIdCounter + '" shortParaCharLimId="shortParaCharLimit_'+ shortParagraphIdCounter +'" value="Apply Options">');

    return formDivId;
}

export{createShortParagraphPrefab};