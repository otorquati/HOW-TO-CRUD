import { useState } from "react";
import "./App.css";
import ModalForm from "./components/ModalForm";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);
  
  const handleOpen = (mode, client) => {
    setClientData(client)
    setModalMode(mode);
    setIsOpen(true);
  };
  
  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData)
        console.log('Cliente adicionado:', response.data);
        setTableData((prevData) => [...prevData, response.data]);
			} catch (error) {
			    console.error('Erro ao adicionar cliente', error);
      }
      console.log("modal mode Add");
    } else {
      console.log("modal mode Edit");
      console.log("Atualizando Cliente com id:", clientData.id);
        try{
            const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData)
            console.log('Cliente adicionado:', response.data);
            setTableData((prevData) =>
              prevData.map((client) => (client.id === clientData.id ? response.data : client))
          );
        } catch (error) {
          console.error('Erro ao atualizar cliente', error);
      }
    }
  };
  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList 
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen} 
        searchTerm={searchTerm}/>
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        OnSubmit={handleSubmit}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  );
}

export default App;
