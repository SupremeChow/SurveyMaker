<?php 
//TheForm is the actual form object,
// $idVal is position (?), $checkBoxIdNumber is a number diferentiating it from the other checkBoxes
function createCheckBox($theForm , $idVal, $checkBoxIdNumber, $arrayOfOptions)
{   echo'
        <div formId= "form_' . $idVal .'" class="checkPrefabDiv formField" id="checkPrefabDiv_' . $checkBoxIdNumber . '">
        
            <label class="questionHeader" id="checkQuestionLabel_' . $checkBoxIdNumber . '" for="checkBox_' . $checkBoxIdNumber . '"> 
                ' . $theForm->question . '
            </label><br>


            <label class="contentLabel"  id="checkLabel_' . $checkBoxIdNumber . '" for="checkBox_' . $checkBoxIdNumber . '">
            ' . $theForm->label . '
            </label>

            <div id="checkBox_' . $checkBoxIdNumber . '">
    ';

            //Function for adding all options
            for($i = 0; $i < count($arrayOfOptions); $i++)
            {
                //TODO for now, hope that things stay in order, otherwise need to reorder with position

                echo'
                <input type="checkbox" id="'. $arrayOfOptions[$i]->idVal . '" name="checkBox_' . $checkBoxIdNumber . '" value="' . $arrayOfOptions[$i]->value . '" >
                <label for="' . $arrayOfOptions[$i]->idVal . '">'. $arrayOfOptions[$i]->label .'</label>

                ';
            }
                

    echo'

            </div><br>
        </div>
    
    ';


}

function createMultipleChoice($theForm , $idVal, $multiplChoiceIdNumber, $arrayOfOptions)
{
    echo'

    <div formId= "form_'. $idVal .'" class="multPrefabDiv formField" id="multPrefabDiv_' . $multiplChoiceIdNumber . '">
    
    
        <label class="questionHeader" id="multQuestionLabel_' . $multiplChoiceIdNumber . '" for="multipleChoice_' . $multiplChoiceIdNumber . '">
            ' . $theForm->question . '
        </label><br>
        
        <label class="contentLabel" id="multLabel_' . $multiplChoiceIdNumber . '" for="multipleChoice_' . $multiplChoiceIdNumber . '">
            ' . $theForm->label . '
        </label>


        <div id="multipleChoice_' . $multiplChoiceIdNumber . '" >
    ';

            //Put options here....
            //Function for adding all options
            for($i = 0; $i < count($arrayOfOptions); $i++)
            {

                //TODO for now, hope that things stay in order, otherwise need to reorder with position

                echo'
                <input type="radio" id="'. $arrayOfOptions[$i]->idVal . '" name="multipleChoice_' . $multiplChoiceIdNumber . '" value="' . $arrayOfOptions[$i]->value . '" >
                <label for="' . $arrayOfOptions[$i]->idVal . '">'. $arrayOfOptions[$i]->label .'</label>

                ';
            }


    echo'
        </div><br>


    </div>
    ';
}

function createSelectBox($theForm , $idVal, $selectIdNumber, $arrayOfOptions)
{
    echo'
    
    <div formId= "form_'. $idVal .'" class="selectPrefabDiv formField" id="selectPrefabDiv_' . $selectIdNumber . '">
    
        <label class="questionHeader" id="selectQuestionLabel_' .  $selectIdNumber . '" for="selectBox_' .  $selectIdNumber . '">
            ' . $theForm->question . '
        </label><br>

        <label class="contentLabel" id="selectBoxLabel_' .  $selectIdNumber . '" for="selectBox_' .  $selectIdNumber . '">
            ' . $theForm->label . '
        </label>

        <select id="selectBox_' .  $selectIdNumber .  '" name="selectBox_'. $selectIdNumber .'">
    ';
        //place options here...

        for($i = 0; $i < count($arrayOfOptions); $i++)
        {

            //TODO for now, hope that things stay in order, otherwise need to reorder with position

            echo'
                <option value="' . $arrayOfOptions[$i]->value . '" >' . $arrayOfOptions[$i]->label . '</option>
            ';

           
        }
 
    echo'
        </select><br>
    </div>
     
    ';

}

function createShortAnswer($theForm , $idVal, $shortAnswerIdNumber)
{
    echo'
        <div formId= "form_' . $idVal .'" class="shortAnsPrefabDiv formField" id="shortAnsPrefabDiv_' . $shortAnswerIdNumber . '">
        
            <label class="questionHeader" id="shortAnsQuestionLabel_' . $shortAnswerIdNumber . '" for="shortAnsTextArea_' . $shortAnswerIdNumber . '"> 
                ' . $theForm->question . '
            </label><br>


            <label class="contentLabel" id="shortAnsLabel_' . $shortAnswerIdNumber . '" for="shortAnsTextArea_' . $shortAnswerIdNumber . '">
                ' . $theForm->label . '
            </label>


            <input type="text" id="shortAnsTextArea_'. $shortAnswerIdNumber . '" name="shortAnswer_' . $shortAnswerIdNumber . '" placeholder="' . $theForm->placeHolderText . '"  maxlength="'. $theForm->characterLim .'"><br>
        
        </div>
    ';
}

function createParagraph($theForm , $idVal, $paragraphIdNumber)
{
    echo'
        <div formId = form_"'. $idVal .'" class="shortParaPrefabDiv formField" id="shortParaPrefabDiv_' . $paragraphIdNumber . '">
        
            <label class="questionHeader" id="shortParaQuestionLabel_' . $paragraphIdNumber . '" for="shortParaTextArea_' . $paragraphIdNumber . '">
                ' . $theForm->question . '
            </label><br>

            <textarea id="shortParaTextArea_' . $paragraphIdNumber . '" name="shortParagraph_' . $paragraphIdNumber . '" placeholder="'. $theForm->placeHolderText .'" rows="5" cols="64" maxlength="'. $theForm->characterLim .'">
            </textarea><br>
        
        </div>
    ';
}

function createStarRating($theForm , $idVal, $starRatingIdNumber)
{
    echo'
        <div formId= "form_' . $idVal . '" class="starPrefabDiv formField" id="starPrefabDiv_' . $starRatingIdNumber . '">
            <label class="questionHeader" id="starQuestionLabel_' . $starRatingIdNumber . '" for="starRating_' . $starRatingIdNumber . '">
                ' . $theForm->question . '
            </label><br>

            <label class="contentLabel" id="starLabel_' . $starRatingIdNumber . '" for="starRating_' . $starRatingIdNumber . '">
                ' . $theForm->label . '
            </label>
        
            <div class="starRatingDiv" id="starRating_' . $starRatingIdNumber . '" idCounterId='. $starRatingIdNumber .'>
        ';

        //Loop through number of stars to create
        for($i = 0; $i < $theForm->numStars; $i++)
        {
            global $starImgPth, $emptyStarImgPth;

            $chosenImage = ($i < $theForm->selectedOption) ? $starImgPth : $emptyStarImgPth;

            //add an input of type 'radio', with relavant attributes. Make display:none so that only label shows, thus providing an image to click
            
            echo'
                <input type="radio" id="starRating_' . $starRatingIdNumber . '_' . $i . '" name="starRating_' . $starRatingIdNumber . '" value="'. $i .'" style="visibility:hidden">
                <label for="starRating_'. $starRatingIdNumber .'_' . $i . '"><img class="starButton" src="'. $chosenImage .'"  width="20" height="20"></img></label>
            ';
        }



    echo'
            </div>
        </div>
    
    ';
}