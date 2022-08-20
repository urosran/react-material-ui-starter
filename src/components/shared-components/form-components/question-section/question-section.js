import React, { useState } from 'react';
import { AddBox } from '../../button/add-box/add-box';
import { FilterSelect } from '../../filter-select/filter-select';
import { LongInput } from '../long-input/long-input';

export const QuestionSection = ({number, addBoxLabel, onClick, width}) => {
    const questionOptions = [{name: "Type I question", value: '1'}, {name: "Type II question", value: '2'}];
    const [addQuestion, setAddQuestion] = useState(false);
    const onAddClick = () => {
        setAddQuestion(true);
    }
    return(
        <div className='question-section-wrap'>
            <p className='small-subtitle'>Question #{number}</p>
            <FilterSelect options={questionOptions} placeholder='Select response type'/>
            <LongInput label='This is the question that participants will see.' width={width}/>
            <AddBox size='small' label={addBoxLabel} onAddBoxClick={() => onAddClick()}/>
        </div>
    )
}