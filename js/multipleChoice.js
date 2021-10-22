const createMultChoicePrefab = (targetSelector, formCounterId,  multFormId) =>{

    let formDivId;
    //Insert Div for the MultipleChoice Section
    $(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="multPrefabDiv formField" id="multPrefabDiv_' + multFormId + '"></div>');
    formDivId = '#multPrefabDiv_' + multFormId;

    //Add Text input to set question
    $(formDivId)
    .append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="multQuestionField_' + multFormId + '" labelId="multQuestionLabel_' + multFormId + '" placeholder="Place question Here"><br>');


    //Add  the question
    $(formDivId)
    .append('<label class="questionHeader" id="multQuestionLabel_' + multFormId + '" for="multipleChoice_' + multFormId + '"></label><br><br>');

    //Add the label for multiple choice
    $(formDivId)
    .append('<label  id="multLabel_' + multFormId + '" for="multipleChoice_' + multFormId + '">Label:</label>');


    //Add the Radio or checkbox Section. Will use a div to insert the inputs
    $(formDivId)
    .append('<div id="multipleChoice_' +multFormId + '"></div><br>');


    //Add text input for changing label for multiple choice (the name of radio group) (TODO Use on keystroke instead of submitting)
    $(formDivId)
    .append('<input class="showOnEdit creatorComponents labelInput" type="text" id="multLabelInput_'+ multFormId +'" labelId="multLabel_' + multFormId + '" placeholder="Group Name:" >');
    
    //Add text input for adding multiple Choice option (the Label for one radio button)
    $(formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="multPrefabInput_'+ multFormId +'" placeholder="AddOption">');




    //Add text input for providing coresponding value for option (value for that radio button)
    $(formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="multPrefabInputVal_'+ multFormId +'" placeholder="Option Value">');



    //Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
    //TODO change key names to be more general here and in calling method. For now leave as is to keep functionality, but later make generic for both mulchoice and checks
    $(formDivId)
    .append('<input type="button" class="multAddOptionButton showOnEdit creatorComponents" id="multAddOptionButton_'+ multFormId +'"  multipleChoiceId="multipleChoice_' + multFormId + '" labelId="multLabel_'+ multFormId +'"  multNewOptionId="multPrefabInput_' + multFormId + '"multNewOptionValId="multPrefabInputVal_' + multFormId + '" formId="'+formCounterId+'" formType="radio" value="Add Option" >');
    
    return formDivId;
}

export {createMultChoicePrefab};