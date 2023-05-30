import React from "react";
import { ContextWrapper } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Reports, Sidebar, Investigations } from "./pages";
import { ReportDetails } from "./pages/ReportDetails";
import { InvestigationDetails } from "./pages/InvestigationDetails";
import { Login } from "./pages/Login";

function App() {
	return (
		<ContextWrapper>
			<Router>
				<Routes>
					<Route path='/login' element={<Login />} />

					<Route path='/' element={<Sidebar></Sidebar>}>
						<Route path='/reports' element={<Reports></Reports>} />
						<Route
							path='/reports/:id'
							element={<ReportDetails></ReportDetails>}
						/>
						<Route
							path='/investigations'
							element={<Investigations></Investigations>}
						/>
						<Route
							path='/investigations/:id'
							element={<InvestigationDetails></InvestigationDetails>}
						/>
						<Route path='/courtCases' />
						<Route path='/statistics' />
						<Route path='/profile' />
						<Route path='/' />
					</Route>
				</Routes>
			</Router>
		</ContextWrapper>
	);
}

export default App;
