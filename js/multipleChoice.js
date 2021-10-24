/**
 * Class and methods related to a MultiplChoice
 * 
 */

 class MultipleChoice {

    idVal;
    position;
    //parentFormId;
    multOptions = [];
    //numOptions;
    selectedOption;
    question = '';
    label;

    constructor(idVal, position, question, label )
    {
        this.idVal = idVal; //to identify 
        this.position = position; //to determine it's order (TODO either handled in an external array, or use this variable)
        //this.parentFormId = null; //TODO check if might need, good for db relation to determine which form it goes to
        this.multOptions = []; //empty list of multOption objects
        //this.numOptions = 0; //mult if needed for now, could use multOptions.length
        this.selectedOption = 0; //NOTE use a number to define what's multed using bitwise operation. bitwise operation gives ~64 bit on/offs
        this.question = question; //Main label for asking question
        this.label = label; //Label used for putting infront of mults, acting as .name values as well


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
    }
    
    */
   
    //check if possible to just assign array to array (or even worth coding, since this system doesn't actually implenet this)
    set multOptions(newMultOptions)
    {
        this._multOptions = newMultOptions;
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
        this._label=newLabel;
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
    //hold of on this
    // get parentFormId()
    // {
    //     return this._parentFormId;
    // }

    get multOptions()
    {
        return this._multOptions;
    }

    get selectedOption() 
    {
        return this._selectedOption;
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
        multOptions.push(newOption);
    }
    // TODO these are not implemented, later provide editing of options like deleting or moving around

    optionClicked(clickedButtonId)
    {
        // find the option coresponding to clicked button
        let position = multOptions.filter((anOption) => { 
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
        })[0]
        .position;
        selectedOption = position;

    }

    toJSON()
    {
        return {
            idVal : this.idVal,
            position : this.position, 
            //parentFormId : this._parentFormId 
            multOptions : this.multOptions,
            //numOptions : this._numOptions 
            selectedOption : this.selectedOption==undefined? 0: this.selectedOption,
            question : this.question===undefined ? "" : this.question, 
            label : this.label===undefined ? "" : this.label

        };

    }



}

//class used for determening options for MultipleChoice. MultipleChoice will
//track the selected option via a number (as opposed the CheckBox using bitwise arithmatic to track all on and off)
class MultOption{
    idVal;
    position;
    label;
    value;
    
    constructor(idVal, position, label, value, selected) ////, forFormId,
    {
        this.idVal = idVal;
        this.position = position;
        this.label = label;
        this.value = value;
        
        //don't think we need, hold off on this
        /*
        this.forFormId = forFormId; 
        */
        
        this.selected = selected;
        
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
    }
    */
    
    set selected(newSelectedState)
    {
        this._selected = newSelectedState;
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
        return this._forFormId;
    }
    */
    get selected()
    {
        return this._selected;
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
            selected : this.selected,

        };

    }

}














const createMultChoicePrefab = (targetSelector, formCounterId,  multFormId) =>{

    let formDivId;
    //Insert Div for the MultipleChoice Section
    $(targetSelector).replaceWith('<div formId= "form_'+ formCounterId +'" class="multPrefabDiv formField" id="multPrefabDiv_' + multFormId + '"></div>');
    formDivId = 'multPrefabDiv_' + multFormId;

    //Add Text input to set question
    $('#'+formDivId)
    .append('<input class="showOnEdit questionHeaderField creatorComponents" type="text" id="multQuestionField_' + multFormId + '" labelId="multQuestionLabel_' + multFormId + '" placeholder="Place question Here"><br>');


    //Add  the question
    $('#'+formDivId)
    .append('<label class="questionHeader" id="multQuestionLabel_' + multFormId + '" for="multipleChoice_' + multFormId + '"></label><br><br>');

    //Add the label for multiple choice
    $('#'+formDivId)
    .append('<label  id="multLabel_' + multFormId + '" for="multipleChoice_' + multFormId + '">MultipleChoice'+multFormId+'</label>');


    //Add the Radio or multbox Section. Will use a div to insert the inputs
    $('#'+formDivId)
    .append('<div id="multipleChoice_' +multFormId + '"></div><br>');


    //Add text input for changing label for multiple choice (the name of radio group) (TODO Use on keystroke instead of submitting)
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents labelInput" type="text" id="multLabelInput_'+ multFormId +'" labelId="multLabel_' + multFormId + '" placeholder="Group Name:" >');
    
    //Add text input for adding multiple Choice option (the Label for one radio button)
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="multPrefabInput_'+ multFormId +'" placeholder="AddOption">');




    //Add text input for providing coresponding value for option (value for that radio button)
    $('#'+formDivId)
    .append('<input class="showOnEdit creatorComponents" type="text" id="multPrefabInputVal_'+ multFormId +'" placeholder="Option Value">');



    //Add button that will add option to SelectBox. Holds SelectBox and relevant input id's to access them
    //TODO change key names to be more general here and in calling method. For now leave as is to keep functionality, but later make generic for both mulchoice and mults
    $('#'+formDivId)
    .append('<input type="button" class="multAddOptionButton showOnEdit creatorComponents" id="multAddOptionButton_'+ multFormId +'"  multipleChoiceId="multipleChoice_' + multFormId + '" labelId="multLabel_'+ multFormId +'"  multNewOptionId="multPrefabInput_' + multFormId + '"multNewOptionValId="multPrefabInputVal_' + multFormId + '" formId="'+formCounterId+'" formType="radio" value="Add Option" >');
    
    return formDivId;
}



const handleMultPrefabSubmit = (callingButton) => {



    let formId = $(callingButton).attr("formId"); //We'll use this to id each new input so that they are unique but related to form

    let formType = $(callingButton).attr("formType");
    

    let labelId =  $(callingButton).attr("labelId");
    let currentGroupName = $('#'+labelId).text();

    let radioDivId = $(callingButton).attr("multipleChoiceId");
    

    let optionNameId = $(callingButton).attr("multNewOptionId");
    let optionName = $('#' + optionNameId).val();

    let optionValueId = $(callingButton).attr("multNewOptionValId"); 
    let optionValue = $('#' + optionValueId).val();




    //Should mult if label is set
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

export {createMultChoicePrefab, handleMultPrefabSubmit, MultipleChoice, MultOption};