import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import './App.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import Likes from './panels/Likes';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	//const [likes, setLikes] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [token, setToken] = useState('');

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			try {
				const user = await bridge.send('VKWebAppGetUserInfo', {});
				const token = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7405726, "scope": "friends"});
				setUser(user);
				setToken(token.access_token);
				console.log('fetchData - user:', user, token);
			} catch (err) {
				console.log(err);
			}
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<Persik id='persik' go={go} />
			<Likes id='likes' go={go} token={token} />
		</View>
	);
}

export default App;

