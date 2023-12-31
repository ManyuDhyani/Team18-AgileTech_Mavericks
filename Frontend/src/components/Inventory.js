import React, { useEffect, useState } from "react";
import axios from "axios";
import MedCard from "./MedCard";
import { Grid } from "@mui/material";
import "../App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import UpdateMedicine from "./UpdateMedicine";
import Button from "@mui/material/Button";
import DeleteMedicine from "./DeleteMedicine";

export default function Inventory(props) {
  const [data, setData] = useState(0);
  const [nullmed, setNullmed] = useState(false);
  const [ud, setUd] = useState(false);
  const [us, setUs] = useState(false);
  const getdata = async () => {
    setNullmed(false);
    setUd(false);
    setUs(false);
    let inv = await axios.get("http://localhost:8000/inventory");
    if (props.props.user_type !== "A") inv.data = inv.data.slice(0, 5);
    if (inv.data.message == "No Medicines") setNullmed(true);
    else setData(inv.data);
    return inv;
  };

  // console.log(data);
  useEffect(() => {
    getdata();
  }, [ud, us]);

  return (
    <React.Fragment>
      {data && data.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>mg</TableCell>
              <TableCell>exp_date</TableCell>
              <TableCell>Current stock</TableCell>
              <TableCell>Threshold</TableCell>
              <TableCell>remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.mg}</TableCell>
                  <TableCell>{row.exp_date}</TableCell>
                  <TableCell>
                    <UpdateMedicine props={{ row, us, setUs }}></UpdateMedicine>
                  </TableCell>
                  <TableCell>{row.threshold}</TableCell>
                  <TableCell>{row.remark}</TableCell>
                  <TableCell>
                    <DeleteMedicine props={{ row, ud, setUd }}></DeleteMedicine>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div>No inventory available</div>
      )}
    </React.Fragment>
  );
}
