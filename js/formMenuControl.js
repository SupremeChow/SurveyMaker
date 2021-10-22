/**
 * Use this file to initiate the prefab menu buttons
 */

//Creates the universal control buttons for editing related form fields, ie save, edit, delete, move, etc.
const addPrefabControlDiv = (formDivId, formCountId) =>{

    //Create div for save/edit/ TODO(delete ,move up, movedown, copy)

    $(formDivId).after('<div formId = form_"'+ formCountId +'" class="prefabControlsDiv creatorComponents" id="prefabControlsDiv_' + formCountId + '"></div>')

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

export{addPrefabControlDiv};

