/**
 * Class and methods related to a CheckBox
 * 
 */

class CheckBox {

    idVal;
    position; 
    //parentForm =;
    checkOptions = [];
    //numOptions;
    checked = 0;
    question = '';
    label;

    constructor(idVal, position, question, label )
    {
        this.idVal = idVal; //to identify 
        this.position = position; //to determine it's order (TODO either handled in an external array, or use this variable)
        //this.parentFormId = null; //TODO check if might need, good for db relation to determine which form it goes to
        this.checkOptions = []; //empty list of checkOption objects
        //this.numOptions = 0; //check if needed for now, could use checkOptions.length
        this.checked = 0; //NOTE use a number to define what's checked using bitwise operation. bitwise operation gives ~64 bit on/offs
        this.question = question; //Main label for asking question
        this.label = label; //Label used for putting infront of checks, acting as .name values as well


    }

    //____________________________________ Setters _______________________
    set idVal(newId)
    {
        //this.IdVal = newId;
    }
    
    set position(newPosition)
    {
        //this.position = newPosition;
    }
    
    /*
    set parentFormId(newParentId)
    {
        this.parentFormId = newParentId;
    }
    
    */
   
    //check if possible to just assign array (or even worth doing, since this system doesn't actually implenet this)
    set checkOptions(newCheckOptions)
    {
        //this.checkOptions = newCheckOptions;
    }
    
    //again, check if really worth, since functionally not possible (but nice for evetns such as check all above kind of things)
    set checked(newChecked) 
    {
        //this.checked = newChecked;
    }
   
    set question(newQuestion)
    {
        //this.question = newQuestion;
    }
    
    set label(newLabel)
    {
        //this.label = newLabel;
    }

    //___________________________ Getters ________________________
    get idVal()
    {
        return this.IdVal;
    }
    get position()
    {
        return this.position;
    }
    //hold of on this
    // get parentFormId()
    // {
    //     return this.parentFormId;
    // }

    get checkOptions()
    {
        return this.checkOptions;
    }

    get checked() 
    {
        return this.checked;
    }
    get question()
    {
        return this.question;
    }
    get position()
    {
        return this.label;
    }

    //_________________________________ Other functions _______________________


    addOption(newOption)
    {
        checkOptions.push(newOption);
    }
    // TODO these are not implemented, later provide editing of options like deleting or moving around

    optionClicked(clickedButtonId)
    {
        // find the option coresponding to clicked button
        let position = checkOptions.filter((anOption) => {anOption.id === clickedButtonId })[0].position;
        checked = checked ^ (1<<position);

        checkOptions[position].checked = !(checkOptions[position].checked);
    }

    toJSON()
    {
        return {
            idVal : this.idVal,
            position : this.position, 
            //parentFormId : this.parentFormId 
            checkOptions : this.checkOptions,
            //numOptions : this.numOptions 
            checked : this.checked,
            question : this.question,
            label : this.label

        };

    }



}

//class used for determening options for check box. CheckBox will make use of bitwise
//operations to determine which options in it's list are checked
//Thus, in addition to a label,value relation, will also give a position in list, which is
//the bit position in a number. ie, 4th checked option is (...0001000), 2nd and 3rd (...0000110), etc
class checkOption{
    
    constructor(idVal, position, label, value, forFormId, isChecked)
    {
        this.idVal = idVal;
        this.position = position;
        this.label = label;
        this.value = value;
        this.forFormId = forFormId; //might need, since it does help with relating to checkboxInput to lable (TODO double check, might only be for selections
        this.isChecked = isChecked;
    }

    //____________________________________ Setters _______________________
    set idVal(newId)
    {
       //this.IdVal = newId;
    }
    
    set position(newPosition)
    {
        //this.position = newPosition;
    }
    
    
    set label(newLabel)
    {
        //this.label = newLabel;
    }
    
    set value(newValue) 
    {
        //this.value = newValue;
    }
    
    set forFormId(newFormId)
    {
        //.forFormId = newFormId;
    }
    
    set isChecked(newCheckedState)
    {
        //this.isChecked = newCheckedState;
    }

   //___________________________ Getters ________________________
    get idVal()
    {
        return this.IdVal;
    }
    
    get position()
    {
        return this.position;
    }
    
    
    get label()
    {
        return this.label;
    }
    
    get value() 
    {
        return this.value;
    }
    
    get forFormId()
    {
        return this.forFormId;
    }
    
    get isChecked()
    {
        return this.isChecked;
    }



}


//This function creates the output needed for the EDITABLE Checkbox form.
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
    .append('<label  id="checkLabel_' + checkBoxIdCounter + '" for="checkBox_' + checkBoxIdCounter+ '">CheckBox'+checkBoxIdCounter+'</label>');


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

const handleCheckPrefabSubmit = (callingButton) => {



    let formId = $(callingButton).attr("formId"); //We'll use this to id each new input so that they are unique but related to form

    let formType = $(callingButton).attr("formType");
    

    let labelId =  $(callingButton).attr("labelId");
    let currentGroupName = $('#'+labelId).text();

    let radioDivId = $(callingButton).attr("multipleChoiceId");
    

    let optionNameId = $(callingButton).attr("multNewOptionId");
    let optionName = $('#' + optionNameId).val();

    let optionValueId = $(callingButton).attr("multNewOptionValId"); 
    let optionValue = $('#' + optionValueId).val();




    //Should check if label is set
    if(currentGroupName != '' && optionName != '' && optionValue != '')
    {
        
        $('#' + radioDivId)
        .append('<input type="'+formType+'" id="' + optionName +'_'+ formId + '" name="' + currentGroupName + ' " value="' + optionValue + '" >')
        .append('<label for="' + optionName +'_'+ formId + '">'+ optionName +'</label>'); 

    }
    else
    {
        //animate error on label field

        $(callingButton).hide();
        $(callingButton).css({"border": "thin double red", "background-color": "rgba(250,170,170,0.65)", "border-radius": "4px"}).after("<span>Inputs are invalid/missing</span>");
        
        //Because Jquery can't animate color by default(?) use timeout instead of importing another library
        setTimeout(() =>{
            $(callingButton).css({"border": "", "background-color": "", "border-radius": ""}).next().remove();
            $(callingButton).show();
        }, 2000);
    }

    
}




//TODO
//Maybe handle creating the CheckBox for the actual survey in another funtion, that extrapolates from given variables what it looks like

export{createCheckBoxPrefab, handleCheckPrefabSubmit, CheckBox, checkOption};