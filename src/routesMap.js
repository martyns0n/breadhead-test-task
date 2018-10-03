import axios from 'axios';

export default {
	HOME: {
		path: '/',
		thunk: homeThunk
	},
	DASHBOARD: {
    path: '/dashboard',
    thunk: homeThunk
	}
};

const homeThunk = async (dispatch, getState) => {
  // console.log('im called')
  const { data } = await axios.get('http://localhost:8080')
  console.log('⭐', data)
};
