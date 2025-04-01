export default function TableList({ handleOpen }) {
	const clientes = [
	  {
		id: 1,
		name: "Osvaldo Torquati",
		email: "torquati.osvaldo@gmail.com",
		job: "Desenvolvedor",
		rate: "100",
		isactive: true,
	  },
	  {
		id: 2,
		name: "Maria Hilda de S. Silva",
		email: "souza.hildasilva@gmail.com",
		job: "Coordenadora",
		rate: "101",
		isactive: true,
	  },
	  {
		id: 3,
		name: "Thiago Torquati",
		email: "ttorquati@gmail.com",
		job: "Desenvolvedor",
		rate: "102",
		isactive: false,
	  },
	];
	return (
	  <>
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
			  {clientes.map((cliente) => (
				<tr>
				  <th>{cliente.id}</th>
				  <td>{cliente.name}</td>
				  <td>{cliente.email}</td>
				  <td>{cliente.job}</td>
				  <td>{cliente.rate}</td>
				  <td>
					<button
					  className={`btn rounded-full w-20 ${
						cliente.isactive
						  ? `btn-primary`
						  : `btn-outline btn-primary`
					  }`}
					>
					  {cliente.isactive ? `Ativo` : `Inativo`}
					</button>
				  </td>
				  <td>
					<button
					  onClick={() => handleOpen("edit")}
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