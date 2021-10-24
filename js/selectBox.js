/**
 * Class and methods related to a SelectBox
 * 
 */

 class SelectBox {

    formType='SelectBox';
    idVal;
    position; 
    //parentForm =;
    selectOptions = [];
    //numOptions;
    selectedOption = 0;
    question = '';
    label;

    constructor(idVal, position, question, label )
    {
        this.idVal = idVal; //to identify 
        this.position = position; //to determine it's order (TODO either handled in an external array, or use this variable)
        //this.parentFormId = null; //TODO check if might need, good for db relation to determine which form it goes to
        this.selectOptions = []; //empty list of SelectOption objects
        //this.numOptions = 0; //check if needed for now, could use checkOptions.length
        this.selectedOption = 0; //NOTE use a number to define what's checked
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
    set selectOptions(newSelectOptions)
    {
        this._selectOptions = newSelectOptions;
    }
    
    //again, check if really worth, since functionally not possible (but nice for evetns such as check all above kind of things)
    set selectedOption(newSelected) 
    {
        this._selectedOption = newSelected;
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

    get selectOptions()
    {
        return this._selectOptions;
    }

    get checked() 
    {
        return this._checked;
    }
    get question()
    {
        return this._question;
    }
    get position()
    {
        return this._label;
    }

    //_________________________________ Other functions _______________________


    addOption(newOption)
    {
        selectOptions.push(newOption);
    }
    // TODO not implemented,  but later provide editing of options like deleting or moving around

    optionClicked(clickedButtonId)
    {
        // find the option coresponding to clicked button
        let position = selectOptions.filter((anOption) => {
            if(anOption.id === clickedButtonId) 
            {
                anOption.selected = true;
                return true;
            }
            
            else
            {
                anOption.selected = false;
                return false;
            }   
        })[0].position;
        selectedOption = position;
    }

    toJSON()
    {
        return {
            formType : this.formType,
            idVal : this.idVal,
            position : this.position, 
            //parentFormId : this.parentFormId 
            selectOptions :  this.selectOptions, 
            //numOptions : this.numOptions 
            selectedOption : (this.selectedOption===undefined) ? 0 :this.selectedOption,
            question : this.question===undefined ? "" : this.question,
            label : this.label===undefined ? "" : this.label

        };

    }



}

//class used for determening options for SelectBox. SelectBox will
//track the selected option via a number (as opposed the CheckBox using bitwise arithmatic to track all on and off)
class SelectOption{
    
    position;
    selected = false;
    label;
    value;
    constructor(position, label, value, selected) //forFormId, idVal,
    {
        //this.idVal = idVal;// Don't think need, only for matching labels for radio and check box
        this.position = position;
        this.label = label;
        this.value = value;
        //this.forFormId = forFormId; //not sure if needed
        this.selected = selected;
    }

    //____________________________________ Setters _______________________
    
    // set idVal(newId)
    // {
    //     this._idVal = newId;
    // }
    
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
    
    // set forFormId(newFormId)
    // {
    // }
    
    set selected(newSelectedState)
    {
        this._selected = newSelectedState;
    }

   //___________________________ Getters ________________________
    // get idVal()
    // {
    //     return this._idVal;
    // }
    
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
    
    // get forFormId()
    // {
    //     return this.forFormId;
    // }
    
    get selected()
    {
        return this._selected;
    }

    //_____________ toJSON() _______________

    toJSON()
    {
        return {
            //idVal : this._idVal,
            position : this.position, 
            label : this.label,
            value : this.value,
            //forFormId : this.forFormId 
            isChecked : this.checked

        };
    }


}





const createSelectBoxPrefab = (targetSelector, formCounterId, selectBoxIdCounter) =>{
    let formDivId;
    //Insert Div for the SelectBox Section
    $(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="selectPrefabDiv formField" id="selectPrefabDiv_' + selectBoxIdCounter + '"></div>');
    formDivId = 'selectPrefabDiv_' + selectBoxIdCounter;

    //Add Text input to set question
    $('#'+formDivId)
    .append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="selectQuestionField_' + selectBoxIdCounter + '" labelId="selectQuestionLabel_' + selectBoxIdCounter + '" placeholder="Place question Here"><br>');


    //Add  the question
    $('#'+formDivId)
    .append('<label class="questionHeader" id="selectQuestionLabel_' + selectBoxIdCounter + '" for="selectBox_' + selectBoxIdCounter + '"></label><br><br>');

    //Add the label infront of the selectBox
    $('#'+formDivId)
    .append('<label id="selectBoxLabel_' + selectBoxIdCounter + '" for="selectBox_' + selectBoxIdCounter + '">SelectBox'+selectBoxIdCounter+'</label>');

    //Add the SelectBox
    $('#'+formDivId)
    .append('<select id="selectBox_' + selectBoxIdCounter + '"><option value="ReplaceDefault" >Options go here</option></select><br>');



    //Add text input for changing label infront of selectBox
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents labelInput" type="text" id="selectLabelInput_'+ selectBoxIdCounter +'" labelId="selectBoxLabel_' + selectBoxIdCounter + '" placeholder="Label:">');

    //Add text input for adding SelectBox option
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="selectPrefabInput_'+ selectBoxIdCounter +'" placeholder="AddOption">');

    //Add text input for providing coresponding value for option
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="selectPrefabInputVal_'+ selectBoxIdCounter +'" placeholder="Option Value">');

    //Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
    $('#'+formDivId)
    .append('<input type="button" class="selectAddOptionButton showOnEdit creatorComponents" id="selectAddOptionButton_'+ selectBoxIdCounter+'"   selectBoxId="selectBox_' + selectBoxIdCounter + '"  selectNewOptionId="selectPrefabInput_' + selectBoxIdCounter + '" selectNewOptionValId="selectPrefabInputVal_' + selectBoxIdCounter + '" value="Add Option">');

    return formDivId;
}

const handleSelectPrefabSubmit = (callingButton) => {
    
    let inputOptionId = $(callingButton).attr("selectnewoptionid");
    let inputOptionValId = $(callingButton).attr("selectnewoptionvalid");
    let selectBoxId = $(callingButton).attr("selectboxid");


    let newOption = $('#' + inputOptionId).val();
    let newOptionVal = $('#' + inputOptionValId).val();

    if(newOption !== "")
    {
        if($('#' + selectBoxId + " option").first().val() == "ReplaceDefault")
        {
            //replace default placeholder option
            $('#' + selectBoxId + " option").replaceWith('<option value = ' + newOptionVal + ' >'+ newOption + '</option>');
            //$('#' + inputOptionId).val("");
            //$('#' + inputOptionValId).val("");
        }
        else
        {
            $('#' + selectBoxId).append('<option value = ' + newOptionVal + ' >'+ newOption + '</option>');
            //$('#' + inputOptionId).val("");
           // $('#' + inputOptionValId).val("");
        }
       
        
        return true;
    }
    return false;
        
}

//For clearing inputs after submision
const clearSelectInputs = (callingButton) =>{

    let inputOptionId = $(callingButton.target).attr("selectnewoptionid");
    let inputOptionValId = $(callingButton.target).attr("selectnewoptionvalid");
    $('#' + inputOptionId).val("");
    $('#' + inputOptionValId).val("");

}

export{createSelectBoxPrefab, handleSelectPrefabSubmit, clearSelectInputs, SelectBox, SelectOption};