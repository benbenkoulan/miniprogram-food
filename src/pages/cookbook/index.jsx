import React, { useState } from 'react'
import './style.css'
import { Layout } from 'micro-design'
import AuthorOtherCookBook from './components/authorOtherCookBook'
import Footer from './components/footer'
import AuthorInfo from './components/authorInfo'
import Ingredient from './components/ingredient'
import Step from './components/step'

function CookBook() {

    const mockData = {
        title: '小朋友可以一口吃掉4个的杯子蛋糕',
        name: '爱做饭爱洗碗的瘦子',
        description: '零难度的小点心，没事就想折腾起来！关键是小朋友爱吃(^.^)',
        mainImageUrl: 'http://m.qpic.cn/psc?/V11rIwqj3eAlyi/U.M5PgtxS1PFgLr9JTiFCzTX36Cvg2DbyvYlj679c9GeMygzpnyI1DqDVmgmt74e99Br.hxBPXKzyrr5dA.KZg!!/b&bo=ZQR9AwAAAAARBy8!&rf=viewer_4',
        authorUrl: 'http://b93.photo.store.qq.com/psb?/V11rIwqj3eAlyi/XU8KGhBuVSzzV9.QhmljsHwa5ODdix557G.XATvDMUE!/b/YXoFgTcIYwAAYmr*gDfuYgAA&bo=*wFWAQAAAAABBIo!&rf=viewer_4',
        ingredients: [
            { food: '鸡蛋', quantity: '6个' },
            { food: '糖', quantity: '90克' },
            { food: '牛奶', quantity: '75克' },
            { food: '玉米油', quantity: '60克' },
            { food: '玉米淀粉', quantity: '10克' },
            { food: '低粉', quantity: '100克' },
            { food: '柠檬汁', quantity: '3滴' }
        ],
        step: [
            {
                imageUrl: 'http://b73.photo.store.qq.com/psu?/1b8b74f0-148e-4623-991f-b9832da32379/eL*5eUlbcmNjLarhflJhCP1nfDkk8ddu5AnFE9eWRpE!/b/YSgHiStbLwAAYvoKiSvRLwAA&bo=9AFKAQAAAAABBJ0!&rf=viewer_4',
                description: '1.玉米油，蛋黄，牛奶混合搅拌均匀，低粉过筛加入进去 2.蛋白加入柠檬汁中速打散，加入三分之一的糖高速打出大气泡，再加入三分之一的糖，高速打出小勾尖，打蛋器拿起来，小勾尖不会弯即可 ' +
                    '\n3.挖一勺蛋白糊加入到蛋黄糊中，用刮片翻拌的手法混合均匀，混合剩下的糊 4.依次倒入纸杯中，八分满即可 离桌面10厘米高度震两下，震出小气泡 5.烤箱预热165度10分钟，放入纸杯蛋糕165度烤25分钟'
            }, {
                imageUrl: 'http://m.qpic.cn/psc?/V11rIwqj3eAlyi/U.M5PgtxS1PFgLr9JTiFCzTX36Cvg2DbyvYlj679c9GeMygzpnyI1DqDVmgmt74e99Br.hxBPXKzyrr5dA.KZg!!/b&bo=ZQR9AwAAAAARBy8!&rf=viewer_4',
                description: '制作过程忘记拍照了，下次再做补上，喜欢芝士的可以中间加入芝士，和喜欢的坚果，果脯之类的，最后还可以挤上奶油，用水果装饰起来，会更加漂亮✌️'
            }
        ],
        tips: '1. 混合蛋白质和蛋黄糊的手法一定不要打圈搅动，要用翻拌的手法\n2.纸杯倒入八分满即可\n3.6个鸡蛋大概可以做13杯左右，具体看纸杯的大小',
        pageView: 3088,
        collection: 253,
        createdDate: '2020-4-27',
        authorOtherCookBookDetail: [
            {
                imageUrl: 'http://b74.photo.store.qq.com/psu?/1b8b74f0-148e-4623-991f-b9832da32379/UVWkHdymPf8Zj7m6.P2Y0knh3j*5F2nXN1Q6M1O7gyc!/b/YT2sJCz3LQAAYpEzJixsLgAA&bo=3gFkAQAAAAABBJk!&rf=viewer_4',
                title: '轻松上手香酥小油条'
            }, {
                imageUrl: 'http://b73.photo.store.qq.com/psu?/1b8b74f0-148e-4623-991f-b9832da32379/1jxz96Syedglz4sKxg5lnaa8uiyZNUxhZbGMYnXPDWw!/b/YWefjSu6LgAAYoI2kiuJLwAA&bo=7QE0AQAAAAABFOo!&rf=viewer_4',
                title: '超简单的韩式辣白菜'
            }, {
                imageUrl: 'http://b74.photo.store.qq.com/psu?/1b8b74f0-148e-4623-991f-b9832da32379/N5B81.F81RVUP0S4JmsoNwKS3AjON9QlO87D6wO20QU!/b/Ya5KLCwQLgAAYgzoMCxjLQAA&bo=8wF1AQAAAAABBKU!&rf=viewer_4',
                title: '自己熬阿胶糕'
            }, {
                imageUrl: 'http://b74.photo.store.qq.com/psu?/1b8b74f0-148e-4623-991f-b9832da32379/ZyblHBaPi.Pl29iuklhRsINvZBuqBg.kroORk.DqhP0!/b/YfHMKizyLQAAYh62JyyRLgAA&bo=8wFJAQAAAAABFIk!&rf=viewer_4',
                title: '爱上辣椒皮蛋'
            }
        ]

    }

    const [foodMaterials] = useState(mockData)

    return (
        <div>
            <div>
                <div className="cookbook-image--box">
                    <wx-image mode="aspectFill" className="cookbook--image" src={foodMaterials.mainImageUrl}/>
                </div>
                <Layout className="menu--box">
                    <wx-p className="cookbook--title">{foodMaterials.title}</wx-p>
                </Layout>
            </div>
            <AuthorInfo {...foodMaterials}/>
            <Ingredient {...foodMaterials}/>
            <Step {...foodMaterials}/>
            <div className="tip--box">
                <wx-p className="tip--name">小贴士</wx-p>
                <wx-p className="tip--description">{foodMaterials.tips}</wx-p>
            </div>
            <Footer {...foodMaterials}/>
            <AuthorOtherCookBook {...foodMaterials}/>
        </div>
    )
}

export default CookBook
