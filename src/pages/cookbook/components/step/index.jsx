import React from 'react'
import {Layout} from 'micro-design'
import './style.css'
import { BASE_REQUEST_URL } from '../../../../modules/constant/network'

function Step(props) {

    const renderCookStepDetail = (foodCookSteps) => (
        foodCookSteps.map((foodCookStep, index) => (
            <Layout className="menu--box">
                <wx-p className="step--name">步骤 {index + 1}</wx-p>
                <div>
                    {foodCookStep.imageId
                        ? <wx-image className="step--image" src={`${BASE_REQUEST_URL}/services/file/images/${foodCookStep.imageId}`}/>
                        : null}
                </div>
                <wx-p className="step--description">{foodCookStep.description}</wx-p>
            </Layout>
        ))
    )

    return (
        <div className="step--box">
            {props && props.step && renderCookStepDetail(props.step)}
        </div>
    )
}

export default Step
