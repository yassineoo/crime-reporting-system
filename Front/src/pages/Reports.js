import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../utils/axios";

// @mui
import {
	Card,
	Table,
	Stack,
	Paper,
	Avatar,
	Button,
	Popover,
	Checkbox,
	TableRow,
	MenuItem,
	TableBody,
	TableCell,
	Container,
	Typography,
	IconButton,
	TableContainer,
	TablePagination,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import {
	ReportListHead,
	ReportListToolbar,
} from "../sections/@dashboard/report";
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "id", label: "#", alignRight: false },
	{ id: "citizenName", label: "Citizen name", alignRight: false },
	{ id: "date", label: "Date", alignRight: false },
	{ id: "sector", label: "Sector", alignRight: false },
	{ id: "type", label: "Type", alignRight: false },
	{ id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(
			array,
			(_report) =>
				_report.citizenName.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

export function Reports() {
	const [open, setOpen] = useState(null);

	const [page, setPage] = useState(0);

	const [ReportLIST, setReportLIST] = useState([]);

	const [order, setOrder] = useState("asc");

	const [selected, setSelected] = useState([]);

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");

	const [rowsPerPage, setRowsPerPage] = useState(5);

	async function getReports() {
		const response = await axiosInstance.get("/reports");
		const data = response.data;
		setReportLIST(data);
	}

	useEffect(() => {
		getReports();
	}, []);

	const handleOpenMenu = (event) => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = ReportLIST.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setPage(0);
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const handleFilterByName = (event) => {
		setPage(0);
		setFilterName(event.target.value);
	};

	const location = useNavigate();
	const handleClickOnRow = (id) => {
		location(`/reports/${id}`);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ReportLIST.length) : 0;

	const filteredReports = applySortFilter(
		ReportLIST,
		getComparator(order, orderBy),
		filterName
	);

	const isNotFound = !filteredReports.length && !!filterName;

	return (
		<>
			<Container>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					mb={2}
				>
					<Typography variant='h4' gutterBottom>
						Reports
					</Typography>
				</Stack>
				<Card>
					<ReportListToolbar
						numSelected={selected.length}
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<TableContainer sx={{ minWidth: 800 }}>
						<Table>
							<ReportListHead
								order={order}
								orderBy={orderBy}
								headLabel={TABLE_HEAD}
								rowCount={ReportLIST.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
								onSelectAllClick={handleSelectAllClick}
							/>
							<TableBody>
								{filteredReports
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										const {
											Crime_No,
											Status,
											Category,
											Description,
											Crime_Scene,
											Suspects,
											phoneNumber,
											Address,
											evidence,
										} = row;
										const selectedReport = selected.indexOf(Crime_No) !== -1;

										return (
											<TableRow
												hover
												key={Crime_No}
												tabIndex={-1}
												role='checkbox'
												selected={selectedReport}
												onClick={() => handleClickOnRow(Crime_No)}
												className='cursor-pointer'
											>
												<TableCell padding='checkbox'>
													<Checkbox
														checked={selectedReport}
														onChange={(event) => handleClick(event, Crime_No)}
													/>
												</TableCell>

												<TableCell align='left'>{Crime_No}</TableCell>

												<TableCell component='th' scope='row' padding='none'>
													<Stack
														direction='row'
														alignItems='center'
														spacing={2}
													>
														<Typography variant='subtitle2' noWrap>
															{"Cristiano Ronaldo"}
														</Typography>
													</Stack>
												</TableCell>

												<TableCell align='left'>{"10/10/1001"}</TableCell>

												<TableCell align='left'>{Crime_Scene}</TableCell>

												<TableCell align='left'>{Category}</TableCell>

												<TableCell align='right'>
													<IconButton
														size='large'
														color='inherit'
														onClick={handleOpenMenu}
													>
														<Iconify icon={"eva:more-vertical-fill"} />
													</IconButton>
												</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>

							{isNotFound && (
								<TableBody>
									<TableRow>
										<TableCell align='center' colSpan={6} sx={{ py: 3 }}>
											<Paper
												sx={{
													textAlign: "center",
												}}
											>
												<Typography variant='h6' paragraph>
													Not found
												</Typography>

												<Typography variant='body2'>
													No results found for &nbsp;
													<strong>&quot;{filterName}&quot;</strong>.
													<br /> Try checking for typos or using complete words.
												</Typography>
											</Paper>
										</TableCell>
									</TableRow>
								</TableBody>
							)}
						</Table>
					</TableContainer>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={ReportLIST.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Container>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleCloseMenu}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						p: 1,
						width: 140,
						"& .MuiMenuItem-root": {
							px: 1,
							typography: "body2",
							borderRadius: 0.75,
						},
					},
				}}
			>
				<MenuItem>
					<Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
					Edit
				</MenuItem>

				<MenuItem sx={{ color: "error.main" }}>
					<Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
					Delete
				</MenuItem>
			</Popover>
		</>
	);
}
