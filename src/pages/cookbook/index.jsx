import React, { useState } from 'react'
import './style.css'
import { Layout, Sider, Content } from 'micro-design'
import { VariableSizeList as List } from 'react-window'
//
// const getFoodMaterials = () => [{
//   key: 'COLLECTION',
//   text: '鸡蛋',
// }, {
//   key: 'FOLLOW',
//   text: '牛奶',
// }]

function CookBook() {


    const mockData = {
        title: '小朋友可以一口吃掉4个的杯子蛋糕',
        name: '爱做饭爱洗碗的瘦子',
        description: '零难度的小点心，没事就想折腾起来！关键是小朋友爱吃(^.^)',
        mainImageUrl:'http://m.qpic.cn/psc?/V11rIwqj3eAlyi/U.M5PgtxS1PFgLr9JTiFCzTX36Cvg2DbyvYlj679c9GeMygzpnyI1DqDVmgmt74e99Br.hxBPXKzyrr5dA.KZg!!/b&bo=ZQR9AwAAAAARBy8!&rf=viewer_4',
        authorUrl:'http://b93.photo.store.qq.com/psb?/V11rIwqj3eAlyi/XU8KGhBuVSzzV9.QhmljsHwa5ODdix557G.XATvDMUE!/b/YXoFgTcIYwAAYmr*gDfuYgAA&bo=*wFWAQAAAAABBIo!&rf=viewer_4'
    }

    const [foodMaterials] = useState(mockData)

    const renderFoodMaterialHeader = (foodMaterialsHeaderData) => (
        <div>
            <div className="cookbook-image--box">
                <wx-image mode="aspectFill" className="cookbook--image" src={foodMaterialsHeaderData.mainImageUrl}/>
            </div>
            <Layout className="menu--box">
                <wx-p className="cookbook--title">{foodMaterialsHeaderData.title}</wx-p>
            </Layout>
        </div>)

    const renderFoodMaterialAuthor = (foodMaterialsHeaderData) => (
        <div>
            <Layout hasSider className="author-info--box">
                <Sider width="60px">
                    <wx-image className="author--icon" src={foodMaterialsHeaderData.authorUrl}/>
                </Sider>
                <Content className="author--name">
                    {foodMaterialsHeaderData.name}
                </Content>
                <Sider width="80px" className="attention-btn--box">
                    <wx-button className="attention--btn" open-type="share">关注</wx-button>
                </Sider>
            </Layout>
            <wx-p className="cookbook--description">{foodMaterialsHeaderData.description}</wx-p>
        </div>
    )

    return (
        <div>
            {
                renderFoodMaterialHeader(foodMaterials)
            }
            {
                renderFoodMaterialAuthor(foodMaterials)
            }
        </div>
    )
}

export default CookBook
