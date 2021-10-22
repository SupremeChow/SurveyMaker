const createCheckBoxPrefab = (targetSelector, formCounterId, checkBoxIdCounter) =>{
    let formDivId;
    //Insert Div for the MultipleChoice Section
    $(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="checkPrefabDiv formField" id="checkPrefabDiv_' + checkBoxIdCounter + '"></div>');
    formDivId = '#checkPrefabDiv_' + checkBoxIdCounter;

    //Add Text input to set question
    $(formDivId)
    .append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="checkQuestionField_' + checkBoxIdCounter + '" labelId="checkQuestionLabel_' + checkBoxIdCounter + '" placeholder="Place question Here"><br>');


    //Add  the question
    $(formDivId)
    .append('<label class="questionHeader" id="checkQuestionLabel_' + checkBoxIdCounter + '" for="checkBox_' + checkBoxIdCounter + '"></label><br><br>');

    //Add the label for multiple choice
    $(formDivId)
    .append('<label  id="checkLabel_' + checkBoxIdCounter + '" for="checkBox_' + checkBoxIdCounter+ '">Label:</label>');


    //Add the Radio or checkbox Section. Will use a div to insert the inputs
    $(formDivId)
    .append('<div id="checkBox_' +checkBoxIdCounter + '"></div><br>');


    //Add text input for changing label for multiple choice (the name of radio group) (TODO Use on keystroke instead of submitting)
    $(formDivId)
    .append('<input class="showOnEdit creatorComponents labelInput" type="text" id="checkLabelInput_'+ checkBoxIdCounter +'" labelId="checkLabel_' +checkBoxIdCounter + '" placeholder="Group Name:" >');
    
    //Add text input for adding multiple Choice option (the Label for one radio button)
    $(formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="checkPrefabInput_'+ checkBoxIdCounter +'" placeholder="AddOption">');




    //Add text input for providing coresponding value for option (value for that radio button)
    $(formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="checkPrefabInputVal_'+ checkBoxIdCounter +'" placeholder="Option Value">');



    //Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
    //TODO change key names to be more general here and in calling method. For now leave as is to keep functionality, but later make generic for both mulchoice and checks
    $(formDivId)
    .append('<input type="button" class="checkAddOptionButton showOnEdit creatorComponents" id="checkAddOptionButton_'+ checkBoxIdCounter +'"  multipleChoiceId="checkBox_' + checkBoxIdCounter + '" labelId="checkLabel_'+ checkBoxIdCounter +'"  multNewOptionId="checkPrefabInput_' + checkBoxIdCounter + '"multNewOptionValId="checkPrefabInputVal_' + checkBoxIdCounter + '" formId="'+formCounterId+'" formType="checkbox" value="Add Option" >');
    
    return formDivId;
}

export{createCheckBoxPrefab};