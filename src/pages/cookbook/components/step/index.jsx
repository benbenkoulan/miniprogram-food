import React from 'react'
import { Layout } from 'micro-design'
import './style.css'
import { getImageUrl } from '../../../../modules/utils/image'

function Step(props) {

    const renderCookStepDetail = (foodCookSteps) => (
        foodCookSteps.map((foodCookStep, index) => (
            <Layout className="menu--box">
                <wx-p className="step--name">步骤 {index + 1}</wx-p>
                {foodCookStep.imageId
                    ? <div>
                        <wx-image className="step--image"
                                  src={getImageUrl(foodCookStep.imageId)}/>
                    </div>
                    : null}
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
