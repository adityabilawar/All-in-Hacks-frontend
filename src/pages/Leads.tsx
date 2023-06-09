// import '../index.css';
// import '../Leads.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import img from '../import.png';

const API = 'https://prototype-gpt-backend.herokuapp.com'
// const API = 'http://localhost:5000'

const LeadsPage = () => {
	const fileInput = useRef<any>(null);
	const [data, setData] = useState<any>(null);
	const [status, setStatus] = useState('No leads');

	const fileUpload = (target: any) => {
		const file = target.files[0];
		console.log(file.type)
		if(file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') window.location.reload();

		const formData = new FormData();
		formData.append('file', file);
		const name = localStorage.getItem('fullName');
		if(name) formData.append('name', name);
		axios.post(`${API}/api/upload`, formData)
			.then(res => setData(res.data))
			.catch(err => {
				console.log(err);
				setStatus('Error while Uploading');
			});
		setStatus('Loading...');
	}

	return (
		<>
			<div className="leads-main flex w-full h-full">
				<div className={`leads-sidebar w-1/5 h-full min-h-full bg-[#2C2F48] flex flex-col justify-start ${(data === null) ? "gap-80" : "gap-5"}`}>
					<div className="leads-title text-4xl font-semibold text-blue-200 mt-10 self-center">
						Leads
					</div>
					{(data !== null)
						? 
							<div className="leads-list flex flex-col justify-center gap-5 items-center">
								{data.map((res: any, ind: any) => (
									<div className="lead-listing flex w-full h-12 border-t-2 border-solid border-[#1D203E] items-center gap-10" key={ind}>
										<div className="lead-listing-name text-xl text-blue-100 ml-5 mt-1" key={`name-${ind}`}>
											{res.name}
										</div>
										<div className="lead-listing-info flex flex-col mt-4" key={`info-${ind}`}>
											<div className="lead-listing-position text-lg text-blue-100" key={`pos-${ind}`}>{res.position}</div>
											<div className="lead-listing-company text-lg text-blue-100" key={`company-${ind}`}>{res.company}</div>
										</div>
									</div>
								))}
							</div>
						:	
							<div className="leads-list flex flex-col items-center cursor-pointer select-none self-center">
								<img src={img} className="w-20 h-20">

								</img>
								<div className="text-blue-100 text-2xl">
									{status}
								</div>
							</div>
					}
					
				</div>
				<div className="leads-sec w-4/5 h-full flex flex-col">
					<div className="leads-banner w-3/5 h-64 mt-5 rounded-2xl bg-[url('./graphic.png')] bg-center bg-no-repeat self-center border-2 border-solid border-[#586FD1] flex items-center justify-center">
						<div className="banner-title text-2xl text-blue-200">
							Create your personalized message
						</div>
					</div>
					{(data !== null) ? 
							<div className="leads-options flex flex-wrap gap-10 mt-10 ml-20 overflow-y-scroll">
								{data.map((res: any, ind: any) => (
									<div className="leads-option w-72 max-w-72 h-56 max-h-56 bg-[#2C2F48] overflow-y-scroll flex justify-center p-5 rounded-xl" key={`option-${ind}`}>
										
										<div className="text-blue-100 text-sm">
											<p className="text-blue-200 text-2xl">{res.type} for {res.name}</p>
											{res.res.split('\n').map((str: any) => <p>{str}</p>)}
										</div>
									</div>
								))}
							</div>
						:
							<div 
								className="leads-import w-96 h-72 border-[1px] border-solid border-[#6E5ED4] bg-[#2C2F48] self-center mt-24 rounded-3xl flex flex-col justify-center items-center gap-5 cursor-pointer"
								onClick={() => fileInput.current.click()}
							>
								<img src={img} className="w-32 h-32" />
								<div className="import-title text-2xl text-blue-100 font-medium">Import a .XLSX file (Excel)</div>
							</div>
					}
					<input type="file" className="hidden" ref={fileInput} onChange={(e) => fileUpload(e.target)} />
				</div>
			</div>
		</>
	)
}

export default LeadsPage;