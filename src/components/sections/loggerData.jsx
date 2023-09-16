import { logger } from "@/api/logger";
import suhu30API from "@/apiData/suhu";
import { Pagination } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoggerSection() {
  // get data logger
  const [loggerData, setLoggerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)


  useEffect(() => {
    const getLogger = async () => {
      suhu30API().then(function (result) {
        const { data: res } = result;
        
        setTotalPage(res.data.total_page)
        setLoggerData(res.data.data);
      });
    };
    getLogger();
  }, []);

  function handlePaginationChange(e, value) {
    if(currentPage != value) {
      setCurrentPage(value)
      suhu30API(value).then(function(results) {
        const {data: res} = results
        setLoggerData(res.data.data)
      })
    }
  }

  return (
    <div className="recent-orders">
      <h2 className="h2">Suhu 30 min</h2>
      <table>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Date Log</th>
            <th>TempR</th>
            <th>TempS</th>
            <th>TempT</th>
          </tr>
        </thead>
        <tbody>
          {loggerData.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.DeviceID}</td>
                <td>{value.DateLog}</td>
                <td>{value.TempR}</td>
                <td>{value.TempS}</td>
                <td>{value.TempT}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Navbar Start */}
      <Pagination
        count={totalPage}
        variant="outlined"
        color="primary"
        className="pagination mt-5"
        page={currentPage}
        onChange={handlePaginationChange}
       />
      {/* Navbar End */}
    </div>

  );
}
