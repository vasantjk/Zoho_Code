import React from "react";
import {
  AddToll,
  Button,
  Dialog,
  Input,
  Label,
  Select,
  Table,
} from "./components";

const viewTollData = [
  "TollName",
  "Car/Jeep/Van",
  "LCV",
  "Heavy_Vehicle",
  "Truck/Bus",
];
const InitialVech = {
  VehicleType: "",
  Tariff: "",
  VehicleNumber: "",
  "Date/Time": "",
  TollName: "",
};
function App() {
  const [viewAllToll, setViewAllToll] = React.useState(false);
  const [tollName, setTollName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openEnt, setOpenEnty] = React.useState(false);
  const [tollDetail, setTollDetail] = React.useState([]);
  const [vehicleDet, setVehicleDet] = React.useState(InitialVech);
  const [clear, setClear] = React.useState(false);
  const handleViewToll = () => {
    setViewAllToll(true);
  };
  const GetTollDetailFun = (val) => {
    setTollDetail(val);
  };
  const contructViewTollData = () => {
    if (
      tollName.length !== 0 &&
      tollDetail.every((e) =>
        Object.entries(e).every((val) => val[1].length !== 0)
      )
    ) {
      let construct = {
        TollName: tollName,
        [tollDetail[0]
          .vehicleType]: `${tollDetail[0].up}/${tollDetail[0].down}`,
        [tollDetail[1]
          .vehicleType]: `${tollDetail[1].up}/${tollDetail[1].down}`,
        [tollDetail[2]
          .vehicleType]: `${tollDetail[2].up}/${tollDetail[2].down}`,
        [tollDetail[3]
          .vehicleType]: `${tollDetail[3].up}/${tollDetail[3].down}`,
      };
      let Res = [];
      if (sessionStorage.getItem("ViewToll")) {
        let G = JSON.parse(sessionStorage.getItem("ViewToll"));

        Res = [...Res, ...G, construct];
      } else {
        Res = [...Res, construct];
      }

      if (Object.keys(construct).length === 5) {
        sessionStorage.setItem("ViewToll", JSON.stringify(Res));
        setTollDetail([]);
        setOpen(false);
        if (sessionStorage.getItem("ViewToll").length !== 0) {
          window.location.reload(true);
          setTimeout(() => {
            window.location.reload(false);
          }, 10);
        }
        setClear(!clear);
      } else {
        alert("Same Vehicle List Cannot Be Selected");
      }
    } else {
      alert("Please Fill All The Required Fields");
    }
  };
  const handleChange = (val) => {
    setVehicleDet({
      ...vehicleDet,
      VehicleType: val.target.value,
      Tariff: JSON.parse(sessionStorage.getItem("ViewToll"))
        .filter(
          (v) => v.TollName === vehicleDet.TollName && v[val.target.value]
        )[0]
        [val.target.value].split("/")[0],
    });
  };
  const handleAddVech = () => {
    let Valid = {
      ...vehicleDet,
    };
    Valid["Date/Time"] = `${new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("/")}, ${new Date().toISOString().slice(11, 19)}`;
    if (Object.entries(Valid).every((val) => val[1].length !== 0)) {
      let Res = [];
      if (sessionStorage.getItem("VehicleLog")) {
        let G = JSON.parse(sessionStorage.getItem("VehicleLog"));

        Res = [...Res, ...G, Valid];
      } else {
        Res = [...Res, Valid];
      }
      sessionStorage.setItem("VehicleLog", JSON.stringify(Res));
      if (sessionStorage.getItem("VehicleLog").length !== 0) {
        window.location.reload(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 10);
      }
      setVehicleDet(InitialVech);
      setOpenEnty(false);
    } else {
      alert("Required Fields Are Empty");
    }
  };
  const handleVehEntry = () => {
    setVehicleDet(InitialVech);
    setOpenEnty(false);
  };
  const handleTollAdd = () => {
    setTollDetail([]);
    setOpen(false);
    if (sessionStorage.getItem("ViewToll").length !== 0) {
      window.location.reload(true);
      setTimeout(() => {
        window.location.reload(false);
      }, 10);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Toll Management</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexGrow: "1",
          }}
        >
          <abbr title="ADD TOLL" style={{ textDecoration: "none" }}>
            <Button
              BtnName={" TOLL "}
              Icon={true}
              IconName={"faPlus"}
              BgColor="white"
              TxtColor="black"
              Width={10}
              OnClick={() => setOpen(true)}
              Styles={{ margin: "0 10px" }}
            />
          </abbr>
          <abbr title="ADD VEHICLE" style={{ textDecoration: "none" }}>
            <Button
              BtnName={"VEHICLE ENTRY"}
              Icon={true}
              IconName={"faPlus"}
              BgColor="white"
              TxtColor="black"
              Width={12}
              OnClick={() => setOpenEnty(true)}
              Styles={{ margin: "0 10px" }}
            />
          </abbr>
          <abbr
            title={!viewAllToll ? "VIEW TOLL" : "VEHICLE LOG"}
            style={{ textDecoration: "none" }}
          >
            <Button
              BtnName={!viewAllToll ? "TOLL " : "BACK"}
              Icon={true}
              IconName={!viewAllToll ? "faEye" : "faArrowLeft"}
              BgColor="white"
              TxtColor="black"
              Width={10}
              OnClick={() =>
                !viewAllToll ? handleViewToll() : setViewAllToll(false)
              }
              Styles={{ margin: "0 10px" }}
            />
          </abbr>
        </div>
      </div>
      {!viewAllToll && (
        <Table
          Heading={JSON.parse(sessionStorage.getItem("tableHeading")) ?? []}
          Data={JSON.parse(sessionStorage.getItem("VehicleLog")) ?? []}
          Search={true}
          SearchFieldName={"VehicleNumber"}
          SearchPlaceholder="Search Vehicle Number"
          Filter={true}
        />
      )}
      {viewAllToll && (
        <Table
          Heading={viewTollData}
          Data={
            sessionStorage.getItem("ViewToll")
              ? JSON.parse(sessionStorage.getItem("ViewToll"))
              : []
          }
          Store="ViewToll"
          Search={true}
          SearchFieldName={"TollName"}
          Delete={true}
          SearchPlaceholder="Search Toll Name"
        />
      )}
      <Dialog open={open} onClose={() => handleTollAdd()}>
        <div style={{ padding: "10px" }}>
          <h2 style={{ textAlign: "center", margin: "0" }}>ADD TOLL DETAILS</h2>

          <div style={{ padding: "5px" }}>
            <Label
              Styles={{ margin: "5px 0" }}
              LabelText={"Toll Name"}
              RequiredField
            />
            <Input
              Value={tollName}
              OnChange={(e) => setTollName(e.target.value)}
            />
            <Label
              Styles={{ margin: "5px 0" }}
              LabelText={"Vehicle Fare Details"}
              RequiredField
            />
            <div>
              <AddToll
                Styles={{ margin: "10px 0" }}
                returnValue={GetTollDetailFun}
                ClearState={clear}
              />
            </div>
            <Button
              BtnName={"ADD TOLL"}
              BgColor="white"
              TxtColor="black"
              Width={10}
              OnClick={() => contructViewTollData()}
              Styles={{
                width: "100%",
                boxSizing: "border-box",
                margin: "10px 0",
              }}
            />
          </div>
        </div>
      </Dialog>
      <Dialog open={openEnt} onClose={() => handleVehEntry()}>
        <div style={{ padding: "10px" }}>
          <h2 style={{ textAlign: "center" }}>VEHICLE ENTRY</h2>

          <div
            style={{
              padding: "5px 20px 20px 20px",
              display: "grid",
              width: "300px",
            }}
          >
            <Label
              Styles={{ margin: "5px 0" }}
              LabelText={"Select Toll Name"}
              RequiredField
            />
            <select
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#EFF2F9",
                border: "none",
              }}
              onChange={(e) =>
                setVehicleDet({
                  TollName: e.target.value,
                  VehicleType: "",
                  Tariff: "",
                })
              }
            >
              <option value="none" selected disabled hidden>
                {sessionStorage.getItem("ViewToll") &&
                sessionStorage.getItem("ViewToll").length !== 0
                  ? "Select Toll Name"
                  : "No Options"}
              </option>

              {sessionStorage.getItem("ViewToll") &&
                JSON.parse(sessionStorage.getItem("ViewToll")).map(
                  (tollname, tollIndex) => (
                    <option
                      key={tollname + tollIndex}
                      value={tollname.TollName}
                    >
                      {tollname.TollName}
                    </option>
                  )
                )}
            </select>

            <Label
              Styles={{ margin: "5px 0" }}
              LabelText={"Select Vehicle Type"}
              RequiredField
            />
            <Select
              DefaultValue={"Select Vehicle Type"}
              Options={["Car/Jeep/Van", "LCV", "Heavy_Vehicle", "Truck/Bus"]}
              OnChange={handleChange}
              Value={vehicleDet.VehicleType}
            />
            <Label
              Styles={{ margin: "5px 0" }}
              LabelText={"Vehicle Number"}
              RequiredField
            />
            <Input
              Value={vehicleDet.VehicleNumber}
              OnChange={(e) =>
                setVehicleDet({ ...vehicleDet, VehicleNumber: e.target.value })
              }
            />
            <Label
              Styles={{ margin: "5px 0" }}
              LabelText={"Tariff"}
              RequiredField
            />
            <Input Disabled Value={vehicleDet.Tariff} />
            <Button
              BtnName={"ADD VEHICLE"}
              Icon={true}
              IconName={"faCar"}
              BgColor="white"
              TxtColor="black"
              OnClick={() => handleAddVech()}
              Styles={{ margin: "10px 0 0 0 " }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
