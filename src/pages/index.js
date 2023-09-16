import { logger } from "@/api/logger";
import Layout from "@/components/layouts";
import MapBJB from "@/components/partials/map";
import ToolBox from "@/components/sections/toolbox";
import Image from "next/image";

import { useEffect, useState } from "react";

export default function Home() {
  // get data logger
  const [loggerData, setLoggerData] = useState([]);
  useEffect(() => {
    const getLogger = async () => {
      logger().then(function (result) {
        // const { data: res } = result;
        setLoggerData(result);
      });
    };
    getLogger();
  }, []);
  
  return (
    <>
      <Layout>
        <h1 className="h1">BJB Monitoring</h1>
        <ToolBox />
        <div>
          <MapBJB />
        </div>
      </Layout>
    </>
  );
}
