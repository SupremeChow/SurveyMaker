





const createSelectBoxPrefab = (targetSelector, formCounterId, selectBoxIdCounter) =>{
    let formDivId;
    //Insert Div for the SelectBox Section
    $(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="selectPrefabDiv formField" id="selectPrefabDiv_' + selectBoxIdCounter + '"></div>');
    formDivId = '#selectPrefabDiv_' + selectBoxIdCounter;

    //Add Text input to set question
    $(formDivId)
    .append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="selectQuestionField_' + selectBoxIdCounter + '" labelId="selectQuestionLabel_' + selectBoxIdCounter + '" placeholder="Place question Here"><br>');


    //Add  the question
    $(formDivId)
    .append('<label class="questionHeader" id="selectQuestionLabel_' + selectBoxIdCounter + '" for="selectBox_' + selectBoxIdCounter + '"></label><br><br>');

    //Add the label infront of the selectBox
    $(formDivId)
    .append('<label id="selectBoxLabel_' + selectBoxIdCounter + '" for="selectBox_' + selectBoxIdCounter + '">Label:</label>');

    //Add the SelectBox
    $(formDivId)
    .append('<select id="selectBox_' + selectBoxIdCounter + '"><option value="ReplaceDefault" >Options go here</option></select><br>');



    //Add text input for changing label infront of selectBox
    $(formDivId)
    .append('<input class="showOnEdit creatorComponents labelInput" type="text" id="selectLabelInput_'+ selectBoxIdCounter +'" labelId="selectBoxLabel_' + selectBoxIdCounter + '" placeholder="Label:">');

    //Add text input for adding SelectBox option
    $(formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="selectPrefabInput_'+ selectBoxIdCounter +'" placeholder="AddOption">');

    //Add text input for providing coresponding value for option
    $(formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="selectPrefabInputVal_'+ selectBoxIdCounter +'" placeholder="Option Value">');

    //Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
    $(formDivId)
    .append('<input type="button" class="selectAddOptionButton showOnEdit creatorComponents" id="selectAddOptionButton_'+ selectBoxIdCounter+'"   selectBoxId="selectBox_' + selectBoxIdCounter + '"  selectNewOptionId="selectPrefabInput_' + selectBoxIdCounter + '" selectNewOptionValId="selectPrefabInputVal_' + selectBoxIdCounter + '" value="Add Option">');

    return formDivId;
}

export{createSelectBoxPrefab};