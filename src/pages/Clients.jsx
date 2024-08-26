import { useState } from "react";
import GenericTable from "../components/GenericTable";

function Clients () {
  const fields = ['name']
  const [clients, setClients] = useState([])
  return (
    <GenericTable
      fields={fields}
      elements={clients}
    />
  )
}
export default Clients;