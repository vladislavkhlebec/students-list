import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundary';
import StudentsListService from './services/studentslist-service';
import { StudentslistServiceProvider } from './components/studentslist-service-context';

import store from './store';

const studentsListService = new StudentsListService();

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<StudentslistServiceProvider value={studentsListService}>
				<Router>
					<App />
				</Router>
			</StudentslistServiceProvider>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('root')
);

