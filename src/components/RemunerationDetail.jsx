import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RemunerationService } from "../service/remuneration";
import GenericTable from "./GenericTable";
import { Button } from "react-bootstrap";
import DateModal from "./DateModal";
import { format, parseISO } from 'date-fns';
import { da, es, id } from 'date-fns/locale';
import "../styles/clients&suppliers.css"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function RemunerationDetail() {
  const location = useLocation();
  const { profit } = location.state || {};
  const [profits, setProfits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const fields = ['month', 'amount_usd', 'amount_ars'];
  const usdFields = ['month', 'exchange_rate', 'total_month'];
  const [data, setData] = useState([]);
  const [prettyData, setPrettyData] = useState([]);
  const [usdData, setUsdData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [total, setTotal] = useState(0);



  const getProfits = async () => {
    const profitsData = await RemunerationService.getDetail(profit.id);
    setProfits(profitsData);
  };

  useEffect(() => {
    getProfits();
  }, []);

  useEffect(() => {
    if (profits.length > 0) {
      formatData();
      formatPretty();
      formatUsd();
    }
  }, [profits]);

  const handleCloseModal = () => {
    setShowModal(false);
    getProfits();
  };

  const formatData = () => {
    let array_data = profits.map((profit) => ({
      name: getMonthName(profit.date),
      usd: profit.amount_usd,
      ars: profit.amount_ars
    }));
    setData(array_data);
  };


  const formatPretty = () => {
    let array = [];
    profits.forEach((profit) => {
      let element = {
        id: profit.id,
        month: getMonthName(profit.date),
        amount_usd: currencyFormat(profit.amount_usd),
        amount_ars: currencyFormat(profit.amount_ars)
      };
      array.push(element);
    });
    setPrettyData(array);
  };

  const formatUsd = () => {
    let array = [];
    let array_data = [];
    let amount_total = 0;
    profits.forEach((profit) => {
      let total_current_month = profit.amount_usd + (profit.amount_ars / profit.exchange_rate);
      let element = {
      id: profit.id,
      month: getMonthName(profit.date),
      exchange_rate: currencyFormat(profit.exchange_rate),
      total_month: currencyFormat(total_current_month)
      };
      let graph_element = {
        name: getMonthName(profit.date),
        usd: total_current_month,
      };
      amount_total += total_current_month;
      array.push(element);
      array_data.push(graph_element);
    });
    setUsdData(array);
    setTotal(amount_total);
    setGraphData(array_data);
  };

  const dateFormat = (dateString) => {
    if (dateString == null) {
      return;
    }

    const date = new Date(dateString);
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getMonthName = (dateString) => {
    const formattedDate = dateFormat(dateString);
    const dateObj = parseISO(formattedDate);
    return format(dateObj, 'MMMM', { locale: es });
  };

  const currencyFormat = (value) => {
    let mountFormatted = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
    return mountFormatted;
  }



  const formatTooltip = (value) => {
    return currencyFormat(value);
  };

  const formatYAxis = (value) => {
    return value.toLocaleString('es-Es');
  };


  return (
    <>
      <div className="container" style={{ position: 'relative' }}>
        <div className="headerContainer">
        <h2 className="title" >Facturado en {profit.year}</h2>
        <Button className="newButton" onClick={() => { setShowModal(true); }}>Generar un detalle</Button>
        </div>
      <GenericTable fields={fields} elements={prettyData} />
      </div>


      <div className="container">
        <div className="headerContainer">
          <h4>Gráfica en ARS y USD</h4>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={formatYAxis}
            />
            <Tooltip
              formatter={formatTooltip} />
            <Legend />
            <Area type="monotone" dataKey="usd" stroke="#82ca9d" fillOpacity={0.3} fill="#82ca9d" />
            <Area type="monotone" dataKey="ars" stroke="#8884d8" fillOpacity={0.3} fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="container">
        <div className="headerContainer"></div>
        <h2 className="title">Total facturado convertido a USD</h2>
        <h4>Total anual usd {currencyFormat(total)}</h4>
        <GenericTable fields={usdFields} elements={usdData} />
      </div>

      <div className="container">
        <div className="headerContainer">
          <h4>Gráfica en dólares</h4>
          <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={formatYAxis}
            />
            <Tooltip
              formatter={formatTooltip} />
            <Legend />
            <Area type="monotone" dataKey="usd" stroke="#82ca9d" fillOpacity={0.3} fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>

      <DateModal show={showModal} handleClose={handleCloseModal} date={profit.year} />

    </>
  );
}

export default RemunerationDetail;
