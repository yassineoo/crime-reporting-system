import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
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
import Label from "../label";
import Iconify from "../iconify";
import Scrollbar from "../scrollbar";
// sections
import {
	FindingListHead,
	FindingListToolbar,
} from "../../sections/@dashboard/finding";
// mock
import FINDINGLIST from "../../_mock/findings";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "date", label: "Date", alignRight: false },
	{ id: "time", label: "Time", alignRight: false },
	{ id: "content", label: "Content", alignRight: false },
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

export function FindingsTable() {
	const [open, setOpen] = useState(null);

	const [page, setPage] = useState(0);

	const [order, setOrder] = useState("asc");

	const [selected, setSelected] = useState([]);

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");

	const [rowsPerPage, setRowsPerPage] = useState(5);

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
			const newSelecteds = FINDINGLIST.map((n) => n.name);
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

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - FINDINGLIST.length) : 0;

	const filteredReports = applySortFilter(
		FINDINGLIST,
		getComparator(order, orderBy),
		filterName
	);

	const isNotFound = !filteredReports.length && !!filterName;

	const [showForm, setShowForm] = useState(false);

	const handleAddButtonClick = () => {
		setShowForm(true);
	};

	return (
		<>
			<Container>
				<Card>
					<TableContainer sx={{ minWidth: 400 }}>
						<Table>
							<FindingListHead
								order={order}
								orderBy={orderBy}
								headLabel={TABLE_HEAD}
								rowCount={FINDINGLIST.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
								onSelectAllClick={handleSelectAllClick}
							/>
							<TableBody>
								{filteredReports
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										const { date, time, content } = row;
										const selectedReport = selected.indexOf(date) !== -1;

										return (
											<TableRow
												hover
												key={date + time}
												tabIndex={-1}
												role='checkbox'
												selected={selectedReport}
											>
												<TableCell padding='checkbox'>
													<Checkbox
														checked={selectedReport}
														onChange={(event) => handleClick(event, date)}
													/>
												</TableCell>

												<TableCell align='left'>
													{date.toLocaleString()}
												</TableCell>

												<TableCell align='left'>{time}</TableCell>

												<TableCell align='left'>{content}</TableCell>

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
						count={FINDINGLIST.length}
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

			{showForm && (
				<div className='fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white rounded-lg p-8 w-1/3'>
						<form>
							<h3 className='text-xl mb-6 text-center font-bold'>
								Add a Finding
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<label className='block text-gray-700 font-bold'>Date</label>
								<div className='flex'>
									{
										<input
											id='date'
											className='appearance-none border rounded w-full py-2 px-3 h-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											type='date'
										/>
									}
								</div>

								<label className='block text-gray-700 font-bold'>Time</label>
								<div className='flex'>
									{
										<input
											id='time'
											className='appearance-none border rounded w-full py-2 px-3 h-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											type='time'
										/>
									}
								</div>
								<label className='block text-gray-700 font-bold'>Content</label>
								<div className='flex'>
									{
										<textarea
											id='content'
											className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											type='text'
										></textarea>
									}
								</div>
							</div>
							<div className='flex justify-center mt-6'>
								<Button
									className='w-1/6'
									variant='contained'
									startIcon={<Iconify icon='eva:plus-fill' />}
									onClick={() => setShowForm(false)}
								>
									Add
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}

			<div className='flex justify-center mt-2'>
				<Button
					className='w-1/6'
					variant='contained'
					startIcon={<Iconify icon='eva:plus-fill' />}
					onClick={handleAddButtonClick}
				>
					Add
				</Button>
			</div>
		</>
	);
}
