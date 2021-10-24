/**
 * Use this file to initiate the prefab menu buttons
 */

//Creates the universal control buttons for editing related form fields, ie save, edit, delete, move, etc.
const addPrefabControlDiv = (formDivId, formCountId) =>{


    //Create div for save/edit/ TODO(delete ,move up, movedown, copy)

    $('#'+formDivId).after('<div formId = form_"'+ formCountId +'" class="prefabControlsDiv creatorComponents" id="prefabControlsDiv_' + formCountId + '"></div>')

    //and change formControlDivId to add buttons
    let formControlDivId = '#prefabControlsDiv_' + formCountId;

    $(formControlDivId)
    .append('<input class="showOnEdit creatorComponents saveButton" id="saveButton_'+ formCountId +'" type="button" formDivId="' + formDivId + '" value="save" >');

    $(formControlDivId)
    .append('<input class="hideOnEdit creatorComponents editButton" id="editButton_'+ formCountId + '"  type="button" formDivId="' + formDivId + '" value="edit" >');
    $('#editButton_' + formCountId).hide();

    $(formControlDivId)
    .append('<input class="creatorComponents moveUpButton" id="moveUpButton_'+ formCountId +'" type="button" formDivId="' + formDivId + '" value="moveUp" >');

    $(formControlDivId)
    .append('<input class="creatorComponents moveDownButton" id="moveDownButton_'+ formCountId +'" type="button" formDivId="' + formDivId + '" value="moveDown" >');

    $(formControlDivId)
    .append('<input class="creatorComponents removeButton" id="removeButton_'+ formCountId +'" type="button" formDivId="' + formDivId + '" value="remove" >');

}

const handleSaveForm = (callingButton) => {

    let formDivId = $(callingButton).attr("formDivId");
    //let fieldQuestion = $(formDivId + " .questionHeaderField").val();

    //$(formDivId + " label.questionHeader").text(fieldQuestion);

    $('#'+formDivId).children(".showOnEdit").hide();
    $('#'+formDivId).children(".hideOnEdit").show();

    //$(formDivId + " input:last").show();
    $('#'+formDivId).next().children(".showOnEdit").hide();
    $('#'+formDivId).next().children(".hideOnEdit").show();
}

const handleEditForm = (callingButton) => {

    let formDivId = $(callingButton).attr("formDivId");

    $('#'+formDivId).children(".showOnEdit").show();
    $('#'+formDivId).children(".hideOnEdit").hide();

    $('#'+formDivId).next().children(".showOnEdit").show();
    $('#'+formDivId).next().children(".hideOnEdit").hide();
}	

const handleMoveUpForm = (callingButton) => {
    let formId = $(callingButton).attr('formDivId');
    let formControlId = $('#'+formId).next('.prefabControlsDiv').attr('id');

    let previousFormId = $('#'+formId).prevAll('.formField:first').attr('id');

    


    //check if forms are there and if true, swap

    if(typeof previousFormId !== 'undefined')
    {
        $('#'+formId).insertBefore('#'+ previousFormId);
        $('#' + formControlId).insertAfter('#'+formId);
        return true;
    }
    else
        return false;
}

const handleMoveDownForm = (callingButton) => {
    let formId = $(callingButton).attr('formDivId');
    

    let nextFormId = $('#'+formId).nextAll('.formField:first').attr('id');
    let otherFormControlId = $('#' + nextFormId).next('.prefabControlsDiv').attr('id');


    //check if forms are there and if true, swap

    if(typeof nextFormId !== 'undefined')
    {
        $('#'+ nextFormId).insertBefore('#'+formId);
        $('#' + otherFormControlId).insertAfter('#'+ nextFormId);
        return true;
    }
    else
        return false;

}

const handleRemoveForm = (callingButton) => {
    let formId = $(callingButton).attr('formDivId');
    let formControlId = $('#'+formId).next('.prefabControlsDiv').attr('id');



    $('#'+formId).remove();
    $('#' + formControlId).remove();
}

export{addPrefabControlDiv, handleSaveForm, handleEditForm, handleMoveUpForm, handleMoveDownForm, handleRemoveForm};

