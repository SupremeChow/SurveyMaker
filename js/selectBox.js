/**
 * Class and methods related to a SelectBox
 * 
 */

 class SelectBox {

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
    set selectOptions(newSelectOptions)
    {
        //this.checkOptions = newCheckOptions;
    }
    
    //again, check if really worth, since functionally not possible (but nice for evetns such as check all above kind of things)
    set selectedOption(newChecked) 
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

    get selectOptions()
    {
        return this.selectOptions;
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
        selectOptions.push(newOption);
    }
    // TODO these are not implemented,  but later provide editing of options like deleting or moving around

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
            idVal : this.idVal,
            position : this.position, 
            //parentFormId : this.parentFormId 
            checkOptions : this.checkOptions,
            //numOptions : this.numOptions 
            selectedOption : this.checked,
            question : this.question,
            label : this.label

        };

    }



}

//class used for determening options for SelectBox. SelectBox will
//track the selected option via a number (as opposed the CheckBox using bitwise arithmatic to track all on and off)
class SelectOption{
    
    constructor(idVal, position, label, value, forFormId, selected)
    {
        this.idVal = idVal;
        this.position = position;
        this.label = label;
        this.value = value;
        //this.forFormId = forFormId; //not sure if needed
        this.selected = selected;
    }

    //____________________________________ Setters _______________________
    set idVal(newId)
    {
    }
    
    set position(newPosition)
    {
    }
    
    
    set label(newLabel)
    {
    }
    
    set value(newValue) 
    {
    }
    
    // set forFormId(newFormId)
    // {
    // }
    
    set selected(newSelectedState)
    {
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
    
    // get forFormId()
    // {
    //     return this.forFormId;
    // }
    
    get selected()
    {
        return this.selected;
    }



}





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
    .append('<label id="selectBoxLabel_' + selectBoxIdCounter + '" for="selectBox_' + selectBoxIdCounter + '">SelectBox'+selectBoxIdCounter+'</label>');

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

const handleSelectPrefabSubmit = (callingButton) => {
    
    let inputOptionId = $(callingButton).attr("selectnewoptionid");
    let inputOptionValId = $(callingButton).attr("selectnewoptionvalid");
    let selectBoxId = $(callingButton).attr("selectboxid");

    let selectLabelInputId = $(callingButton).attr("selectLabelInputId");
    let selectLabelId = $(callingButton).attr("selectLabelId");

    

    let newSelectLabel = $('#' + selectLabelInputId).val();
    let newOption = $('#' + inputOptionId).val();
    let newOptionVal = $('#' + inputOptionValId).val();

    if(newOption !== "")
    {
        if($('#' + selectBoxId + " option").first().val() == "ReplaceDefault")
        {
            $('#' + selectBoxId + " option").replaceWith('<option value = ' + newOptionVal + ' >'+ newOption + '</option>');
            $('#' + inputOptionId).val("");
            $('#' + inputOptionValId).val("");
        }
        else
        {
            $('#' + selectBoxId).append('<option value = ' + newOptionVal + ' >'+ newOption + '</option>');
            $('#' + inputOptionId).val("");
            $('#' + inputOptionValId).val("");
        }
        
    }

        
}

export{createSelectBoxPrefab, handleSelectPrefabSubmit, SelectBox, SelectOption};