import React from 'react';
//import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import './Likes.css';

const osName = platform();

const Likes = props => {
	async function fetchData() {
		try {
			//const chat = await bridge.send('VKWebAppGetUserInfo', {});
			const likes = await bridge.send("VKWebAppCallAPIMethod", {
				"method": "likes.getList",
				"params": {
					"access_token": props.token,
					"type": "post",
					"item_id": 16655,
					"extended": true,
					"v": "5.103",
				},
			});
			console.log('fetchData - likes:', likes);
		} catch (err) {
			console.log(err);
		}
	}

	const buttonTestHandler = () => {
		console.log('click');
		fetchData();
	}

	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<PanelHeaderButton onClick={props.go} data-to="home">
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}
			>
				Страница лайков
			</PanelHeader>
			<Group>
				<Div>
					<Button size="xl" level="2" onClick={buttonTestHandler}>
						Получить лайки
					</Button>					
				</Div>
			</Group>
		</Panel>
	);
}

export default Likes;
