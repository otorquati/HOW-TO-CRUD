import axios from "axios";
import { useState, useEffect } from "react";
export default function TableList({ handleOpen, searchTerm }) {
	const [tableData, setTableData] = useState([]);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:3000/api/clients')
				setTableData(response.data);
			} catch (err) {
			setError(err.message);
			}
		};
		fetchData();
	},[]);

	// Filter the tableData based on the searchTerm
	const filterData = tableData.filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.email.toLowerCase().includes(searchTerm.toLowerCase()) || client.job.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
	  <>
	  	{ error && <div className="alert alert-error">{error}</div>}
		<div className="mt-10">
		  <table className="table">
			{/* head */}
			<thead>
			  <tr>
				<th>id</th>
				<th>Nome</th>
				<th>Email</th>
				<th>Trabalho</th>
				<th>Taxa</th>
				<th>Situação</th>
			  </tr>
			</thead>
			<tbody className="hover">
			  {/* row 1 */}
			  {filterData.map((client) => (
				<tr key={client.id}>
				  <th>{client.id}</th>
				  <td>{client.name}</td>
				  <td>{client.email}</td>
				  <td>{client.job}</td>
				  <td>{client.rate}</td>
				  <td>
					<button
					  className={`btn rounded-full w-20 ${
						client.isactive
						  ? `btn-primary`
						  : `btn-outline btn-primary`
					  }`}
					>
					  {client.isactive ? `Ativo` : `Inativo`}
					</button>
				  </td>
				  <td>
					<button
					  onClick={() => handleOpen("edit", client)}
					  className="btn btn-secondary"
					>
					  Atualizar
					</button>
				  </td>
				  <td>
					<button className="btn btn-accent">Excluir</button>
				  </td>
				</tr>
			  ))}
			</tbody>
		  </table>
		</div>
	  </>
	);
  }
