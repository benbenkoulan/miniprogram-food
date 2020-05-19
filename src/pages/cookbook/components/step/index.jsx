import React from 'react'
import {Layout} from 'micro-design'
import './style.css'

function Step(props) {

    const renderCookStepDetail = (foodCookSteps) => (
        foodCookSteps.map((foodCookStep, index) => (
            <Layout className="menu--box">
                <wx-p className="step--name">步骤 {index + 1}</wx-p>
                <div>
                    <wx-image className="step--image" src={foodCookStep.imageUrl}/>
                </div>
                <wx-p className="step--description">{foodCookStep.description}</wx-p>
            </Layout>
        ))
    )

    return (
        <div className="step--box">
            {renderCookStepDetail(props.step)}
        </div>
    )
}

export default Step
