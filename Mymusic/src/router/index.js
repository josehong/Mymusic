import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/container/index'
import Mine from '@/container/mine'
import Home from '@/container/home'
import Dj from '@/container/dj'
import Mv from '@/container/mv'
import Notfound from '@/container/notfound'
import New_mv from '@/container/mv/second/new_mv'
import List_mv from '@/container/mv/second/list_mv'
import Playlist from '@/components/playlist'
import Songchart from '@/components/songchart'
import Songlist from '@/components/songlist'
import Singerlist from '@/components/singerlist'
import Secondsonglist from '@/components/secondsonglist'
import Singersonglist from '@/components/singersonglist'
import Recentplay from '@/components/recentplay'
import Fm from '@/components/fm'
import Album from '@/components/album'
import Search from '@/components/search'
import Play from '@/components/play'


Vue.use(Router)

export default new Router({
	routes: [{
			path: '*',
			component: Notfound
		},
		{
			path: '/',
			name: 'Index',
			redirect: '/home',
			component: Index,
			children: [{
					path: 'home',
					name: 'Home',
					component: Home,
				},
				{
					path: 'mine',
					name: 'Mine',
					component: Mine
				},
				{
					path: '/dj',
					name: 'Dj',
					component: Dj
				},
				{
					path: 'mv',
					name: 'Mv',
					redirect: '/mv/new_mv',
					component: Mv,
					children: [{
							path: 'new_mv',
							name: 'New_mv',
							//		      		redirect:'/new_mv',
							component: New_mv
						},
						{
							path: 'list_mv',
							name: 'List_mv',
							component: List_mv
						}
					]
				}
			]
		},
		{
			path:'/playlist',
			name:'Playlist',
			component:Playlist
		},
		{
			path:'/songchart',
			name:'Songchart',
			component:Songchart
		},
		{
			path:'/songlist',
			name:'Songlist',
			component:Songlist
		},
		{
			path:'/singerlist',
			name:'Singerlist',
			component:Singerlist
		},
		{
			path:'/secondsonglist',
			name:'Secondsonglist',
			component:Secondsonglist
		},
		{
			path:'/recentplay',
			name:'Recentplay',
			component:Recentplay
		},
		{
			path:'/fm',
			name:'Fm',
			component:Fm
		},
		{
			path:'/singersonglist',
			name:'Singersonglist',
			component:Singersonglist
		},
		{
			path:'/album',
			name:'Album',
			component:Album
		},
		{
			path:'/search',
			name:'Search',
			component:Search
		},
		{
			path:'/play',
			name:'Play',
			component:Play
		},
	]
})