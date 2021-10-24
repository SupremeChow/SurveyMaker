/**
 * Class and methods related to a CheckBox
 * 
 */

class CheckBox {

    formType='CheckBox';
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
        this._idVal = newId;
    }
    
    set position(newPosition)
    {
        this._position = newPosition;
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
        this._checkOptions = newCheckOptions;
    }
    
    //again, check if really worth, since functionally not possible (but nice for evetns such as check all above kind of things)
    set checked(newChecked) 
    {
        this._checked = newChecked;
    }
   
    set question(newQuestion)
    {
        this._question = newQuestion;
    }
    
    set label(newLabel)
    {
        this._label = newLabel;
    }

    //___________________________ Getters ________________________
    get type()
    {
        return this._formType;
    }
    get idVal()
    {
        return this._idVal;
    }
    get position()
    {
        return this._position;
    }
    //hold of on this
    // get parentFormId()
    // {
    //     return this.parentFormId;
    // }

    get checkOptions()
    {
        return this._checkOptions;
    }

    get checked() 
    {
        return this._checked;
    }
    get question()
    {
        return this._question;
    }
    get label()
    {
        return this._label;
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
            formType : this.formType,
            idVal : this.idVal,
            position : this.position, 
            //parentFormId : this.parentFormId 
            checkOptions : this.checkOptions,
            //numOptions : this.numOptions 
            checked : this.checked== undefined? 0 : this.checked,
            question : this.question===undefined ? "" : this.question,
            label : this.label===undefined ? "" : this.label

        };

    }



}

//class used for determening options for check box. CheckBox will make use of bitwise
//operations to determine which options in it's list are checked
//Thus, in addition to a label,value relation, will also give a position in list, which is
//the bit position in a number. ie, 4th checked option is (...0001000), 2nd and 3rd (...0000110), etc
class CheckOption{
    idVal;
    position;
    label;
    value;
    isChecked = false;
    constructor(idVal, position, label, value, isChecked) // forFormId,
    {
        this.idVal = idVal;
        this.position = position;
        this.label = label;
        this.value = value;
        //this.forFormId = forFormId; //might not need
        this.isChecked = isChecked;
    }

    //____________________________________ Setters _______________________
    set idVal(newId)
    {
       this._idVal = newId;
    }
    
    set position(newPosition)
    {
        this._position = newPosition;
    }
    
    
    set label(newLabel)
    {
        this._label = newLabel;
    }
    
    set value(newValue) 
    {
        this._value = newValue;
    }
    
    /*
    set forFormId(newFormId)
    {
        //.forFormId = newFormId;
    }
    */
    set isChecked(newCheckedState)
    {
        this._isChecked = newCheckedState;
    }

   //___________________________ Getters ________________________
    get idVal()
    {
        return this._idVal;
    }
    
    get position()
    {
        return this._position;
    }
    
    
    get label()
    {
        return this._label;
    }
    
    get value() 
    {
        return this._value;
    }
    /*
    get forFormId()
    {
        return this.forFormId;
    }
    */
    get isChecked()
    {
        return this._isChecked;
    }

    //________________________ toJSON() __________

    toJSON()
    {
        return {
            idVal : this.idVal,
            position : this.position, 
            label : this.label,
            value : this.value,
            //forFormId : this.forFormId 
            isChecked : this.checked

        };

    }


}


//This function creates the output needed for the EDITABLE Checkbox form.
const createCheckBoxPrefab = (targetSelector, formCounterId, checkBoxIdCounter) =>{
    let formDivId;
    //Insert Div for the MultipleChoice Section
    $(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="checkPrefabDiv formField" id="checkPrefabDiv_' + checkBoxIdCounter + '"></div>');
    formDivId = 'checkPrefabDiv_' + checkBoxIdCounter;

    //Add Text input to set question
    $('#'+formDivId)
    .append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="checkQuestionField_' + checkBoxIdCounter + '" labelId="checkQuestionLabel_' + checkBoxIdCounter + '" placeholder="Place question Here"><br>');


    //Add  the question
    $('#'+formDivId)
    .append('<label class="questionHeader" id="checkQuestionLabel_' + checkBoxIdCounter + '" for="checkBox_' + checkBoxIdCounter + '"></label><br><br>');

    //Add the label for multiple choice
    $('#'+formDivId)
    .append('<label  id="checkLabel_' + checkBoxIdCounter + '" for="checkBox_' + checkBoxIdCounter+ '">CheckBox'+checkBoxIdCounter+'</label>');


    //Add the Radio or checkbox Section. Will use a div to insert the inputs
    $('#'+formDivId)
    .append('<div id="checkBox_' +checkBoxIdCounter + '"></div><br>');


    //Add text input for changing label for multiple choice (the name of radio group) (TODO Use on keystroke instead of submitting)
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents labelInput" type="text" id="checkLabelInput_'+ checkBoxIdCounter +'" labelId="checkLabel_' +checkBoxIdCounter + '" placeholder="Group Name:" >');
    
    //Add text input for adding multiple Choice option (the Label for one radio button)
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="checkPrefabInput_'+ checkBoxIdCounter +'" placeholder="AddOption">');




    //Add text input for providing coresponding value for option (value for that radio button)
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="checkPrefabInputVal_'+ checkBoxIdCounter +'" placeholder="Option Value">');



    //Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
    //TODO change key names to be more general here and in calling method. For now leave as is to keep functionality, but later make generic for both mulchoice and checks
    $('#'+formDivId)
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
        return true; 

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
        return false;
    }

    
}

const clearCheckInputs = (callingButton) =>{

    let inputOptionId = $(callingButton).attr("multNewOptionId");
    let inputOptionValId = $(callingButton).attr("multNewOptionValId");
    $('#' + inputOptionId).val("");
    $('#' + inputOptionValId).val("");
}



export{createCheckBoxPrefab, handleCheckPrefabSubmit, clearCheckInputs, CheckBox, CheckOption};