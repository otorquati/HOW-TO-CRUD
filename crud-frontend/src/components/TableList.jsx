import axios from "axios";
import { useState} from "react";
export default function TableList({ handleOpen, searchTerm , tableData, setTableData}) {

	const [error, setError] = useState(null);
	


	// Filter the tableData based on the searchTerm
	const filterData = tableData.filter(client => 
		client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
		client.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
		client.job.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handelDelete = async (id) => {
		const confirmDelete = window.confirm("Tem certeza que deseja apagar este cliente?")
		if (confirmDelete) {
			try {
				await axios.delete(`http://localhost:3000/api/clients/${id}`);
				setTableData((prevData) =>
					prevData.filter((client) => client.id !== id));
			} catch (err) {
				setError(err.message);
			}
		}
	}
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
					<button className="btn btn-accent" onClick={() => handelDelete(client.id)}>Excluir</button>
				  </td>
				</tr>
			  ))}
			</tbody>
		  </table>
		</div>
	  </>
	);
  }
