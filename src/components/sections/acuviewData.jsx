import acuviewAPI from "@/apiData/acuview";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
// import XLSX from "xlsx";
var XLSX = require('xlsx')

import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export default function AcuviewSection() {
  // get data Acuview
  const [acuview, setAcuviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    const getAcuview = async () => {
      acuviewAPI().then(function(results) {
        const {data: res} = results

        setAcuviewData(res.data.data)
        setTotalPage(res.data.total_page)
      })
    }
    getAcuview()
  }, [])

  function handlePaginationChange(e, value) {
    if(currentPage != value) {
      setCurrentPage(value)
      acuviewAPI(value).then(function(results) {
        const {data: res} = results
        setAcuviewData(res.data.data)
      })
    }
  }

  const downloadExcel = async (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, Date.now().toString() + '.xlsx')

    await Filesystem.writeFile({ 
      path: Date.now().toString() + '.xlsx',
      data: XLSX.write(workbook, { bookType: "txt", type: "string" }),
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    }).then(() => {
      alert('excel file saved!')
    });
  };

  return (
    <div className="recent-orders">
      <h2 className="h2">Data 15 min</h2>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3" onClick={() => downloadExcel(acuview)}>Excel</button>
      <div id="table">
        <table>
          <thead>
            <tr>
              <th>Device ID</th>
              <th>Date Log</th>
              <th>Voltage R</th>
              <th>Voltage S</th>
              <th>Voltage T</th>
              <th>Voltage IN</th>
              <th>Voltage RS</th>
              <th>Voltage ST</th>
              <th>Voltage TR</th>
              <th>Voltage LL</th>
              <th>Arus R</th>
              <th>Arus S</th>
              <th>Arus T</th>
              <th>Arus SUM</th>
              <th>Power R</th>
              <th>Power S</th>
              <th>Power T</th>
              <th>Power SUM</th>
              <th>QA</th>
              <th>QB</th>
              <th>QC</th>
              <th>SA</th>
              <th>SB</th>
              <th>SC</th>
              <th>S</th>
              <th>Power Factor R</th>
              <th>Power Factor S</th>
              <th>Power Factor T</th>
              <th>PF</th>
              <th>F Req</th>
              <th>Arus N</th>
              <th>V Unbl</th>
              <th>I Unbl</th>
            </tr>
          </thead>
          <tbody>
            {acuview.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value?.DeviceID ? value.DeviceID : '-'}</td>
                  <td>{value?.DateLog ? value.DateLog : '-'}</td>
                  <td>{value?.VoltageR ? value.VoltageR : '-'}</td>
                  <td>{value?.VoltageS ? value.VoltageS : '-'}</td>
                  <td>{value?.VoltageT ? value.VoltageT : '-'}</td>
                  <td>{value?.VoltageIN ? value.VoltageIN : '-'}</td>
                  <td>{value?.VoltageRS ? value.VoltageRS : '-'}</td>
                  <td>{value?.VoltageST ? value.VoltageST : '-'}</td>
                  <td>{value.VoltageTR ? value.VoltageTR : '-'}</td>
                  <td>{value.VoltageLL ? value.VoltageLL : '-'}</td>
                  <td>{value?.ArusR ? value.ArusR : '-'}</td>
                  <td>{value?.ArusS ? value.ArusS : '-'}</td>
                  <td>{value?.ArusT ? value.ArusT : '-'}</td>
                  <td>{value?.ArusSUM ? value.ArusSUM : '-'}</td>
                  <td>{value?.PowerR ? value.PowerR : '-'}</td>
                  <td>{value?.PowerS ? value.PowerS : '-'}</td>
                  <td>{value?.PowerT ? value.PowerT : '-'}</td>
                  <td>{value?.PowerSUM ? value.PowerSUM : '-'}</td>
                  <td>{value?.QA ? value.QA : '-'}</td>
                  <td>{value?.QB ? value.QB : '-'}</td>
                  <td>{value?.QC ? value.QC : '-'}</td>
                  <td>{value?.SA ? value.SA : '-'}</td>
                  <td>{value?.SB ? value.SB : '-'}</td>
                  <td>{value?.SC ? value.SC : '-'}</td>
                  <td>{value?.S ? value.S : '-'}</td>
                  <td>{value?.PowerFacR ? value.PowerFacR : '-'}</td>
                  <td>{value?.PowerFacS ? value.PowerFacS : '-'}</td>
                  <td>{value?.PowerFacT ? value.PowerFacT : '-'}</td>
                  <td>{value?.PF ? value.PF : '-'}</td>
                  <td>{value?.Freq ? value.Freq : '-'}</td>
                  <td>{value?.ArusN ? value.ArusN : '-'}</td>
                  <td>{value?.V_Unbl ? value.V_Unbl : '-'}</td>
                  <td>{value?.I_UNBL ? value.I_UNBL : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Navbar Start */}
        <Pagination
          count={totalPage}
          variant='outlined'
          color='primary'
          className='pagination mt-5'
          page={currentPage}
          onChange={handlePaginationChange}
        />
      {/* Navbar End */}
    </div>
  );
}
