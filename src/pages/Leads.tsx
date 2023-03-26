// import '../index.css';
// import '../Leads.css';
import axios from 'axios';
import { useRef } from 'react';
import img from '../import.png';

const API = 'https://prototype-gpt-backend.herokuapp.com'
// const API = 'http://localhost:5000'

const LeadsPage = () => {
	const fileInput = useRef<any>(null);

	const fileUpload = (target: any) => {
		const file = target.files[0];
		console.log(file.type)
		if(file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') window.location.reload();

		const formData = new FormData();
		formData.append('file', file);
		const name = localStorage.getItem('fullName');
		if(name) formData.append('name', name);
		axios.post(`${API}/api/upload`, formData)
			.then(res => console.log(res))
			.catch(err => console.log(err));
		console.log(file.type);
	}

	return (
		<>
			<div className="leads-main flex w-full h-full">
				<div className="leads-sidebar w-1/5 h-full min-h-full bg-[#2C2F48] flex flex-col items-center justify-start gap-80">
					<div className="leads-title text-4xl font-semibold text-blue-200 mt-10">
						Leads
					</div>
					<div className="leads-list flex flex-col items-center cursor-pointer select-none">
						<img src={img} className="w-20 h-20">

						</img>
						<div className="text-blue-100 text-2xl">
							No leads
						</div>
					</div>
				</div>
				<div className="leads-sec w-4/5 h-full flex flex-col">
					<div className="leads-banner w-3/5 h-64 mt-5 rounded-2xl bg-[url('./graphic.png')] bg-center bg-no-repeat self-center border-2 border-solid border-[#586FD1] flex items-center justify-center">
						<div className="banner-title text-2xl text-blue-200">
							Create your personalized message
						</div>
					</div>
					<div 
						className="leads-import w-96 h-72 border-[1px] border-solid border-[#6E5ED4] bg-[#2C2F48] self-center mt-24 rounded-3xl flex flex-col justify-center items-center gap-5 cursor-pointer"
						onClick={() => fileInput.current.click()}
					>
						<img src={img} className="w-32 h-32" />
						<div className="import-title text-2xl text-blue-100 font-medium">Import a .XLSX file (Excel)</div>
					</div>
					<input type="file" className="hidden" ref={fileInput} onChange={(e) => fileUpload(e.target)} />
				</div>
			</div>
		</>
	)
}

export default LeadsPage;