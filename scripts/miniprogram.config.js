/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */
const { getPathRelativeRoot } = require('./util');

const pages = (pageName) => getPathRelativeRoot(`pages/${pageName}/index`);

module.exports = {
	origin: '/common',
	entry: '/',
	router: {
		home: pages('home'),
		category: pages('category'),
		my: pages('my'),
		search: pages('search'),
		create: pages('create'),
		my_cookbook: pages('my_cookbook'),
		collection: pages('collection'),
		cookbook: pages('cookbook'),
		my_follow: pages('my_follow'),
		my_draft: pages('my_draft'),
		user_home: pages('user_home')
	},
	redirect: {
		notFound: 'home',
		accessDenied: 'home',
	},
	generate: {
		appEntry: 'miniprogram-app',
		autoBuildNpm: 'npm',
		// autoBuildNpm: false,
		tabBar: {
			color: "#8a8a8a",
			selectedColor: "#1296db",
			list: [{
			  selectedIconPath: getPathRelativeRoot('assets/images/index.png'),
			  iconPath: getPathRelativeRoot('assets/images/index_inactive.png'),
			  pageName: "home",
			  text: "吃什么"
			}, {
			  selectedIconPath: getPathRelativeRoot('assets/images/category.png'),
			  iconPath: getPathRelativeRoot('assets/images/category_inactive.png'),
			  pageName: "category",
			  text: '有什么',
			}, {
			  selectedIconPath: getPathRelativeRoot('assets/images/my.png'),
			  iconPath: getPathRelativeRoot('assets/images/my_inactive.png'),
			  pageName: "my",
			  text: '我',
			}]
		  }
    },
	app: {
		navigationBarTitleText: 'miniprogram-project',
		navigationStyle: 'custom',
	},
	appExtraConfig: {
		// sitemapLocation: 'sitemap.json',
	},
	global: {},
	pages: {
		home: {
			pullDownRefresh: true,
		},
		my: {
			pullDownRefresh: true,
		},
		search: {
			// pullDownRefresh: true,
		}
	},
	optimization: {
		domSubTreeLevel: 10,

		elementMultiplexing: true,
		textMultiplexing: true,
		commentMultiplexing: true,
		domExtendMultiplexing: true,

		styleValueReduce: 5000,
		attrValueReduce: 5000,
	},
	projectConfig: {
        projectname: 'miniprogram-food',
		appid: 'wx9bcbc8c2549a2eb0',
	},
}
