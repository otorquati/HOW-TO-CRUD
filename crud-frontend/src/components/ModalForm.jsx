import { useEffect, useState } from "react";

export default function ModalForm({ isOpen, onClose, mode, OnSubmit, clientData }) {
  const [rate, setRate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Ativo");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const clientData = {name, email, job, rate: Number(rate), isactive: status}
        await OnSubmit(clientData)
        onClose();
    } catch (err) {
        console.error("Erro ao adicionar cliente", err)
    }
  };

  useEffect(() => {
    if (mode === 'edit' && clientData) {
        setName(clientData.name);
        setEmail(clientData.email);
        setJob(clientData.job);
        setRate(clientData.rate);
        setStatus(clientData.isactive);
    } else {
        setName('');
        setEmail('');
        setJob('');
        setRate('');
        setStatus(false);
    }
  }, [mode, clientData])

  return (
    <>
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {mode === "edit" ? "Edição de Cliente" : "Detalhes do Cliente"}
          </h3>
          <form method="dialog" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <label className="input input-bordered flex w-full items-center gap-2 my-4">
              Nome
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex w-full items-center gap-2 my-4">
              Email
              <input
                type="text"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex w-full items-center gap-2 my-4">
              Trabalho
              <input
                type="text"
                className="grow"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </label>
            <div className="flex mb-4 my-4 justify-between">
              <label className="input input-bordered mr-4 flex items-center gap-2">
                Taxa
                <input
                  type="number"
                  className="grow"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>
              <select
                value={status ? "Activo" : "Inativo"}
                defaultValue="Selecione uma situação"
                className="select select-bordered max-w-xs gap-4"
                onChange={handleStatusChange}
              >
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <button className="btn btn-success">
              {mode === "edit" ? "Salvar Alterações" : "Adicionar Cliente"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}