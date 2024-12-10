import { useEffect, useState } from 'react';
import GenericTable from '../components/GenericTable';
import { RemunerationService } from '../service/remuneration';
import { useNavigate } from 'react-router-dom';
import "../styles/clients&suppliers.css"

function Remunerations() {
  const [remunerations,setRemunerations] = useState([]);
  const fields = ['year'];
  const navigate = useNavigate();
  const [prettyData, setPrettyData] = useState([]);
  const fetchParents = async () => {
    const remunerationsData = await RemunerationService.getParents();
    setRemunerations(remunerationsData);
  };

  const viewDetail = (element) => {
    console.log(element);
    navigate('/profit-detail', { state: { profit: element } });
  };

  const formatData = () => {
    let array = [];
    remunerations.forEach((remuneration) => {
      let element = {
        id: remuneration.id,
        year: formatYear(remuneration.date)
      };
      array.push(element);
    });
    setPrettyData(array);
  };

  const formatYear = (dateString) => {
    const year  = dateString.split('-')[0];
    return year;
  };

  useEffect(() => {
    fetchParents();

  },[]);


  useEffect(() => {
    if (remunerations.length>0){
      formatData();
    }
  },[remunerations]);

  return (
    <div className="container" >
      <div className='headerContainer'></div>
      <h2 className="title" >Ganancias</h2>

      <hr />
      <div className='tableContainer'>
      <GenericTable
          fields={fields}
          elements={prettyData}
          viewButton={true}
          textViewButton={"Detalle"}
          viewElement={viewDetail}
        />
      </div>
    </div>
  );
}export default Remunerations;